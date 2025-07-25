<template>
<div id="app">
  <!-- Show sidebar layout only when user is logged in and not on auth pages or admin pages -->
  <SidebarLayout v-if="currentUser && !isAuthPage && !isAdminRoute">
    <router-view />
  </SidebarLayout>
  
  <!-- Show regular router-view for homepage, auth pages, and admin pages -->
  <router-view v-else />
  
  <!-- Toast Notifications -->
  <div v-if="showToast" class="toast-container">
    <div :class="['toast', toastType]">
      {{ toastMessage }}
    </div>
  </div>
</div>
</template>

<script>
import { ref, provide, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from './lib/supabase'
import SidebarLayout from './components/SidebarLayout.vue'

export default {
name: 'App',
components: {
  SidebarLayout
},
setup() {
  const route = useRoute()
  const router = useRouter()
  const currentUser = ref(null)
  const isLoading = ref(true)

  // Check if current route is an auth page or homepage
  const isAuthPage = computed(() => {
    const authRoutes = ['/', '/login', '/register', '/forgot-password', '/auth/reset-password', '/auth/email-confirmed']
    return authRoutes.includes(route.path)
  })

  // Check if current route is an admin route
  const isAdminRoute = computed(() => {
    return route.path.startsWith('/admin')
  })

  // Toast notification system (existing code)
  const toastMessage = ref('')
  const toastType = ref('success')
  const showToast = ref(false)

  const toast = {
    success: (message) => {
      toastMessage.value = message
      toastType.value = 'success'
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 3000)
    },
    error: (message) => {
      toastMessage.value = message
      toastType.value = 'error'
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 3000)
    },
    info: (message) => {
      toastMessage.value = message
      toastType.value = 'info'
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 3000)
    }
  }

  // Initialize auth state (existing code)
  const initializeAuth = async () => {
    console.log('🔐 INITIALIZING AUTH...')
    
    try {
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      console.log('📱 Session:', session)
      console.log('❌ Session Error:', sessionError)

      if (session?.user) {
        console.log('✅ User found in session:', session.user.id)
        currentUser.value = session.user
      } else {
        console.log('❌ No user in session')
        currentUser.value = null
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('🔄 Auth state changed:', event)
        console.log('👤 New session user:', session?.user?.id)
        
        if (session?.user) {
          currentUser.value = session.user
          console.log('✅ User logged in:', session.user.id)
        } else {
          currentUser.value = null
          console.log('❌ User logged out')
          // Redirect to homepage when user logs out
          if (!route.path.startsWith('/admin')) {
            router.push('/')
          }
        }
      })

    } catch (error) {
      console.error('💥 Auth initialization error:', error)
      currentUser.value = null
    } finally {
      isLoading.value = false
      console.log('✅ Auth initialization completed')
    }
  }

  // Provide to all child components
  provide('currentUser', currentUser)
  provide('toast', toast)
  provide('isLoading', isLoading)

  onMounted(() => {
    console.log('🚀 APP MOUNTED - Initializing auth...')
    initializeAuth()
  })

  return {
    currentUser,
    isLoading,
    isAuthPage,
    isAdminRoute,
    toastMessage,
    toastType,
    showToast
  }
}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

body {
font-family: 'Inter', sans-serif;
background-color: #f9fafb;
color: #111827;
line-height: 1.6;
}

#app {
min-height: 100vh;
}

/* Toast Notifications */
.toast-container {
position: fixed;
top: 20px;
right: 20px;
z-index: 9999;
}

.toast {
padding: 12px 20px;
border-radius: 8px;
color: white;
font-weight: 500;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
animation: slideIn 0.3s ease-out;
}

.toast.success {
background-color: #10b981;
}

.toast.error {
background-color: #ef4444;
}

.toast.info {
background-color: #3b82f6;
}

@keyframes slideIn {
from {
  transform: translateX(100%);
  opacity: 0;
}
to {
  transform: translateX(0);
  opacity: 1;
}
}

/* Scrollbar Styling */
::-webkit-scrollbar {
width: 6px;
}

::-webkit-scrollbar-track {
background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
background: #cbd5e1;
border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
background: #94a3b8;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
body {
  background-color: #111827;
  color: #f9fafb;
}

::-webkit-scrollbar-track {
  background: #374151;
}

::-webkit-scrollbar-thumb {
  background: #6b7280;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
}
</style>
