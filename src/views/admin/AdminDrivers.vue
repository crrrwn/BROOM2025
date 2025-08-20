<template>
  <div class="min-h-screen bg-white space-y-6 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-[#3ED400] to-[#00C851] bg-clip-text text-transparent">Drivers Management</h1>
        <p class="text-gray-600 mt-1">Manage and monitor all drivers in the system</p>
      </div>
      <!-- Replaced Add New Driver button with Refresh button -->
      <button @click="fetchDrivers" class="bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white px-6 py-3 rounded-xl hover:from-[#74E600] hover:to-[#3ED400] transition-all duration-300 shadow-lg font-medium">
        <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Refresh
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3ED400]"></div>
    </div>

    <!-- Stats Cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Updated stats to use dynamic data from Supabase -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div class="flex items-center">
          <div class="p-3 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-xl shadow-md">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Drivers</p>
            <p class="text-2xl font-bold text-[#00C851]">{{ stats.activeDrivers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div class="flex items-center">
          <div class="p-3 bg-gradient-to-br from-[#A8EB12] to-[#74E600] rounded-xl shadow-md">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">On Duty</p>
            <p class="text-2xl font-bold text-[#74E600]">{{ stats.onDuty }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div class="flex items-center">
          <div class="p-3 bg-gradient-to-br from-red-400 to-red-600 rounded-xl shadow-md">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Offline</p>
            <p class="text-2xl font-bold text-red-600">{{ stats.offline }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div class="flex items-center">
          <div class="p-3 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-xl shadow-md">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Trips</p>
            <p class="text-2xl font-bold text-[#3ED400]">{{ stats.totalTrips }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Driver Performance Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Weekly Performance Graph -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Weekly Performance</h3>
        <div class="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
          <div class="text-center">
            <svg class="w-12 h-12 text-[#3ED400] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <p class="text-gray-500">Weekly delivery performance chart</p>
          </div>
        </div>
      </div>

      <!-- Performance Alerts -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Performance Alerts</h3>
        <div class="space-y-4">
          <!-- Most Active Driver -->
          <div class="bg-gradient-to-r from-[#A8EB12]/10 to-[#74E600]/10 border border-[#74E600]/20 rounded-xl p-4">
            <div class="flex items-center">
              <div class="p-2 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-lg shadow-md">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-[#00C851]">Most Active Driver</p>
                <p class="text-sm text-[#3ED400]">{{ analytics.mostActiveDriver.name }} - {{ analytics.mostActiveDriver.deliveries }} deliveries this week</p>
              </div>
            </div>
          </div>

          <!-- Low Performer Alert -->
          <div class="bg-red-50 border border-red-200 rounded-xl p-4">
            <div class="flex items-center">
              <div class="p-2 bg-red-500 rounded-lg shadow-md">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">Low Performer Alert</p>
                <p class="text-sm text-red-600">{{ analytics.lowPerformer.count }} drivers with rating below 4.0</p>
              </div>
            </div>
          </div>

          <!-- Weekly Stats -->
          <div class="bg-gradient-to-r from-[#74E600]/10 to-[#3ED400]/10 border border-[#3ED400]/20 rounded-xl p-4">
            <div class="flex items-center">
              <div class="p-2 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-lg shadow-md">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-[#00C851]">Weekly Growth</p>
                <p class="text-sm text-[#3ED400]">+{{ analytics.weeklyGrowth }}% increase in deliveries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Drivers Table -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-[#A8EB12] to-[#74E600] border-b border-gray-200">
        <h2 class="text-lg font-semibold text-white">All Drivers</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <!-- Removed Status, Documents, and Actions columns -->
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deliveries</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Updated to show real driver data from Supabase -->
            <tr v-for="driver in drivers" :key="driver.id" class="hover:bg-gray-50 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-full flex items-center justify-center shadow-md">
                    <span class="text-white font-semibold text-sm">{{ getInitials(driver.first_name, driver.last_name) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ driver.first_name }} {{ driver.last_name }}</div>
                    <div class="text-sm text-gray-500">{{ driver.email }}</div>
                  </div>
                </div>
              </td>
              <!-- Removed Status column -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ driver.motorcycle_brand }} {{ driver.motorcycle_model }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <span>{{ driver.rating || 'N/A' }}</span>
                  <svg v-if="driver.rating" class="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ driver.delivery_count || 0 }}
              </td>
              <!-- Removed Documents and Actions columns -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Driver Profile Modal -->
    <div v-if="showProfileModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="flex justify-between items-center p-6 bg-gradient-to-r from-[#A8EB12] to-[#74E600] text-white rounded-t-xl">
          <h3 class="text-lg font-semibold">Driver Profile - {{ selectedDriver?.first_name }} {{ selectedDriver?.last_name }}</h3>
          <button @click="closeProfileModal" class="text-white hover:text-gray-200 transition-colors duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="p-6" v-if="selectedDriver">
          <!-- Driver Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">Personal Information</h4>
              <div class="space-y-2">
                <p><span class="font-medium">Name:</span> {{ selectedDriver.first_name }} {{ selectedDriver.last_name }}</p>
                <p><span class="font-medium">Email:</span> {{ selectedDriver.email }}</p>
                <p><span class="font-medium">Phone:</span> {{ selectedDriver.phone }}</p>
                <p><span class="font-medium">Address:</span> {{ selectedDriver.address }}</p>
                <p><span class="font-medium">Join Date:</span> {{ selectedDriver.join_date }}</p>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
              <div class="space-y-2">
                <p><span class="font-medium">Rating:</span> {{ selectedDriver.rating }} ⭐</p>
                <p><span class="font-medium">Total Deliveries:</span> {{ selectedDriver.delivery_count }}</p>
                <p><span class="font-medium">Completed Orders:</span> {{ selectedDriver.completed_orders }}</p>
                <p><span class="font-medium">Cancelled Orders:</span> {{ selectedDriver.cancelled_orders }}</p>
                <p><span class="font-medium">On-time Rate:</span> {{ selectedDriver.on_time_rate }}%</p>
              </div>
            </div>
          </div>

          <!-- Vehicle Information -->
          <div class="mb-6">
            <h4 class="font-semibold text-gray-900 mb-3">Vehicle Information</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <p><span class="font-medium">Vehicle:</span> {{ selectedDriver.motorcycle_brand }} {{ selectedDriver.motorcycle_model }}</p>
                <p><span class="font-medium">Plate Number:</span> {{ selectedDriver.plate_number }}</p>
                <p><span class="font-medium">Color:</span> {{ selectedDriver.vehicle_color }}</p>
              </div>
            </div>
          </div>

          <!-- Documents -->
          <div class="mb-6">
            <h4 class="font-semibold text-gray-900 mb-3">Documents</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="doc in selectedDriver.documents" :key="doc.type" class="border rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium">{{ doc.type }}</span>
                  <span :class="getDocumentStatusClass(doc.status)" class="px-2 py-1 text-xs rounded-full">
                    {{ doc.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-600">Expires: {{ doc.expiry }}</p>
                <button class="text-blue-600 hover:text-blue-800 text-sm mt-2">View Document</button>
              </div>
            </div>
          </div>

          <!-- Recent Ratings -->
          <div>
            <h4 class="font-semibold text-gray-900 mb-3">Recent Ratings & Reviews</h4>
            <div class="space-y-3">
              <div v-for="review in selectedDriver.recent_reviews" :key="review.id" class="border-l-4 border-blue-500 pl-4">
                <div class="flex items-center mb-1">
                  <span class="font-medium text-sm">{{ review.customer_name }}</span>
                  <div class="flex ml-2">
                    <svg v-for="star in review.rating" :key="star" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>
                <p class="text-sm text-gray-600">{{ review.comment }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ review.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../../lib/supabase'

export default {
  name: 'AdminDrivers',
  data() {
    return {
      loading: true,
      showProfileModal: false,
      selectedDriver: null,
      stats: {
        activeDrivers: 0,
        onDuty: 0,
        offline: 0,
        totalTrips: 0
      },
      analytics: {
        mostActiveDriver: {
          name: 'Loading...',
          deliveries: 0
        },
        lowPerformer: {
          count: 0
        },
        weeklyGrowth: 0
      },
      drivers: []
    }
  },
  async mounted() {
    await this.fetchDrivers()
  },
  methods: {
    async fetchDrivers() {
      try {
        this.loading = true
        
        // Fetch approved driver applications
        const { data: drivers, error } = await supabase
          .from('driver_applications')
          .select('*')
          .eq('status', 'approved')
        
        if (error) {
          console.error('Error fetching drivers:', error)
          return
        }
        
        this.drivers = drivers || []
        this.calculateStats()
        
      } catch (error) {
        console.error('Error fetching drivers:', error)
      } finally {
        this.loading = false
      }
    },
    
    calculateStats() {
      const activeDrivers = this.drivers.filter(d => d.status === 'approved').length
      const onDuty = this.drivers.filter(d => d.is_online).length
      const offline = activeDrivers - onDuty
      const totalTrips = this.drivers.reduce((sum, d) => sum + (d.delivery_count || 0), 0)
      
      this.stats = {
        activeDrivers,
        onDuty,
        offline,
        totalTrips
      }
      
      // Update analytics
      const mostActive = this.drivers.reduce((max, driver) => 
        (driver.delivery_count || 0) > (max.delivery_count || 0) ? driver : max, 
        this.drivers[0] || {}
      )
      
      this.analytics.mostActiveDriver = {
        name: mostActive.first_name ? `${mostActive.first_name} ${mostActive.last_name}` : 'N/A',
        deliveries: mostActive.delivery_count || 0
      }
      
      this.analytics.lowPerformer.count = this.drivers.filter(d => (d.rating || 5) < 4.0).length
    },
    
    getInitials(firstName, lastName) {
      const first = firstName ? firstName.charAt(0).toUpperCase() : ''
      const last = lastName ? lastName.charAt(0).toUpperCase() : ''
      return first + last
    },
    
    getDocumentStatus(driver) {
      const hasLicense = driver.license_url
      const hasOrcr = driver.orcr_url
      const hasSelfie = driver.selfie_url
      const hasProfile = driver.profile_picture_url
      
      const completedDocs = [hasLicense, hasOrcr, hasSelfie, hasProfile].filter(Boolean).length
      
      if (completedDocs === 4) return 'Complete'
      if (completedDocs >= 2) return 'Incomplete'
      return 'Missing'
    },
    
    getStatusClass(status) {
      switch(status) {
        case 'approved':
          return 'bg-green-100 text-green-800'
        case 'pending':
          return 'bg-yellow-100 text-yellow-800'
        case 'rejected':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },
    
    getDocumentStatusClass(status) {
      switch(status) {
        case 'Complete':
          return 'bg-green-100 text-green-800'
        case 'Incomplete':
          return 'bg-yellow-100 text-yellow-800'
        case 'Missing':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },
    
    viewDriverProfile(driver) {
      this.selectedDriver = driver
      this.showProfileModal = true
    },
    
    closeProfileModal() {
      this.showProfileModal = false
      this.selectedDriver = null
    },
    
    async toggleDriverStatus(driver) {
      try {
        const newStatus = driver.status === 'approved' ? 'rejected' : 'approved'
        
        const { error } = await supabase
          .from('driver_applications')
          .update({ status: newStatus })
          .eq('id', driver.id)
        
        if (error) {
          console.error('Error updating driver status:', error)
          return
        }
        
        // Update local data
        driver.status = newStatus
        this.calculateStats()
        
      } catch (error) {
        console.error('Error updating driver status:', error)
      }
    }
  }
}
</script>
