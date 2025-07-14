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
          
          <router-link to="/upload-payment" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 transition-colors">
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
            <div class="ml-4 flex items-center">
              <img v-if="driverInfo" :src="driverInfo.avatar_url || '/placeholder.svg?height=32&width=32'" :alt="driverInfo.name" class="w-8 h-8 rounded-full mr-3">
              <div>
                <h1 class="text-lg font-semibold text-gray-900 dark:text-white">{{ driverInfo?.name || 'Driver' }}</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">Order #{{ orderId }}</p>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <button @click="callDriver" class="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </button>
            
            <router-link :to="{ name: 'OrderTracking', params: { id: orderId } }" class="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              </svg>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Chat Content -->
      <main class="h-[calc(100vh-4rem)] flex flex-col">
        <!-- Chat Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
          <div v-if="messages.length === 0" class="text-center py-12">
            <svg class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Start a conversation</h3>
            <p class="text-gray-500 dark:text-gray-400">Send a message to your driver to get updates about your order.</p>
          </div>

          <div v-for="message in messages" :key="message.id" :class="[
            'flex',
            message.sender_type === 'user' ? 'justify-end' : 'justify-start'
          ]">
            <div :class="[
              'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
              message.sender_type === 'user' 
                ? 'bg-green-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
            ]">
              <p class="text-sm">{{ message.message }}</p>
              <p :class="[
                'text-xs mt-1',
                message.sender_type === 'user' 
                  ? 'text-green-100' 
                  : 'text-gray-500 dark:text-gray-400'
              ]">
                {{ formatTime(message.created_at) }}
                <span v-if="message.sender_type === 'user' && message.read_at" class="ml-1">✓✓</span>
                <span v-else-if="message.sender_type === 'user'" class="ml-1">✓</span>
              </p>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isDriverTyping" class="flex justify-start">
            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 max-w-xs">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Driver is typing...</p>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="border-t border-gray-200 dark:border-gray-700 p-4">
          <div class="flex flex-wrap gap-2 mb-4">
            <button v-for="action in quickActions" :key="action.text" @click="sendQuickMessage(action.text)" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              {{ action.text }}
            </button>
          </div>
        </div>

        <!-- Message Input -->
        <div class="border-t border-gray-200 dark:border-gray-700 p-4">
          <form @submit.prevent="sendMessage" class="flex space-x-2">
            <input v-model="newMessage" @input="handleTyping" type="text" placeholder="Type your message..." class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" maxlength="500">
            
            <button type="button" @click="showEmojiPicker = !showEmojiPicker" class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
            
            <button type="submit" :disabled="!newMessage.trim() || isSending" class="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <svg v-if="isSending" class="h-5 w-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </form>

          <!-- Emoji Picker -->
          <div v-if="showEmojiPicker" class="absolute bottom-20 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4 grid grid-cols-8 gap-2 max-w-xs">
            <button v-for="emoji in emojis" :key="emoji" @click="addEmoji(emoji)" class="text-xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 transition-colors">
              {{ emoji }}
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, inject, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase, subscribeToTable, unsubscribe } from '../../lib/supabase'

