<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900">Welcome back, {{ driverName }}!</h1>
      <p class="text-gray-600 mt-1">Here's your delivery overview for today</p>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Deliveries</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalDeliveries }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Completed</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.completed }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">In Progress</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.inProgress }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Earnings</p>
            <p class="text-2xl font-bold text-gray-900">₱{{ stats.totalEarnings.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link
          to="/driver/available-bookings"
          class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
        >
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="font-medium text-gray-900">Find Bookings</p>
            <p class="text-sm text-gray-600">Browse available deliveries</p>
          </div>
        </router-link>

        <router-link
          to="/driver/my-assignments"
          class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
        >
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="font-medium text-gray-900">My Assignments</p>
            <p class="text-sm text-gray-600">Manage current deliveries</p>
          </div>
        </router-link>

        <router-link
          to="/driver/upload-proof"
          class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
        >
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="font-medium text-gray-900">Upload Proof</p>
            <p class="text-sm text-gray-600">Submit delivery evidence</p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Recent Assignments -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Assignments</h2>
      <div v-if="recentAssignments.length === 0" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="mt-2 text-sm text-gray-600">No recent assignments</p>
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="assignment in recentAssignments"
          :key="assignment.id"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div class="flex items-center space-x-4">
            <div :class="[
              'w-3 h-3 rounded-full',
              assignment.status === 'completed' ? 'bg-green-500' :
              assignment.status === 'in_progress' ? 'bg-yellow-500' : 'bg-blue-500'
            ]"></div>
            <div>
              <p class="font-medium text-gray-900">Order #{{ assignment.id }}</p>
              <p class="text-sm text-gray-600">{{ assignment.service_type }} - ₱{{ assignment.total_fee }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900 capitalize">{{ assignment.status.replace('_', ' ') }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(assignment.created_at) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getCurrentDriver, getDriverStats, getDriverAssignments } from '@/lib/driver'

export default {
  name: 'DriverDashboard',
  setup() {
    const stats = ref({
      totalDeliveries: 0,
      completed: 0,
      inProgress: 0,
      totalEarnings: 0
    })
    const recentAssignments = ref([])
    const driverName = ref('')

    const loadDashboardData = async () => {
      try {
        // Load driver info
        const driver = getCurrentDriver()
        if (driver) {
          driverName.value = `${driver.first_name} ${driver.last_name}`
        }

        // Load stats
        const driverStats = await getDriverStats()
        stats.value = driverStats

        // Load recent assignments
        const assignments = await getDriverAssignments()
        recentAssignments.value = assignments.slice(0, 5) // Show only 5 recent

      } catch (error) {
        console.error('Error loading dashboard data:', error)
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    onMounted(() => {
      loadDashboardData()
    })

    return {
      stats,
      recentAssignments,
      driverName,
      formatDate
    }
  }
}
</script>
