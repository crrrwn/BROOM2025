<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Orders Management</h1>
        <p class="text-gray-600 mt-1">Manage all customer orders</p>
      </div>
      <div class="flex items-center space-x-4">
        <select
          v-model="statusFilter"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          v-model="paymentStatusFilter"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Payment Status</option>
          <option value="pending">Payment Pending</option>
          <option value="approved">Payment Approved</option>
          <option value="rejected">Payment Rejected</option>
        </select>
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search orders..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="9" class="px-6 py-12 text-center">
                <div class="flex justify-center items-center">
                  <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="ml-2 text-gray-600">Loading orders...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredOrders.length === 0">
              <td colspan="9" class="px-6 py-12 text-center text-gray-500">
                No orders found
              </td>
            </tr>
            <tr v-else v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#{{ order.id.slice(0, 8) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-semibold text-xs">
                      {{ order.users?.first_name?.charAt(0) || 'U' }}
                    </span>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">
                      {{ order.users?.first_name }} {{ order.users?.last_name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ order.users?.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ order.services?.name || 'N/A' }}</div>
                <div class="text-sm text-gray-500">{{ order.services?.category || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">₱{{ formatCurrency(order.total_amount) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getPaymentStatusClass(order.payment_status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                  {{ order.payment_status || 'pending' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select
                  :value="order.status"
                  @change="updateOrderStatus(order.id, $event.target.value)"
                  :class="getStatusSelectClass(order.status)"
                  class="text-xs font-medium rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="order.assigned_driver" class="text-sm text-gray-900">
                  {{ order.assigned_driver }}
                </div>
                <button
                  v-else
                  @click="openDriverAssignment(order)"
                  class="text-blue-600 hover:text-blue-900 text-sm"
                >
                  Assign Driver
                </button>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(order.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewOrder(order)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </button>
                  <button
                    @click="viewPaymentProofs(order)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Payment
                  </button>
                  <button
                    @click="viewChatLogs(order)"
                    class="text-purple-600 hover:text-purple-900"
                  >
                    Chat
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
      <div class="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">Order Details</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Order Information -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-gray-900">Order Information</h4>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700">Order ID</label>
                <p class="mt-1 text-sm text-gray-900">#{{ selectedOrder.id }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Service</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.services?.name || 'N/A' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Total Amount</label>
                <p class="mt-1 text-sm text-gray-900">₱{{ formatCurrency(selectedOrder.total_amount) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <span :class="getStatusClass(selectedOrder.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1">
                  {{ selectedOrder.status }}
                </span>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Created Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedOrder.created_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Customer Information -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-gray-900">Customer Information</h4>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ selectedOrder.users?.first_name }} {{ selectedOrder.users?.last_name }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.users?.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Contact Number</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.users?.contact_number || 'N/A' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Pickup Address</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.pickup_address || 'N/A' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Delivery Address</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.delivery_address || 'N/A' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Details -->
        <div class="mt-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-4">Additional Details</h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Scheduled Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedOrder.scheduled_date) || 'N/A' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Scheduled Time</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.scheduled_time || 'N/A' }}</p>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700">Special Instructions</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.special_instructions || 'None' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Proofs Modal -->
    <div v-if="showPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closePaymentModal">
      <div class="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">Payment Proofs & Reference Code</h3>
          <button @click="closePaymentModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <!-- Reference Code -->
          <div class="bg-blue-50 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Reference Code</h4>
            <p class="text-2xl font-mono font-bold text-blue-600">{{ paymentData.reference_code || 'No reference code provided' }}</p>
          </div>

          <!-- Payment Proof -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Payment Proof</h4>
            <div v-if="paymentData.payment_proof" class="border rounded-lg p-4">
              <img :src="paymentData.payment_proof" alt="Payment Proof" class="max-w-full h-auto rounded-lg shadow-lg">
            </div>
            <div v-else class="text-gray-500 text-center py-8">
              No payment proof uploaded
            </div>
          </div>

          <!-- Delivery Proof -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Delivery Proof</h4>
            <div v-if="paymentData.delivery_proof" class="border rounded-lg p-4">
              <img :src="paymentData.delivery_proof" alt="Delivery Proof" class="max-w-full h-auto rounded-lg shadow-lg">
            </div>
            <div v-else class="text-gray-500 text-center py-8">
              No delivery proof uploaded
            </div>
          </div>

          <!-- Payment Actions -->
          <div class="flex justify-end space-x-4 pt-4 border-t">
            <button
              @click="updatePaymentStatus('rejected')"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reject Payment
            </button>
            <button
              @click="updatePaymentStatus('approved')"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Approve Payment
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Driver Assignment Modal -->
    <div v-if="showDriverModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeDriverModal">
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">Assign Driver</h3>
          <button @click="closeDriverModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <!-- AI Suggested Drivers -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">AI Suggested Drivers (Based on Proximity & Availability)</h4>
            <div class="space-y-3">
              <div v-for="driver in suggestedDrivers" :key="driver.id" 
                   class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                   @click="assignDriver(driver.id, driver.name)">
                <div class="flex justify-between items-center">
                  <div>
                    <h5 class="font-semibold text-gray-900">{{ driver.name }}</h5>
                    <p class="text-sm text-gray-600">{{ driver.distance }} away • Rating: {{ driver.rating }}/5</p>
                    <p class="text-sm text-green-600">{{ driver.status }}</p>
                  </div>
                  <div class="text-right">
                    <span class="text-sm font-medium text-blue-600">{{ driver.completion_rate }}% completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Manual Driver Selection -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Manual Driver Selection</h4>
            <select v-model="selectedDriverId" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select a driver manually</option>
              <option v-for="driver in allDrivers" :key="driver.id" :value="driver.id">
                {{ driver.name }} - {{ driver.status }}
              </option>
            </select>
            <button
              v-if="selectedDriverId"
              @click="assignDriver(selectedDriverId, getDriverName(selectedDriverId))"
              class="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Assign Selected Driver
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Logs Modal -->
    <div v-if="showChatModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeChatModal">
      <div class="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">Chat Logs</h3>
          <button @click="closeChatModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="message in chatLogs" :key="message.id" 
               :class="['flex', message.sender_type === 'customer' ? 'justify-start' : 'justify-end']">
            <div :class="[
              'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
              message.sender_type === 'customer' 
                ? 'bg-gray-100 text-gray-900' 
                : 'bg-blue-600 text-white'
            ]">
              <div class="text-sm font-medium mb-1">
                {{ message.sender_type === 'customer' ? 'Customer' : 'Driver' }}
              </div>
              <div class="text-sm">{{ message.message }}</div>
              <div class="text-xs opacity-75 mt-1">
                {{ formatDate(message.created_at) }}
              </div>
            </div>
          </div>
          <div v-if="chatLogs.length === 0" class="text-center text-gray-500 py-8">
            No chat messages found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllOrders, updateOrderStatusAdmin } from '@/lib/admin'

