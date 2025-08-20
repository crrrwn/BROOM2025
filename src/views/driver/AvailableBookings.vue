<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900">Available Bookings</h1>
      <p class="text-gray-600 mt-1">Find and accept delivery jobs</p>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
          <select
            v-model="filters.serviceType"
            @change="loadBookings"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Services</option>
            <option value="delivery">Delivery</option>
            <option value="pickup">Pickup</option>
            <option value="express">Express</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Max Distance</label>
          <select
            v-model="filters.maxDistance"
            @change="loadBookings"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Distance</option>
            <option value="5">Within 5km</option>
            <option value="10">Within 10km</option>
            <option value="20">Within 20km</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            v-model="filters.sortBy"
            @change="loadBookings"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="created_at">Newest First</option>
            <option value="total_fee">Highest Fee</option>
            <option value="distance">Nearest</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="loadBookings"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="bg-white rounded-lg shadow-sm p-8">
      <div class="flex items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="ml-2 text-gray-600">Loading bookings...</span>
      </div>
    </div>

    <!-- Bookings List -->
    <div v-else-if="bookings.length === 0" class="bg-white rounded-lg shadow-sm p-8">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5" />
        </svg>
        <p class="mt-2 text-lg text-gray-600">No available bookings</p>
        <p class="text-sm text-gray-500">Check back later for new delivery opportunities</p>
      </div>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-3">
              <span :class="[
                'px-2 py-1 text-xs font-medium rounded-full',
                booking.service_type === 'express' ? 'bg-red-100 text-red-800' :
                booking.service_type === 'delivery' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              ]">
                {{ booking.service_type.toUpperCase() }}
              </span>
              <span class="text-sm text-gray-500">Order #{{ booking.id }}</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">Pickup Location</h3>
                <p class="text-sm text-gray-600">{{ booking.pickup_address }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ formatDate(booking.pickup_date) }}</p>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">Delivery Location</h3>
                <p class="text-sm text-gray-600">{{ booking.delivery_address }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ formatDate(booking.delivery_date) }}</p>
              </div>
            </div>

            <div class="flex items-center space-x-6 text-sm text-gray-600">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ booking.distance || 'N/A' }} km
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Est. {{ booking.estimated_duration || '30' }} mins
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ booking.users?.first_name }} {{ booking.users?.last_name }}
              </div>
            </div>
          </div>

          <div class="text-right ml-6">
            <div class="text-2xl font-bold text-green-600 mb-2">
              ₱{{ booking.total_fee?.toLocaleString() }}
            </div>
            <button
              @click="acceptBooking(booking.id)"
              :disabled="acceptingBooking === booking.id"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <span v-if="acceptingBooking === booking.id" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Accepting...
              </span>
              <span v-else>Accept Job</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
import { getAvailableBookings, acceptBooking as acceptBookingAPI } from '@/lib/driver'

export default {
  name: 'AvailableBookings',
  setup() {
    const toast = inject('toast')
    
    const isLoading = ref(false)
    const bookings = ref([])
    const acceptingBooking = ref(null)
    
    const filters = ref({
      serviceType: '',
      maxDistance: '',
      sortBy: 'created_at'
    })

    const loadBookings = async () => {
      isLoading.value = true
      try {
        const data = await getAvailableBookings()
        bookings.value = data
      } catch (error) {
        console.error('Error loading bookings:', error)
        toast.error('Failed to load bookings')
      } finally {
        isLoading.value = false
      }
    }

    const acceptBooking = async (bookingId) => {
      acceptingBooking.value = bookingId
      try {
        await acceptBookingAPI(bookingId)
        toast.success('Booking accepted successfully!')
        // Remove the accepted booking from the list
        bookings.value = bookings.value.filter(b => b.id !== bookingId)
      } catch (error) {
        console.error('Error accepting booking:', error)
        toast.error('Failed to accept booking')
      } finally {
        acceptingBooking.value = null
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString()
    }

    onMounted(() => {
      loadBookings()
    })

    return {
      isLoading,
      bookings,
      acceptingBooking,
      filters,
      loadBookings,
      acceptBooking,
      formatDate
    }
  }
}
</script>
