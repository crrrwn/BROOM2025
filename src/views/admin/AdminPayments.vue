<template>
  <div class="min-h-screen bg-white">
    <!-- Updated header with green gradient background and white text -->
    <div class="bg-gradient-to-r from-[#A8EB12] via-[#74E600] to-[#3ED400] p-6 rounded-xl shadow-lg mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-white">Payments Management</h1>
          <p class="text-white/90 mt-1">Monitor all payment transactions</p>
        </div>
        <div class="flex items-center space-x-4">
          <select
            v-model="statusFilter"
            class="border border-white/20 bg-white/10 backdrop-blur-sm text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-white/50 focus:border-white/50"
          >
            <option value="" class="text-gray-900">All Status</option>
            <option value="pending" class="text-gray-900">Pending</option>
            <option value="approved" class="text-gray-900">Approved</option>
            <option value="rejected" class="text-gray-900">Rejected</option>
            <option value="completed" class="text-gray-900">Completed</option>
            <option value="failed" class="text-gray-900">Failed</option>
          </select>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search payments..."
              class="pl-10 pr-4 py-2 border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50"
            />
            <!-- Updated search icon with white color -->
            <svg class="w-5 h-5 text-white/70 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Updated table with green theme and enhanced styling -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-[#00C851]/10 to-[#3ED400]/10">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-[#00C851] uppercase tracking-wider">Payment ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-[#00C851] uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-[#00C851] uppercase tracking-wider">Order ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-[#00C851] uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-[#00C851] uppercase tracking-wider">Method</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-[#00C851] uppercase tracking-wider">Transaction ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-[#00C851] uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-[#00C851] uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-[#00C851] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="9" class="px-6 py-12 text-center">
                <div class="flex justify-center items-center">
                  <!-- Updated loading spinner with green color -->
                  <svg class="animate-spin h-8 w-8 text-[#74E600]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="ml-2 text-gray-600">Loading payments...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredPayments.length === 0">
              <td colspan="9" class="px-6 py-12 text-center text-gray-500">
                No payments found
              </td>
            </tr>
            <tr v-else v-for="payment in filteredPayments" :key="payment.id" class="hover:bg-gradient-to-r hover:from-[#A8EB12]/5 hover:to-[#74E600]/5 transition-all duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#{{ payment.id.slice(0, 8) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <!-- Updated avatar with green background -->
                  <div class="w-8 h-8 bg-gradient-to-r from-[#74E600] to-[#3ED400] rounded-full flex items-center justify-center">
                    <span class="text-white font-semibold text-xs">
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
                <div class="text-sm text-gray-900">{{ payment.transaction_id || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(payment.payment_status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                  {{ payment.payment_status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(payment.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-col space-y-2">
                  <!-- Updated action buttons with green theme -->
                  <div v-if="payment.payment_status === 'pending'" class="flex space-x-2">
                    <button
                      @click.stop="approvePayment(payment)"
                      :disabled="processingPayment === payment.id"
                      class="px-3 py-1 bg-gradient-to-r from-[#74E600] to-[#3ED400] text-white hover:from-[#3ED400] hover:to-[#00C851] disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                    >
                      {{ processingPayment === payment.id ? 'Processing...' : 'Approve' }}
                    </button>
                    <button
                      @click.stop="rejectPayment(payment)"
                      :disabled="processingPayment === payment.id"
                      class="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium rounded-md border border-red-300 transition-colors duration-200"
                    >
                      Reject
                    </button>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click.stop="viewPayment(payment)"
                      class="px-3 py-1 bg-gradient-to-r from-[#A8EB12]/20 to-[#74E600]/20 text-[#00C851] hover:from-[#A8EB12]/30 hover:to-[#74E600]/30 text-xs font-medium rounded-md border border-[#74E600]/30 transition-all duration-200"
                    >
                      View Details
                    </button>
                    <button
                      v-if="payment.proof_url"
                      @click.stop="viewProofOfPayment(payment)"
                      class="px-3 py-1 bg-gradient-to-r from-[#3ED400]/20 to-[#00C851]/20 text-[#00C851] hover:from-[#3ED400]/30 hover:to-[#00C851]/30 text-xs font-medium rounded-md border border-[#3ED400]/30 transition-all duration-200"
                    >
                      View Proof
                    </button>
                    <span v-else class="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-md border border-gray-300">No Proof</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Updated modals with green theme styling -->
    <!-- Payment Details Modal -->
    <div v-if="selectedPayment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold bg-gradient-to-r from-[#74E600] to-[#3ED400] bg-clip-text text-transparent">Payment Details</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-[#74E600] transition-colors duration-200">
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
                <span :class="getStatusClass(selectedPayment.payment_status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1">
                  {{ selectedPayment.payment_status }}
                </span>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Transaction Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedPayment.created_at) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Transaction ID</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedPayment.transaction_id || 'N/A' }}</p>
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
                <label class="block text-sm font-medium text-gray-700">Transaction ID</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedPayment.transaction_id || 'N/A' }}</p>
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

    <!-- Proof of Payment Modal -->
    <div v-if="showProofModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeProofModal">
      <div class="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold bg-gradient-to-r from-[#74E600] to-[#3ED400] bg-clip-text text-transparent">Proof of Payment</h3>
          <button @click="closeProofModal" class="text-gray-400 hover:text-[#74E600] transition-colors duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <!-- Payment Info -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="font-medium text-gray-700">Payment ID:</span>
                <span class="ml-2 text-gray-900">#{{ selectedProofPayment?.id?.slice(0, 8) }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Amount:</span>
                <span class="ml-2 text-gray-900">₱{{ formatCurrency(selectedProofPayment?.amount) }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Customer:</span>
                <span class="ml-2 text-gray-900">{{ selectedProofPayment?.users?.first_name }} {{ selectedProofPayment?.users?.last_name }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Date:</span>
                <span class="ml-2 text-gray-900">{{ formatDate(selectedProofPayment?.created_at) }}</span>
              </div>
            </div>
          </div>

          <!-- Proof Image -->
          <div class="text-center">
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div v-if="loadingProofImage" class="py-12">
                <svg class="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p class="text-gray-600">Loading proof of payment...</p>
              </div>
              <img 
                v-else-if="proofImageUrl"
                :src="proofImageUrl" 
                :alt="`Proof of payment for #${selectedProofPayment.id}`"
                class="max-w-full max-h-96 mx-auto rounded-lg shadow-lg"
                @error="handleImageError"
                @load="handleImageLoad"
              />
              <div v-else class="py-12">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-gray-500">No proof of payment available</p>
              </div>
            </div>
          </div>

          <!-- Updated download button with green styling -->
          <div v-if="proofImageUrl" class="text-center">
            <a 
              :href="proofImageUrl" 
              target="_blank" 
              download
              class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#74E600] to-[#3ED400] text-white rounded-lg hover:from-[#3ED400] hover:to-[#00C851] transition-all duration-200 shadow-sm"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Download Proof
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Rejection Modal -->
    <div v-if="showRejectModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeRejectModal">
      <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">Reject Payment</h3>
          <button @click="closeRejectModal" class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Reason for Rejection</label>
            <select 
              v-model="rejectionReason" 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="">Select a reason...</option>
              <option value="Invalid proof of payment">Invalid proof of payment</option>
              <option value="Insufficient payment amount">Insufficient payment amount</option>
              <option value="Expired transaction">Expired transaction</option>
              <option value="Duplicate payment">Duplicate payment</option>
              <option value="Fraudulent transaction">Fraudulent transaction</option>
              <option value="Incorrect payment details">Incorrect payment details</option>
              <option value="Payment method not accepted">Payment method not accepted</option>
              <option value="Other">Other (please specify below)</option>
            </select>
          </div>
          
          <div v-if="rejectionReason === 'Other'">
            <label class="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
            <textarea 
              v-model="customRejectionReason"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              rows="3"
              placeholder="Please provide additional details..."
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button
              @click="closeRejectModal"
              class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              @click="confirmRejectPayment"
              :disabled="!rejectionReason || (rejectionReason === 'Other' && !customRejectionReason)"
              class="px-4 py-2 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
            >
              Reject Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllPayments } from '@/lib/admin'
import { supabase } from '@/lib/supabase'
import { useToast } from 'vue-toastification'

export default {
  name: 'AdminPayments',
  setup() {
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      payments: [],
      loading: true,
      searchQuery: '',
      statusFilter: '',
      selectedPayment: null,
      showProofModal: false,
      selectedProofPayment: null,
      loadingProofImage: false,
      proofImageUrl: null,
      processingPayment: null,
      showRejectModal: false,
      paymentToReject: null,
      rejectionReason: '',
      customRejectionReason: ''
    }
  },
  computed: {
    filteredPayments() {
      let filtered = this.payments

      // Filter by status
      if (this.statusFilter) {
        filtered = filtered.filter(payment => payment.payment_status === this.statusFilter)
      }

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(payment => 
          payment.id.toLowerCase().includes(query) ||
          payment.users?.first_name?.toLowerCase().includes(query) ||
          payment.users?.last_name?.toLowerCase().includes(query) ||
          payment.users?.email?.toLowerCase().includes(query) ||
          payment.orders?.id?.toLowerCase().includes(query) ||
          payment.transaction_id?.toLowerCase().includes(query)
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
          console.log('[v0] Loaded payments with proof URLs:', this.payments.map(p => ({ id: p.id, proof_url: p.proof_url })))
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
    async viewProofOfPayment(payment) {
      console.log('[v0] Viewing proof for payment:', payment.id, 'Proof URL:', payment.proof_url)
      this.selectedProofPayment = payment
      this.showProofModal = true
      this.loadingProofImage = true
      this.proofImageUrl = null

      try {
        if (payment.proof_url) {
          if (payment.proof_url.startsWith('http')) {
            this.proofImageUrl = payment.proof_url
          } else {
            const { data } = supabase.storage
              .from('payment-proofs')
              .getPublicUrl(payment.proof_url)
            
            this.proofImageUrl = data.publicUrl
            console.log('[v0] Generated public URL:', this.proofImageUrl)
          }
        }
      } catch (error) {
        console.error('[v0] Error getting proof image URL:', error)
      } finally {
        this.loadingProofImage = false
      }
    },
    closeProofModal() {
      this.showProofModal = false
      this.selectedProofPayment = null
      this.proofImageUrl = null
      this.loadingProofImage = false
    },
    handleImageError(event) {
      console.error('[v0] Failed to load proof of payment image:', {
        src: event.target.src,
        payment_id: this.selectedProofPayment?.id,
        proof_url: this.selectedProofPayment?.proof_url
      })
      this.loadingProofImage = false
      event.target.style.display = 'none'
      event.target.parentNode.innerHTML = `
        <div class="py-12">
          <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-red-500">Failed to load proof of payment</p>
          <p class="text-sm text-gray-500 mt-2">URL: ${this.proofImageUrl || 'No URL available'}</p>
        </div>
      `
    },
    handleImageLoad() {
      this.loadingProofImage = false
      console.log('[v0] Proof image loaded successfully')
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
        'approved': 'bg-green-100 text-green-800',
        'rejected': 'bg-red-100 text-red-800',
        'completed': 'bg-blue-100 text-blue-800',
        'failed': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    async approvePayment(payment) {
      console.log('[v0] Approving payment:', payment.id)
      
      try {
        this.processingPayment = payment.id
        
        console.log('[v0] Updating payment status to approved for payment:', payment.id)
        
        const { data, error: paymentError } = await supabase
          .from('payments')
          .update({ 
            payment_status: 'approved',
            updated_at: new Date().toISOString()
          })
          .eq('id', payment.id)
          .select()
        
        if (paymentError) {
          console.error('[v0] Payment update error details:', {
            error: paymentError,
            payment_id: payment.id,
            table: 'payments'
          })
          throw new Error(`Database error: ${paymentError.message}`)
        }
        
        console.log('[v0] Payment approved successfully:', data)
        
        if (payment.orders?.id) {
          console.log('[v0] Auto-updating order status to confirmed for order:', payment.orders.id)
          
          const { error: orderError } = await supabase
            .from('orders')
            .update({ 
              status: 'confirmed',
              payment_status: 'approved',
              updated_at: new Date().toISOString()
            })
            .eq('id', payment.orders.id)
          
          if (orderError) {
            console.error('[v0] Order status update error:', orderError)
            // Don't throw error here, payment was successful
          } else {
            console.log('[v0] Order status updated to confirmed successfully')
          }
        }
        
        // Send notification to user
        try {
          await this.sendPaymentNotification(payment, 'approved')
        } catch (notifError) {
          console.error('[v0] Notification error (non-critical):', notifError)
        }
        
        // Update local data immediately
        const paymentIndex = this.payments.findIndex(p => p.id === payment.id)
        if (paymentIndex !== -1) {
          this.payments[paymentIndex].payment_status = 'approved'
          this.payments[paymentIndex].updated_at = new Date().toISOString()
        }
        
        this.toast.success('Payment approved successfully! Order status updated to confirmed and can now be assigned to a driver.', {
          timeout: 5000,
          position: 'top-right'
        })
        
      } catch (error) {
        console.error('[v0] Error approving payment:', error)
        this.toast.error(`Failed to approve payment: ${error.message || 'Unknown error occurred'}`, {
          timeout: 5000,
          position: 'top-right'
        })
      } finally {
        this.processingPayment = null
      }
    },
    
    async confirmRejectPayment() {
      console.log('[v0] Confirming payment rejection with reason:', this.rejectionReason)
      
      if (!this.rejectionReason) {
        this.toast.warning('Please select a reason for rejection', {
          timeout: 3000,
          position: 'top-right'
        })
        return
      }
      
      const finalReason = this.rejectionReason === 'Other' ? this.customRejectionReason : this.rejectionReason
      
      if (this.rejectionReason === 'Other' && !this.customRejectionReason.trim()) {
        this.toast.warning('Please provide additional details for rejection', {
          timeout: 3000,
          position: 'top-right'
        })
        return
      }
      
      try {
        this.processingPayment = this.paymentToReject.id
        
        console.log('[v0] Updating payment status to rejected for payment:', this.paymentToReject.id)
        console.log('[v0] Rejection reason:', finalReason)
        
        const { data, error } = await supabase
          .from('payments')
          .update({ 
            payment_status: 'rejected',
            notes: finalReason,
            updated_at: new Date().toISOString()
          })
          .eq('id', this.paymentToReject.id)
          .select()
        
        if (error) {
          console.error('[v0] Payment update error details:', {
            error: error,
            payment_id: this.paymentToReject.id,
            table: 'payments'
          })
          throw new Error(`Database error: ${error.message}`)
        }
        
        console.log('[v0] Payment rejected successfully:', data)
        
        if (this.paymentToReject.orders?.id) {
          console.log('[v0] Auto-updating order status to cancelled for order:', this.paymentToReject.orders.id)
          
          const { error: orderError } = await supabase
            .from('orders')
            .update({ 
              status: 'cancelled',
              payment_status: 'rejected',
              updated_at: new Date().toISOString()
            })
            .eq('id', this.paymentToReject.orders.id)
          
          if (orderError) {
            console.error('[v0] Order status update error:', orderError)
            // Don't throw error here, payment rejection was successful
          } else {
            console.log('[v0] Order status updated to cancelled successfully')
          }
        }
        
        // Send notification to user
        try {
          await this.sendPaymentNotification(this.paymentToReject, 'rejected', finalReason)
        } catch (notifError) {
          console.error('[v0] Notification error (non-critical):', notifError)
        }
        
        // Update local data immediately
        const paymentIndex = this.payments.findIndex(p => p.id === this.paymentToReject.id)
        if (paymentIndex !== -1) {
          this.payments[paymentIndex].payment_status = 'rejected'
          this.payments[paymentIndex].notes = finalReason
          this.payments[paymentIndex].updated_at = new Date().toISOString()
        }
        
        this.toast.success('Payment rejected successfully! Order status updated to cancelled.', {
          timeout: 5000,
          position: 'top-right'
        })
        this.closeRejectModal()
        
      } catch (error) {
        console.error('[v0] Error rejecting payment:', error)
        this.toast.error(`Failed to reject payment: ${error.message || 'Unknown error occurred'}. Please try again.`, {
          timeout: 5000,
          position: 'top-right'
        })
      } finally {
        this.processingPayment = null
      }
    },
    
    async sendPaymentNotification(payment, status, reason = null) {
      try {
        console.log('[v0] Sending notification to user:', payment.user_id, 'Status:', status)
        
        if (!payment.user_id) {
          console.error('[v0] No user_id found for payment:', payment.id)
          return
        }
        
        const notificationMessage = status === 'approved' 
          ? `Your payment of ₱${this.formatCurrency(payment.amount)} has been approved and processed successfully.`
          : `Your payment of ₱${this.formatCurrency(payment.amount)} has been rejected. Reason: ${reason}`
        
        const { data, error } = await supabase
          .from('notifications')
          .insert({
            user_id: payment.user_id,
            title: `Payment ${status.charAt(0).toUpperCase() + status.slice(1)}`,
            message: notificationMessage,
            type: 'payment',
            is_read: false,
            created_at: new Date().toISOString()
          })
          .select()
        
        if (error) {
          console.error('[v0] Error sending notification details:', {
            error: error,
            user_id: payment.user_id,
            payment_id: payment.id
          })
          throw error
        } else {
          console.log('[v0] Notification sent successfully:', data)
        }
      } catch (error) {
        console.error('[v0] Error sending payment notification:', error)
        throw error
      }
    },

    rejectPayment(payment) {
      console.log('[v0] Opening reject modal for payment:', payment.id)
      this.paymentToReject = payment
      this.showRejectModal = true
      this.rejectionReason = ''
      this.customRejectionReason = ''
    },

    closeRejectModal() {
      this.showRejectModal = false
      this.paymentToReject = null
      this.rejectionReason = ''
      this.customRejectionReason = ''
    }
  },
  mounted() {
    this.loadPayments()
  }
}
</script>
