<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">Order Tracking Map</h2>

      <div v-if="loading" class="flex justify-center items-center h-96">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p class="ml-4 text-gray-600">Loading order details...</p>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 class="text-lg font-medium text-red-800 mb-2">Error Loading Order</h3>
          <p class="text-red-600">{{ error }}</p>
          <button 
            @click="loadOrder" 
            class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>

      <div v-else-if="order">
        <div v-if="['picked_up', 'in_transit', 'delivered'].includes(order.status)">
          <div v-if="mapLoading" class="flex justify-center items-center h-96 bg-gray-100 rounded-md">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p class="ml-4 text-gray-600">Loading map...</p>
          </div>
          <div v-else id="google-map" class="h-96 w-full rounded-md"></div>
          <p v-if="driverLocation" class="text-center text-sm text-gray-600 mt-4">
            Driver is currently at: {{ driverLocation.address || 'En route to your location' }} (ETA: {{ driverLocation.eta || '15-20 mins' }})
          </p>
          <p v-else class="text-center text-sm text-gray-600 mt-4">
            Waiting for driver's location...
          </p>
        </div>
        <div v-else class="text-center py-12">
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">Map Not Available Yet</h3>
            <p class="text-gray-500 mb-4">The map will appear once the driver has picked up your order.</p>
            <p class="text-sm text-gray-500">Current Order Status: <span :class="getStatusColor(order.status)" class="px-2 py-1 rounded-full">{{ formatStatus(order.status) }}</span></p>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-2">Order Not Found</h3>
          <p class="text-gray-500 mb-4">The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <router-link 
            to="/my-orders" 
            class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Back to My Orders
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, inject, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MapPin } from 'lucide-vue-next' // Only MapPin is needed for status color
import { supabase } from '@/lib/supabase'

