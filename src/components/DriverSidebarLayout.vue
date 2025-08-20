<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]">
      <!-- Sidebar Header -->
      <div class="flex items-center justify-between h-16 px-6 bg-blue-800">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="text-white font-bold text-lg">BROOM Driver</span>
        </div>
        <button @click="toggleSidebar" class="lg:hidden text-white hover:text-blue-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Driver Info -->
      <div class="px-6 py-4 bg-blue-800 border-b border-blue-700">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span class="text-white font-semibold text-sm">{{ driverInitials }}</span>
          </div>
          <div>
            <p class="text-white font-medium text-sm">{{ driverInfo?.first_name }} {{ driverInfo?.last_name }}</p>
            <p class="text-blue-200 text-xs">{{ driverInfo?.status || 'Active' }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="mt-6 px-3">
        <div class="space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            @click="handleNavClick(item)"
            :class="[
              'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
              $route.path === item.to
                ? 'bg-blue-800 text-white'
                : 'text-blue-100 hover:bg-blue-800 hover:text-white'
            ]"
          >
            <!-- Fixed icon rendering with inline SVG for proper SVG display -->
            <svg v-if="item.name === 'Dashboard'" class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
            <svg v-else-if="item.name === 'Available Bookings'" class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <svg v-else-if="item.name === 'My Assignments'" class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <svg v-else-if="item.name === 'Upload Proof'" class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <svg v-else-if="item.name === 'Profile'" class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ item.name }}
          </router-link>
        </div>
      </nav>

      <!-- Logout Button -->
      <div class="absolute bottom-0 left-0 right-0 p-4">
        <button
          @click="logout"
          class="w-full flex items-center px-3 py-2 text-sm font-medium text-blue-100 hover:bg-blue-800 hover:text-white rounded-lg transition-colors duration-200"
        >
          <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden lg:ml-0">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between h-16 px-6">
          <div class="flex items-center">
            <button
              @click="toggleSidebar"
              class="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 class="ml-4 text-xl font-semibold text-gray-900 lg:ml-0">{{ pageTitle }}</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="text-gray-500 hover:text-gray-700 relative">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12M7.05 5.84l3.12 3.12M4.03 8.86l3.12 3.12" />
              </svg>
              <span class="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto bg-gray-50">
        <div class="p-6">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { logoutDriver, getCurrentDriver } from '@/lib/driver'

export default {
  name: 'DriverSidebarLayout',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const toast = inject('toast')
    
    const sidebarOpen = ref(false)
    const driverInfo = ref(null)

    const navigation = [
      {
        name: 'Dashboard',
        to: '/driver/dashboard'
      },
      {
        name: 'Available Bookings',
        to: '/driver/available-bookings'
      },
      {
        name: 'My Assignments',
        to: '/driver/my-assignments'
      },
      {
        name: 'Upload Proof',
        to: '/driver/upload-proof'
      },
      {
        name: 'Profile',
        to: '/driver/profile'
      }
    ]

    const pageTitle = computed(() => {
      const currentNav = navigation.find(item => item.to === route.path)
      return currentNav ? currentNav.name : 'Driver Portal'
    })

    const driverInitials = computed(() => {
      if (!driverInfo.value) return 'D'
      const first = driverInfo.value.first_name?.[0] || ''
      const last = driverInfo.value.last_name?.[0] || ''
      return (first + last).toUpperCase() || 'D'
    })

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }

    const logout = async () => {
      try {
        await logoutDriver()
        toast.success('Logged out successfully')
        router.push('/driver/login')
      } catch (error) {
        console.error('Logout error:', error)
        toast.error('Error logging out')
      }
    }

    const loadDriverInfo = async () => {
      try {
        const driver = await getCurrentDriver()
        driverInfo.value = driver
      } catch (error) {
        console.error('Error loading driver info:', error)
      }
    }

    const handleNavClick = (item) => {
      console.log('[v0] Navigation clicked:', item.name, 'to:', item.to)
      console.log('[v0] Current route:', route.path)
      
      // Close sidebar on mobile after click
      if (window.innerWidth < 1024) {
        sidebarOpen.value = false
      }
    }

    onMounted(() => {
      loadDriverInfo()
    })

    return {
      sidebarOpen,
      navigation,
      pageTitle,
      driverInfo,
      driverInitials,
      toggleSidebar,
      logout,
      handleNavClick // Added to return object
    }
  }
}
</script>
