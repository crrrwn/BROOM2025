<template>
  <!-- Changed background from gradient to white and updated color scheme -->
  <div class="min-h-screen bg-white p-6">
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div class="space-y-2">
          <!-- Updated header colors to use specific green palette -->
          <h1 class="text-3xl font-bold text-gray-800">
            Admin Command Center
          </h1>
          <p class="text-gray-600 font-medium">Exclusive administrative control panel</p>
        </div>
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button 
            @click="forceRefreshData" 
            :disabled="loading"
            class="px-6 py-3 bg-gradient-to-r from-[#74E600] to-[#3ED400] text-white rounded-xl hover:from-[#3ED400] hover:to-[#00C851] disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <!-- Improved refresh icon styling -->
            <svg class="w-5 h-5" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span class="font-semibold">{{ loading ? 'Refreshing...' : 'Refresh Data' }}</span>
          </button>
          <!-- Updated last updated styling with new green colors -->
          <div class="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
            <span class="font-medium">Last updated:</span> {{ lastUpdated || 'Never' }}
          </div>
        </div>
      </div>

      <!-- Connection Status -->
      <div v-if="connectionError" class="bg-red-50 border-l-4 border-red-400 rounded-lg p-6 shadow-sm">
        <div class="flex items-center">
          <!-- Improved error icon -->
          <svg class="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <h3 class="text-lg font-semibold text-red-800">System Alert</h3>
            <p class="text-red-700">{{ connectionError }}</p>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <!-- Updated all stat cards with new green palette and white backgrounds -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Users -->
        <router-link 
          :to="{ name: 'AdminUsers' }"
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-100 hover:border-[#74E600] overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="p-4 bg-gradient-to-br from-[#A8EB12] to-[#74E600] rounded-xl group-hover:shadow-lg transition-all duration-300">
                <!-- Improved users icon -->
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Users</p>
                <p class="text-3xl font-bold text-gray-800">{{ cachedStats.totalUsers }}</p>
              </div>
            </div>
          </div>
          <div class="h-1 bg-gradient-to-r from-[#A8EB12] to-[#74E600]"></div>
        </router-link>

        <!-- Total Orders -->
        <router-link 
          :to="{ name: 'AdminOrders' }"
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-100 hover:border-[#3ED400] overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="p-4 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-xl group-hover:shadow-lg transition-all duration-300">
                <!-- Improved orders icon -->
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Today's Orders</p>
                <p class="text-3xl font-bold text-gray-800">{{ cachedStats.totalOrders }}</p>
              </div>
            </div>
          </div>
          <div class="h-1 bg-gradient-to-r from-[#74E600] to-[#3ED400]"></div>
        </router-link>

        <!-- Total Revenue -->
        <router-link 
          :to="{ name: 'AdminPayments' }"
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-100 hover:border-[#00C851] overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="p-4 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-xl group-hover:shadow-lg transition-all duration-300">
                <!-- Improved revenue icon -->
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Today's Revenue</p>
                <p class="text-3xl font-bold text-gray-800">₱{{ formatCurrency(cachedStats.totalRevenue) }}</p>
              </div>
            </div>
          </div>
          <div class="h-1 bg-gradient-to-r from-[#3ED400] to-[#00C851]"></div>
        </router-link>

        <!-- Total Drivers -->
        <router-link 
          :to="{ name: 'AdminDrivers' }"
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-100 hover:border-[#00C851] overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="p-4 bg-gradient-to-br from-[#00C851] to-[#3ED400] rounded-xl group-hover:shadow-lg transition-all duration-300">
                <!-- Improved drivers icon -->
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m8.25 4.5V16.5a1.5 1.5 0 011.5-1.5h2.25a1.5 1.5 0 011.5 1.5v1.875a1.125 1.125 0 01-1.125 1.125H16.5V18m-7.5-10.5h6.375c1.24 0 2.25 1.01 2.25 2.25v.375m0 0V8.25m0 1.5c0 .621.504 1.125 1.125 1.125v0h.375m-2.25-1.5h.375m0 0c.621 0 1.125.504 1.125 1.125v1.5m-1.125-1.875h-.375m0 0c-.621 0-1.125.504-1.125 1.125v1.5m2.25-1.5v-.375m0 0c0-.621.504-1.125 1.125-1.125H15m-1.5 1.5v.375c0 .621-.504 1.125-1.125 1.125h-1.5m1.5-1.125H9m5.25 0H15"></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Drivers</p>
                <p class="text-3xl font-bold text-gray-800">{{ cachedStats.totalDrivers }}</p>
              </div>
            </div>
          </div>
          <div class="h-1 bg-gradient-to-r from-[#00C851] to-[#3ED400]"></div>
        </router-link>
      </div>

      <!-- Analytics Charts -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <!-- Revenue Analytics Chart -->
        <!-- Updated chart styling with new green colors and white background -->
        <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800">Revenue Analytics</h2>
            <div class="p-2 bg-gray-100 rounded-lg">
              <!-- Improved chart icon -->
              <svg class="w-5 h-5 text-[#3ED400]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <span class="text-gray-700 font-medium">Today's Revenue</span>
              <span class="text-2xl font-bold text-gray-800">₱{{ formatCurrency(cachedStats.totalRevenue) }}</span>
            </div>
            <div class="relative">
              <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div class="bg-gradient-to-r from-[#74E600] to-[#3ED400] h-4 rounded-full transition-all duration-1000 ease-out shadow-sm" :style="{ width: getRevenuePercentage() + '%' }"></div>
              </div>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-xs font-semibold text-gray-800">{{ getRevenuePercentage() }}%</span>
              </div>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Target: ₱50,000</span>
              <span class="text-gray-800 font-semibold">{{ getRevenuePercentage() }}% Complete</span>
            </div>
          </div>
        </div>

        <!-- Replaced Order Status Analytics with Services Analytics -->
        <!-- Services Analytics -->
        <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800">Services Analytics</h2>
            <div class="p-2 bg-gray-100 rounded-lg">
              <svg class="w-5 h-5 text-[#3ED400]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
          </div>
          <div class="space-y-4">
            <div v-for="(service, index) in topServices" :key="service.name" class="flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300" :class="getServiceCardClass(index)">
              <div class="flex items-center">
                <div class="w-4 h-4 rounded-full mr-4 shadow-sm" :class="getServiceDotClass(index)"></div>
                <span class="font-medium" :class="getServiceTextClass(index)">{{ service.name }}</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-24 rounded-full h-3 overflow-hidden" :class="getServiceProgressBgClass(index)">
                  <div class="h-3 rounded-full transition-all duration-700" :class="getServiceProgressClass(index)" :style="{ width: service.percentage + '%' }"></div>
                </div>
                <span class="font-bold w-8 text-right" :class="getServiceTextClass(index)">{{ service.count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <!-- Updated quick actions with new green theme and white background -->
      <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-800">Quick Actions</h2>
          <div class="p-2 bg-gray-100 rounded-lg">
            <!-- Improved lightning icon -->
            <svg class="w-5 h-5 text-[#3ED400]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        </div>
        <!-- Removed Manage Services quick action and updated grid to 3 columns -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Updated all quick action cards with new green palette -->
          <router-link 
            :to="{ name: 'AdminUsers' }"
            class="group flex items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-[#A8EB12] hover:to-[#74E600] hover:text-white transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-[#74E600] transform hover:scale-105"
          >
            <div class="p-3 bg-white rounded-xl mr-4 group-hover:bg-white/20 transition-colors duration-300">
              <!-- Improved users management icon -->
              <svg class="w-8 h-8 text-[#74E600] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-800 group-hover:text-white">Manage Users</h3>
              <p class="text-sm text-gray-600 group-hover:text-white/80">View and manage accounts</p>
            </div>
          </router-link>

          <router-link 
            :to="{ name: 'AdminOrders' }"
            class="group flex items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-[#74E600] hover:to-[#3ED400] hover:text-white transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-[#3ED400] transform hover:scale-105"
          >
            <div class="p-3 bg-white rounded-xl mr-4 group-hover:bg-white/20 transition-colors duration-300">
              <!-- Improved orders management icon -->
              <svg class="w-8 h-8 text-[#3ED400] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-800 group-hover:text-white">Manage Orders</h3>
              <p class="text-sm text-gray-600 group-hover:text-white/80">Track and update status</p>
            </div>
          </router-link>

          <router-link 
            :to="{ name: 'AdminPayments' }"
            class="group flex items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-[#00C851] hover:to-[#3ED400] hover:text-white transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-[#00C851] transform hover:scale-105"
          >
            <div class="p-3 bg-white rounded-xl mr-4 group-hover:bg-white/20 transition-colors duration-300">
              <!-- Improved payments management icon -->
              <svg class="w-8 h-8 text-[#00C851] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v14a3 3 0 003 3z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-800 group-hover:text-white">Manage Payments</h3>
              <p class="text-sm text-gray-600 group-hover:text-white/80">Review transactions</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Order Status Overview & Recent Orders -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <!-- Order Status Chart -->
        <!-- Updated order status overview with white background and new styling -->
        <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800">Order Status Overview</h2>
            <router-link 
              :to="{ name: 'AdminOrders' }"
              class="text-[#3ED400] hover:text-[#00C851] transition-colors duration-200 font-semibold flex items-center space-x-1"
            >
              <span>Manage Orders</span>
              <!-- Improved arrow icon -->
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>
          <div class="space-y-4">
            <!-- Updated status indicators with improved styling -->
            <div class="flex items-center justify-between p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-amber-400 rounded-full mr-4 shadow-sm"></div>
                <span class="text-amber-800 font-medium">Pending</span>
              </div>
              <span class="text-xl font-bold text-amber-800">{{ cachedOrderStats.pending }}</span>
            </div>
            <div class="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-blue-400 rounded-full mr-4 shadow-sm"></div>
                <span class="text-blue-800 font-medium">Confirmed</span>
              </div>
              <span class="text-xl font-bold text-blue-800">{{ cachedOrderStats.confirmed }}</span>
            </div>
            <div class="flex items-center justify-between p-4 rounded-xl bg-purple-50 border border-purple-200">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-purple-400 rounded-full mr-4 shadow-sm"></div>
                <span class="text-purple-800 font-medium">In Progress</span>
              </div>
              <span class="text-xl font-bold text-purple-800">{{ cachedOrderStats.in_progress }}</span>
            </div>
            <div class="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-200">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-[#3ED400] rounded-full mr-4 shadow-sm"></div>
                <span class="text-green-800 font-medium">Completed</span>
              </div>
              <span class="text-xl font-bold text-green-800">{{ cachedOrderStats.completed }}</span>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800">Recent Orders</h2>
            <router-link 
              :to="{ name: 'AdminOrders' }"
              class="text-[#3ED400] hover:text-[#00C851] transition-colors duration-200 font-semibold flex items-center space-x-1"
            >
              <span>View All</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>
          <div class="space-y-4">
            <div v-if="loading" class="space-y-4">
              <div v-for="n in 5" :key="n" class="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 animate-pulse">
                <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div class="flex-1">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            <div v-else-if="cachedRecentOrders.length === 0" class="text-center py-12">
              <!-- Improved empty state icon -->
              <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p class="text-gray-600 font-medium">No recent orders</p>
            </div>
            <!-- Updated recent orders styling with new green theme -->
            <div v-else v-for="order in cachedRecentOrders" :key="order.id" class="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-[#A8EB12]/10 hover:to-[#74E600]/10 transition-all duration-200 border border-gray-200 hover:border-[#74E600]">
              <div class="w-12 h-12 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <span class="text-white font-bold text-sm">{{ getInitials(order) }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-gray-900 font-semibold truncate">
                  {{ getUserName(order) }}
                </p>
                <p class="text-gray-600 text-sm truncate">
                  {{ getServiceName(order) }}
                </p>
                <p class="text-gray-800 font-bold">
                  ₱{{ formatCurrency(getFinalAmount(order)) }}
                </p>
              </div>
              <span :class="getStatusClass(order.status)" class="inline-flex px-3 py-1 text-xs font-semibold rounded-full">
                {{ order.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllUsers, getAllOrders, getAllServices, getAllPayments, getAllDrivers, testSupabaseConnection } from '@/lib/admin'

// Cache keys for localStorage
const CACHE_KEYS = {
  DASHBOARD_DATA: 'admin_dashboard_cache',
  LAST_UPDATED: 'admin_dashboard_last_updated'
}

export default {
  name: 'AdminDashboard',
  data() {
    return {
      loading: false,
      connectionError: null,
      lastUpdated: '',
      dataLoadedFromCache: false,
      refreshInterval: null,
      cachedStats: {
        totalUsers: 0,
        totalOrders: 0,
        totalServices: 0,
        totalRevenue: 0,
        totalDrivers: 0
      },
      cachedOrderStats: {
        pending: 0,
        confirmed: 0,
        in_progress: 0,
        completed: 0
      },
      cachedRecentOrders: [],
      servicesMapping: {},
      cachedServicesAnalytics: []
    }
  },
  computed: {
    topServices() {
      return this.cachedServicesAnalytics.slice(0, 6)
    }
  },
  async created() {
    console.log('=== ADMIN DASHBOARD CREATED ===')
    
    this.loadFromCache()
    
    if (!this.lastUpdated) {
      console.log('No cached data found, loading fresh data...')
      await this.loadFreshData()
    } else {
      console.log('Loaded data from cache, last updated:', this.lastUpdated)
      this.dataLoadedFromCache = true
    }

    this.refreshInterval = setInterval(() => {
      this.loadFreshData(false)
    }, 30000)
  },
  beforeUnmount() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval)
    }
  },
  methods: {
    loadFromCache() {
      try {
        const cachedData = localStorage.getItem(CACHE_KEYS.DASHBOARD_DATA)
        const lastUpdated = localStorage.getItem(CACHE_KEYS.LAST_UPDATED)
        
        if (cachedData && lastUpdated) {
          const parsed = JSON.parse(cachedData)
          this.cachedStats = parsed.stats || this.cachedStats
          this.cachedOrderStats = parsed.orderStats || this.cachedOrderStats
          this.cachedRecentOrders = parsed.recentOrders || this.cachedRecentOrders
          this.lastUpdated = lastUpdated
          
          console.log('✅ Loaded dashboard data from cache')
          console.log('Cached stats:', this.cachedStats)
          return true
        }
      } catch (error) {
        console.warn('Failed to load from cache:', error)
      }
      return false
    },
    
    saveToCache() {
      try {
        const dataToCache = {
          stats: this.cachedStats,
          orderStats: this.cachedOrderStats,
          recentOrders: this.cachedRecentOrders,
          servicesAnalytics: this.cachedServicesAnalytics // Include services analytics in cache
        }
        
        localStorage.setItem(CACHE_KEYS.DASHBOARD_DATA, JSON.stringify(dataToCache))
        localStorage.setItem(CACHE_KEYS.LAST_UPDATED, this.lastUpdated)
        
        console.log('✅ Saved dashboard data to cache')
      } catch (error) {
        console.warn('Failed to save to cache:', error)
      }
    },
    
    async testConnection() {
      try {
        const result = await testSupabaseConnection()
        if (!result.success) {
          this.connectionError = result.error
        } else {
          this.connectionError = null
        }
      } catch (error) {
        this.connectionError = 'Failed to test connection: ' + error.message
      }
    },
    
    async loadFreshData(isManualRefresh = false) {
      this.loading = isManualRefresh
      this.dataLoadedFromCache = false
      console.log('=== LOADING FRESH ADMIN DASHBOARD DATA ===')
      
      try {
        this.connectionError = null
        
        console.log('[ADMIN DASHBOARD] Fetching all admin data independently...')
        
        const results = await Promise.allSettled([
          getAllUsers(),
          getAllOrders(),
          getAllServices(),
          getAllPayments(),
          getAllDrivers()
        ])

        const [usersResult, ordersResult, servicesResult, paymentsResult, driversResult] = results

        console.log('[ADMIN DASHBOARD] Results:', results)

        if (servicesResult.status === 'fulfilled' && servicesResult.value.data && !servicesResult.value.error) {
          const services = servicesResult.value.data
          this.servicesMapping = {}
          services.forEach(service => {
            this.servicesMapping[service.id] = service.name
          })
          this.cachedStats.totalServices = services.length
          console.log(`✅ [ADMIN DASHBOARD] Total Services: ${this.cachedStats.totalServices}`)
          console.log('Services mapping:', this.servicesMapping)
        } else {
          console.error('❌ [ADMIN DASHBOARD] Services fetch failed:', servicesResult.status === 'fulfilled' ? servicesResult.value.error : servicesResult.reason)
          this.cachedStats.totalServices = 0
          this.servicesMapping = {}
        }

        if (usersResult.status === 'fulfilled' && usersResult.value.data && !usersResult.value.error) {
          const users = usersResult.value.data
          this.cachedStats.totalUsers = users.length
          
          console.log(`✅ [ADMIN DASHBOARD] Total Users: ${this.cachedStats.totalUsers}`)
        } else {
          console.error('❌ [ADMIN DASHBOARD] Users fetch failed:', usersResult.status === 'fulfilled' ? usersResult.value.error : usersResult.reason)
          this.cachedStats.totalUsers = 0
        }

        if (ordersResult.status === 'fulfilled' && ordersResult.value.data && !ordersResult.value.error) {
          const orders = ordersResult.value.data
          
          const today = new Date()
          const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
          const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
          
          const todaysOrders = orders.filter(order => {
            const orderDate = new Date(order.created_at)
            return orderDate >= todayStart && orderDate < todayEnd
          })
          
          this.cachedStats.totalOrders = todaysOrders.length
          console.log(`✅ [ADMIN DASHBOARD] Today's Orders: ${this.cachedStats.totalOrders}`)
          
          this.cachedOrderStats = {
            pending: todaysOrders.filter(o => o.status === 'pending').length,
            confirmed: todaysOrders.filter(o => o.status === 'confirmed').length,
            in_progress: todaysOrders.filter(o => o.status === 'in_progress').length,
            completed: todaysOrders.filter(o => o.status === 'completed').length
          }
          console.log('[ADMIN DASHBOARD] Today\'s Order stats:', this.cachedOrderStats)

          this.calculateServicesAnalytics(todaysOrders)

          this.cachedRecentOrders = [...orders]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5)
          
          console.log(`[ADMIN DASHBOARD] Recent orders: ${this.cachedRecentOrders.length}`)

          this.cachedStats.totalRevenue = todaysOrders
            .filter(order => order.status === 'completed')
            .reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0)
          console.log(`✅ [ADMIN DASHBOARD] Today's Revenue: ₱${this.cachedStats.totalRevenue}`)
        } else {
          console.error('❌ [ADMIN DASHBOARD] Orders fetch failed:', ordersResult.status === 'fulfilled' ? ordersResult.value.error : ordersResult.reason)
          this.cachedStats.totalOrders = 0
          this.cachedStats.totalRevenue = 0
          this.cachedOrderStats = {
            pending: 0,
            confirmed: 0,
            in_progress: 0,
            completed: 0
          }
          this.cachedRecentOrders = []
          this.cachedServicesAnalytics = []
        }

        if (paymentsResult.status === 'fulfilled' && paymentsResult.value.data && !paymentsResult.value.error) {
          console.log(`✅ [ADMIN DASHBOARD] Total Payments: ${paymentsResult.value.data.length}`)
        } else {
          console.error('❌ [ADMIN DASHBOARD] Payments fetch failed:', paymentsResult.status === 'fulfilled' ? paymentsResult.value.error : paymentsResult.reason)
        }

        if (driversResult.status === 'fulfilled' && driversResult.value.data && !driversResult.value.error) {
          this.cachedStats.totalDrivers = driversResult.value.data.length
          console.log(`✅ [ADMIN DASHBOARD] Total Drivers: ${this.cachedStats.totalDrivers}`)
        } else {
          console.error('❌ [ADMIN DASHBOARD] Drivers fetch failed:', driversResult.status === 'fulfilled' ? driversResult.value.error : driversResult.reason)
          this.cachedStats.totalDrivers = 0
        }

        this.lastUpdated = new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })

        this.saveToCache()

        console.log('=== FINAL CACHED DASHBOARD STATS ===')
        console.log('Stats:', this.cachedStats)
        console.log('Order Stats:', this.cachedOrderStats)
        console.log('Data cached and will remain stable until force refresh')

      } catch (error) {
        console.error('❌ [ADMIN DASHBOARD] Critical error loading dashboard data:', error)
        this.connectionError = 'Failed to load dashboard data: ' + error.message
      } finally {
        this.loading = false
        console.log('[ADMIN DASHBOARD] Loading complete - data is now cached and stable')
      }
    },

    calculateServicesAnalytics(todaysOrders) {
      const serviceCount = {}
      
      // Count orders by service
      todaysOrders.forEach(order => {
        const serviceName = this.getServiceName(order)
        serviceCount[serviceName] = (serviceCount[serviceName] || 0) + 1
      })
      
      // Convert to array and calculate percentages
      const totalOrders = todaysOrders.length
      this.cachedServicesAnalytics = Object.entries(serviceCount)
        .map(([name, count]) => ({
          name,
          count,
          percentage: totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0
        }))
        .sort((a, b) => b.count - a.count)
      
      console.log('[ADMIN DASHBOARD] Services analytics:', this.cachedServicesAnalytics)
    },
    
    async forceRefreshData() {
      console.log('[ADMIN DASHBOARD] Force refresh requested - clearing cache and loading fresh data')
      
      localStorage.removeItem(CACHE_KEYS.DASHBOARD_DATA)
      localStorage.removeItem(CACHE_KEYS.LAST_UPDATED)
      
      await this.loadFreshData(true)
    },
    
    getStatusClass(status) {
      const classes = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'confirmed': 'bg-blue-100 text-blue-800',
        'in_progress': 'bg-purple-100 text-purple-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    
    getInitials(order) {
      if (order.users && order.users.first_name && order.users.last_name) {
        return (order.users.first_name.charAt(0) + order.users.last_name.charAt(0)).toUpperCase()
      }
      
      if (order.customer_first_name && order.customer_last_name) {
        return (order.customer_first_name.charAt(0) + order.customer_last_name.charAt(0)).toUpperCase()
      }
      
      if (order.customer_name) {
        const names = order.customer_name.split(' ')
        if (names.length >= 2) {
          return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
        }
        return order.customer_name.charAt(0).toUpperCase()
      }
      
      return 'U'
    },
    
    getUserName(order) {
      if (order.users && order.users.first_name && order.users.last_name) {
        return `${order.users.first_name} ${order.users.last_name}`.trim()
      }
      
      if (order.customer_first_name && order.customer_last_name) {
        return `${order.customer_first_name} ${order.customer_last_name}`.trim()
      }
      
      if (order.customer_name) {
        return order.customer_name
      }
      
      if (order.user_id) {
        return `User #${order.user_id}`
      }
      
      return 'Unknown User'
    },
    
    getServiceName(order) {
      // Try to get service name from joined services table
      if (order.services && order.services.name) {
        return order.services.name
      }
      
      // Try to get service name directly from order
      if (order.service_name) {
        return order.service_name
      }
      
      // Try to get service name from mapping using service_id
      if (order.service_id && this.servicesMapping[order.service_id]) {
        return this.servicesMapping[order.service_id]
      }
      
      // Fallback to service ID or default
      if (order.service_id) {
        return `Service #${order.service_id}`
      }
      
      return 'Unknown Service'
    },
    
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount || 0)
    },
    
    getRevenuePercentage() {
      const target = 50000
      return Math.min(Math.round((this.cachedStats.totalRevenue / target) * 100), 100)
    },

    getOrderPercentage(status) {
      const total = this.cachedStats.totalOrders
      if (total === 0) return 0
      return Math.round((this.cachedOrderStats[status] / total) * 100)
    },

    getServiceCardClass(index) {
      const classes = [
        'bg-[#A8EB12]/10 border-[#A8EB12]',
        'bg-[#74E600]/10 border-[#74E600]',
        'bg-[#3ED400]/10 border-[#3ED400]',
        'bg-[#00C851]/10 border-[#00C851]',
        'bg-gray-100 border-gray-300',
        'bg-gray-50 border-gray-200'
      ]
      return classes[index] || 'bg-gray-50 border-gray-200'
    },

    getServiceDotClass(index) {
      const classes = [
        'bg-[#A8EB12]',
        'bg-[#74E600]',
        'bg-[#3ED400]',
        'bg-[#00C851]',
        'bg-gray-400',
        'bg-gray-300'
      ]
      return classes[index] || 'bg-gray-300'
    },

    getServiceTextClass(index) {
      const classes = [
        'text-[#A8EB12]',
        'text-[#74E600]',
        'text-[#3ED400]',
        'text-[#00C851]',
        'text-gray-700',
        'text-gray-600'
      ]
      return classes[index] || 'text-gray-600'
    },

    getServiceProgressBgClass(index) {
      const classes = [
        'bg-[#A8EB12]/20',
        'bg-[#74E600]/20',
        'bg-[#3ED400]/20',
        'bg-[#00C851]/20',
        'bg-gray-200',
        'bg-gray-100'
      ]
      return classes[index] || 'bg-gray-100'
    },

    getServiceProgressClass(index) {
      const classes = [
        'bg-[#A8EB12]',
        'bg-[#74E600]',
        'bg-[#3ED400]',
        'bg-[#00C851]',
        'bg-gray-400',
        'bg-gray-300'
      ]
      return classes[index] || 'bg-gray-300'
    },

    getFinalAmount(order) {
      if (order.final_price !== undefined && order.final_price !== null) {
        return parseFloat(order.final_price) || 0
      }
      
      // Try other possible field names as fallback
      if (order.final_amount !== undefined && order.final_amount !== null) {
        return parseFloat(order.final_amount) || 0
      }
      
      if (order.total_amount !== undefined && order.total_amount !== null) {
        return parseFloat(order.total_amount) || 0
      }
      
      if (order.amount !== undefined && order.amount !== null) {
        return parseFloat(order.amount) || 0
      }
      
      if (order.total !== undefined && order.total !== null) {
        return parseFloat(order.total) || 0
      }
      
      if (order.price !== undefined && order.price !== null) {
        return parseFloat(order.price) || 0
      }
      
      // Log available fields for debugging
      console.log('[v0] Order fields available:', Object.keys(order))
      console.log('[v0] Order data for amount debugging:', {
        id: order.id,
        final_price: order.final_price,
        final_amount: order.final_amount,
        total_amount: order.total_amount,
        amount: order.amount,
        total: order.total,
        price: order.price
      })
      
      return 0
    }
  }
}
</script>
