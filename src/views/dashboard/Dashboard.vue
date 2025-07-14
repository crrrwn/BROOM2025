<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="bg-white rounded-2xl p-6 shadow-sm border">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Welcome back!
        </h1>
        <p class="text-gray-600">Manage your delivery services and track your orders</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <!-- Total Orders -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-2">Total Orders</p>
            <p class="text-3xl font-bold text-green-600">{{ stats.totalOrders }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Completed Orders -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-2">Completed</p>
            <p class="text-3xl font-bold text-blue-600">{{ stats.completedOrders }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- In Progress Orders -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-2">In Progress</p>
            <p class="text-3xl font-bold text-orange-600">{{ stats.inProgressOrders }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Spent -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-2">Total Spent</p>
            <p class="text-3xl font-bold text-purple-600">₱{{ stats.totalSpent.toLocaleString() }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mb-8">
      <div class="bg-white rounded-2xl p-6 shadow-sm border">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <router-link
            to="/book-service"
            class="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl transition-colors group"
          >
            <div class="flex items-center">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <span class="text-lg font-semibold">Book New Service</span>
            </div>
          </router-link>

          <router-link
            to="/my-orders"
            class="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl transition-colors group"
          >
            <div class="flex items-center">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <span class="text-lg font-semibold">View My Orders</span>
            </div>
          </router-link>

          <router-link
            to="/profile"
            class="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl transition-colors group sm:col-span-2 lg:col-span-1"
          >
            <div class="flex items-center">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <span class="text-lg font-semibold">Update Profile</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="bg-white rounded-2xl p-6 shadow-sm border">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Recent Orders</h2>
        <router-link
          to="/my-orders"
          class="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          View All
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </router-link>
      </div>

      <div v-if="loading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="animate-pulse">
          <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
            <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="recentOrders.length === 0" class="text-center py-12">
        <div class="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
        <p class="text-gray-600 mb-6">Start by booking your first delivery service</p>
        <router-link
          to="/book-service"
          class="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Book Your First Service
        </router-link>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="order in recentOrders"
          :key="order.id"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          @click="viewOrder(order.id)"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">{{ order.service_type }}</h3>
              <p class="text-sm text-gray-600">{{ formatDate(order.created_at) }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold text-gray-900">₱{{ order.total_amount }}</p>
            <span
              :class="{
                'bg-green-100 text-green-800': order.status === 'completed',
                'bg-orange-100 text-orange-800': order.status === 'in_progress',
                'bg-yellow-100 text-yellow-800': order.status === 'pending',
                'bg-red-100 text-red-800': order.status === 'cancelled'
              }"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize mt-1"
            >
              {{ order.status.replace('_', ' ') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'vue-router'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const loading = ref(true)
    const stats = ref({
      totalOrders: 0,
      completedOrders: 0,
      inProgressOrders: 0,
      totalSpent: 0
    })
    const recentOrders = ref([])

    const fetchDashboardData = async () => {
      try {
        loading.value = true
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) return

        // Fetch user's orders
        const { data: orders, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching orders:', error)
          return
        }

        // Calculate stats
        stats.value.totalOrders = orders.length
        stats.value.completedOrders = orders.filter(order => order.status === 'completed').length
        stats.value.inProgressOrders = orders.filter(order => order.status === 'in_progress').length
        stats.value.totalSpent = orders
          .filter(order => order.status === 'completed')
          .reduce((sum, order) => sum + (order.total_amount || 0), 0)

        // Get recent orders (last 5)
        recentOrders.value = orders.slice(0, 5)

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        loading.value = false
      }
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const viewOrder = (orderId) => {
      router.push(`/orders/${orderId}/tracking`)
    }

    onMounted(() => {
      fetchDashboardData()
    })

    return {
      loading,
      stats,
      recentOrders,
      formatDate,
      viewOrder
    }
  }
}
</script>
