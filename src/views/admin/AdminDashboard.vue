<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p class="text-gray-600">Welcome to the QuickServe admin panel</p>
      </div>
      <div class="text-sm text-gray-500">
        {{ new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }) }}
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <!-- Total Users -->
      <router-link 
        :to="{ name: 'AdminUsers' }"
        class="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
      >
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Users</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
          </div>
        </div>
      </router-link>

      <!-- Total Orders -->
      <router-link 
        :to="{ name: 'AdminOrders' }"
        class="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
      >
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalOrders }}</p>
          </div>
        </div>
      </router-link>

      <!-- Total Services -->
      <router-link 
        :to="{ name: 'AdminServices' }"
        class="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
      >
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Services</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalServices }}</p>
          </div>
        </div>
      </router-link>

      <!-- Total Revenue -->
      <router-link 
        :to="{ name: 'AdminPayments' }"
        class="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
      >
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Revenue</p>
            <p class="text-2xl font-bold text-gray-900">₱{{ formatCurrency(stats.totalRevenue) }}</p>
          </div>
        </div>
      </router-link>

      <!-- Online Drivers -->
      <router-link 
        :to="{ name: 'AdminDrivers' }"
        class="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
      >
        <div class="flex items-center">
          <div class="p-2 bg-orange-100 rounded-lg">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Online Drivers</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.onlineDrivers }}</p>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link 
          :to="{ name: 'AdminUsers' }"
          class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
        >
          <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
          <div>
            <h3 class="font-medium text-gray-900">Manage Users</h3>
            <p class="text-sm text-gray-600">View and manage user accounts</p>
          </div>
        </router-link>

        <router-link 
          :to="{ name: 'AdminOrders' }"
          class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 cursor-pointer"
        >
          <svg class="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <div>
            <h3 class="font-medium text-gray-900">Manage Orders</h3>
            <p class="text-sm text-gray-600">Track and update order status</p>
          </div>
        </router-link>

        <router-link 
          :to="{ name: 'AdminServices' }"
          class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 cursor-pointer"
        >
          <svg class="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
          <div>
            <h3 class="font-medium text-gray-900">Manage Services</h3>
            <p class="text-sm text-gray-600">Add and edit service offerings</p>
          </div>
        </router-link>

        <router-link 
          :to="{ name: 'AdminPayments' }"
          class="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors duration-200 cursor-pointer"
        >
          <svg class="w-8 h-8 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
          <div>
            <h3 class="font-medium text-gray-900">Manage Payments</h3>
            <p class="text-sm text-gray-600">Review payment proofs and transactions</p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Order Status Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Order Status Chart -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Order Status Overview</h2>
          <router-link 
            :to="{ name: 'AdminOrders' }"
            class="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Manage Orders →
          </router-link>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
              <span class="text-sm text-gray-600">Pending</span>
            </div>
            <span class="text-sm font-medium text-gray-900">{{ orderStats.pending }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
              <span class="text-sm text-gray-600">Confirmed</span>
            </div>
            <span class="text-sm font-medium text-gray-900">{{ orderStats.confirmed }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
              <span class="text-sm text-gray-600">In Progress</span>
            </div>
            <span class="text-sm font-medium text-gray-900">{{ orderStats.in_progress }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
              <span class="text-sm text-gray-600">Completed</span>
            </div>
            <span class="text-sm font-medium text-gray-900">{{ orderStats.completed }}</span>
          </div>
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <router-link 
            :to="{ name: 'AdminOrders' }"
            class="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            View All →
          </router-link>
        </div>
        <div class="space-y-3">
          <div v-if="loading" class="space-y-3">
            <div v-for="n in 5" :key="n" class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div class="flex-1">
                <div class="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div class="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          </div>
          <div v-else-if="recentOrders.length === 0" class="text-center py-8">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <p class="text-gray-500">No recent orders</p>
          </div>
          <div v-else v-for="order in recentOrders" :key="order.id" class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600 font-semibold text-sm">{{ getInitials(order.users) }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ getUserName(order.users) }}
              </p>
              <p class="text-sm text-gray-500 truncate">
                {{ getServiceName(order.services) }} - ₱{{ formatCurrency(order.total_amount) }}
              </p>
            </div>
            <span :class="getStatusClass(order.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
              {{ order.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllUsers, getAllOrders, getAllServices, getAllPayments } from '@/lib/admin'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      loading: true,
      stats: {
        totalUsers: 0,
        totalOrders: 0,
        totalServices: 0,
        totalRevenue: 0,
        onlineDrivers: 0
      },
      orderStats: {
        pending: 0,
        confirmed: 0,
        in_progress: 0,
        completed: 0
      },
      recentOrders: []
    }
  },
  created() {
    this.loadDashboardData()
  },
  methods: {
    async loadDashboardData() {
      this.loading = true
      try {
        // Load all data in parallel
        const [usersResult, ordersResult, servicesResult, paymentsResult] = await Promise.all([
          getAllUsers(),
          getAllOrders(),
          getAllServices(),
          getAllPayments()
        ])

        // Process users
        if (usersResult.data && !usersResult.error) {
          this.stats.totalUsers = usersResult.data.length
        }

        // Process orders
        if (ordersResult.data && !ordersResult.error) {
          const orders = ordersResult.data
          this.stats.totalOrders = orders.length
          
          // Calculate order stats
          this.orderStats = {
            pending: orders.filter(o => o.status === 'pending').length,
            confirmed: orders.filter(o => o.status === 'confirmed').length,
            in_progress: orders.filter(o => o.status === 'in_progress').length,
            completed: orders.filter(o => o.status === 'completed').length
          }

          // Get recent orders (last 5)
          this.recentOrders = orders
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5)

          // Calculate total revenue
          this.stats.totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
        }

        // Process services
        if (servicesResult.data && !servicesResult.error) {
          this.stats.totalServices = servicesResult.data.length
        }

        // Process drivers (simulate online drivers count for now)
        // You can replace this with actual driver data from your database
        this.stats.onlineDrivers = Math.floor(Math.random() * 15) + 5 // Random number between 5-20 for demo

      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        this.loading = false
      }
    },
    getStatusClass(status) {
      const classes = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'confirmed': 'bg-blue-100 text-blue-800',
        'in_progress': 'bg-purple-100 text-purple-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    getInitials(user) {
      if (!user) return 'U'
      const firstName = user.first_name || ''
      const lastName = user.last_name || ''
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U'
    },
    getUserName(user) {
      if (!user) return 'Unknown User'
      return `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown User'
    },
    getServiceName(service) {
      return service?.name || 'Unknown Service'
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount || 0)
    }
  }
}
</script>
