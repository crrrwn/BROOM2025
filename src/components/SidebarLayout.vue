<template>
<div class="flex min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
  <!-- Animated Background Elements -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-20 left-20 w-16 h-16 sm:w-32 sm:h-32 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
    <div class="absolute top-40 right-16 sm:right-32 w-12 h-12 sm:w-24 sm:h-24 bg-emerald-500 rounded-full opacity-30 animate-bounce"></div>
    <div class="absolute bottom-32 left-20 sm:left-40 w-14 h-14 sm:w-28 sm:h-28 bg-green-500 rounded-full opacity-25 animate-pulse"></div>
    <div class="absolute bottom-20 right-20 w-10 h-10 sm:w-20 sm:h-20 bg-green-300 rounded-full opacity-40 animate-bounce"></div>
  </div>

  <!-- Mobile Overlay -->
  <div 
    v-if="isMobileMenuOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    @click="closeMobileMenu"
  ></div>

  <!-- Sidebar -->
  <div 
    class="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl shadow-2xl min-h-screen border-r border-green-200/50 transform transition-transform duration-300 ease-in-out lg:transform-none"
    :class="{ '-translate-x-full': !isMobileMenuOpen, 'translate-x-0': isMobileMenuOpen }"
  >
    <!-- Mobile Close Button -->
    <button 
      @click="closeMobileMenu"
      class="absolute top-4 right-4 p-2 text-gray-500 hover:text-green-600 lg:hidden z-10 rounded-lg hover:bg-green-50 transition-all duration-200"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <!-- Brand Section -->
    <div class="p-4 sm:p-6 border-b border-green-100 bg-gradient-to-r from-green-600 to-emerald-600">
      <div class="flex items-center space-x-2 sm:space-x-3 mb-2">
        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
          <span class="text-green-600 font-bold text-lg sm:text-xl">BS</span>
        </div>
        <div>
          <h1 class="text-lg sm:text-xl font-bold text-white">
            BROOOM SERVICES
          </h1>
          <p class="text-xs text-green-100">Delivery & Services</p>
        </div>
      </div>
    </div>
    
    <!-- Navigation -->
    <nav class="p-3 sm:p-4 space-y-1 sm:space-y-2 flex-1 overflow-y-auto">
      <router-link
        to="/dashboard"
        @click="closeMobileMenu"
        class="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 rounded-xl hover:bg-green-50 hover:text-green-700 transition-all duration-300 group transform hover:scale-105"
        :class="{ 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg': $route.path === '/dashboard' }"
      >
        <div class="p-1.5 sm:p-2 rounded-lg transition-all duration-300"
             :class="$route.path === '/dashboard' ? 'bg-white/20' : 'bg-green-100 group-hover:bg-green-200'">
          <svg class="w-4 h-4 sm:w-5 sm:h-5" :class="$route.path === '/dashboard' ? 'text-white' : 'text-green-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
          </svg>
        </div>
        <span class="font-medium text-sm sm:text-base">Dashboard</span>
      </router-link>
      
      <router-link
        to="/book-service"
        @click="closeMobileMenu"
        class="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 rounded-xl hover:bg-green-50 hover:text-green-700 transition-all duration-300 group transform hover:scale-105"
        :class="{ 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg': $route.path === '/book-service' }"
      >
        <div class="p-1.5 sm:p-2 rounded-lg transition-all duration-300"
             :class="$route.path === '/book-service' ? 'bg-white/20' : 'bg-green-100 group-hover:bg-green-200'">
          <svg class="w-4 h-4 sm:w-5 sm:h-5" :class="$route.path === '/book-service' ? 'text-white' : 'text-green-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </div>
        <span class="font-medium text-sm sm:text-base">Book Service</span>
      </router-link>
      
      <router-link
        to="/my-orders"
        @click="closeMobileMenu"
        class="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 rounded-xl hover:bg-green-50 hover:text-green-700 transition-all duration-300 group transform hover:scale-105"
        :class="{ 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg': $route.path === '/my-orders' }"
      >
        <div class="p-1.5 sm:p-2 rounded-lg transition-all duration-300"
             :class="$route.path === '/my-orders' ? 'bg-white/20' : 'bg-green-100 group-hover:bg-green-200'">
          <svg class="w-4 h-4 sm:w-5 sm:h-5" :class="$route.path === '/my-orders' ? 'text-white' : 'text-green-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <span class="font-medium text-sm sm:text-base">My Orders</span>
      </router-link>
      
      <router-link
        to="/profile"
        @click="closeMobileMenu"
        class="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 rounded-xl hover:bg-green-50 hover:text-green-700 transition-all duration-300 group transform hover:scale-105"
        :class="{ 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg': $route.path === '/profile' }"
      >
        <div class="p-1.5 sm:p-2 rounded-lg transition-all duration-300"
             :class="$route.path === '/profile' ? 'bg-white/20' : 'bg-green-100 group-hover:bg-green-200'">
          <svg class="w-4 h-4 sm:w-5 sm:h-5" :class="$route.path === '/profile' ? 'text-white' : 'text-green-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <span class="font-medium text-sm sm:text-base">Profile</span>
      </router-link>
    </nav>
    
    <!-- Logout Button -->
    <div class="p-4 sm:p-6 border-t border-green-100 mt-auto">
      <button
        @click="handleLogout"
        class="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 w-full group transform hover:scale-105 hover:shadow-lg"
      >
        <div class="p-1.5 sm:p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-all duration-300">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
        </div>
        <span class="font-medium text-sm sm:text-base">Logout</span>
      </button>
    </div>
  </div>
  
  <!-- Main Content -->
  <div class="flex-1 lg:ml-0 bg-white/80 backdrop-blur-sm min-h-screen relative z-10">
    <!-- Top Header -->
    <div class="bg-white/95 backdrop-blur-xl shadow-sm border-b border-green-100 sticky top-0 z-20">
      <div class="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div class="flex items-center space-x-3 sm:space-x-4">
          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 lg:hidden"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          
          <h2 class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Welcome to Dashboard
          </h2>
        </div>
        
        <div class="flex items-center space-x-2 sm:space-x-4">
          <!-- Notifications -->
          <NotificationBell />
          
          <!-- User Avatar -->
          <div class="flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full px-2 sm:px-4 py-1 sm:py-2 border border-green-200">
            <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span class="text-white text-xs sm:text-sm font-bold">
                {{ user?.user_metadata?.full_name ? user.user_metadata.full_name.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : 'U') }}
              </span>
            </div>
            <span class="text-gray-700 font-medium text-sm sm:text-base hidden sm:block">
              {{ user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Page Content -->
    <div class="p-3 sm:p-6">
      <slot />
    </div>
  </div>
  
  <!-- AI Chat Button -->
  <div class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
    <button
      @click="toggleAIChat"
      class="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-green-500/25 hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse"
    >
      <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
    </button>
  </div>
  
  <!-- AI Chat Component -->
  <AIChat v-if="showAIChat" @close="toggleAIChat" />
</div>
</template>

<script>
import { signOut } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'
import AIChat from '@/components/AIChat.vue'
import NotificationBell from '@/components/NotificationBell.vue'

export default {
name: 'SidebarLayout',
components: {
  AIChat,
  NotificationBell
},
data() {
  return {
    showAIChat: false,
    isMobileMenuOpen: false,
    user: null
  }
},
methods: {
  async handleLogout() {
    try {
      console.log('🚪 Logging out...')
      await signOut()
      console.log('✅ Logout successful')
      window.location.href = '/auth/login'
    } catch (error) {
      console.error('💥 Logout error:', error)
    }
  },
  toggleAIChat() {
    this.showAIChat = !this.showAIChat
    console.log('💬 AI Chat toggled:', this.showAIChat)
  },
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
    console.log('📱 Mobile menu toggled:', this.isMobileMenuOpen)
  },
  closeMobileMenu() {
    this.isMobileMenuOpen = false
    console.log('📱 Mobile menu closed')
  },
  async getUserData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      this.user = user
    } catch (error) {
      console.error('Error getting user:', error)
    }
  },
},
mounted() {
  this.getUserData()
  // Close mobile menu when window is resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      this.isMobileMenuOpen = false
    }
  })
}
}
</script>

<style scoped>
@keyframes float {
0%, 100% { transform: translateY(0px); }
50% { transform: translateY(-10px); }
}

.animate-float {
animation: float 3s ease-in-out infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
width: 6px;
}

::-webkit-scrollbar-track {
background: #f1f1f1;
border-radius: 10px;
}

::-webkit-scrollbar-thumb {
background: linear-gradient(to bottom, #22c55e, #10b981);
border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
background: linear-gradient(to bottom, #16a34a, #059669);
}

/* Ensure sidebar is properly positioned on mobile */
@media (max-width: 1023px) {
.sidebar-mobile {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 50;
}
}
</style>
