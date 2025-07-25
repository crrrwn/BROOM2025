<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Payments Management</h1>
        <p class="text-gray-600 mt-1">Monitor all payment transactions</p>
      </div>
      <div class="flex items-center space-x-4">
        <select
          v-model="statusFilter"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search payments..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="8" class="px-6 py-12 text-center">
                <div class="flex justify-center items-center">
                  <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="ml-2 text-gray-600">Loading payments...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredPayments.length === 0">
              <td colspan="8" class="px-6 py-12 text-center text-gray-500">
                No payments found
              </td>
            </tr>
            <tr v-else v-for="payment in filteredPayments" :key="payment.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#{{ payment.id.slice(0, 8) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-semibold text-xs">
                      {{ payment.users?.first_name?.charAt(0) || 'U' }}
                    </span>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">
                      {{ payment.users?.first_name }} {{ payment.users?.last_name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ payment.users?.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">#{{ payment.orders?.id?.slice(0, 8) || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">₱{{ formatCurrency(payment.amount) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ payment.payment_method || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(payment.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                  {{ payment.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(payment.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewPayment(payment)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payment Details Modal -->
    <div v-if="selectedPayment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">Payment Details</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Payment Information -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-gray-900">Payment Information</h4>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700">Payment ID</label>
                <p class="mt-1 text-sm text-gray-900">#{{ selectedPayment.id }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Amount</label>
                <p class="mt-1 text-sm text-gray-900">₱{{ formatCurrency(selectedPayment.amount) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Payment Method</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedPayment.payment_method || 'N/A' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <span :class="getStatusClass(selectedPayment.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1">
                  {{ selectedPayment.status }}
                </span>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Transaction Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedPayment.created_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Customer & Order Information -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-gray-900">Customer & Order</h4>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700">Customer Name</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ selectedPayment.users?.first_name }} {{ selectedPayment.users?.last_name }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedPayment.users?.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Order ID</label>
                <p class="mt-1 text-sm text-gray-900">#{{ selectedPayment.orders?.id || 'N/A' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Order Amount</label>
                <p class="mt-1 text-sm text-gray-900">₱{{ formatCurrency(selectedPayment.orders?.total_amount) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Details -->
        <div class="mt-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Reference Number</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedPayment.reference_number || 'N/A' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Last Updated</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedPayment.updated_at) }}</p>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700">Notes</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedPayment.notes || 'No additional notes' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllPayments } from '@/lib/admin'

export default {
  name: 'AdminPayments',
  data() {
    return {
      payments: [],
      loading: true,
      searchQuery: '',
      statusFilter: '',
      selectedPayment: null
    }
  },
  computed: {
    filteredPayments() {
      let filtered = this.payments

      // Filter by status
      if (this.statusFilter) {
        filtered = filtered.filter(payment => payment.status === this.statusFilter)
      }

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(payment => 
          payment.id.toLowerCase().includes(query) ||
          payment.users?.first_name?.toLowerCase().includes(query) ||
          payment.users?.last_name?.toLowerCase().includes(query) ||
          payment.users?.email?.toLowerCase().includes(query) ||
          payment.orders?.id?.toLowerCase().includes(query)
        )
      }

      return filtered
    }
  },
  methods: {
    async loadPayments() {
      try {
        this.loading = true
        const { data, error } = await getAllPayments()
        
        if (error) {
          console.error('Error loading payments:', error)
        } else {
          this.payments = data || []
        }
      } catch (error) {
        console.error('Error loading payments:', error)
      } finally {
        this.loading = false
      }
    },
    viewPayment(payment) {
      this.selectedPayment = payment
    },
    closeModal() {
      this.selectedPayment = null
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
        'completed': 'bg-green-100 text-green-800',
        'failed': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }
  },
  mounted() {
    this.loadPayments()
  }
}
</script>
