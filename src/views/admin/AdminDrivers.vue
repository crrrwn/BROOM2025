<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Drivers Management</h1>
        <p class="text-gray-600">Manage and monitor all drivers in the system</p>
      </div>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
        Add New Driver
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Drivers</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.activeDrivers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">On Duty</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.onDuty }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Offline</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.offline }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Trips</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalTrips }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Driver Performance Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Weekly Performance Graph -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Weekly Performance</h3>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <p class="text-gray-500">Weekly delivery performance chart</p>
          </div>
        </div>
      </div>

      <!-- Performance Alerts -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Performance Alerts</h3>
        <div class="space-y-4">
          <!-- Most Active Driver -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-800">Most Active Driver</p>
                <p class="text-sm text-green-600">{{ analytics.mostActiveDriver.name }} - {{ analytics.mostActiveDriver.deliveries }} deliveries this week</p>
              </div>
            </div>
          </div>

          <!-- Low Performer Alert -->
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-center">
              <div class="p-2 bg-red-100 rounded-lg">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">Low Performer Alert</p>
                <p class="text-sm text-red-600">{{ analytics.lowPerformer.count }} drivers with rating below 4.0</p>
              </div>
            </div>
          </div>

          <!-- Weekly Stats -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-blue-800">Weekly Growth</p>
                <p class="text-sm text-blue-600">+{{ analytics.weeklyGrowth }}% increase in deliveries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Drivers Table -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">All Drivers</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deliveries</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="driver in drivers" :key="driver.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-semibold text-sm">{{ driver.initials }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ driver.name }}</div>
                    <div class="text-sm text-gray-500">{{ driver.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(driver.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                  {{ driver.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ driver.vehicle }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <span>{{ driver.rating }}</span>
                  <svg class="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ driver.deliveryCount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getDocumentStatusClass(driver.documentsStatus)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                  {{ driver.documentsStatus }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button @click="viewDriverProfile(driver)" class="text-blue-600 hover:text-blue-900">View Profile</button>
                <button @click="toggleDriverStatus(driver)" :class="driver.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'">
                  {{ driver.status === 'Active' ? 'Deactivate' : 'Approve' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Driver Profile Modal -->
    <div v-if="showProfileModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center p-6 border-b">
          <h3 class="text-lg font-semibold">Driver Profile - {{ selectedDriver?.name }}</h3>
          <button @click="closeProfileModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="p-6" v-if="selectedDriver">
          <!-- Driver Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">Personal Information</h4>
              <div class="space-y-2">
                <p><span class="font-medium">Name:</span> {{ selectedDriver.name }}</p>
                <p><span class="font-medium">Email:</span> {{ selectedDriver.email }}</p>
                <p><span class="font-medium">Phone:</span> {{ selectedDriver.phone }}</p>
                <p><span class="font-medium">Address:</span> {{ selectedDriver.address }}</p>
                <p><span class="font-medium">Join Date:</span> {{ selectedDriver.joinDate }}</p>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
              <div class="space-y-2">
                <p><span class="font-medium">Rating:</span> {{ selectedDriver.rating }} ⭐</p>
                <p><span class="font-medium">Total Deliveries:</span> {{ selectedDriver.deliveryCount }}</p>
                <p><span class="font-medium">Completed Orders:</span> {{ selectedDriver.completedOrders }}</p>
                <p><span class="font-medium">Cancelled Orders:</span> {{ selectedDriver.cancelledOrders }}</p>
                <p><span class="font-medium">On-time Rate:</span> {{ selectedDriver.onTimeRate }}%</p>
              </div>
            </div>
          </div>

          <!-- Vehicle Information -->
          <div class="mb-6">
            <h4 class="font-semibold text-gray-900 mb-3">Vehicle Information</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <p><span class="font-medium">Vehicle:</span> {{ selectedDriver.vehicle }}</p>
                <p><span class="font-medium">Plate Number:</span> {{ selectedDriver.plateNumber }}</p>
                <p><span class="font-medium">Color:</span> {{ selectedDriver.vehicleColor }}</p>
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
              <div v-for="review in selectedDriver.recentReviews" :key="review.id" class="border-l-4 border-blue-500 pl-4">
                <div class="flex items-center mb-1">
                  <span class="font-medium text-sm">{{ review.customerName }}</span>
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
export default {
  name: 'AdminDrivers',
  data() {
    return {
      showProfileModal: false,
      selectedDriver: null,
      stats: {
        activeDrivers: 24,
        onDuty: 18,
        offline: 6,
        totalTrips: 1247
      },
      analytics: {
        mostActiveDriver: {
          name: 'John Doe',
          deliveries: 45
        },
        lowPerformer: {
          count: 3
        },
        weeklyGrowth: 12
      },
      drivers: [
        {
          id: 1,
          name: 'John Doe',
          initials: 'JD',
          email: 'john.doe@example.com',
          phone: '+63 912 345 6789',
          address: 'Quezon City, Metro Manila',
          joinDate: '2024-01-15',
          status: 'Active',
          vehicle: 'Toyota Vios',
          plateNumber: 'ABC 123',
          vehicleColor: 'White',
          rating: 4.8,
          deliveryCount: 156,
          completedOrders: 148,
          cancelledOrders: 8,
          onTimeRate: 95,
          documentsStatus: 'Complete',
          documents: [
            { type: 'Driver\'s License', status: 'Verified', expiry: '2025-12-31' },
            { type: 'Vehicle Registration', status: 'Verified', expiry: '2025-06-30' },
            { type: 'Insurance', status: 'Verified', expiry: '2025-03-15' },
            { type: 'Medical Certificate', status: 'Pending', expiry: '2025-01-20' }
          ],
          recentReviews: [
            { id: 1, customerName: 'Maria Santos', rating: 5, comment: 'Very professional and on time!', date: '2024-01-20' },
            { id: 2, customerName: 'Carlos Reyes', rating: 4, comment: 'Good service, friendly driver.', date: '2024-01-18' },
            { id: 3, customerName: 'Ana Cruz', rating: 5, comment: 'Excellent delivery service!', date: '2024-01-15' }
          ]
        },
        {
          id: 2,
          name: 'Maria Garcia',
          initials: 'MG',
          email: 'maria.garcia@example.com',
          phone: '+63 917 234 5678',
          address: 'Makati City, Metro Manila',
          joinDate: '2024-02-01',
          status: 'Active',
          vehicle: 'Honda City',
          plateNumber: 'XYZ 789',
          vehicleColor: 'Silver',
          rating: 4.6,
          deliveryCount: 89,
          completedOrders: 85,
          cancelledOrders: 4,
          onTimeRate: 92,
          documentsStatus: 'Incomplete',
          documents: [
            { type: 'Driver\'s License', status: 'Verified', expiry: '2026-01-15' },
            { type: 'Vehicle Registration', status: 'Verified', expiry: '2025-08-20' },
            { type: 'Insurance', status: 'Expired', expiry: '2024-01-10' },
            { type: 'Medical Certificate', status: 'Verified', expiry: '2025-02-28' }
          ],
          recentReviews: [
            { id: 1, customerName: 'Pedro Dela Cruz', rating: 5, comment: 'Fast and reliable!', date: '2024-01-19' },
            { id: 2, customerName: 'Lisa Tan', rating: 4, comment: 'Good communication throughout delivery.', date: '2024-01-17' }
          ]
        },
        {
          id: 3,
          name: 'Robert Kim',
          initials: 'RK',
          email: 'robert.kim@example.com',
          phone: '+63 905 123 4567',
          address: 'Pasig City, Metro Manila',
          joinDate: '2023-12-10',
          status: 'Inactive',
          vehicle: 'Mitsubishi Mirage',
          plateNumber: 'DEF 456',
          vehicleColor: 'Red',
          rating: 3.8,
          deliveryCount: 45,
          completedOrders: 40,
          cancelledOrders: 5,
          onTimeRate: 78,
          documentsStatus: 'Complete',
          documents: [
            { type: 'Driver\'s License', status: 'Verified', expiry: '2025-11-30' },
            { type: 'Vehicle Registration', status: 'Verified', expiry: '2025-09-15' },
            { type: 'Insurance', status: 'Verified', expiry: '2025-04-10' },
            { type: 'Medical Certificate', status: 'Verified', expiry: '2025-03-05' }
          ],
          recentReviews: [
            { id: 1, customerName: 'Jenny Lim', rating: 3, comment: 'Delivery was late but driver was polite.', date: '2024-01-12' },
            { id: 2, customerName: 'Mark Torres', rating: 4, comment: 'Okay service overall.', date: '2024-01-08' }
          ]
        }
      ]
    }
  },
  methods: {
    getStatusClass(status) {
      switch(status) {
        case 'Active':
          return 'bg-green-100 text-green-800'
        case 'Inactive':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },
    getDocumentStatusClass(status) {
      switch(status) {
        case 'Complete':
        case 'Verified':
          return 'bg-green-100 text-green-800'
        case 'Incomplete':
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800'
        case 'Expired':
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
    toggleDriverStatus(driver) {
      if (driver.status === 'Active') {
        driver.status = 'Inactive'
        this.stats.activeDrivers--
      } else {
        driver.status = 'Active'
        this.stats.activeDrivers++
      }
    }
  }
}
</script>