export default {
  name: 'AdminOrders',
  data() {
    return {
      orders: [],
      loading: true,
      searchQuery: '',
      statusFilter: '',
      paymentStatusFilter: '',
      selectedOrder: null,
      showPaymentModal: false,
      showDriverModal: false,
      showChatModal: false,
      paymentData: {},
      chatLogs: [],
      selectedDriverId: '',
      suggestedDrivers: [
        {
          id: 'driver1',
          name: 'Juan Dela Cruz',
          distance: '2.5 km',
          rating: 4.8,
          status: 'Available',
          completion_rate: 95
        },
        {
          id: 'driver2',
          name: 'Maria Santos',
          distance: '3.1 km',
          rating: 4.9,
          status: 'Available',
          completion_rate: 98
        },
        {
          id: 'driver3',
          name: 'Pedro Garcia',
          distance: '4.2 km',
          rating: 4.7,
          status: 'Available',
          completion_rate: 92
        }
      ],
      allDrivers: [
        { id: 'driver1', name: 'Juan Dela Cruz', status: 'Available' },
        { id: 'driver2', name: 'Maria Santos', status: 'Available' },
        { id: 'driver3', name: 'Pedro Garcia', status: 'Available' },
        { id: 'driver4', name: 'Ana Rodriguez', status: 'Busy' },
        { id: 'driver5', name: 'Carlos Mendoza', status: 'Offline' }
      ]
    }
  },
  computed: {
    filteredOrders() {
      let filtered = this.orders

      // Filter by status
      if (this.statusFilter) {
        filtered = filtered.filter(order => order.status === this.statusFilter)
      }

      // Filter by payment status
      if (this.paymentStatusFilter) {
        filtered = filtered.filter(order => (order.payment_status || 'pending') === this.paymentStatusFilter)
      }

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(order => 
          order.id.toLowerCase().includes(query) ||
          order.users?.first_name?.toLowerCase().includes(query) ||
          order.users?.last_name?.toLowerCase().includes(query) ||
          order.users?.email?.toLowerCase().includes(query) ||
          order.services?.name?.toLowerCase().includes(query)
        )
      }

      return filtered
    }
  },
  methods: {
    async loadOrders() {
      try {
        this.loading = true
        const { data, error } = await getAllOrders()
        
        if (error) {
          console.error('Error loading orders:', error)
        } else {
          this.orders = data || []
        }
      } catch (error) {
        console.error('Error loading orders:', error)
      } finally {
        this.loading = false
      }
    },
    async updateOrderStatus(orderId, newStatus) {
      try {
        const { error } = await updateOrderStatusAdmin(orderId, newStatus)
        
        if (error) {
          console.error('Error updating order status:', error)
        } else {
          // Update local data
          const orderIndex = this.orders.findIndex(o => o.id === orderId)
          if (orderIndex !== -1) {
            this.orders[orderIndex].status = newStatus
          }
          
          // Update selected order if it's the same
          if (this.selectedOrder && this.selectedOrder.id === orderId) {
            this.selectedOrder.status = newStatus
          }
        }
      } catch (error) {
        console.error('Error updating order status:', error)
      }
    },
    async updatePaymentStatus(status) {
      try {
        // Here you would call your API to update payment status
        console.log('Updating payment status to:', status)
        
        // Update local data
        const orderIndex = this.orders.findIndex(o => o.id === this.selectedOrder.id)
        if (orderIndex !== -1) {
          this.orders[orderIndex].payment_status = status
        }
        
        this.closePaymentModal()
      } catch (error) {
        console.error('Error updating payment status:', error)
      }
    },
    async assignDriver(driverId, driverName) {
      try {
        // Here you would call your API to assign driver
        console.log('Assigning driver:', driverId, driverName)
        
        // Update local data
        const orderIndex = this.orders.findIndex(o => o.id === this.selectedOrder.id)
        if (orderIndex !== -1) {
          this.orders[orderIndex].assigned_driver = driverName
        }
        
        this.closeDriverModal()
      } catch (error) {
        console.error('Error assigning driver:', error)
      }
    },
    viewOrder(order) {
      this.selectedOrder = order
    },
    viewPaymentProofs(order) {
      this.selectedOrder = order
      // Mock payment data - replace with actual API call
      this.paymentData = {
        reference_code: 'REF' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        payment_proof: '/placeholder.svg?height=400&width=300&text=Payment+Proof',
        delivery_proof: '/placeholder.svg?height=400&width=300&text=Delivery+Proof'
      }
      this.showPaymentModal = true
    },
    viewChatLogs(order) {
      this.selectedOrder = order
      // Mock chat data - replace with actual API call
      this.chatLogs = [
        {
          id: 1,
          sender_type: 'customer',
          message: 'Hello, when will the driver arrive?',
          created_at: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 2,
          sender_type: 'driver',
          message: 'Hi! I will be there in 15 minutes.',
          created_at: new Date(Date.now() - 3000000).toISOString()
        },
        {
          id: 3,
          sender_type: 'customer',
          message: 'Thank you! I will wait.',
          created_at: new Date(Date.now() - 2400000).toISOString()
        }
      ]
      this.showChatModal = true
    },
    openDriverAssignment(order) {
      this.selectedOrder = order
      this.selectedDriverId = ''
      this.showDriverModal = true
    },
    getDriverName(driverId) {
      const driver = this.allDrivers.find(d => d.id === driverId)
      return driver ? driver.name : ''
    },
    closeModal() {
      this.selectedOrder = null
    },
    closePaymentModal() {
      this.showPaymentModal = false
      this.paymentData = {}
    },
    closeDriverModal() {
      this.showDriverModal = false
      this.selectedDriverId = ''
    },
    closeChatModal() {
      this.showChatModal = false
      this.chatLogs = []
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount || 0)
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
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
    getPaymentStatusClass(status) {
      const classes = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'approved': 'bg-green-100 text-green-800',
        'rejected': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-yellow-100 text-yellow-800'
    },
    getStatusSelectClass(status) {
      const classes = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'confirmed': 'bg-blue-100 text-blue-800',
        'in_progress': 'bg-purple-100 text-purple-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }
  },
  mounted() {
    this.loadOrders()
  }
}
</script>