export default {
  name: 'OrderTracking',
  components: {
    MapPin, // Keep MapPin for potential future use or if needed for status icon
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const currentUser = inject('currentUser')
    
    const orderId = route.params.id

    const loading = ref(true)
    const error = ref(null)
    const order = ref(null)
    const driverInfo = ref({}) // Still needed to fetch driver_id
    const driverLocation = ref(null)
    const subscription = ref(null)

    // Google Maps related refs
    const googleMap = ref(null)
    const driverMarker = ref(null)
    const mapLoading = ref(true)

    const CALAPAN_CITY_COORDS = { lat: 13.405, lng: 121.176 } // Approximate center of Calapan City
    const MAP_ZOOM_LEVEL = 14

    const loadGoogleMapsScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve(window.google.maps)
          return
        }

        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places` // Replace YOUR_GOOGLE_MAPS_API_KEY
        script.async = true
        script.defer = true
        script.onload = () => {
          console.log('Google Maps script loaded.')
          resolve(window.google.maps)
        }
        script.onerror = (e) => {
          console.error('Error loading Google Maps script:', e)
          reject(e)
        }
        document.head.appendChild(script)
      })
    }

    const initMap = () => {
      if (!order.value || !['picked_up', 'in_transit', 'delivered'].includes(order.value.status)) {
        mapLoading.value = false
        return // Don't initialize map if status is not appropriate
      }

      if (!window.google || !window.google.maps) {
        console.warn('Google Maps API not loaded yet.')
        mapLoading.value = false
        return
      }

      const mapElement = document.getElementById('google-map')
      if (!mapElement) {
        console.error('Map element not found.')
        mapLoading.value = false
        return
      }

      googleMap.value = new window.google.maps.Map(mapElement, {
        center: CALAPAN_CITY_COORDS,
        zoom: MAP_ZOOM_LEVEL,
        disableDefaultUI: true, // Optional: simplify map controls
      })

      // Add initial driver marker if location is available
      if (driverLocation.value) {
        driverMarker.value = new window.google.maps.Marker({
          position: { lat: driverLocation.value.lat, lng: driverLocation.value.lng },
          map: googleMap.value,
          title: 'Driver Location',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/truck.png', // A simple truck icon
            scaledSize: new window.google.maps.Size(32, 32)
          }
        })
        googleMap.value.setCenter({ lat: driverLocation.value.lat, lng: driverLocation.value.lng });
      }
      mapLoading.value = false
    }

    watch(driverLocation, (newLocation) => {
      if (googleMap.value) {
        if (newLocation) {
          const newLatLng = new window.google.maps.LatLng(newLocation.lat, newLocation.lng)
          if (driverMarker.value) {
            driverMarker.value.setPosition(newLatLng)
          } else {
            driverMarker.value = new window.google.maps.Marker({
              position: newLatLng,
              map: googleMap.value,
              title: 'Driver Location',
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/truck.png',
                scaledSize: new window.google.maps.Size(32, 32)
              }
            })
          }
          // Optionally center map on driver
          googleMap.value.setCenter(newLatLng)
        } else if (driverMarker.value) {
          driverMarker.value.setMap(null) // Remove marker
          driverMarker.value = null
        }
      }
    }, { deep: true })

    watch(order, (newOrder) => {
      if (newOrder && ['picked_up', 'in_transit', 'delivered'].includes(newOrder.status) && !googleMap.value) {
        // If order status becomes trackable and map not yet initialized, initialize it
        mapLoading.value = true; // Show map loading spinner
        loadGoogleMapsScript().then(() => {
          initMap()
        }).catch(e => {
          console.error("Failed to load Google Maps for order status change:", e)
          mapLoading.value = false
        })
      } else if (newOrder && !['picked_up', 'in_transit', 'delivered'].includes(newOrder.status)) {
        // If order status becomes non-trackable, clear map and marker
        if (driverMarker.value) {
          driverMarker.value.setMap(null)
          driverMarker.value = null
        }
        googleMap.value = null;
        mapLoading.value = false;
      }
    }, { deep: true })


    const loadOrder = async () => {
      try {
        loading.value = true
        error.value = null
        mapLoading.value = true // Reset map loading state

        if (!currentUser.value) {
          error.value = 'You must be logged in to view this order'
          return
        }

        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        if (!uuidRegex.test(orderId)) {
          error.value = 'Invalid order ID format'
          return
        }

        const { data, error: fetchError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .eq('user_id', currentUser.value.id)
          .single()
        
        if (fetchError) {
          console.error('Error loading order:', fetchError)
          if (fetchError.code === 'PGRST116') {
            error.value = 'Order not found or you do not have permission to view it'
          } else {
            error.value = `Failed to load order: ${fetchError.message}`
          }
          mapLoading.value = false
          return
        }

        if (!data) {
          error.value = 'Order not found'
          mapLoading.value = false
          return
        }

        order.value = data
        
        // Load driver info if assigned
        if (data.driver_id) {
          await loadDriverInfo(data.driver_id) // Await driver info to ensure driverLocation is set before map init
        } else {
          driverInfo.value = {};
          driverLocation.value = null;
        }

        // Initialize map only if status is appropriate
        if (['picked_up', 'in_transit', 'delivered'].includes(order.value.status)) {
          await loadGoogleMapsScript()
          initMap()
        } else {
          mapLoading.value = false
        }

      } catch (err) {
        console.error('Error loading order:', err)
        error.value = 'An unexpected error occurred while loading the order'
        mapLoading.value = false
      } finally {
        loading.value = false
      }
    }

    const loadDriverInfo = async (driverId) => {
      try {
        const { data: driver, error: driverError } = await supabase
          .from('drivers')
          .select('*')
          .eq('id', driverId)
          .single()

        if (driverError) {
          console.error('Error loading driver info:', driverError)
          driverInfo.value = {} // Clear driver info on error
        } else {
          driverInfo.value = {
            name: driver.name || 'Driver Assigned',
            phone: driver.contact || '+63 XXX XXX XXXX',
            rating: driver.rating || 0
          }
        }

        // Load driver location
        const { data: location, error: locationError } = await supabase
          .from('driver_locations')
          .select('*')
          .eq('driver_id', driverId)
          .single()

        if (!locationError && location) {
          driverLocation.value = {
            lat: location.latitude,
            lng: location.longitude,
            address: location.address || 'En route to your location',
            eta: location.eta || '15-20 mins'
          }
        } else {
          driverLocation.value = null // Clear location if not found
        }
      } catch (err) {
        console.error('Error loading driver info:', err)
        driverLocation.value = null
      }
    }

    const subscribeToOrderUpdates = () => {
      if (!currentUser.value) return

      const channel = supabase
        .channel(`order-${orderId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders',
            filter: `id=eq.${orderId}`
          },
          (payload) => {
            if (payload.new && payload.new.user_id === currentUser.value.id) {
              order.value = { ...order.value, ...payload.new }
              
              if (payload.new.driver_id && (!driverInfo.value.name || payload.old?.driver_id !== payload.new.driver_id)) {
                loadDriverInfo(payload.new.driver_id)
              } else if (!payload.new.driver_id && driverInfo.value.name) {
                driverInfo.value = {}
                driverLocation.value = null
              }
            }
          }
        )
        .subscribe()

      subscription.value = channel
    }

    // Keep these format functions as they are used in the "Map Not Available Yet" message
    const formatStatus = (status) => {
      const statuses = {
        pending: 'Pending',
        assigned: 'Assigned',
        picked_up: 'Picked Up',
        in_transit: 'In Transit',
        delivered: 'Delivered',
        cancelled: 'Cancelled'
      }
      return statuses[status] || status
    }

    const getStatusColor = (status) => {
      const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        assigned: 'bg-blue-100 text-blue-800',
        picked_up: 'bg-purple-100 text-purple-800',
        in_transit: 'bg-indigo-100 text-indigo-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      }
      return colors[status] || 'bg-gray-100 text-gray-800'
    }

    onMounted(() => {
      loadOrder()
      subscribeToOrderUpdates()
    })

    onUnmounted(() => {
      if (subscription.value) {
        supabase.removeChannel(subscription.value)
      }
      if (driverMarker.value) {
        driverMarker.value.setMap(null)
      }
      googleMap.value = null
    })

    return {
      loading,
      error,
      order,
      driverLocation,
      mapLoading,
      loadOrder,
      formatStatus,
      getStatusColor,
    }
  }
}
</script>
