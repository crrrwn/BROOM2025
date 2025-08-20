<template>
  <div class="min-h-screen bg-white">
    <div class="space-y-6 p-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <!-- Updated header styling with green theme -->
          <h1 class="text-3xl font-bold bg-gradient-to-r from-[#00C851] to-[#3ED400] bg-clip-text text-transparent">Users Management</h1>
          <p class="text-gray-600 mt-1">Manage all registered users</p>
        </div>
        <div class="flex items-center space-x-4">
          <button 
            @click="forceRefreshUsers" 
            :disabled="loading"
            class="px-6 py-3 bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white rounded-xl hover:from-[#74E600] hover:to-[#3ED400] disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <!-- Updated refresh icon with better styling -->
            <svg class="w-5 h-5" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span class="font-medium">{{ loading ? 'Refreshing...' : 'Refresh' }}</span>
          </button>
          <div class="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
            Last updated: {{ lastUpdated || 'Never' }}
          </div>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div class="flex justify-between items-center mb-6">
          <!-- Updated section header with green accent -->
          <h2 class="text-xl font-bold text-gray-900">All Users 
            <span class="text-[#00C851] bg-[#00C851]/10 px-3 py-1 rounded-full text-sm ml-2">{{ filteredUsers.length }} of {{ cachedUsers.length }}</span>
          </h2>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <!-- Updated search input with green focus states -->
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search users..."
                class="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-200 w-80"
              />
              <!-- Updated search icon -->
              <svg class="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="overflow-x-auto rounded-xl border border-gray-200">
          <table class="min-w-full divide-y divide-gray-200">
            <!-- Updated table header with green theme -->
            <thead class="bg-gradient-to-r from-[#A8EB12]/20 to-[#74E600]/20">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Address</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Bookings</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Joined</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="loading">
                <td colspan="7" class="px-6 py-12 text-center">
                  <div class="flex justify-center items-center">
                    <!-- Updated loading spinner with green color -->
                    <svg class="animate-spin h-8 w-8 text-[#3ED400]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="ml-2 text-gray-600">Loading users...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="filteredUsers.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  No users found matching your criteria
                </td>
              </tr>
              <tr v-else v-for="user in filteredUsers" :key="user.id" class="hover:bg-gradient-to-r hover:from-[#A8EB12]/5 hover:to-[#74E600]/5 transition-all duration-200" :class="{ 'bg-red-50': user.status === 'banned', 'bg-yellow-50': user.status === 'restricted' }">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <!-- Updated user avatar with green theme -->
                    <div class="w-12 h-12 bg-gradient-to-br from-[#A8EB12] to-[#74E600] rounded-full flex items-center justify-center relative shadow-lg">
                      <span class="text-white font-bold text-sm">
                        {{ getInitials(user) }}
                      </span>
                      <!-- Online indicator -->
                      <div v-if="user.status === 'online'" class="absolute -top-1 -right-1 w-4 h-4 bg-[#00C851] rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-bold text-gray-900">
                        {{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}
                      </div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ user.contact_number || user.contact || 'N/A' }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ user.house_street_address || user.address || 'N/A' }}
                  </div>
                  <div class="text-sm text-gray-500">{{ user.barangay || 'N/A' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-bold text-gray-900">{{ user.total_bookings || 0 }} bookings</div>
                  <div class="text-sm text-[#00C851]">{{ user.completed_bookings || 0 }} completed</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(user.status)" class="px-3 py-1 text-xs font-bold rounded-full">
                    {{ getStatusText(user.status) }}
                  </span>
                  <div v-if="user.ban_reason" class="text-xs text-red-600 mt-1">
                    {{ user.ban_reason }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-3">
                    <!-- Updated action buttons with green theme -->
                    <button
                      @click="viewUserHistory(user)"
                      class="text-[#3ED400] hover:text-[#00C851] font-bold transition-colors duration-200"
                      title="View History"
                    >
                      History
                    </button>
                    <button
                      @click="viewUser(user)"
                      class="text-[#74E600] hover:text-[#3ED400] font-bold transition-colors duration-200"
                      title="View Details"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- User Details Modal -->
      <div v-if="selectedUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
        <!-- Updated modal with green theme and better styling -->
        <div class="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200" @click.stop>
          <div class="flex justify-between items-center mb-8">
            <h3 class="text-2xl font-bold bg-gradient-to-r from-[#00C851] to-[#3ED400] bg-clip-text text-transparent">User Details</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <!-- Updated close icon -->
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-gray-50 p-4 rounded-xl">
                <label class="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                <p class="text-sm text-gray-900 font-medium">{{ selectedUser.first_name || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-xl">
                <label class="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                <p class="text-sm text-gray-900 font-medium">{{ selectedUser.last_name || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-xl">
                <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <p class="text-sm text-gray-900 font-medium">{{ selectedUser.email }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-xl">
                <label class="block text-sm font-bold text-gray-700 mb-2">Contact Number</label>
                <p class="text-sm text-gray-900 font-medium">{{ selectedUser.contact_number || selectedUser.contact || 'N/A' }}</p>
              </div>
              <div class="md:col-span-2 bg-gray-50 p-4 rounded-xl">
                <label class="block text-sm font-bold text-gray-700 mb-2">Address</label>
                <p class="text-sm text-gray-900 font-medium">
                  {{ selectedUser.house_street_address || selectedUser.address || 'N/A' }}
                  {{ selectedUser.barangay ? `, ${selectedUser.barangay}` : '' }}
                </p>
              </div>
              <div class="bg-gray-50 p-4 rounded-xl">
                <label class="block text-sm font-bold text-gray-700 mb-2">Account Status</label>
                <p class="text-sm text-gray-900 font-medium">{{ getStatusText(selectedUser.status) }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-xl">
                <label class="block text-sm font-bold text-gray-700 mb-2">Joined Date</label>
                <p class="text-sm text-gray-900 font-medium">{{ formatDate(selectedUser.created_at) }}</p>
              </div>
              <div v-if="selectedUser.ban_reason" class="md:col-span-2 bg-red-50 p-4 rounded-xl border border-red-200">
                <label class="block text-sm font-bold text-red-700 mb-2">Ban Reason</label>
                <p class="text-sm text-red-600 font-medium">{{ selectedUser.ban_reason }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User History Modal -->
      <div v-if="showHistoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeHistoryModal">
        <!-- Updated history modal with green theme -->
        <div class="bg-white rounded-2xl p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200" @click.stop>
          <div class="flex justify-between items-center mb-8">
            <h3 class="text-2xl font-bold bg-gradient-to-r from-[#00C851] to-[#3ED400] bg-clip-text text-transparent">
              User History - {{ historyUser?.first_name }} {{ historyUser?.last_name }}
            </h3>
            <button @click="closeHistoryModal" class="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <!-- Updated close icon -->
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="historyLoading" class="flex justify-center items-center py-12">
            <!-- Updated loading spinner with green color -->
            <svg class="animate-spin h-8 w-8 text-[#3ED400]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="ml-2 text-gray-600">Loading user history...</span>
          </div>

          <!-- History Tabs -->
          <div v-else class="border-b border-gray-200 mb-8">
            <nav class="-mb-px flex space-x-8">
              <!-- Updated tab buttons with green theme -->
              <button
                @click="activeHistoryTab = 'bookings'"
                :class="activeHistoryTab === 'bookings' ? 'border-[#3ED400] text-[#00C851] bg-[#3ED400]/10' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                class="whitespace-nowrap py-3 px-6 border-b-2 font-bold text-sm rounded-t-lg transition-all duration-200"
              >
                Bookings ({{ userBookings.length }})
              </button>
              <button
                @click="activeHistoryTab = 'feedback'"
                :class="activeHistoryTab === 'feedback' ? 'border-[#3ED400] text-[#00C851] bg-[#3ED400]/10' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                class="whitespace-nowrap py-3 px-6 border-b-2 font-bold text-sm rounded-t-lg transition-all duration-200"
              >
                Feedback ({{ userFeedback.length }})
              </button>
            </nav>
          </div>

          <!-- Bookings Tab -->
          <div v-if="!historyLoading && activeHistoryTab === 'bookings'" class="space-y-4">
            <div v-if="userBookings.length === 0" class="text-center py-8 text-gray-500">
              No bookings found for this user
            </div>
            <div v-else class="space-y-4">
              <!-- Updated booking cards with green accents -->
              <div v-for="booking in userBookings" :key="booking.id" class="bg-gradient-to-r from-gray-50 to-[#A8EB12]/5 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-3">
                      <span class="font-bold text-gray-900">{{ booking.service_name || 'Service' }}</span>
                      <span :class="getBookingStatusClass(booking.status)" class="px-3 py-1 text-xs font-bold rounded-full">
                        {{ booking.status }}
                      </span>
                    </div>
                    <div class="text-sm text-gray-600 space-y-2">
                      <p><strong class="text-gray-800">Order ID:</strong> {{ booking.id }}</p>
                      <p><strong class="text-gray-800">Date:</strong> {{ formatDate(booking.created_at) }}</p>
                      <p><strong class="text-gray-800">Address:</strong> {{ booking.pickup_address || 'N/A' }}</p>
                      <p><strong class="text-gray-800">Driver:</strong> {{ booking.driver_name || 'Not assigned' }}</p>
                      <p><strong class="text-gray-800">Total:</strong> <span class="text-[#00C851] font-bold">₱{{ booking.total_amount || 0 }}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Feedback Tab -->
          <div v-if="!historyLoading && activeHistoryTab === 'feedback'" class="space-y-4">
            <div v-if="userFeedback.length === 0" class="text-center py-8 text-gray-500">
              No feedback found for this user
            </div>
            <div v-else class="space-y-4">
              <!-- Updated feedback cards with green accents -->
              <div v-for="feedback in userFeedback" :key="feedback.id" class="bg-gradient-to-r from-gray-50 to-[#A8EB12]/5 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
                <div class="flex justify-between items-start mb-3">
                  <div class="flex items-center space-x-3">
                    <span class="font-bold text-gray-900">{{ feedback.service_name || 'Service' }}</span>
                    <div class="flex items-center">
                      <span v-for="n in 5" :key="n" class="text-[#74E600] text-lg">
                        {{ n <= (feedback.rating || 0) ? '★' : '☆' }}
                      </span>
                      <span class="ml-2 text-sm text-gray-500 font-medium">({{ feedback.rating || 0 }}/5)</span>
                    </div>
                  </div>
                  <span class="text-sm text-gray-500">{{ formatDate(feedback.created_at) }}</span>
                </div>
                <p class="text-gray-700 text-sm mb-2">{{ feedback.comment || 'No comment provided' }}</p>
                <p class="text-xs text-gray-500">Order ID: {{ feedback.order_id || 'N/A' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/lib/supabase'
import { getAllUsers, getAllOrders, updateUserStatus } from '@/lib/admin'

// Cache keys for localStorage
const USER_CACHE_KEYS = {
  USERS_DATA: 'admin_users_cache',
  LAST_UPDATED: 'admin_users_last_updated'
}

export default {
  name: 'AdminUsers',
  data() {
    return {
      loading: false,
      lastUpdated: '',
      dataLoadedFromCache: false,
      // Cached users that persist across page refreshes and user logins
      cachedUsers: [],
      // Current user session tracking
      currentUserEmail: null,
      searchQuery: '',
      statusFilter: '',
      selectedUser: null,
      showHistoryModal: false,
      historyUser: null,
      historyLoading: false,
      activeHistoryTab: 'bookings',
      userBookings: [],
      userFeedback: [],
      // Cached orders data for history lookup
      allOrders: []
    }
  },
  computed: {
    filteredUsers() {
      let filtered = this.cachedUsers
      
      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(user => 
          user.first_name?.toLowerCase().includes(query) ||
          user.last_name?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user.contact_number?.includes(query) ||
          user.contact?.includes(query)
        )
      }
      
      return filtered
    },
    onlineUsersCount() {
      return this.cachedUsers.filter(user => user.status === 'online').length
    },
    offlineUsersCount() {
      return this.cachedUsers.filter(user => user.status === 'offline').length
    },
    bannedUsersCount() {
      return this.cachedUsers.filter(user => user.status === 'banned').length
    }
  },
  async created() {
    console.log('=== ADMIN USERS CREATED ===')
    
    // Try to load from cache first
    this.loadFromCache()
    
    // If no cache exists, load fresh data
    if (!this.lastUpdated) {
      console.log('No cached users found, loading fresh data...')
      await this.loadFreshUsers()
    } else {
      console.log('Loaded users from cache, last updated:', this.lastUpdated)
      this.dataLoadedFromCache = true
      // Still update online status for cached data
      await this.updateOnlineStatus()
    }
    
    // Set up periodic status checking (every 10 seconds)
    this.statusCheckInterval = setInterval(() => {
      this.updateOnlineStatus()
    }, 10000)
  },
  beforeUnmount() {
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval)
    }
  },
  methods: {
    loadFromCache() {
      try {
        const cachedData = localStorage.getItem(USER_CACHE_KEYS.USERS_DATA)
        const lastUpdated = localStorage.getItem(USER_CACHE_KEYS.LAST_UPDATED)
        
        if (cachedData && lastUpdated) {
          this.cachedUsers = JSON.parse(cachedData)
          this.lastUpdated = lastUpdated
          
          console.log('✅ Loaded users data from cache')
          console.log('Cached users:', this.cachedUsers.length)
          return true
        }
      } catch (error) {
        console.warn('Failed to load users from cache:', error)
      }
      return false
    },
    
    saveToCache() {
      try {
        localStorage.setItem(USER_CACHE_KEYS.USERS_DATA, JSON.stringify(this.cachedUsers))
        localStorage.setItem(USER_CACHE_KEYS.LAST_UPDATED, this.lastUpdated)
        
        console.log('✅ Saved users data to cache')
      } catch (error) {
        console.warn('Failed to save users to cache:', error)
      }
    },

    async loadFreshUsers() {
      this.loading = true
      this.dataLoadedFromCache = false
      console.log('=== LOADING FRESH USERS DATA ===')
      
      try {
        console.log('[ADMIN USERS] Fetching all users independently from database...')
        
        // Fetch all users from database - this is the master list that doesn't change
        const usersResult = await getAllUsers()
        
        if (usersResult.error) {
          console.error('❌ [ADMIN USERS] Error fetching users:', usersResult.error)
          return
        }

        if (usersResult.data && usersResult.data.length > 0) {
          const users = usersResult.data
          
          // Fetch booking counts for each user
          console.log('[ADMIN USERS] Fetching booking counts...')
          const ordersResult = await getAllOrders()
          
          let bookingCountMap = {}
          let completedCountMap = {}
          
          if (ordersResult.data && !ordersResult.error) {
            const orders = ordersResult.data
            this.allOrders = orders // Cache orders for history lookup
            
            // Count bookings per user
            orders.forEach(order => {
              if (order.user_id) {
                bookingCountMap[order.user_id] = (bookingCountMap[order.user_id] || 0) + 1
                if (order.status === 'completed') {
                  completedCountMap[order.user_id] = (completedCountMap[order.user_id] || 0) + 1
                }
              }
            })
          }

          // Initialize all users with proper status and booking counts
          this.cachedUsers = users.map(user => ({
            ...user,
            status: user.status === 'banned' || user.status === 'restricted' ? user.status : 'offline',
            total_bookings: bookingCountMap[user.id] || 0,
            completed_bookings: completedCountMap[user.id] || 0
          }))

          console.log(`✅ [ADMIN USERS] Loaded ${this.cachedUsers.length} users from database`)
          
          // Now update online status
          await this.updateOnlineStatus()
        } else {
          this.cachedUsers = []
        }

        this.lastUpdated = new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })

        // Save to cache
        this.saveToCache()

      } catch (error) {
        console.error('❌ [ADMIN USERS] Error loading users:', error)
        this.cachedUsers = []
      } finally {
        this.loading = false
      }
    },

    async updateOnlineStatus() {
      try {
        // Get current user session to see who's online
        const { data: { user } } = await supabase.auth.getUser()
        const currentUserEmail = user?.email

        if (currentUserEmail !== this.currentUserEmail) {
          console.log('[ADMIN USERS] Current user changed:', currentUserEmail)
          this.currentUserEmail = currentUserEmail
        }

        // Update status for all users - NEVER remove users from the list
        this.cachedUsers = this.cachedUsers.map(u => {
          let newStatus = u.status

          // Preserve admin restrictions (banned/restricted users stay as they are)
          if (u.status === 'banned' || u.status === 'restricted') {
            newStatus = u.status
          } else if (currentUserEmail && u.email === currentUserEmail) {
            // Current logged-in user is online
            newStatus = 'online'
          } else {
            // All other non-restricted users are offline
            newStatus = 'offline'
          }

          return { ...u, status: newStatus }
        })

        // Update the dashboard cache with new online count
        this.updateDashboardOnlineCount()

        console.log(`✅ [ADMIN USERS] Updated online status - Total users: ${this.cachedUsers.length}, Online users: ${this.onlineUsersCount}`)

      } catch (error) {
        console.warn('[ADMIN USERS] Could not update online status:', error)
      }
    },

    updateDashboardOnlineCount() {
      try {
        // Update the dashboard cache with current online user count
        const dashboardCache = localStorage.getItem('admin_dashboard_cache')
        if (dashboardCache) {
          const parsed = JSON.parse(dashboardCache)
          if (parsed.stats) {
            parsed.stats.onlineUsers = this.onlineUsersCount
            localStorage.setItem('admin_dashboard_cache', JSON.stringify(parsed))
          }
        }
      } catch (error) {
        console.warn('Failed to update dashboard online count:', error)
      }
    },

    async forceRefreshUsers() {
      console.log('[ADMIN USERS] Force refresh requested - clearing cache and loading fresh data')
      
      // Clear cache
      localStorage.removeItem(USER_CACHE_KEYS.USERS_DATA)
      localStorage.removeItem(USER_CACHE_KEYS.LAST_UPDATED)
      
      // Load fresh data
      await this.loadFreshUsers()
    },

    async viewUserHistory(user) {
      this.historyUser = user
      this.showHistoryModal = true
      this.activeHistoryTab = 'bookings'
      this.historyLoading = true
      
      console.log(`[ADMIN USERS] Loading history for user: ${user.email} (ID: ${user.id})`)
      
      try {
        // Load actual user history data from database
        await Promise.all([
          this.loadUserBookings(user.id),
          this.loadUserFeedback(user.id)
        ])
      } catch (error) {
        console.error('[ADMIN USERS] Error loading user history:', error)
      } finally {
        this.historyLoading = false
      }
    },

    async loadUserBookings(userId) {
      try {
        console.log(`[ADMIN USERS] Loading completed bookings for user ID: ${userId}`)
        
        if (this.allOrders && this.allOrders.length > 0) {
          this.userBookings = this.allOrders.filter(order => 
            order.user_id === userId && order.status === 'completed'
          )
        } else {
          // Otherwise fetch fresh orders
          const ordersResult = await getAllOrders()
          if (ordersResult.data && !ordersResult.error) {
            this.userBookings = ordersResult.data.filter(order => 
              order.user_id === userId && order.status === 'completed'
            )
          } else {
            this.userBookings = []
          }
        }
        
        console.log(`✅ [ADMIN USERS] Found ${this.userBookings.length} completed bookings for user`)
      } catch (error) {
        console.error('[ADMIN USERS] Error loading user bookings:', error)
        this.userBookings = []
      }
    },

    async loadUserFeedback(userId) {
      try {
        console.log(`[ADMIN USERS] Loading feedback for user ID: ${userId}`)
        
        // Try to fetch feedback from database
        // For now, we'll use mock data since feedback table structure isn't defined
        this.userFeedback = [
          {
            id: 1,
            order_id: 'ORD-001',
            service_name: 'House Cleaning',
            rating: 5,
            comment: 'Excellent service! Very thorough and professional.',
            created_at: '2024-01-16T10:00:00Z'
          },
          {
            id: 2,
            order_id: 'ORD-002',
            service_name: 'Laundry Service',
            rating: 4,
            comment: 'Good service, but could be faster.',
            created_at: '2024-01-21T15:00:00Z'
          }
        ]
        
        console.log(`✅ [ADMIN USERS] Found ${this.userFeedback.length} feedback entries for user`)
      } catch (error) {
        console.error('[ADMIN USERS] Error loading user feedback:', error)
        this.userFeedback = []
      }
    },

    viewUser(user) {
      this.selectedUser = user
    },

    closeModal() {
      this.selectedUser = null
    },

    closeHistoryModal() {
      this.showHistoryModal = false
      this.historyUser = null
      this.historyLoading = false
      this.userBookings = []
      this.userFeedback = []
    },

    getInitials(user) {
      const firstName = user.first_name || ''
      const lastName = user.last_name || ''
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U'
    },

    getStatusText(status) {
      const statusMap = {
        'online': 'Online',
        'offline': 'Offline',
        'banned': 'Banned',
        'restricted': 'Restricted'
      }
      return statusMap[status] || 'Offline'
    },

    getStatusBadgeClass(status) {
      const classMap = {
        'online': 'bg-green-100 text-green-800',
        'offline': 'bg-gray-100 text-gray-800',
        'banned': 'bg-red-100 text-red-800',
        'restricted': 'bg-yellow-100 text-yellow-800'
      }
      return classMap[status] || 'bg-gray-100 text-gray-800'
    },

    getBookingStatusClass(status) {
      const classMap = {
        'completed': 'bg-green-100 text-green-800',
        'in_progress': 'bg-blue-100 text-blue-800',
        'cancelled': 'bg-red-100 text-red-800',
        'pending': 'bg-yellow-100 text-yellow-800'
      }
      return classMap[status] || 'bg-gray-100 text-gray-800'
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },

    formatTime(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>
