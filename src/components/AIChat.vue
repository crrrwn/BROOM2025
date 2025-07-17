<template>
  <div v-if="showChat" class="fixed bottom-4 right-4 z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 h-96 flex flex-col border border-gray-200 dark:border-gray-600">
      <!-- Chat Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600 bg-green-600 text-white rounded-t-lg">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
            <svg class="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold">QuickServe AI</h3>
            <p class="text-xs text-green-100">{{ isTyping ? 'Typing...' : 'Online' }}</p>
          </div>
        </div>
        <button @click="toggleChat" class="text-white hover:text-green-200 transition-colors">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3" ref="chatContainer">
        <div v-for="message in chatMessages" :key="message.id" :class="[
          'flex',
          message.type === 'user' ? 'justify-end' : 'justify-start'
        ]">
          <div :class="[
            'max-w-xs px-3 py-2 rounded-lg text-sm',
            message.type === 'user' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
          ]">
            <p v-html="formatMessage(message.content)"></p>
            <p :class="[
              'text-xs mt-1',
              message.type === 'user' ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'
            ]">
              {{ formatTime(message.timestamp) }}
            </p>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="flex justify-start">
          <div class="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 max-w-xs">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="p-3 border-t border-gray-200 dark:border-gray-600">
        <div class="flex flex-wrap gap-1 mb-2">
          <button v-for="action in quickActions" :key="action" @click="sendQuickMessage(action)" class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            {{ action }}
          </button>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-3 border-t border-gray-200 dark:border-gray-600">
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <input v-model="userMessage" type="text" placeholder="Ask me anything..." class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" maxlength="200">
          <button type="submit" :disabled="!userMessage.trim() || isTyping" class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- Chat Toggle Button -->
  <button v-if="!showChat" @click="toggleChat" class="fixed bottom-4 right-4 z-50 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
    </svg>
    <div v-if="hasUnreadMessages" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
      <span class="text-xs text-white">!</span>
    </div>
  </button>
</template>

<script>
import { ref, computed, onMounted, inject, nextTick } from 'vue'

