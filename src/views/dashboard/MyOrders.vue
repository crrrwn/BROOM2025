<template>
  <div class="p-6">
    <!-- Header -->
    <div class="mb-8">
      <div class="bg-white rounded-2xl p-6 shadow-sm border">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          My Orders
        </h1>
        <p class="text-gray-600">Track and manage all your service orders</p>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="mb-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm border">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                activeTab === tab.key
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              {{ tab.label }}
              <span v-if="tab.count > 0" class="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                {{ tab.count }}
              </span>
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Orders List -->
    <div class="space-y-6">
      <div v-if="filteredOrders.length === 0" class="bg-white rounded-2xl p-12 shadow-sm border text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
        <p class="text-gray-500 mb-4">You haven't placed any orders yet.</p>
        <router-link to="/book-service" class="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold">
          <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Book a Service
        </router-link>
      </div>

      <div v-for="order in filteredOrders" :key="order.id" class="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
              <div class="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mr-4">
                <svg class="h-7 w-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">{{ getDisplayServiceType(order) }}</h3>
                <p class="text-sm text-gray-500">Order #{{ order.id }}</p>
                <p class="text-sm text-gray-500">{{ formatDate(order.created_at) }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-gray-900">₱{{ order.total_amount.toLocaleString() }}</p>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="getStatusClass(order.status)">
                {{ formatStatus(order.status) }}
              </span>
            </div>
          </div>

          <!-- Order Timeline -->
          <div class="mb-6">
            <h4 class="font-semibold text-gray-900 mb-3">Order Timeline</h4>
            <div class="flex items-center justify-between text-sm">
              <div v-for="(step, index) in orderSteps" :key="step.key" class="flex items-center">
                <div class="flex items-center">
                  <div :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    getStepStatus(order.status, step.key) === 'completed' ? 'bg-green-600 text-white' :
                    getStepStatus(order.status, step.key) === 'current' ? 'bg-blue-600 text-white' :
                    'bg-gray-200 text-gray-400'
                  ]">
                    <svg v-if="getStepStatus(order.status, step.key) === 'completed'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span v-else class="text-xs">{{ index + 1 }}</span>
                  </div>
                  <span class="ml-2 text-gray-700 font-medium">{{ step.label }}</span>
                </div>
                <div v-if="index < orderSteps.length - 1" class="flex-1 h-0.5 bg-gray-200 mx-4"></div>
              </div>
            </div>
          </div>

          <!-- Real-time Driver Location (only when assigned) -->
          <div v-if="order.driver_id && ['assigned', 'picked_up', 'in_transit'].includes(order.status)" class="mb-6">
            <div class="bg-blue-50 rounded-xl p-4">
              <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                <svg class="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                </svg>
                Driver Location
              </h4>
              <div class="text-sm text-gray-600">
                <p><strong>Driver:</strong> {{ getDriverInfo(order.driver_id)?.name || 'Loading...' }}</p>
                <p><strong>Contact:</strong> {{ getDriverInfo(order.driver_id)?.contact || 'Loading...' }}</p>
                <p><strong>Vehicle:</strong> {{ getDriverInfo(order.driver_id)?.vehicle || 'Loading...' }}</p>
                <div v-if="getDriverLocation(order.driver_id)" class="mt-2">
                  <p><strong>Current Location:</strong> {{ getDriverLocation(order.driver_id).address }}</p>
                  <p><strong>ETA:</strong> {{ getDriverLocation(order.driver_id).eta }} minutes</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Details -->
          <div class="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 class="font-semibold text-gray-900 mb-3">Order Details</h4>
            <div class="text-sm text-gray-600 space-y-2">
              <p><strong>Service:</strong> {{ getDisplayServiceType(order) }}</p>
              <p v-if="order.pickup_address"><strong>Pickup Address:</strong> {{ order.pickup_address }}</p>
              <p><strong>Delivery Address:</strong> {{ order.delivery_address }}</p>
              <p><strong>Payment Method:</strong> {{ getDisplayPaymentMethod(order) }}</p>
              <div v-if="order.service_details" class="mt-3">
                <strong>Service Details:</strong>
                <div class="mt-2 bg-white p-3 rounded-lg border">
                  <div v-html="formatServiceDetails(order.service_details, order.service_type)"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3">
            <router-link
              :to="{ name: 'OrderTracking', params: { id: order.id } }"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              </svg>
              Track Order
            </router-link>

            <button
              @click="showBarcode(order)"
              class="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm rounded-xl hover:bg-gray-700 transition-colors font-semibold"
            >
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
              </svg>
              View Barcode
            </button>

            <button
              v-if="canCancelOrder(order)"
              @click="cancelOrder(order.id)"
              class="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded-xl hover:bg-red-700 transition-colors font-semibold"
            >
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Cancel ({{ getCancelTimeLeft(order) }}s)
            </button>

            <button
              v-if="canReorder(order)"
              @click="reorderService(order)"
              class="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-xl hover:bg-green-700 transition-colors font-semibold"
            >
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Reorder
            </button>

            <button
              v-if="canRateOrder(order)"
              @click="openRatingModal(order)"
              class="inline-flex items-center px-4 py-2 bg-yellow-600 text-white text-sm rounded-xl hover:bg-yellow-700 transition-colors font-semibold"
            >
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1-81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
              Rate Order
            </button>

            <button
              v-if="canChatWithDriver(order)"
              @click="chatWithDriver(order.id)"
              class="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm rounded-xl hover:bg-purple-700 transition-colors font-semibold"
            >
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Chat with Driver
            </button>

            <button
              v-if="showOrderChatbot(order)"
              @click="openOrderChatbot(order)"
              class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
            >
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              Order Assistant
            </button>

            <button
              @click="toggleFavorite(order)"
              :class="[
                'inline-flex items-center px-4 py-2 text-sm rounded-xl transition-colors font-semibold',
                isFavorite(order) 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              <svg class="h-4 w-4 mr-2" :fill="isFavorite(order) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              {{ isFavorite(order) ? 'Favorited' : 'Add to Favorites' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Barcode Modal -->
    <div v-if="showBarcodeModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Order Barcode</h3>
        
        <div class="text-center mb-6">
          <div class="bg-gray-100 p-4 rounded-xl mb-4">
            <div class="barcode-container" id="barcode-display"></div>
          </div>
          <p class="text-sm text-gray-600">Show this barcode to your delivery driver</p>
          <p class="text-xs text-gray-500 mt-2">Order #{{ selectedOrderForBarcode?.id }}</p>
        </div>

        <div class="flex space-x-3">
          <button
            @click="downloadBarcode"
            class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
          >
            Download
          </button>
          <button
            @click="showBarcodeModal = false"
            class="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Order Chatbot Modal -->
    <div v-if="showChatbotModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl h-96 flex flex-col">
        <div class="p-4 border-b border-gray-200 bg-indigo-600 text-white rounded-t-2xl">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold">Order Assistant</h3>
            <button @click="showChatbotModal = false" class="text-white hover:text-indigo-200">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <p class="text-sm text-indigo-100">Order #{{ selectedOrderForChatbot?.id }}</p>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-3">
          <div v-for="message in chatbotMessages" :key="message.id" :class="[
            'flex',
            message.type === 'user' ? 'justify-end' : 'justify-start'
          ]">
            <div :class="[
              'max-w-xs px-3 py-2 rounded-lg text-sm',
              message.type === 'user' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-900'
            ]">
              <p>{{ message.content }}</p>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-gray-200">
          <div class="flex space-x-2">
            <input 
              v-model="chatbotInput" 
              @keyup.enter="sendChatbotMessage"
              type="text" 
              placeholder="Ask about your order..." 
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
            <button 
              @click="sendChatbotMessage"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Rating Modal -->
    <div v-if="showRatingModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Rate Your Order</h3>
        
        <div class="mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
          <div class="flex space-x-1">
            <button
              v-for="star in 5"
              :key="star"
              @click="rating.rating = star"
              class="text-2xl focus:outline-none transition-colors"
              :class="star <= rating.rating ? 'text-yellow-400' : 'text-gray-300'"
            >
              ★
            </button>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Feedback</label>
          <textarea
            v-model="rating.feedback"
            rows="3"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
            placeholder="Share your experience..."
          ></textarea>
        </div>

        <div class="flex space-x-3">
          <button
            @click="showRatingModal = false"
            class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            @click="submitRating"
            class="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, inject, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, subscribeToTable, unsubscribe } from '../../lib/supabase'
