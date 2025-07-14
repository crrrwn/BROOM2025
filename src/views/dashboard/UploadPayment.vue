<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0" :class="{ '-translate-x-full': !sidebarOpen }">
      <div class="flex items-center justify-center h-16 bg-green-600">
        <div class="flex items-center">
          <div class="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
            <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <span class="ml-2 text-xl font-bold text-white">QuickServe</span>
        </div>
      </div>
      
      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <router-link to="/dashboard" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            </svg>
            Dashboard
          </router-link>
          
          <router-link to="/book-service" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Book a Service
          </router-link>
          
          <router-link to="/my-orders" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            My Orders
          </router-link>
          
          <router-link to="/upload-payment" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg bg-green-50 dark:bg-gray-700 text-green-600 dark:text-green-400 transition-colors">
            <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            Upload Payment
          </router-link>
          
          <router-link to="/profile" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Profile
          </router-link>
        </div>
        
        <div class="px-4 mt-8">
          <button @click="handleLogout" class="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </button>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="lg:pl-64">
      <!-- Top Navigation -->
      <div class="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between h-16 px-4">
          <div class="flex items-center">
            <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <h1 class="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Upload Payment</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <button @click="toggleDarkMode" class="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <svg v-if="!isDarkMode" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
              <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Upload Payment Content -->
      <main class="p-6">
        <div class="max-w-4xl mx-auto">
          <!-- Instructions -->
          <div class="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
            <div class="flex">
              <svg class="h-5 w-5 text-blue-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">Payment Instructions</h3>
                <div class="mt-2 text-sm text-blue-700 dark:text-blue-300">
                  <ul class="list-disc list-inside space-y-1">
                    <li>Select the order you want to upload payment proof for</li>
                    <li>Upload a clear image of your payment receipt or screenshot</li>
                    <li>Enter the reference number from your payment</li>
                    <li>Your payment will be verified by our admin team</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Upload Form -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Upload Payment Proof</h2>
            
            <form @submit.prevent="handleUploadPayment" class="space-y-6">
              <!-- Select Order -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Order</label>
                <select v-model="paymentForm.orderId" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">Choose an order...</option>
                  <option v-for="order in pendingOrders" :key="order.id" :value="order.id">
                    Order #{{ order.id }} - {{ formatServiceType(order.service_type) }} - ₱{{ order.total_amount.toLocaleString() }}
                  </option>
                </select>
              </div>

              <!-- Payment Method -->
              <div v-if="selectedOrder">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p class="text-gray-900 dark:text-white font-medium">{{ formatPaymentMethod(selectedOrder.payment_method) }}</p>
                  
                  <!-- Payment Details based on method -->
                  <div v-if="selectedOrder.payment_method === 'gcash'" class="mt-3">
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                      <h4 class="font-medium text-gray-900 dark:text-white mb-2">GCash Payment Details</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-300">GCash Number: <strong>09123456789</strong></p>
                      <p class="text-sm text-gray-600 dark:text-gray-300">Account Name: <strong>QuickServe Delivery</strong></p>
                      <p class="text-sm text-gray-600 dark:text-gray-300">Amount: <strong>₱{{ selectedOrder.total_amount.toLocaleString() }}</strong></p>
                      
                      <!-- QR Code -->
                      <div class="mt-3">
                        <div class="w-48 h-48 mx-auto border rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <div class="text-center">
                            <svg class="h-16 w-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4"></path>
                            </svg>
                            <p class="text-xs text-gray-500 dark:text-gray-400">QR Code</p>
                          </div>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">Scan this QR code with your GCash app</p>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="selectedOrder.payment_method === 'bank'" class="mt-3">
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                      <h4 class="font-medium text-gray-900 dark:text-white mb-2">Bank Transfer Details</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-300">Bank: <strong>BPI</strong></p>
                      <p class="text-sm text-gray-600 dark:text-gray-300">Account Number: <strong>1234-5678-90</strong></p>
                      <p class="text-sm text-gray-600 dark:text-gray-300">Account Name: <strong>QuickServe Delivery Services</strong></p>
                      <p class="text-sm text-gray-600 dark:text-gray-300">Amount: <strong>₱{{ selectedOrder.total_amount.toLocaleString() }}</strong></p>
                    </div>
                  </div>

                  <div v-else-if="selectedOrder.payment_method === 'cod'" class="mt-3">
                    <div class="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                      <p class="text-yellow-800 dark:text-yellow-200">This order is set for Cash on Delivery. No payment upload needed.</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Upload Payment Proof -->
              <div v-if="selectedOrder && selectedOrder.payment_method !== 'cod'">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Proof</label>
                <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                  <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="mt-4">
                      <label for="payment-proof" class="cursor-pointer">
                        <span class="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                          Upload payment screenshot or receipt
                        </span>
                        <input id="payment-proof" name="payment-proof" type="file" accept="image/*" @change="handleFileUpload" class="sr-only" required>
                        <span class="mt-1 block text-sm text-gray-500 dark:text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <!-- Preview uploaded image -->
                <div v-if="paymentForm.paymentProof" class="mt-4">
                  <img :src="paymentForm.paymentProofPreview" alt="Payment proof preview" class="max-w-xs rounded-lg border">
                  <button type="button" @click="removePaymentProof" class="mt-2 text-sm text-red-600 hover:text-red-500">
                    Remove image
                  </button>
                </div>
              </div>

              <!-- Reference Number -->
              <div v-if="selectedOrder && selectedOrder.payment_method !== 'cod'">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reference Number</label>
                <input v-model="paymentForm.referenceNumber" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Enter payment reference number">
              </div>

              <!-- Additional Notes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Notes (Optional)</label>
                <textarea v-model="paymentForm.notes" rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Any additional information about your payment"></textarea>
              </div>

              <!-- Submit Button -->
              <div class="flex space-x-4">
                <button type="button" @click="resetForm" class="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Reset
                </button>
                <button type="submit" :disabled="isLoading || !canSubmit" class="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <span v-if="isLoading" class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </span>
                  <span v-else>Upload Payment</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Payment History -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payment History</h2>
            
            <div v-if="paymentHistory.length === 0" class="text-center py-8">
              <svg class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p class="text-gray-500 dark:text-gray-400">No payment uploads yet</p>
            </div>

            <div v-else class="space-y-4">
              <div v-for="payment in paymentHistory" :key="payment.id" class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <h3 class="font-medium text-gray-900 dark:text-white">Order #{{ payment.order_id }}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(payment.created_at) }}</p>
                  </div>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getPaymentStatusClass(payment.status)">
                    {{ formatPaymentStatus(payment.status) }}
                  </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-300"><strong>Reference:</strong> {{ payment.reference_number }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300"><strong>Amount:</strong> ₱{{ payment.amount.toLocaleString() }}</p>
                    <p v-if="payment.notes" class="text-sm text-gray-600 dark:text-gray-300"><strong>Notes:</strong> {{ payment.notes }}</p>
                  </div>
                  
                  <div v-if="payment.payment_proof_url" class="flex justify-end">
                    <img :src="payment.payment_proof_url" alt="Payment proof" class="w-24 h-24 object-cover rounded-lg border cursor-pointer" @click="viewPaymentProof(payment.payment_proof_url)">
                  </div>
                </div>

                <div v-if="payment.admin_notes" class="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                  <p class="text-sm text-yellow-800 dark:text-yellow-200"><strong>Admin Notes:</strong> {{ payment.admin_notes }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Image Viewer Modal -->
    <div v-if="showImageViewer" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click="showImageViewer = false">
      <div class="max-w-4xl max-h-full p-4">
        <img :src="viewerImageUrl" alt="Payment proof" class="max-w-full max-h-full object-contain rounded-lg">
        <button @click="showImageViewer = false" class="absolute top-4 right-4 text-white hover:text-gray-300">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'