export default {
  name: 'AIChat',
  setup() {
    const currentUser = inject('currentUser')
    const toast = inject('toast')
    
    const showChat = ref(false)
    const userMessage = ref('')
    const isTyping = ref(false)
    const chatContainer = ref(null)
    const hasUnreadMessages = ref(false)
    
    const chatMessages = ref([
      {
        id: 1,
        type: 'bot',
        content: `Hello ${currentUser.value?.user_metadata?.first_name || 'there'}! 👋 I'm your QuickServe AI assistant. How can I help you today?`,
        timestamp: new Date()
      }
    ])

    const quickActions = ref([
      'Track my order',
      'Book a service',
      'Payment help',
      'Contact driver',
      'Cancel order',
      'FAQ'
    ])

    const aiResponses = {
      'track my order': 'I can help you track your order! Please go to the <span class="font-semibold text-green-600 dark:text-green-400">My Orders</span> section to see real-time updates on all your orders.',
      'book a service': 'Ready to book a new service? Click on <span class="font-semibold text-green-600 dark:text-green-400">Book a Service</span> to choose from our available services like food delivery, bill payments, and more!',
      'payment help': 'For payment assistance, you can upload payment proof in the <span class="font-semibold text-green-600 dark:text-green-400">Upload Payment</span> section. We accept GCash, online banking, and cash on delivery.',
      'contact driver': 'You can chat with your assigned driver once your order is confirmed. Look for the chat button in your order tracking page.',
      'cancel order': 'Orders can be cancelled within 30 seconds of booking. After that, please contact our support team.',
      'faq': 'Here are some common questions:<br>• How long does delivery take? Usually 30-60 minutes<br>• What areas do you serve? Currently serving Calapan City (5200)<br>• How do I pay? GCash, online banking, or cash on delivery',
      'hello': 'Hello! How can I assist you with your QuickServe experience today?',
      'hi': 'Hi there! What can I help you with?',
      'help': 'I\'m here to help! You can ask me about:<br>• Order tracking<br>• Booking services<br>• Payment methods<br>• Delivery areas<br>• Account settings',
      'services': 'We offer these services:<br>🍔 Food Delivery<br>💳 Bill Payments<br>📦 Pick-up & Drop<br>🛒 Grocery Shopping<br>💊 Medicine Delivery<br>🎁 Gift Delivery',
      'delivery time': 'Delivery usually takes 30-60 minutes depending on your location and the service type. You\'ll get real-time updates once your order is assigned to a driver.',
      'payment methods': 'We accept:<br>• GCash (with QR code)<br>• Online Banking<br>• Cash on Delivery (COD)',
      'delivery area': 'We currently serve Calapan City and surrounding areas (Zip Code: 5200). We\'re expanding to more locations soon!',
      'promo code': 'You can enter promo codes during checkout to get discounts on your orders. Check our homepage for current promotions!',
      'driver rating': 'After your order is delivered, you can rate your driver and leave feedback. This helps us maintain quality service.',
      'account': 'You can manage your account in the <span class="font-semibold text-green-600 dark:text-green-400">Profile</span> section where you can update your information, change password, and view order history.',
      'support': 'For additional support, you can contact us through the app or call our customer service. We\'re here to help 24/7!'
    }

    const detectIntent = (message) => {
      const lowerMessage = message.toLowerCase()
      
      // Check for exact matches first
      for (const [key, response] of Object.entries(aiResponses)) {
        if (lowerMessage.includes(key)) {
          return response
        }
      }

      // Check for order-related queries (Live tracking)
      if (lowerMessage.includes('order') && (lowerMessage.includes('where') || lowerMessage.includes('status') || lowerMessage.includes('track'))) {
        return 'I can help you track your order! Please go to the <span class="font-semibold text-green-600 dark:text-green-400">My Orders</span> section to see the current status and location of your delivery.'
      }

      // Check for booking queries (Smart redirect to forms)
      if (lowerMessage.includes('book') || lowerMessage.includes('order') || lowerMessage.includes('delivery') || lowerMessage.includes('new service')) {
        return 'Ready to place an order? Click on <span class="font-semibold text-green-600 dark:text-green-400">Book a Service</span> to choose from food delivery, bill payments, grocery shopping, and more!'
      }

      // Check for payment queries (Smart redirect to forms)
      if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('proof')) {
        return 'For payment assistance, you can upload payment proof in the <span class="font-semibold text-green-600 dark:text-green-400">Upload Payment</span> section. We accept GCash, online banking, and cash on delivery.'
      }

      // Check for location queries
      if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('area')) {
        return 'We deliver within Calapan City (Zip Code: 5200). Make sure your delivery address is within our service area.'
      }

      // Check for time-related queries
      if (lowerMessage.includes('time') || lowerMessage.includes('long') || lowerMessage.includes('when')) {
        return 'Delivery typically takes 30-60 minutes. You\'ll receive real-time updates once a driver is assigned to your order.'
      }

      // Check for price queries
      if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
        return 'Pricing varies by service type and distance. You\'ll see the exact cost breakdown before confirming your order, including service fees and delivery charges.'
      }

      // Default response
      return 'I\'m here to help! You can ask me about order tracking, booking services, payment methods, delivery areas, or any other questions about QuickServe. What would you like to know?'
    }

    const sendMessage = async () => {
      if (!userMessage.value.trim()) return

      const message = userMessage.value.trim()
      
      // Add user message
      chatMessages.value.push({
        id: Date.now(),
        type: 'user',
        content: message,
        timestamp: new Date()
      })

      userMessage.value = ''
      scrollToBottom()

      // Show typing indicator
      isTyping.value = true

      // Simulate AI thinking time
      setTimeout(() => {
        const response = detectIntent(message)
        
        // Add AI response
        chatMessages.value.push({
          id: Date.now() + 1,
          type: 'bot',
          content: response,
          timestamp: new Date()
        })

        isTyping.value = false
        scrollToBottom()
      }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
    }

    const sendQuickMessage = (action) => {
      userMessage.value = action
      sendMessage()
    }

    const toggleChat = () => {
      showChat.value = !showChat.value
      if (showChat.value) {
        hasUnreadMessages.value = false
        scrollToBottom()
      }
    }

    const scrollToBottom = () => {
      nextTick(() => {
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight
        }
      })
    }

    const formatMessage = (content) => {
      // Convert line breaks to HTML and allow span tags for styling
      return content.replace(/\n/g, '<br>')
    }

    const formatTime = (timestamp) => {
      const date = new Date(timestamp)
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    // Show welcome message after a delay
    onMounted(() => {
      setTimeout(() => {
        if (!showChat.value) {
          hasUnreadMessages.value = true
        }
      }, 5000)
    })

    return {
      showChat,
      userMessage,
      isTyping,
      chatContainer,
      hasUnreadMessages,
      chatMessages,
      quickActions,
      sendMessage,
      sendQuickMessage,
      toggleChat,
      formatMessage,
      formatTime
    }
  }
}
</script>