import { generateOrderBarcode, createBarcodeElement, downloadBarcodeImage } from '../../utils/barcode'

export default {
  name: 'MyOrders',
  setup() {
    const router = useRouter()
    const currentUser = inject('currentUser')
    const toast = inject('toast')
    
    const activeTab = ref('all')
    const orders = ref([])
    const favorites = ref([])
    const drivers = ref([])
    const driverLocations = ref([])
    const showRatingModal = ref(false)
    const showBarcodeModal = ref(false)
    const showChatbotModal = ref(false)
    const selectedOrder = ref(null)
    const selectedOrderForBarcode = ref(null)
    const selectedOrderForChatbot = ref(null)
    const chatbotMessages = ref([])
    const chatbotInput = ref('')
    const rating = ref({
      rating: 5,
      feedback: ''
    })

    let ordersSubscription = null
    let driversSubscription = null
    let locationsSubscription = null
    let cancelTimers = ref({})

    const tabs = computed(() => [
      { key: 'all', label: 'All Orders', count: orders.value.length },
      { key: 'active', label: 'Active', count: orders.value.filter(o => ['pending', 'assigned', 'picked_up', 'in_transit'].includes(o.status)).length },
      { key: 'completed', label: 'Completed', count: orders.value.filter(o => o.status === 'delivered').length },
      { key: 'cancelled', label: 'Cancelled', count: orders.value.filter(o => o.status === 'cancelled').length }
    ])

    const filteredOrders = computed(() => {
      switch (activeTab.value) {
        case 'active':
          return orders.value.filter(order => ['pending', 'assigned', 'picked_up', 'in_transit'].includes(order.status))
        case 'completed':
          return orders.value.filter(order => order.status === 'delivered')
        case 'cancelled':
          return orders.value.filter(order => order.status === 'cancelled')
        default:
          return orders.value
      }
    })

    const orderSteps = [
      { key: 'pending', label: 'Placed' },
      { key: 'assigned', label: 'Assigned' },
      { key: 'picked_up', label: 'Picked Up' },
      { key: 'in_transit', label: 'In Transit' },
      { key: 'delivered', label: 'Delivered' }
    ]

    const loadOrders = async () => {
      if (!currentUser.value) return

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', currentUser.value.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error loading orders:', error)
          toast.error('Failed to load orders')
        } else {
          orders.value = data || []
          setupCancelTimers()
        }
      } catch (error) {
        console.error('Error loading orders:', error)
        toast.error('Failed to load orders')
      }
    }

    const loadDrivers = async () => {
      try {
        const { data, error } = await supabase
          .from('drivers')
          .select('*')

        if (error) {
          console.error('Error loading drivers:', error)
        } else {
          drivers.value = data || []
        }
      } catch (error) {
        console.error('Error loading drivers:', error)
      }
    }

    const loadDriverLocations = async () => {
      try {
        const { data, error } = await supabase
          .from('driver_locations')
          .select('*')

        if (error) {
          console.error('Error loading driver locations:', error)
        } else {
          driverLocations.value = data || []
        }
      } catch (error) {
        console.error('Error loading driver locations:', error)
      }
    }

    const loadFavorites = async () => {
      if (!currentUser.value) return

      try {
        const { data, error } = await supabase
          .from('user_favorites')
          .select('order_id')
          .eq('user_id', currentUser.value.id)

        if (error) {
          console.error('Error loading favorites:', error)
        } else {
          favorites.value = data?.map(f => f.order_id) || []
        }
      } catch (error) {
        console.error('Error loading favorites:', error)
      }
    }

    const setupRealtimeSubscriptions = () => {
      if (!currentUser.value) return

      // Orders subscription
      ordersSubscription = subscribeToTable('orders', (payload) => {
        if (payload.eventType === 'UPDATE' && payload.new.user_id === currentUser.value.id) {
          const orderIndex = orders.value.findIndex(o => o.id === payload.new.id)
          if (orderIndex !== -1) {
            orders.value[orderIndex] = payload.new
            toast.info(`Order #${payload.new.id} status updated to ${formatStatus(payload.new.status)}`)
          }
        }
      }, `user_id=eq.${currentUser.value.id}`)

      // Driver locations subscription
      locationsSubscription = subscribeToTable('driver_locations', (payload) => {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
          const locationIndex = driverLocations.value.findIndex(l => l.driver_id === payload.new.driver_id)
          if (locationIndex !== -1) {
            driverLocations.value[locationIndex] = payload.new
          } else {
            driverLocations.value.push(payload.new)
          }
        }
      })
    }

    const setupCancelTimers = () => {
      orders.value.forEach(order => {
        if (order.status === 'pending') {
          const orderTime = new Date(order.created_at)
          const now = new Date()
          const timeDiff = (now - orderTime) / 1000
          const timeLeft = 30 - timeDiff

          if (timeLeft > 0) {
            cancelTimers.value[order.id] = setInterval(() => {
              const newTimeLeft = getCancelTimeLeft(order)
              if (newTimeLeft <= 0) {
                clearInterval(cancelTimers.value[order.id])
                delete cancelTimers.value[order.id]
              }
            }, 1000)
          }
        }
      })
    }

    const getDriverInfo = (driverId) => {
      return drivers.value.find(d => d.id === driverId)
    }

    const getDriverLocation = (driverId) => {
      return driverLocations.value.find(l => l.driver_id === driverId)
    }

    const serviceTypeMap = {
      food_delivery: 'Food Delivery',
      bill_payments: 'Bill Payments',
      pickup_drop: 'Pick-up & Drop',
      grocery: 'Grocery Shopping',
      medicine_delivery: 'Medicine Delivery',
      gift_delivery: 'Gift Delivery'
    };

    const paymentMethodMap = {
      gcash: 'GCash',
      bank: 'Online Banking',
      cod: 'Cash on Delivery'
    };

    const getDisplayServiceType = (order) => {
      // Prioritize the direct service_type column
      if (order.service_type && serviceTypeMap[order.service_type]) {
        return serviceTypeMap[order.service_type];
      }
      // Fallback to parsing from service_details if direct column is not available
      try {
        const parsedDetails = JSON.parse(order.service_details);
        if (parsedDetails && parsedDetails.service_type && serviceTypeMap[parsedDetails.service_type]) {
          return serviceTypeMap[parsedDetails.service_type];
        }
      } catch (e) {
        console.warn("Could not parse service details for service type:", e);
      }
      return 'N/A';
    };

    const getDisplayPaymentMethod = (order) => {
      // Prioritize the direct payment_method column
      if (order.payment_method && paymentMethodMap[order.payment_method]) {
        return paymentMethodMap[order.payment_method];
      }
      // Fallback to parsing from service_details if direct column is not available
      try {
        const parsedDetails = JSON.parse(order.service_details);
        if (parsedDetails && parsedDetails.payment_method && paymentMethodMap[parsedDetails.payment_method]) {
          return paymentMethodMap[parsedDetails.payment_method];
        }
      } catch (e) {
        console.warn("Could not parse service details for payment method:", e);
      }
      return 'N/A';
    };

    const formatStatus = (status) => {
      const statuses = {
        pending: 'Pending',
        assigned: 'Assigned',
        picked_up: 'Picked Up',
        in_transit: 'In Transit',
        delivered: 'Delivered',
        cancelled: 'Cancelled'
      }
      return statuses[status] || status
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

    const formatServiceDetails = (details, serviceType) => {
      try {
        const parsed = JSON.parse(details);
        let formattedDetails = '';

        // Helper to format keys for display
        const formatKey = (key) => key.replace(/([_])/g, ' ').replace(/^./, str => str.toUpperCase());

        formattedDetails += `<div class="space-y-2">`;

        // Common fields that might be in service_details but are already displayed outside
        const excludedKeys = [
          'service_type', 'service_name', 'delivery_address', 'contact_number',
          'zip_code', 'payment_method', 'total_fee', 'pickup_address',
          'pickup_contact', 'dropoff_address', 'dropoff_contact',
          'package_description', 'special_instructions', 'form_submitted_at'
        ];

        switch (serviceType) {
          case 'food_delivery':
            if (parsed.restaurant) formattedDetails += `<p><strong>Restaurant:</strong> ${parsed.restaurant}</p>`;
            if (parsed.restaurant_address) formattedDetails += `<p><strong>Restaurant Address:</strong> ${parsed.restaurant_address}</p>`;
            if (parsed.food_items) formattedDetails += `<p><strong>Food Items:</strong> ${parsed.food_items}</p>`;
            if (parsed.estimated_amount) formattedDetails += `<p><strong>Estimated Amount:</strong> ₱${parsed.estimated_amount.toLocaleString()}</p>`;
            if (parsed.restaurant_contact) formattedDetails += `<p><strong>Restaurant Contact:</strong> ${parsed.restaurant_contact}</p>`;
            if (parsed.food_notes) formattedDetails += `<p><strong>Special Instructions:</strong> ${parsed.food_notes}</p>`;
            break;

          case 'bill_payments':
            if (parsed.biller_name) formattedDetails += `<p><strong>Biller:</strong> ${parsed.biller_name}</p>`;
            if (parsed.account_number) formattedDetails += `<p><strong>Account Number:</strong> ${parsed.account_number}</p>`;
            if (parsed.bill_amount) formattedDetails += `<p><strong>Amount to Pay:</strong> ₱${parsed.bill_amount.toLocaleString()}</p>`;
            if (parsed.due_date) formattedDetails += `<p><strong>Due Date:</strong> ${new Date(parsed.due_date).toLocaleDateString()}</p>`;
            if (parsed.reference_file_path) {
              const { data } = supabase.storage.from('payment-proofs').getPublicUrl(parsed.reference_file_path);
              if (data && data.publicUrl) {
                formattedDetails += `<p><strong>Bill Statement:</strong> <a href="${data.publicUrl}" target="_blank" class="text-blue-600 hover:underline">View File</a></p>`;
              } else {
                formattedDetails += `<p><strong>Bill Statement:</strong> File not available or bucket not found.</p>`;
              }
            }
            if (parsed.reference_number) formattedDetails += `<p><strong>Reference Number:</strong> ${parsed.reference_number}</p>`;
            break;

          case 'pickup_drop':
            // pickup_address and dropoff_address are already displayed outside
            if (parsed.pickup_contact) formattedDetails += `<p><strong>Pickup Contact:</strong> ${parsed.pickup_contact}</p>`;
            if (parsed.dropoff_contact) formattedDetails += `<p><strong>Drop-off Contact:</strong> ${parsed.dropoff_contact}</p>`;
            if (parsed.item_type) formattedDetails += `<p><strong>Item Type:</strong> ${formatKey(parsed.item_type)}</p>`;
            if (parsed.item_details) formattedDetails += `<p><strong>Item Details:</strong> ${parsed.item_details}</p>`;
            if (parsed.delivery_notes) formattedDetails += `<p><strong>Special Instructions:</strong> ${parsed.delivery_notes}</p>`;
            break;

          case 'gift_delivery':
            if (parsed.gift_type) formattedDetails += `<p><strong>Gift Type:</strong> ${formatKey(parsed.gift_type)}</p>`;
            if (parsed.gift_store_name) formattedDetails += `<p><strong>Store Name:</strong> ${parsed.gift_store_name}</p>`;
            if (parsed.gift_store_address) formattedDetails += `<p><strong>Store Address:</strong> ${parsed.gift_store_address}</p>`;
            if (parsed.gift_details) formattedDetails += `<p><strong>Gift Details:</strong> ${parsed.gift_details}</p>`;
            if (parsed.recipient_name) formattedDetails += `<p><strong>Recipient Name:</strong> ${parsed.recipient_name}</p>`;
            if (parsed.recipient_contact) formattedDetails += `<p><strong>Recipient Contact:</strong> ${parsed.recipient_contact}</p>`;
            if (parsed.gift_message) formattedDetails += `<p><strong>Gift Message:</strong> ${parsed.gift_message}</p>`;
            if (parsed.delivery_schedule) formattedDetails += `<p><strong>Delivery Schedule:</strong> ${new Date(parsed.delivery_schedule).toLocaleString()}</p>`;
            formattedDetails += `<p><strong>Surprise Delivery:</strong> ${parsed.is_surprise ? 'Yes' : 'No'}</p>`;
            break;

          case 'medicine_delivery':
            if (parsed.pharmacy) formattedDetails += `<p><strong>Pharmacy:</strong> ${parsed.pharmacy}</p>`;
            if (parsed.medicine_list) formattedDetails += `<p><strong>Medicine List:</strong> ${parsed.medicine_list}</p>`;
            formattedDetails += `<p><strong>Prescription Required:</strong> ${parsed.needs_prescription ? 'Yes' : 'No'}</p>`;
            if (parsed.prescription_file_path) {
              const { data } = supabase.storage.from('payment-proofs').getPublicUrl(parsed.prescription_file_path);
              if (data && data.publicUrl) {
                formattedDetails += `<p><strong>Prescription:</strong> <a href="${data.publicUrl}" target="_blank" class="text-blue-600 hover:underline">View File</a></p>`;
              } else {
                formattedDetails += `<p><strong>Prescription:</strong> File not available or bucket not found.</p>`;
              }
            }
            if (parsed.patient_name) formattedDetails += `<p><strong>Patient Name:</strong> ${parsed.patient_name}</p>`;
            if (parsed.estimated_cost) formattedDetails += `<p><strong>Estimated Cost:</strong> ₱${parsed.estimated_cost.toLocaleString()}</p>`;
            break;

          case 'grocery':
            if (parsed.preferred_store) formattedDetails += `<p><strong>Preferred Store:</strong> ${parsed.preferred_store}</p>`;
            if (parsed.item_list) formattedDetails += `<p><strong>Shopping List:</strong> ${parsed.item_list}</p>`;
            if (parsed.budget_range) formattedDetails += `<p><strong>Budget Range:</strong> ${parsed.budget_range}</p>`;
            if (parsed.exact_budget && parsed.exact_budget > 0) formattedDetails += `<p><strong>Exact Budget:</strong> ₱${parsed.exact_budget.toLocaleString()}</p>`;
            if (parsed.brand_preferences) formattedDetails += `<p><strong>Brand Preferences:</strong> ${parsed.brand_preferences}</p>`;
            if (parsed.delivery_instructions) formattedDetails += `<p><strong>Special Instructions:</strong> ${parsed.delivery_instructions}</p>`;
            break;

          default:
            // Fallback for any other service type or unhandled fields
            Object.entries(parsed)
              .filter(([key, value]) => value !== null && value !== '' && !excludedKeys.includes(key))
              .forEach(([key, value]) => {
                let displayValue = value;
                if (typeof value === 'boolean') {
                  displayValue = value ? 'Yes' : 'No';
                } else if (key.includes('date') || key.includes('schedule')) {
                  try {
                    displayValue = new Date(value).toLocaleString();
                  } catch (e) { /* ignore */ }
                } else if (key.includes('amount') || key.includes('cost') || key.includes('budget')) {
                  if (typeof value === 'number') {
                    displayValue = `₱${value.toLocaleString()}`;
                  }
                } else if (key.includes('_path')) {
                  const { data } = supabase.storage.from('payment-proofs').getPublicUrl(value);
                  if (data && data.publicUrl) {
                    displayValue = `<a href="${data.publicUrl}" target="_blank" class="text-blue-600 hover:underline">View File</a>`;
                  } else {
                    displayValue = `File not available or bucket not found.`;
                  }
                }
                formattedDetails += `<p><strong>${formatKey(key)}:</strong> ${displayValue}</p>`;
              });
        }

        formattedDetails += `</div>`; // Close the div opened at the beginning
        return formattedDetails;
      } catch (e) {
        console.error("Error parsing service details:", e);
        return `<p>${details}</p>`; // Fallback to raw details if parsing fails
      }
    };

    const getStatusClass = (status) => {
      const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        assigned: 'bg-blue-100 text-blue-800',
        picked_up: 'bg-purple-100 text-purple-800',
        in_transit: 'bg-indigo-100 text-indigo-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    }

    const getStepStatus = (orderStatus, stepKey) => {
      const statusOrder = ['pending', 'assigned', 'picked_up', 'in_transit', 'delivered']
      const orderIndex = statusOrder.indexOf(orderStatus)
      const stepIndex = statusOrder.indexOf(stepKey)
      
      if (stepIndex < orderIndex) return 'completed'
      if (stepIndex === orderIndex) return 'current'
      return 'pending'
    }

    const canCancelOrder = (order) => {
      const now = new Date()
      const orderTime = new Date(order.created_at)
      const timeDiff = (now - orderTime) / 1000
      
      return order.status === 'pending' && timeDiff <= 30
    }

    const getCancelTimeLeft = (order) => {
      const now = new Date()
      const orderTime = new Date(order.created_at)
      const timeDiff = (now - orderTime) / 1000
      const timeLeft = 30 - timeDiff
      
      return Math.max(0, Math.floor(timeLeft))
    }

    const canReorder = (order) => {
      return ['delivered', 'cancelled'].includes(order.status)
    }

    const canRateOrder = (order) => {
      return order.status === 'delivered' && !order.rated
    }

    const canChatWithDriver = (order) => {
      return ['assigned', 'picked_up', 'in_transit'].includes(order.status) && order.driver_id
    }

    const showOrderChatbot = (order) => {
      return order.driver_id && ['assigned', 'picked_up', 'in_transit', 'delivered'].includes(order.status)
    }

    const isFavorite = (order) => {
      return favorites.value.includes(order.id)
    }

    const showBarcode = async (order) => {
      selectedOrderForBarcode.value = order
      showBarcodeModal.value = true
      
      await nextTick()
      
      try {
        const barcode = generateOrderBarcode(order.id)
        createBarcodeElement(barcode, 'barcode-display', {
          width: 250,
          height: 80,
          showText: true
        })
      } catch (error) {
        console.error('Error generating barcode:', error)
        toast.error('Failed to generate barcode')
      }
    }

    const downloadBarcode = () => {
      if (selectedOrderForBarcode.value) {
        const barcode = generateOrderBarcode(selectedOrderForBarcode.value.id)
        downloadBarcodeImage(barcode, `order-${selectedOrderForBarcode.value.id}-barcode.png`)
      }
    }

    const openOrderChatbot = (order) => {
      selectedOrderForChatbot.value = order
      showChatbotModal.value = true
      chatbotMessages.value = [
        {
          id: 1,
          type: 'bot',
          content: `Hello! I'm here to help with your order #${order.id}. How can I assist you today?`
        }
      ]
    }

    const sendChatbotMessage = () => {
      if (!chatbotInput.value.trim()) return

      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: chatbotInput.value.trim()
      }

      chatbotMessages.value.push(userMessage)

      // Generate bot response based on order status and user input
      const botResponse = generateChatbotResponse(chatbotInput.value.trim(), selectedOrderForChatbot.value)
      
      setTimeout(() => {
        chatbotMessages.value.push({
          id: Date.now() + 1,
          type: 'bot',
          content: botResponse
        })
      }, 1000)

      chatbotInput.value = ''
    }

    const generateChatbotResponse = (input, order) => {
      const lowerInput = input.toLowerCase()
      
      if (lowerInput.includes('status') || lowerInput.includes('where')) {
        return `Your order is currently ${formatStatus(order.status)}. ${getStatusMessage(order.status)}`
      }
      
      if (lowerInput.includes('driver') || lowerInput.includes('contact')) {
        const driver = getDriverInfo(order.driver_id)
        return driver ? `Your driver is ${driver.name}. Contact: ${driver.contact}` : 'Driver information is not available yet.'
      }
      
      if (lowerInput.includes('time') || lowerInput.includes('eta') || lowerInput.includes('when')) {
        const location = getDriverLocation(order.driver_id)
        return location ? `Estimated arrival time: ${location.eta} minutes` : 'ETA information is not available yet.'
      }
      
      if (lowerInput.includes('cancel')) {
        return canCancelOrder(order) ? 
          `You can still cancel this order. You have ${getCancelTimeLeft(order)} seconds left.` :
          'This order can no longer be cancelled. Cancellation is only allowed within 30 seconds of booking.'
      }
      
      return 'I can help you with order status, driver information, estimated arrival time, and cancellation policies. What would you like to know?'
    }

    const getStatusMessage = (status) => {
      const messages = {
        pending: 'We are processing your order and will assign a driver soon.',
        assigned: 'A driver has been assigned and will pick up your order shortly.',
        picked_up: 'Your order has been picked up and is on the way.',
        in_transit: 'Your order is currently being delivered.',
        delivered: 'Your order has been successfully delivered!'
      }
      return messages[status] || ''
    }

    const cancelOrder = async (orderId) => {
      try {
        const { error } = await supabase
          .from('orders')
          .update({ status: 'cancelled' })
          .eq('id', orderId)

        if (error) {
          toast.error('Failed to cancel order')
        } else {
          toast.success('Order cancelled successfully')
          if (cancelTimers.value[orderId]) {
            clearInterval(cancelTimers.value[orderId])
            delete cancelTimers.value[orderId]
          }
          loadOrders()
        }
      } catch (error) {
        console.error('Cancel order error:', error)
        toast.error('Failed to cancel order')
      }
    }

    const reorderService = (order) => {
      router.push({
        name: 'ServiceDetails',
        params: { type: order.service_type },
        query: { reorder: order.id }
      })
    }

    const openRatingModal = (order) => {
      selectedOrder.value = order
      showRatingModal.value = true
    }

    const submitRating = async () => {
      if (!selectedOrder.value) return

      try {
        const { error } = await supabase
          .from('order_ratings')
          .insert([
            {
              order_id: selectedOrder.value.id,
              user_id: currentUser.value.id,
              driver_id: selectedOrder.value.driver_id,
              rating: rating.value.rating,
              feedback: rating.value.feedback,
              created_at: new Date().toISOString()
            }
          ])

        if (error) {
          toast.error('Failed to submit rating')
        } else {
          await supabase
            .from('orders')
            .update({ rated: true })
            .eq('id', selectedOrder.value.id)

          toast.success('Rating submitted successfully!')
          showRatingModal.value = false
          rating.value = { rating: 5, feedback: '' }
          loadOrders()
        }
      } catch (error) {
        console.error('Submit rating error:', error)
        toast.error('Failed to submit rating')
      }
    }

    const chatWithDriver = (orderId) => {
      router.push({
        name: 'ChatWithDriver',
        params: { id: orderId }
      })
    }

    const toggleFavorite = async (order) => {
      try {
        if (isFavorite(order)) {
          const { error } = await supabase
            .from('user_favorites')
            .delete()
            .eq('user_id', currentUser.value.id)
            .eq('order_id', order.id)

          if (error) {
            toast.error('Failed to remove from favorites')
          } else {
            favorites.value = favorites.value.filter(id => id !== order.id)
            toast.success('Removed from favorites')
          }
        } else {
          const { error } = await supabase
            .from('user_favorites')
            .insert([
              {
                user_id: currentUser.value.id,
                order_id: order.id,
                service_type: order.service_type,
                service_details: order.service_details,
                created_at: new Date().toISOString()
              }
            ])

          if (error) {
            toast.error('Failed to add to favorites')
          } else {
            favorites.value.push(order.id)
            toast.success('Added to favorites')
          }
        }
      } catch (error) {
        console.error('Toggle favorite error:', error)
        toast.error('Failed to update favorites')
      }
    }

    onMounted(() => {
      loadOrders()
      loadDrivers()
      loadDriverLocations()
      loadFavorites()
      setupRealtimeSubscriptions()
    })

    onUnmounted(() => {
      if (ordersSubscription) {
        unsubscribe(ordersSubscription)
      }
      if (driversSubscription) {
        unsubscribe(driversSubscription)
      }
      if (locationsSubscription) {
        unsubscribe(locationsSubscription)
      }
      
      Object.values(cancelTimers.value).forEach(timer => {
        clearInterval(timer)
      })
    })

    return {
      activeTab,
      tabs,
      filteredOrders,
      orderSteps,
      showRatingModal,
      showBarcodeModal,
      showChatbotModal,
      selectedOrderForBarcode,
      selectedOrderForChatbot,
      chatbotMessages,
      chatbotInput,
      rating,
      getDisplayServiceType, // Updated to use the new function
      getDisplayPaymentMethod, // Updated to use the new function
      formatStatus,
      formatDate,
      formatServiceDetails,
      getStatusClass,
      getStepStatus,
      getDriverInfo,
      getDriverLocation,
      canCancelOrder,
      getCancelTimeLeft,
      canReorder,
      canRateOrder,
      canChatWithDriver,
      showOrderChatbot,
      isFavorite,
      showBarcode,
      downloadBarcode,
      openOrderChatbot,
      sendChatbotMessage,
      cancelOrder,
      reorderService,
      openRatingModal,
      submitRating,
      chatWithDriver,
      toggleFavorite
    }
  }
}
</script>

<style scoped>
.barcode-container {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
