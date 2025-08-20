<template>
  <div class="min-h-screen bg-white flex">
    <!-- Mobile menu overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 z-40 lg:hidden">
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75" @click="sidebarOpen = false"></div>
    </div>

    <!-- Sidebar - Always visible on desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0 lg:sticky lg:top-0 lg:h-screen">
      <div class="flex flex-col w-64">
        <div class="flex flex-col h-screen bg-white shadow-2xl overflow-hidden border-r" style="border-color: #A8EB12;">
          <!-- Logo -->
          <div class="flex items-center justify-center h-16 px-4" style="background: linear-gradient(to right, #74E600, #3ED400);">
            <h1 class="text-xl font-bold text-white">ADMIN PANEL</h1>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <router-link
              :to="{ name: 'AdminDashboard' }"
              class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              :class="{ 'nav-link-active': $route.name === 'AdminDashboard' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
              </svg>
              Dashboard
            </router-link>

            <router-link
              :to="{ name: 'AdminUsers' }"
              class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              :class="{ 'nav-link-active': $route.name === 'AdminUsers' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
              Users
            </router-link>

            <router-link
              :to="{ name: 'AdminOrders' }"
              class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              :class="{ 'nav-link-active': $route.name === 'AdminOrders' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              Orders
            </router-link>

            <router-link
              :to="{ name: 'AdminPayments' }"
              class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              :class="{ 'nav-link-active': $route.name === 'AdminPayments' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
              Payments
            </router-link>

            <router-link
              :to="{ name: 'AdminDrivers' }"
              class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              :class="{ 'nav-link-active': $route.name === 'AdminDrivers' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
              </svg>
              Drivers
            </router-link>

            <router-link
              :to="{ name: 'AdminDriverApplications' }"
              class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              :class="{ 'nav-link-active': $route.name === 'AdminDriverApplications' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Driver Applications
            </router-link>

            <router-link
              :to="{ name: 'AdminPricingFraud' }"
              class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              :class="{ 'nav-link-active': $route.name === 'AdminPricingFraud' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              Pricing & Fraud Panel
            </router-link>

            <router-link
              :to="{ name: 'AdminSystemSettings' }"
              class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              :class="{ 'nav-link-active': $route.name === 'AdminSystemSettings' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              System Settings
            </router-link>
          </nav>

          <!-- Admin Profile -->
          <div class="p-4 border-t" style="border-color: #A8EB12;">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style="background: linear-gradient(to right, #74E600, #3ED400);">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Admin</p>
                <p class="text-xs text-gray-500">broomtechservices@gmail.com</p>
              </div>
            </div>
            <button
              @click="handleLogout"
              class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-300 transform hover:scale-105 shadow-sm"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <div :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]">
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="flex items-center justify-center h-16 px-4" style="background: linear-gradient(to right, #74E600, #3ED400);">
          <h1 class="text-xl font-bold text-white">ADMIN PANEL</h1>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <router-link
            :to="{ name: 'AdminDashboard' }"
            class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            :class="{ 'nav-link-active': $route.name === 'AdminDashboard' }"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
            </svg>
            Dashboard
          </router-link>

          <router-link
            :to="{ name: 'AdminUsers' }"
            class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            :class="{ 'nav-link-active': $route.name === 'AdminUsers' }"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
            Users
          </router-link>

          <router-link
            :to="{ name: 'AdminOrders' }"
            class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            :class="{ 'nav-link-active': $route.name === 'AdminOrders' }"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Orders
          </router-link>

          <router-link
            :to="{ name: 'AdminPayments' }"
            class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            :class="{ 'nav-link-active': $route.name === 'AdminPayments' }"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            Payments
          </router-link>

          <router-link
            :to="{ name: 'AdminDrivers' }"
            class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            :class="{ 'nav-link-active': $route.name === 'AdminDrivers' }"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
            </svg>
            Drivers
          </router-link>

          <router-link
            :to="{ name: 'AdminDriverApplications' }"
            class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            :class="{ 'nav-link-active': $route.name === 'AdminDriverApplications' }"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Driver Applications
          </router-link>

          <router-link
            :to="{ name: 'AdminPricingFraud' }"
            class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            :class="{ 'nav-link-active': $route.name === 'AdminPricingFraud' }"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            Pricing & Fraud Panel
          </router-link>

          <router-link
            :to="{ name: 'AdminSystemSettings' }"
            class="nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            :class="{ 'nav-link-active': $route.name === 'AdminSystemSettings' }"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            System Settings
          </router-link>
        </nav>

        <!-- Admin Profile -->
        <div class="p-4 border-t" style="border-color: #A8EB12;">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style="background: linear-gradient(to right, #74E600, #3ED400);">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">Admin</p>
              <p class="text-xs text-gray-500">broomtechservices@gmail.com</p>
            </div>
          </div>
          <button
            @click="handleLogout"
            class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-300 transform hover:scale-105 shadow-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-6 bg-white">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { adminLogout } from '@/lib/admin'

export default {
  name: 'AdminSidebarLayout',
  data() {
    return {
      sidebarOpen: false
    }
  },
  methods: {
    handleLogout() {
      adminLogout()
      this.$router.push('/admin/login')
    },
    getPageTitle() {
      const titles = {
        'AdminDashboard': 'Dashboard',
        'AdminUsers': 'Users Management',
        'AdminOrders': 'Orders Management',
        'AdminPayments': 'Payments Management',
        'AdminDrivers': 'Drivers Management',
        'AdminDriverApplications': 'Driver Applications',
        'AdminPricingFraud': 'Pricing & Fraud Panel',
        'AdminSystemSettings': 'System Settings'
      }
      return titles[this.$route.name] || 'Admin Panel'
    }
  }
}
</script>

<style scoped>
/* Fixed sidebar styles */
.lg\:sticky {
  position: sticky;
  height: 100vh;
}

/* Added proper CSS hover states for navigation links */
.nav-link {
  color: #374151; /* gray-700 */
  text-decoration: none;
}

.nav-link:hover {
  background-color: #A8EB12;
  color: #00C851;
}

.nav-link-active {
  background: linear-gradient(to right, #74E600, #3ED400);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.nav-link-active:hover {
  background: linear-gradient(to right, #74E600, #3ED400);
  color: white;
}

/* Added proper CSS hover states for mobile menu and view site buttons */
.mobile-menu-btn:hover {
  background-color: #A8EB12;
  color: #00C851;
}

.view-site-btn:hover {
  background-color: #A8EB12;
  color: #00C851;
}
</style>
