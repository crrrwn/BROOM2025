<template>
  <div class="relative">
    <!-- Notification Bell Button -->
    <button
      @click="toggleNotifications"
      class="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
      </svg>
      
      <!-- Notification Badge -->
      <span
        v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
      >
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <!-- Notifications Dropdown -->
    <div
      v-if="showNotifications"
      class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden"
    >
      <!-- Header -->
      <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('notifications.title') }}
        </h3>
        <div class="flex items-center space-x-2">
          <button
            v-if="unreadCount > 0"
            @click="markAllAsRead"
            class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {{ $t('notifications.markAllRead') }}
          </button>
          <button
            @click="showNotifications = false"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="max-h-80 overflow-y-auto">
        <div v-if="loading" class="p-4">
          <div class="space-y-3">
            <div v-for="i in 3" :key="i" class="animate-pulse">
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="notifications.length === 0" class="p-8 text-center">
          <svg class="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          <p class="text-gray-500 dark:text-gray-400">{{ $t('notifications.empty') }}</p>
        </div>

        <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            @click="handleNotificationClick(notification)"
            class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
            :class="{ 'bg-blue-50 dark:bg-blue-900/20': !notification.is_read }"
          >
            <div class="flex items-start space-x-3">
              <!-- Notification Icon -->
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center"
                  :class="getNotificationIconClass(notification.type)"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      :d="getNotificationIconPath(notification.type)"
                    ></path>
                  </svg>
                </div>
              </div>

              <!-- Notification Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ notification.title }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {{ notification.message }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {{ formatTime(notification.created_at) }}
                    </p>
                  </div>
                  <div v-if="!notification.is_read" class="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="notifications.length > 0" class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <button
          @click="viewAllNotifications"
          class="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          {{ $t('notifications.viewAll') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../lib/supabase.js'
import { useToast } from 'vue-toastification'

export default {
  name: 'NotificationBell',
  data() {
    return {
      showNotifications: false,
      notifications: [],
      loading: false,
      unreadCount: 0,
      subscription: null
    }
  },
  setup() {
    const toast = useToast()
    return { toast }
  },
  async mounted() {
    await this.loadNotifications()
    await this.setupRealtimeSubscription()
    
    // Close dropdown when clicking outside
    document.addEventListener('click', this.closeDropdown)
  },
  beforeUnmount() {
    if (this.subscription) {
      supabase.removeChannel(this.subscription)
    }
    document.removeEventListener('click', this.closeDropdown)
  },
  methods: {
    async loadNotifications() {
      this.loading = true
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          console.log('❌ No authenticated user found')
          this.notifications = []
          this.unreadCount = 0
          return
        }

        console.log('👤 Loading notifications for user:', user.id)

        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20)

        if (error) {
          console.error('💥 Database error loading notifications:', error)
          this.toast.error('Failed to load notifications: ' + error.message)
          return
        }

        console.log('📬 Loaded notifications:', data?.length || 0, 'notifications')
        this.notifications = data || []
        this.unreadCount = this.notifications.filter(n => !n.is_read).length
        
        if (this.notifications.length === 0) {
          console.log('📭 No notifications found for user')
        } else {
          console.log('📬 Found', this.notifications.length, 'notifications,', this.unreadCount, 'unread')
        }
      } catch (error) {
        console.error('💥 Error loading notifications:', error)
        this.toast.error('Failed to load notifications')
      } finally {
        this.loading = false
      }
    },
    async setupRealtimeSubscription() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          console.log('No user for realtime subscription')
          return
        }

        console.log('Setting up realtime subscription for user:', user.id)

        this.subscription = supabase
          .channel(`notifications-${user.id}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'notifications',
              filter: `user_id=eq.${user.id}`
            },
            (payload) => {
              console.log('New notification received:', payload.new)
              this.notifications.unshift(payload.new)
              if (!payload.new.is_read) {
                this.unreadCount++
              }
              
              // Show toast notification
              this.toast.info(payload.new.title)
            }
          )
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'notifications',
              filter: `user_id=eq.${user.id}`
            },
            (payload) => {
              console.log('Notification updated:', payload.new)
              const index = this.notifications.findIndex(n => n.id === payload.new.id)
              if (index !== -1) {
                this.notifications[index] = payload.new
                this.unreadCount = this.notifications.filter(n => !n.is_read).length
              }
            }
          )
          .subscribe((status) => {
            console.log('Subscription status:', status)
          })
      } catch (error) {
        console.error('Error setting up realtime subscription:', error)
      }
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications
      if (this.showNotifications && this.notifications.length === 0) {
        this.loadNotifications()
      }
    },
    async markAllAsRead() {
      try {
        console.log('📖 Marking all notifications as read')
        
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          console.error('❌ No authenticated user for marking all notifications as read')
          return
        }

        const unreadNotifications = this.notifications.filter(n => !n.is_read)
        if (unreadNotifications.length === 0) {
          this.toast.info('No unread notifications to mark')
          return
        }

        const { error } = await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('user_id', user.id)
          .eq('is_read', false)

        if (error) {
          console.error('💥 Database error marking all notifications as read:', error)
          this.toast.error('Failed to mark notifications as read: ' + error.message)
          return
        }

        console.log('✅ Successfully marked all notifications as read')
        this.notifications = this.notifications.map(n => ({ ...n, is_read: true }))
        this.unreadCount = 0

        this.toast.success('All notifications marked as read')
      } catch (error) {
        console.error('💥 Error marking all notifications as read:', error)
        this.toast.error('Failed to mark notifications as read')
      }
    },
    async handleNotificationClick(notification) {
      console.log('🖱️ Notification clicked:', notification.id)
      
      // Mark as read if not already read
      if (!notification.is_read) {
        try {
          console.log('📖 Marking notification as read:', notification.id)
          
          const { data: { user } } = await supabase.auth.getUser()
          if (!user) {
            console.error('❌ No authenticated user for marking notification as read')
            return
          }

          const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', notification.id)
            .eq('user_id', user.id) // Add user_id check for security

          if (error) {
            console.error('💥 Database error marking notification as read:', error)
            this.toast.error('Failed to mark notification as read: ' + error.message)
            return
          }

          console.log('✅ Successfully marked notification as read')
          notification.is_read = true
          this.unreadCount = Math.max(0, this.unreadCount - 1)
          this.toast.success('Notification marked as read')
        } catch (error) {
          console.error('💥 Error marking notification as read:', error)
          this.toast.error('Failed to mark notification as read')
          return
        }
      }

      // Navigate to action URL if available
      if (notification.action_url && notification.action_url !== '/profile') {
        console.log('🔗 Navigating to:', notification.action_url)
        this.$router.push(notification.action_url)
        this.showNotifications = false
      } else {
        // Show notification details in a modal or expanded view
        this.showNotificationDetails(notification)
      }
    },
    viewAllNotifications() {
      // Navigate to notifications page (if you have one)
      this.$router.push('/notifications')
      this.showNotifications = false
    },
    closeDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.showNotifications = false
      }
    },
    getNotificationIconClass(type) {
      const classes = {
        'order_update': 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
        'payment': 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
        'promo': 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
        'system': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
        'driver': 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
      }
      return classes[type] || classes['system']
    },
    getNotificationIconPath(type) {
      const paths = {
        'order_update': 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
        'payment': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        'promo': 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
        'system': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        'driver': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
      }
      return paths[type] || paths['system']
    },
    formatTime(timestamp) {
      const now = new Date()
      const time = new Date(timestamp)
      const diffInMinutes = Math.floor((now - time) / (1000 * 60))

      if (diffInMinutes < 1) return 'Just now'
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`
      
      const diffInHours = Math.floor(diffInMinutes / 60)
      if (diffInHours < 24) return `${diffInHours}h ago`
      
      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays < 7) return `${diffInDays}d ago`
      
      return time.toLocaleDateString()
    },
    showNotificationDetails(notification) {
      // Create a simple modal or alert to show notification details
      const details = `
Title: ${notification.title}

Message: ${notification.message}

Date: ${this.formatTime(notification.created_at)}

Type: ${notification.type}
      `
      
      if (confirm(details + '\n\nWould you like to go to your profile?')) {
        this.$router.push('/profile')
        this.showNotifications = false
      }
    }
  }
}
</script>
