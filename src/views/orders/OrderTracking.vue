<template>
<div class="min-h-screen bg-gray-50">
  <!-- Header without sidebar -->
  <div class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <button
            @click="goBack"
            class="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft class="h-5 w-5" />
          </button>
          <h1 class="text-xl font-semibold text-gray-900">Track Order</h1>
        </div>
        <div class="flex items-center space-x-4">
          <NotificationBell />
          <LanguageToggle />
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>

    <div v-else-if="order" class="space-y-6">
      <!-- Order Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Order #{{ order.id }}</h2>
            <p class="text-gray-600">{{ formatServiceType(order.service_type) }}</p>
          </div>
          <div class="text-right">
            <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                 :class="getStatusColor(order.status)">
              {{ formatStatus(order.status) }}
            </div>
            <p class="text-sm text-gray-500 mt-1">
              {{ formatDate(order.created_at) }}
            </p>
          </div>
        </div>

        <!-- Order Timeline -->
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Order Timeline</h3>
          <div class="flow-root">
            <ul class="-mb-8">
              <li v-for="(step, stepIdx) in orderSteps" :key="step.name" class="relative pb-8">
                <div v-if="stepIdx !== orderSteps.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5"
                     :class="step.completed ? 'bg-green-600' : 'bg-gray-300'"></div>
                <div class="relative flex space-x-3">
                  <div>
                    <span class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                          :class="step.completed ? 'bg-green-600' : step.current ? 'bg-blue-600' : 'bg-gray-300'">
                      <component :is="step.icon" class="h-4 w-4 text-white" />
                    </span>
                  </div>
                  <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ step.name }}</p>
                      <p v-if="step.description" class="text-sm text-gray-500">{{ step.description }}</p>
                    </div>
                    <div v-if="step.time" class="text-right text-sm whitespace-nowrap text-gray-500">
                      {{ step.time }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Driver Information -->
      <div v-if="order.driver_id && order.status !== 'delivered'" class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Driver Information</h3>
        <div class="flex items-center space-x-4">
          <div class="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
            <User class="h-6 w-6 text-gray-600" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">{{ driverInfo.name || 'Driver Assigned' }}</p>
            <p class="text-sm text-gray-500">{{ driverInfo.phone || 'Contact: +63 XXX XXX XXXX' }}</p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="callDriver"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Phone class="h-4 w-4 mr-1" />
              Call
            </button>
            <button
              @click="openChat"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              <MessageCircle class="h-4 w-4 mr-1" />
              Chat
            </button>
          </div>
        </div>

        <!-- Real-time Location -->
        <div v-if="driverLocation" class="mt-4 p-4 bg-gray-50 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <MapPin class="h-4 w-4 text-green-600" />
              <span class="text-sm font-medium text-gray-900">Current Location</span>
            </div>
            <span class="text-sm text-gray-500">ETA: {{ driverLocation.eta || '15-20 mins' }}</span>
          </div>
          <p class="text-sm text-gray-600 mt-1">{{ driverLocation.address || 'En route to your location' }}</p>
        </div>
      </div>

      <!-- Order Details -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Service</span>
            <span class="text-sm font-medium text-gray-900">{{ formatServiceType(order.service_type) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Total Amount</span>
            <span class="text-sm font-medium text-gray-900">₱{{ order.total_amount }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Payment Status</span>
            <span class="text-sm font-medium"
                  :class="order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'">
              {{ order.payment_status }}
            </span>
          </div>
          <div v-if="order.pickup_address" class="flex justify-between">
            <span class="text-sm text-gray-600">Pickup Address</span>
            <span class="text-sm font-medium text-gray-900">{{ order.pickup_address }}</span>
          </div>
          <div v-if="order.delivery_address" class="flex justify-between">
            <span class="text-sm text-gray-600">Delivery Address</span>
            <span class="text-sm font-medium text-gray-900">{{ order.delivery_address }}</span>
          </div>
        </div>

        <!-- Service Details -->
        <div v-if="order.service_details" class="mt-6 pt-6 border-t border-gray-200">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Service Details</h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <div v-html="formatServiceDetails(order.service_details, order.service_type)"></div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex space-x-4">
          <button
            v-if="canCancelOrder"
            @click="cancelOrder"
            :disabled="cancelCountdown > 0"
            class="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {{ cancelCountdown > 0 ? `Cancel (${cancelCountdown}s)` : 'Cancel Order' }}
          </button>
          <button
            @click="viewBarcode"
            class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            View Barcode
          </button>
          <button
            v-if="order.status === 'delivered'"
            @click="rateOrder"
            class="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Rate Order
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">Order not found</p>
    </div>
  </div>

  <!-- Barcode Modal -->
  <div v-if="showBarcodeModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Order Barcode</h3>
        <div class="mb-4">
          <div v-if="barcodeData" class="flex justify-center">
            <img :src="barcodeData" alt="Order Barcode" class="max-w-full h-auto" />
          </div>
          <div v-else class="text-gray-500">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
            Generating barcode...
          </div>
        </div>
        <div class="flex justify-center space-x-4">
          <button
            @click="closeBarcodeModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Chat Modal -->
  <div v-if="showChatModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white mx-4">
      <ChatWithDriver :order-id="order.id" @close="closeChatModal" />
    </div>
  </div>
</div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
ArrowLeft, 
Phone, 
MessageCircle, 
MapPin, 
User,
Package,
Clock,
CheckCircle,
Truck,
Home
} from 'lucide-vue-next'
import { getOrderById, subscribeToTable, unsubscribe } from '@/lib/supabase'
import { generateBarcode } from '@/utils/barcode'
import NotificationBell from '@/components/NotificationBell.vue'
import LanguageToggle from '@/components/LanguageToggle.vue'
import ChatWithDriver from './ChatWithDriver.vue'

export default {
name: 'OrderTracking',
components: {
  ArrowLeft,
  Phone,
  MessageCircle,
  MapPin,
  User,
  NotificationBell,
  LanguageToggle,
  ChatWithDriver
},
setup() {
  const route = useRoute()
  const router = useRouter()
  const orderId = route.params.id

  const loading = ref(true)
  const order = ref(null)
  const driverInfo = ref({})
  const driverLocation = ref(null)
  const showBarcodeModal = ref(false)
  const showChatModal = ref(false)
  const barcodeData = ref(null)
  const cancelCountdown = ref(0)
  const subscription = ref(null)

  const orderSteps = computed(() => {
    if (!order.value) return []

    const steps = [
      {
        name: 'Order Placed',
        description: 'Your order has been received',
        icon: Package,
        completed: true,
        time: formatDate(order.value.created_at)
      },
      {
        name: 'Pending',
        description: 'Waiting for confirmation',
        icon: Clock,
        completed: ['confirmed', 'assigned', 'picked_up', 'in_transit', 'delivered'].includes(order.value.status),
        current: order.value.status === 'pending'
      },
      {
        name: 'Assigned',
        description: 'Driver has been assigned',
        icon: User,
        completed: ['assigned', 'picked_up', 'in_transit', 'delivered'].includes(order.value.status),
        current: order.value.status === 'assigned'
      },
      {
        name: 'Picked Up',
        description: 'Order has been picked up',
        icon: Truck,
        completed: ['picked_up', 'in_transit', 'delivered'].includes(order.value.status),
        current: order.value.status === 'picked_up'
      },
      {
        name: 'In Transit',
        description: 'On the way to destination',
        icon: MapPin,
        completed: ['in_transit', 'delivered'].includes(order.value.status),
        current: order.value.status === 'in_transit'
      },
      {
        name: 'Delivered',
        description: 'Order has been delivered',
        icon: CheckCircle,
        completed: order.value.status === 'delivered',
        current: order.value.status === 'delivered'
      }
    ]

    return steps
  })

  const canCancelOrder = computed(() => {
    return order.value && ['pending', 'confirmed'].includes(order.value.status)
  })

  const loadOrder = async () => {
    try {
      loading.value = true
      const { data, error } = await getOrderById(orderId)
      
      if (error) {
        console.error('Error loading order:', error)
        return
      }

      order.value = data
      
      // Start cancel countdown if order is new
      if (data.status === 'pending') {
        const orderTime = new Date(data.created_at).getTime()
        const now = new Date().getTime()
        const elapsed = (now - orderTime) / 1000
        const remaining = Math.max(0, 30 - elapsed)
        
        if (remaining > 0) {
          cancelCountdown.value = Math.ceil(remaining)
          startCancelCountdown()
        }
      }

      // Load driver info if assigned
      if (data.driver_id) {
        loadDriverInfo(data.driver_id)
      }

    } catch (error) {
      console.error('Error loading order:', error)
    } finally {
      loading.value = false
    }
  }

  const loadDriverInfo = async (driverId) => {
    // Mock driver info - replace with actual API call
    driverInfo.value = {
      name: 'Juan Dela Cruz',
      phone: '+63 912 345 6789',
      rating: 4.8
    }

    // Mock driver location - replace with actual real-time tracking
    driverLocation.value = {
      lat: 14.5995,
      lng: 120.9842,
      address: 'Approaching your location',
      eta: '10-15 mins'
    }
  }

  const startCancelCountdown = () => {
    const interval = setInterval(() => {
      cancelCountdown.value--
      if (cancelCountdown.value <= 0) {
        clearInterval(interval)
      }
    }, 1000)
  }

  const subscribeToOrderUpdates = () => {
    subscription.value = subscribeToTable(
      'orders',
      (payload) => {
        if (payload.new && payload.new.id === parseInt(orderId)) {
          order.value = { ...order.value, ...payload.new }
          
          // Load driver info if newly assigned
          if (payload.new.driver_id && !driverInfo.value.name) {
            loadDriverInfo(payload.new.driver_id)
          }
        }
      },
      `id=eq.${orderId}`
    )
  }

  const goBack = () => {
    router.go(-1)
  }

  const formatServiceType = (type) => {
    const types = {
      food_delivery: 'Food Delivery',
      bill_payments: 'Bill Payments',
      pickup_drop: 'Pick-up & Drop',
      grocery: 'Grocery Shopping',
      medicine_delivery: 'Medicine Delivery',
      gift_delivery: 'Gift Delivery'
    }
    return types[type] || type
  }

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
      confirmed: 'bg-blue-100 text-blue-800',
      assigned: 'bg-purple-100 text-purple-800',
      picked_up: 'bg-orange-100 text-orange-800',
      in_transit: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const formatServiceDetails = (details, serviceType) => {
    try {
      const parsed = JSON.parse(details)
      let formattedDetails = ''

      switch (serviceType) {
        case 'food_delivery':
          formattedDetails += `<div class="space-y-2">`
          if (parsed.restaurantName) formattedDetails += `<p><strong>Restaurant:</strong> ${parsed.restaurantName}</p>`
          if (parsed.restaurantAddress) formattedDetails += `<p><strong>Restaurant Address:</strong> ${parsed.restaurantAddress}</p>`
          if (parsed.foodItems) formattedDetails += `<p><strong>Food Items:</strong> ${parsed.foodItems}</p>`
          if (parsed.specialInstructions) formattedDetails += `<p><strong>Special Instructions:</strong> ${parsed.specialInstructions}</p>`
          if (parsed.contactPerson) formattedDetails += `<p><strong>Contact Person:</strong> ${parsed.contactPerson}</p>`
          if (parsed.contactNumber) formattedDetails += `<p><strong>Contact Number:</strong> ${parsed.contactNumber}</p>`
          formattedDetails += `</div>`
          break

        case 'gift_delivery':
          formattedDetails += `<div class="space-y-2">`
          if (parsed.giftStoreName) formattedDetails += `<p><strong>Store Name:</strong> ${parsed.giftStoreName}</p>`
          if (parsed.giftStoreAddress) formattedDetails += `<p><strong>Store Address:</strong> ${parsed.giftStoreAddress}</p>`
          if (parsed.giftDescription) formattedDetails += `<p><strong>Gift Description:</strong> ${parsed.giftDescription}</p>`
          if (parsed.giftBudget) formattedDetails += `<p><strong>Budget:</strong> ₱${parsed.giftBudget}</p>`
          if (parsed.recipientName) formattedDetails += `<p><strong>Recipient:</strong> ${parsed.recipientName}</p>`
          if (parsed.recipientContact) formattedDetails += `<p><strong>Recipient Contact:</strong> ${parsed.recipientContact}</p>`
          if (parsed.specialMessage) formattedDetails += `<p><strong>Special Message:</strong> ${parsed.specialMessage}</p>`
          formattedDetails += `</div>`
          break

        case 'pickup_drop':
          formattedDetails += `<div class="space-y-2">`
          if (parsed.pickupAddress) formattedDetails += `<p><strong>Pickup Address:</strong> ${parsed.pickupAddress}</p>`
          if (parsed.pickupContact) formattedDetails += `<p><strong>Pickup Contact:</strong> ${parsed.pickupContact}</p>`
          if (parsed.itemDescription) formattedDetails += `<p><strong>Item Description:</strong> ${parsed.itemDescription}</p>`
          if (parsed.itemValue) formattedDetails += `<p><strong>Item Value:</strong> ₱${parsed.itemValue}</p>`
          if (parsed.deliveryContact) formattedDetails += `<p><strong>Delivery Contact:</strong> ${parsed.deliveryContact}</p>`
          if (parsed.specialInstructions) formattedDetails += `<p><strong>Special Instructions:</strong> ${parsed.specialInstructions}</p>`
          formattedDetails += `</div>`
          break

        case 'grocery':
          formattedDetails += `<div class="space-y-2">`
          if (parsed.storeName) formattedDetails += `<p><strong>Store:</strong> ${parsed.storeName}</p>`
          if (parsed.storeAddress) formattedDetails += `<p><strong>Store Address:</strong> ${parsed.storeAddress}</p>`
          if (parsed.groceryList) formattedDetails += `<p><strong>Grocery List:</strong> ${parsed.groceryList}</p>`
          if (parsed.budget) formattedDetails += `<p><strong>Budget:</strong> ₱${parsed.budget}</p>`
          if (parsed.contactPerson) formattedDetails += `<p><strong>Contact Person:</strong> ${parsed.contactPerson}</p>`
          if (parsed.contactNumber) formattedDetails += `<p><strong>Contact Number:</strong> ${parsed.contactNumber}</p>`
          if (parsed.specialInstructions) formattedDetails += `<p><strong>Special Instructions:</strong> ${parsed.specialInstructions}</p>`
          formattedDetails += `</div>`
          break

        case 'medicine_delivery':
          formattedDetails += `<div class="space-y-2">`
          if (parsed.pharmacyName) formattedDetails += `<p><strong>Pharmacy:</strong> ${parsed.pharmacyName}</p>`
          if (parsed.pharmacyAddress) formattedDetails += `<p><strong>Pharmacy Address:</strong> ${parsed.pharmacyAddress}</p>`
          if (parsed.medicineList) formattedDetails += `<p><strong>Medicine List:</strong> ${parsed.medicineList}</p>`
          if (parsed.prescriptionRequired) formattedDetails += `<p><strong>Prescription Required:</strong> ${parsed.prescriptionRequired ? 'Yes' : 'No'}</p>`
          if (parsed.patientName) formattedDetails += `<p><strong>Patient Name:</strong> ${parsed.patientName}</p>`
          if (parsed.contactPerson) formattedDetails += `<p><strong>Contact Person:</strong> ${parsed.contactPerson}</p>`
          if (parsed.contactNumber) formattedDetails += `<p><strong>Contact Number:</strong> ${parsed.contactNumber}</p>`
          if (parsed.specialInstructions) formattedDetails += `<p><strong>Special Instructions:</strong> ${parsed.specialInstructions}</p>`
          formattedDetails += `</div>`
          break

        case 'bill_payments':
          formattedDetails += `<div class="space-y-2">`
          if (parsed.billType) formattedDetails += `<p><strong>Bill Type:</strong> ${parsed.billType}</p>`
          if (parsed.accountNumber) formattedDetails += `<p><strong>Account Number:</strong> ${parsed.accountNumber}</p>`
          if (parsed.amount) formattedDetails += `<p><strong>Amount:</strong> ₱${parsed.amount}</p>`
          if (parsed.paymentLocation) formattedDetails += `<p><strong>Payment Location:</strong> ${parsed.paymentLocation}</p>`
          if (parsed.contactPerson) formattedDetails += `<p><strong>Contact Person:</strong> ${parsed.contactPerson}</p>`
          if (parsed.contactNumber) formattedDetails += `<p><strong>Contact Number:</strong> ${parsed.contactNumber}</p>`
          if (parsed.specialInstructions) formattedDetails += `<p><strong>Special Instructions:</strong> ${parsed.specialInstructions}</p>`
          formattedDetails += `</div>`
          break

        default:
          // Fallback for any other service type
          formattedDetails += `<div class="space-y-2">`
          Object.entries(parsed)
            .filter(([key, value]) => value && key !== 'deliveryAddress' && key !== 'paymentMethod')
            .forEach(([key, value]) => {
              const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
              formattedDetails += `<p><strong>${formattedKey}:</strong> ${value}</p>`
            })
          formattedDetails += `</div>`
      }

      return formattedDetails
    } catch {
      return `<p>${details}</p>`
    }
  }

  const cancelOrder = async () => {
    if (cancelCountdown.value > 0) return

    try {
      // Implement cancel order logic
      console.log('Cancelling order:', orderId)
      // await updateOrderStatus(orderId, 'cancelled')
      router.push('/dashboard/my-orders')
    } catch (error) {
      console.error('Error cancelling order:', error)
    }
  }

  const viewBarcode = async () => {
    showBarcodeModal.value = true
    try {
      const barcode = await generateBarcode(orderId)
      barcodeData.value = barcode
    } catch (error) {
      console.error('Error generating barcode:', error)
      barcodeData.value = null
    }
  }

  const closeBarcodeModal = () => {
    showBarcodeModal.value = false
    barcodeData.value = null
  }

  const callDriver = () => {
    if (driverInfo.value.phone) {
      window.open(`tel:${driverInfo.value.phone}`)
    }
  }

  const openChat = () => {
    showChatModal.value = true
  }

  const closeChatModal = () => {
    showChatModal.value = false
  }

  const rateOrder = () => {
    // Implement rating functionality
    console.log('Rating order:', orderId)
  }

  onMounted(() => {
    loadOrder()
    subscribeToOrderUpdates()
  })

  onUnmounted(() => {
    if (subscription.value) {
      unsubscribe(subscription.value)
    }
  })

  return {
    loading,
    order,
    orderSteps,
    driverInfo,
    driverLocation,
    showBarcodeModal,
    showChatModal,
    barcodeData,
    cancelCountdown,
    canCancelOrder,
    goBack,
    formatServiceType,
    formatStatus,
    getStatusColor,
    formatDate,
    formatServiceDetails,
    cancelOrder,
    viewBarcode,
    closeBarcodeModal,
    callDriver,
    openChat,
    closeChatModal,
    rateOrder
  }
}
}
</script>
