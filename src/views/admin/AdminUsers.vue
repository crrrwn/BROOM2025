<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Users Management</h1>
        <p class="text-gray-600 mt-1">Manage all registered users</p>
      </div>
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
          <option value="restricted">Restricted</option>
        </select>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="7" class="px-6 py-12 text-center">
                <div class="flex justify-center items-center">
                  <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="ml-2 text-gray-600">Loading users...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredUsers.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                No users found
              </td>
            </tr>
            <tr v-else v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-semibold text-sm">
                      {{ user.first_name?.charAt(0) || 'U' }}
                    </span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.contact_number || user.contact || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  {{ user.house_street_address || user.address || 'N/A' }}
                </div>
                <div class="text-sm text-gray-500">{{ user.barangay || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(user.status)" 
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                  {{ getStatusText(user.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.total_bookings || 0 }} bookings</div>
                <div class="text-sm text-gray-500">{{ user.completed_bookings || 0 }} completed</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewUserHistory(user)"
                    class="text-blue-600 hover:text-blue-900"
                    title="View History"
                  >
                    History
                  </button>
                  <button
                    @click="viewUser(user)"
                    class="text-green-600 hover:text-green-900"
                    title="View Details"
                  >
                    View
                  </button>
                  <button
                    @click="toggleUserRestriction(user)"
                    :class="user.status === 'banned' ? 'text-green-600 hover:text-green-900' : 'text-red-600 hover:text-red-900'"
                    :title="user.status === 'banned' ? 'Unban User' : 'Ban User'"
                  >
                    {{ user.status === 'banned' ? 'Unban' : 'Ban' }}
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
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">User Details</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">First Name</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedUser.first_name || 'N/A' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Last Name</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedUser.last_name || 'N/A' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedUser.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Contact Number</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedUser.contact_number || selectedUser.contact || 'N/A' }}</p>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Address</label>
              <p class="mt-1 text-sm text-gray-900">
                {{ selectedUser.house_street_address || selectedUser.address || 'N/A' }}
                {{ selectedUser.barangay ? `, ${selectedUser.barangay}` : '' }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Account Status</label>
              <p class="mt-1 text-sm text-gray-900">{{ getStatusText(selectedUser.status) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Joined Date</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedUser.created_at) }}</p>
            </div>
          </div>

          <!-- User Restriction Controls -->
          <div class="border-t pt-4 mt-6">
            <h4 class="text-lg font-medium text-gray-900 mb-3">Account Management</h4>
            <div class="flex space-x-3">
              <button
                @click="restrictUser(selectedUser, 'banned')"
                :disabled="selectedUser.status === 'banned'"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ban User
              </button>
              <button
                @click="restrictUser(selectedUser, 'restricted')"
                :disabled="selectedUser.status === 'restricted'"
                class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Restrict User
              </button>
              <button
                @click="restrictUser(selectedUser, 'active')"
                :disabled="selectedUser.status === 'active'"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Activate User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- User History Modal -->
    <div v-if="showHistoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeHistoryModal">
      <div class="bg-white rounded-xl p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">
            User History - {{ historyUser?.first_name }} {{ historyUser?.last_name }}
          </h3>
          <button @click="closeHistoryModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- History Tabs -->
        <div class="border-b border-gray-200 mb-6">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="activeHistoryTab = 'bookings'"
              :class="activeHistoryTab === 'bookings' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
            >
              Bookings ({{ userBookings.length }})
            </button>
            <button
              @click="activeHistoryTab = 'feedback'"
              :class="activeHistoryTab === 'feedback' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
            >
              Feedback ({{ userFeedback.length }})
            </button>
            <button
              @click="activeHistoryTab = 'chats'"
              :class="activeHistoryTab === 'chats' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
            >
              Chat Logs ({{ userChatLogs.length }})
            </button>
          </nav>
        </div>

        <!-- Bookings Tab -->
        <div v-if="activeHistoryTab === 'bookings'" class="space-y-4">
          <div v-if="userBookings.length === 0" class="text-center py-8 text-gray-500">
            No bookings found for this user
          </div>
          <div v-else class="space-y-3">
            <div v-for="booking in userBookings" :key="booking.id" class="bg-gray-50 rounded-lg p-4">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <span class="font-medium text-gray-900">{{ booking.service_name }}</span>
                    <span :class="getBookingStatusClass(booking.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                      {{ booking.status }}
                    </span>
                  </div>
                  <div class="text-sm text-gray-600 space-y-1">
                    <p><strong>Date:</strong> {{ formatDate(booking.created_at) }}</p>
                    <p><strong>Address:</strong> {{ booking.pickup_address }}</p>
                    <p><strong>Driver:</strong> {{ booking.driver_name || 'Not assigned' }}</p>
                    <p><strong>Total:</strong> ₱{{ booking.total_amount }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feedback Tab -->
        <div v-if="activeHistoryTab === 'feedback'" class="space-y-4">
          <div v-if="userFeedback.length === 0" class="text-center py-8 text-gray-500">
            No feedback found for this user
          </div>
          <div v-else class="space-y-3">
            <div v-for="feedback in userFeedback" :key="feedback.id" class="bg-gray-50 rounded-lg p-4">
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center space-x-2">
                  <span class="font-medium text-gray-900">{{ feedback.service_name }}</span>
                  <div class="flex items-center">
                    <span v-for="n in 5" :key="n" class="text-yellow-400">
                      {{ n <= feedback.rating ? '★' : '☆' }}
                    </span>
                    <span class="ml-1 text-sm text-gray-600">({{ feedback.rating }}/5)</span>
                  </div>
                </div>
                <span class="text-sm text-gray-500">{{ formatDate(feedback.created_at) }}</span>
              </div>
              <p class="text-gray-700 text-sm">{{ feedback.comment }}</p>
              <p class="text-xs text-gray-500 mt-2">Driver: {{ feedback.driver_name }}</p>
            </div>
          </div>
        </div>

        <!-- Chat Logs Tab -->
        <div v-if="activeHistoryTab === 'chats'" class="space-y-4">
          <div v-if="userChatLogs.length === 0" class="text-center py-8 text-gray-500">
            No chat logs found for this user
          </div>
          <div v-else class="space-y-3">
            <div v-for="chatLog in userChatLogs" :key="chatLog.id" class="bg-gray-50 rounded-lg p-4">
              <div class="flex justify-between items-center mb-3">
                <h4 class="font-medium text-gray-900">Order #{{ chatLog.order_id }}</h4>
                <span class="text-sm text-gray-500">{{ formatDate(chatLog.created_at) }}</span>
              </div>
              <div class="space-y-2 max-h-40 overflow-y-auto">
                <div v-for="message in chatLog.messages" :key="message.id" 
                     :class="message.sender_type === 'customer' ? 'text-right' : 'text-left'">
                  <div :class="message.sender_type === 'customer' ? 'bg-blue-100 ml-8' : 'bg-white mr-8'" 
                       class="inline-block px-3 py-2 rounded-lg text-sm">
                    <p class="text-gray-800">{{ message.message }}</p>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ message.sender_type === 'customer' ? 'Customer' : 'Driver' }} - {{ formatTime(message.timestamp) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllUsers, updateUserStatus } from '@/lib/admin'

export default {
  name: 'AdminUsers',
  data() {
    return {
      users: [],
      loading: true,
      searchQuery: '',
      statusFilter: '',
      selectedUser: null,
      showHistoryModal: false,
      historyUser: null,
      activeHistoryTab: 'bookings',
      userBookings: [],
      userFeedback: [],
      userChatLogs: []
    }
  },
  computed: {
    filteredUsers() {
      let filtered = this.users
      
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
      
      // Status filter
      if (this.statusFilter) {
        filtered = filtered.filter(user => user.status === this.statusFilter)
      }
      
      return filtered
    }
  },
  methods: {
    async loadUsers() {
      try {
        this.loading = true
        const { data, error } = await getAllUsers()
        
        if (error) {
          console.error('Error loading users:', error)
        } else {
          // Add mock data for demonstration
          this.users = (data || []).map(user => ({
            ...user,
            status: user.status || 'active',
            total_bookings: Math.floor(Math.random() * 50) + 1,
            completed_bookings: Math.floor(Math.random() * 40) + 1
          }))
        }
      } catch (error) {
        console.error('Error loading users:', error)
      } finally {
        this.loading = false
      }
    },
    async toggleUserRestriction(user) {
      const newStatus = user.status === 'banned' ? 'active' : 'banned'
      await this.restrictUser(user, newStatus)
    },
    async restrictUser(user, newStatus) {
      try {
        const updates = { status: newStatus }
        const { error } = await updateUserStatus(user.id, updates)
        
        if (error) {
          console.error('Error updating user status:', error)
        } else {
          // Update local data
          const userIndex = this.users.findIndex(u => u.id === user.id)
          if (userIndex !== -1) {
            this.users[userIndex].status = newStatus
          }
          if (this.selectedUser && this.selectedUser.id === user.id) {
            this.selectedUser.status = newStatus
          }
        }
      } catch (error) {
        console.error('Error updating user status:', error)
      }
    },
    async viewUserHistory(user) {
      this.historyUser = user
      this.showHistoryModal = true
      this.activeHistoryTab = 'bookings'
      
      // Load user history data (mock data for demonstration)
      this.loadUserBookings(user.id)
      this.loadUserFeedback(user.id)
      this.loadUserChatLogs(user.id)
    },
    loadUserBookings(userId) {
      // Mock booking data
      this.userBookings = [
        {
          id: 1,
          service_name: 'House Cleaning',
          status: 'completed',
          created_at: '2024-01-15T10:00:00Z',
          pickup_address: '123 Main St, Barangay 1',
          driver_name: 'Juan Dela Cruz',
          total_amount: 500
        },
        {
          id: 2,
          service_name: 'Laundry Service',
          status: 'in_progress',
          created_at: '2024-01-20T14:30:00Z',
          pickup_address: '456 Oak Ave, Barangay 2',
          driver_name: 'Maria Santos',
          total_amount: 300
        }
      ]
    },
    loadUserFeedback(userId) {
      // Mock feedback data
      this.userFeedback = [
        {
          id: 1,
          service_name: 'House Cleaning',
          rating: 5,
          comment: 'Excellent service! Very thorough and professional.',
          driver_name: 'Juan Dela Cruz',
          created_at: '2024-01-16T10:00:00Z'
        },
        {
          id: 2,
          service_name: 'Laundry Service',
          rating: 4,
          comment: 'Good service, but could be faster.',
          driver_name: 'Maria Santos',
          created_at: '2024-01-21T15:00:00Z'
        }
      ]
    },
    loadUserChatLogs(userId) {
      // Mock chat logs data
      this.userChatLogs = [
        {
          id: 1,
          order_id: 'ORD-001',
          created_at: '2024-01-15T10:00:00Z',
          messages: [
            {
              id: 1,
              message: 'Hello, I\'m on my way to your location.',
              sender_type: 'driver',
              timestamp: '2024-01-15T10:05:00Z'
            },
            {
              id: 2,
              message: 'Thank you! I\'ll be waiting.',
              sender_type: 'customer',
              timestamp: '2024-01-15T10:06:00Z'
            },
            {
              id: 3,
              message: 'I\'ve arrived at your location.',
              sender_type: 'driver',
              timestamp: '2024-01-15T10:15:00Z'
            }
          ]
        }
      ]
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
      this.userBookings = []
      this.userFeedback = []
      this.userChatLogs = []
    },
    getStatusText(status) {
      const statusMap = {
        'active': 'Active',
        'banned': 'Banned',
        'restricted': 'Restricted',
        'inactive': 'Inactive'
      }
      return statusMap[status] || 'Active'
    },
    getStatusBadgeClass(status) {
      const classMap = {
        'active': 'bg-green-100 text-green-800',
        'banned': 'bg-red-100 text-red-800',
        'restricted': 'bg-yellow-100 text-yellow-800',
        'inactive': 'bg-gray-100 text-gray-800'
      }
      return classMap[status] || 'bg-green-100 text-green-800'
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
  },
  mounted() {
    this.loadUsers()
  }
}
</script>