export default {
  name: 'UploadPayment',
  setup() {
    const router = useRouter()
    const currentUser = inject('currentUser')
    const isDarkMode = inject('isDarkMode')
    const toggleDarkMode = inject('toggleDarkMode')
    const toast = inject('toast')
    
    const sidebarOpen = ref(false)
    const isLoading = ref(false)
    const pendingOrders = ref([])
    const paymentHistory = ref([])
    const showImageViewer = ref(false)
    const viewerImageUrl = ref('')
    
    const paymentForm = ref({
      orderId: '',
      paymentProof: null,
      paymentProofPreview: '',
      referenceNumber: '',
      notes: ''
    })

    const selectedOrder = computed(() => {
      return pendingOrders.value.find(order => order.id === paymentForm.value.orderId)
    })

    const canSubmit = computed(() => {
      if (!paymentForm.value.orderId) return false
      if (selectedOrder.value?.payment_method === 'cod') return true
      return paymentForm.value.paymentProof && paymentForm.value.referenceNumber
    })

    const loadPendingOrders = async () => {
      if (!currentUser.value) return

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', currentUser.value.id)
          .in('status', ['pending', 'assigned'])
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error loading orders:', error)
          toast.error('Failed to load orders')
        } else {
          pendingOrders.value = data || []
        }
      } catch (error) {
        console.error('Error loading orders:', error)
        toast.error('Failed to load orders')
      }
    }

    const loadPaymentHistory = async () => {
      if (!currentUser.value) return

      try {
        const { data, error } = await supabase
          .from('payment_proofs')
          .select(`
            *,
            orders!inner(user_id)
          `)
          .eq('orders.user_id', currentUser.value.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error loading payment history:', error)
        } else {
          paymentHistory.value = data || []
        }
      } catch (error) {
        console.error('Error loading payment history:', error)
      }
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
        if (!allowedTypes.includes(file.type)) {
          toast.error('Please upload only image files (JPG, PNG, GIF)')
          return
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          toast.error('File size must be less than 10MB')
          return
        }

        paymentForm.value.paymentProof = file
        
        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          paymentForm.value.paymentProofPreview = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const removePaymentProof = () => {
      paymentForm.value.paymentProof = null
      paymentForm.value.paymentProofPreview = ''
      document.getElementById('payment-proof').value = ''
    }

    const uploadToSupabaseStorage = async (file, orderId) => {
      try {
        const fileExt = file.name.split('.').pop()
        const fileName = `payment-proof-${orderId}-${Date.now()}.${fileExt}`
        const filePath = `payment-proofs/${fileName}`

        const { data, error } = await supabase.storage
          .from('uploads')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (error) {
          console.error('Storage upload error:', error)
          throw error
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('uploads')
          .getPublicUrl(filePath)

        return publicUrl
      } catch (error) {
        console.error('Upload error:', error)
        throw new Error('Failed to upload file: ' + error.message)
      }
    }

    const handleUploadPayment = async () => {
      if (!canSubmit.value) return

      isLoading.value = true

      try {
        let paymentProofUrl = null

        // Upload file to Supabase Storage if not COD
        if (selectedOrder.value.payment_method !== 'cod' && paymentForm.value.paymentProof) {
          paymentProofUrl = await uploadToSupabaseStorage(paymentForm.value.paymentProof, paymentForm.value.orderId)
        }

        // Save payment proof record
        const { error } = await supabase
          .from('payment_proofs')
          .insert([
            {
              order_id: paymentForm.value.orderId,
              user_id: currentUser.value.id,
              payment_proof_url: paymentProofUrl,
              reference_number: paymentForm.value.referenceNumber,
              amount: selectedOrder.value.total_amount,
              payment_method: selectedOrder.value.payment_method,
              notes: paymentForm.value.notes,
              status: 'pending_verification',
              created_at: new Date().toISOString()
            }
          ])

        if (error) {
          throw error
        }

        // Update order status
        await supabase
          .from('orders')
          .update({ 
            payment_status: 'proof_uploaded',
            updated_at: new Date().toISOString()
          })
          .eq('id', paymentForm.value.orderId)

        toast.success('Payment proof uploaded successfully!')
        resetForm()
        loadPendingOrders()
        loadPaymentHistory()
      } catch (error) {
        console.error('Upload payment error:', error)
        toast.error('Failed to upload payment proof: ' + error.message)
      } finally {
        isLoading.value = false
      }
    }

    const resetForm = () => {
      paymentForm.value = {
        orderId: '',
        paymentProof: null,
        paymentProofPreview: '',
        referenceNumber: '',
        notes: ''
      }
      document.getElementById('payment-proof').value = ''
    }

    const formatServiceType = (type) => {
      const types = {
        food_delivery: 'Food Delivery',
        bill_payments: 'Bill Payments',
        pickup_drop: 'Pick-up & Drop',
        grocery: 'Grocery Shopping',
        medicine_delivery: 'Medicine Delivery',
        gift_delivery: 'Gift Delivery'
      }
      return types[type] || type
    }

    const formatPaymentMethod = (method) => {
      const methods = {
        gcash: 'GCash',
        bank: 'Online Banking',
        cod: 'Cash on Delivery'
      }
      return methods[method] || method
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const formatPaymentStatus = (status) => {
      const statuses = {
        pending_verification: 'Pending Verification',
        verified: 'Verified',
        rejected: 'Rejected'
      }
      return statuses[status] || status
    }

    const getPaymentStatusClass = (status) => {
      const statusClasses = {
        pending_verification: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        verified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }

    const viewPaymentProof = (imageUrl) => {
      viewerImageUrl.value = imageUrl
      showImageViewer.value = true
    }

    const handleLogout = async () => {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) {
          toast.error('Error signing out: ' + error.message)
        } else {
          toast.success('Logged out successfully')
          router.push('/')
        }
      } catch (error) {
        console.error('Logout error:', error)
        toast.error('An error occurred during logout')
      }
    }

    onMounted(() => {
      loadPendingOrders()
      loadPaymentHistory()
    })

    return {
      sidebarOpen,
      isLoading,
      pendingOrders,
      paymentHistory,
      paymentForm,
      selectedOrder,
      canSubmit,
      showImageViewer,
      viewerImageUrl,
      isDarkMode,
      toggleDarkMode,
      handleFileUpload,
      removePaymentProof,
      handleUploadPayment,
      resetForm,
      formatServiceType,
      formatPaymentMethod,
      formatDate,
      formatPaymentStatus,
      getPaymentStatusClass,
      viewPaymentProof,
      handleLogout
    }
  }
}
</script>