export default {
  name: 'ChatWithDriver',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const currentUser = inject('currentUser')
    const toast = inject('toast')
    
    const sidebarOpen = ref(false)
    const messages = ref([])
    const newMessage = ref('')
    const isSending = ref(false)
    const isDriverTyping = ref(false)
    const showEmojiPicker = ref(false)
    const messagesContainer = ref(null)
    const orderId = ref(route.params.id)
    const order = ref(null)
    const driverInfo = ref(null)

    let messagesSubscription = null
    let typingTimeout = null

    const quickActions = ref([
      { text: "Where are you now?" },
      { text: "How long until delivery?" },
      { text: "Please call me when you arrive" },
      { text: "Thank you!" },
      { text: "I'm waiting outside" },
      { text: "Please be careful with the items" }
    ])

    const emojis = ref([
      '😊', '😂', '😍', '🤔', '😢', '😡', '👍', '👎',
      '❤️', '🔥', '💯', '🎉', '🙏', '👋', '✅', '❌'
    ])

    const loadOrder = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId.value)
          .eq('user_id', currentUser.value.id)
          .single()

        if (error) {
          console.error('Error loading order:', error)
          toast.error('Order not found')
          router.push('/my-orders')
          return
        }

        order.value = data
        
        if (data.driver_id) {
          loadDriverInfo(data.driver_id)
        } else {
          toast.error('No driver assigned to this order yet')
          router.push('/my-orders')
        }
      } catch (error) {
        console.error('Error loading order:', error)
        toast.error('Failed to load order details')
      }
    }

    const loadDriverInfo = async (driverId) => {
      try {
        const { data, error } = await supabase
          .from('drivers')
          .select('*')
          .eq('id', driverId)
          .single()

        if (!error && data) {
          driverInfo.value = data
        }
      } catch (error) {
        console.error('Error loading driver info:', error)
      }
    }

    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('order_messages')
          .select('*')
          .eq('order_id', orderId.value)
          .order('created_at', { ascending: true })

        if (error) {
          console.error('Error loading messages:', error)
        } else {
          messages.value = data || []
          scrollToBottom()
          markMessagesAsRead()
        }
      } catch (error) {
        console.error('Error loading messages:', error)
      }
    }

    const sendMessage = async () => {
      if (!newMessage.value.trim() || isSending.value) return

      isSending.value = true

      try {
        const { error } = await supabase
          .from('order_messages')
          .insert([
            {
              order_id: orderId.value,
              sender_id: currentUser.value.id,
              sender_type: 'user',
              message: newMessage.value.trim(),
              created_at: new Date().toISOString()
            }
          ])

        if (error) {
          throw error
        }

        newMessage.value = ''
        showEmojiPicker.value = false
      } catch (error) {
        console.error('Send message error:', error)
        toast.error('Failed to send message')
      } finally {
        isSending.value = false
      }
    }

    const sendQuickMessage = (message) => {
      newMessage.value = message
      sendMessage()
    }

    const addEmoji = (emoji) => {
      newMessage.value += emoji
      showEmojiPicker.value = false
    }

    const handleTyping = () => {
      // Send typing indicator to driver
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }

      // Send typing start
      supabase
        .from('typing_indicators')
        .upsert({
          order_id: orderId.value,
          user_id: currentUser.value.id,
          is_typing: true,
          updated_at: new Date().toISOString()
        })

      typingTimeout = setTimeout(() => {
        // Send typing stop
        supabase
          .from('typing_indicators')
          .upsert({
            order_id: orderId.value,
            user_id: currentUser.value.id,
            is_typing: false,
            updated_at: new Date().toISOString()
          })
      }, 2000)
    }

    const markMessagesAsRead = async () => {
      try {
        await supabase
          .from('order_messages')
          .update({ read_at: new Date().toISOString() })
          .eq('order_id', orderId.value)
          .eq('sender_type', 'driver')
          .is('read_at', null)
      } catch (error) {
        console.error('Error marking messages as read:', error)
      }
    }

    const scrollToBottom = () => {
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
      })
    }

    const setupRealtimeSubscriptions = () => {
      // Subscribe to new messages
      messagesSubscription = subscribeToTable('order_messages', (payload) => {
        if (payload.eventType === 'INSERT' && payload.new.order_id === parseInt(orderId.value)) {
          messages.value.push(payload.new)
          scrollToBottom()
          
          if (payload.new.sender_type === 'driver') {
            markMessagesAsRead()
          }
        }
      }, `order_id=eq.${orderId.value}`)

      // Subscribe to typing indicators
      subscribeToTable('typing_indicators', (payload) => {
        if (payload.new.order_id === parseInt(orderId.value) && payload.new.user_id !== currentUser.value.id) {
          isDriverTyping.value = payload.new.is_typing
        }
      }, `order_id=eq.${orderId.value}`)
    }

    const formatTime = (dateString) => {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMins / 60)
      const diffDays = Math.floor(diffHours / 24)

      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays < 7) return `${diffDays}d ago`
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const callDriver = () => {
      if (driverInfo.value?.contact) {
        window.open(`tel:${driverInfo.value.contact}`)
      } else {
        toast.error('Driver contact not available')
      }
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
      loadOrder()
      loadMessages()
      setupRealtimeSubscriptions()
    })

    onUnmounted(() => {
      if (messagesSubscription) {
        unsubscribe(messagesSubscription)
      }
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }
    })

    return {
      sidebarOpen,
      messages,
      newMessage,
      isSending,
      isDriverTyping,
      showEmojiPicker,
      messagesContainer,
      orderId,
      driverInfo,
      quickActions,
      emojis,
      sendMessage,
      sendQuickMessage,
      addEmoji,
      handleTyping,
      formatTime,
      callDriver,
      handleLogout
    }
  }
}
</script>
