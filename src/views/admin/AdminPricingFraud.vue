<template>
  <div class="min-h-screen bg-white">
    <!-- Updated header with green gradient background -->
    <div class="bg-gradient-to-r from-[#A8EB12] via-[#74E600] to-[#3ED400] p-6 rounded-xl shadow-lg mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-white">AI Pricing & Fraud Detection</h1>
          <p class="text-white/90">AI-powered fraud detection and dynamic pricing management</p>
        </div>
        <button 
          @click="refreshData"
          class="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30"
        >
          Refresh Data
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <!-- Updated loading spinner with green color -->
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#74E600]"></div>
      <p class="mt-2 text-gray-600">Loading data from Supabase...</p>
    </div>

    <div v-else class="space-y-6">
      <!-- Updated AI Fraud Detection Panel with green theme -->
      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center mb-6">
          <div class="p-2 bg-gradient-to-r from-[#74E600]/20 to-[#3ED400]/20 rounded-lg mr-3">
            <svg class="w-6 h-6 text-[#00C851]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold bg-gradient-to-r from-[#74E600] to-[#3ED400] bg-clip-text text-transparent">AI Fraud Detection Panel</h2>
        </div>

        <!-- Updated detect patterns section with green color scheme -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Detect Patterns</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Frequent Cancels -->
            <div class="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div class="flex items-center mb-2">
                <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <h4 class="font-medium text-red-800">Frequent Cancels</h4>
              </div>
              <p class="text-2xl font-bold text-red-900">{{ fraudPatterns.frequentCancels }}</p>
              <p class="text-sm text-red-600">Users with 5+ cancels this week</p>
            </div>

            <!-- Fake Addresses -->
            <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div class="flex items-center mb-2">
                <svg class="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                </svg>
                <h4 class="font-medium text-yellow-800">Fake Addresses</h4>
              </div>
              <p class="text-2xl font-bold text-yellow-900">{{ fraudPatterns.fakeAddresses }}</p>
              <p class="text-sm text-yellow-600">Suspicious location patterns</p>
            </div>

            <!-- Abuse Reports -->
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div class="flex items-center mb-2">
                <svg class="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <h4 class="font-medium text-orange-800">Abuse</h4>
              </div>
              <p class="text-2xl font-bold text-orange-900">{{ fraudPatterns.abuseReports }}</p>
              <p class="text-sm text-orange-600">Driver/User abuse reports</p>
            </div>
          </div>
        </div>

        <!-- Updated alert system table with green theme -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">Alert System for Flagged Users</h3>
          
          <!-- Added Top Risky Users Section -->
          <div v-if="userAnalytics && userAnalytics.topRiskyUsers.length > 0" class="mb-6">
            <h4 class="text-md font-medium text-gray-800 mb-3">Top Risky Users (Most Cancellations, Fake Addresses, etc.)</h4>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
                <thead class="bg-gradient-to-r from-red-100 to-red-200">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">User</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Cancellations</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Fake Addresses</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Abuse Reports</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Risk Score</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Risk Level</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in userAnalytics.topRiskyUsers.slice(0, 10)" :key="user.id" class="hover:bg-gray-50 transition-colors duration-200">
                    <td class="px-4 py-3 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-8 w-8">
                          <div class="h-8 w-8 rounded-full bg-red-200 flex items-center justify-center">
                            <span class="text-xs font-medium text-red-800">
                              {{ user.name.charAt(0) }}
                            </span>
                          </div>
                        </div>
                        <div class="ml-3">
                          <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                          <div class="text-xs text-gray-500">{{ user.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full" 
                            :class="user.cancellations > 5 ? 'bg-red-100 text-red-800' : user.cancellations > 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'">
                        {{ user.cancellations }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                            :class="user.fakeAddressReports > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                        {{ user.fakeAddressReports }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                            :class="user.abuseReports > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                        {{ user.abuseReports }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span class="text-sm font-bold" :class="user.riskScore >= 20 ? 'text-red-600' : user.riskScore >= 10 ? 'text-orange-600' : 'text-yellow-600'">
                        {{ user.riskScore }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span :class="getRiskLevelClass(user.riskLevel)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                        {{ user.riskLevel }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <!-- Updated flag button to open modal -->
                      <button 
                        @click="openFlagModal(user)"
                        class="text-orange-600 hover:text-orange-900 mr-2"
                      >
                        Warn
                      </button>
                      <button 
                        @click="openFlagModal(user, true)"
                        class="text-red-600 hover:text-red-900 mr-2"
                      >
                        Flag
                      </button>
                      <button 
                        @click="viewUserDetails(user)"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="flaggedUsers.length === 0" class="text-center py-8 bg-gray-50 rounded-lg">
            <p class="text-gray-500">No flagged users found</p>
          </div>
          
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pattern</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="alert in flaggedUsers" :key="alert.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span class="text-sm font-medium text-gray-700">
                            {{ alert.user_name ? alert.user_name.charAt(0) : (alert.user ? alert.user.charAt(0) : 'U') }}
                          </span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ alert.user_name || alert.user || 'Unknown User' }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ alert.user_email || alert.email || 'No email' }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getAlertTypeClass(alert.alert_type || alert.type)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                      {{ alert.alert_type || alert.type || 'General Alert' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ alert.pattern || alert.description || 'Suspicious activity detected' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getRiskLevelClass(alert.risk_level || alert.riskLevel)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                      {{ alert.risk_level || alert.riskLevel || 'Medium' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(alert.created_at || alert.date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <!-- Made buttons more clickable with better styling and event handling -->
                    <button 
                      @click.stop="investigateUser(alert)"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm mr-2 transition-colors duration-200"
                    >
                      Investigate
                    </button>
                    <button 
                      @click.stop="dismissAlert(alert)"
                      class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                    >
                      Dismiss
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Updated AI Dynamic Pricing Panel with green theme -->
      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center mb-6">
          <div class="p-2 bg-gradient-to-r from-[#74E600]/20 to-[#3ED400]/20 rounded-lg mr-3">
            <svg class="w-6 h-6 text-[#00C851]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold bg-gradient-to-r from-[#74E600] to-[#3ED400] bg-clip-text text-transparent">AI Dynamic Pricing Panel</h2>
        </div>

        <!-- Updated service selection with green theme -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Select Service to Configure</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="service in availableServices" 
              :key="service.id"
              @click="selectServiceForPricing(service)"
              :class="[
                'p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md',
                selectedPricingService?.id === service.id 
                  ? 'border-[#74E600] bg-gradient-to-r from-[#A8EB12]/10 to-[#74E600]/10' 
                  : 'border-gray-200 hover:border-[#74E600]/50'
              ]"
            >
              <div class="flex items-center mb-2">
                <component :is="service.icon" :class="[
                  'w-6 h-6 mr-2',
                  selectedPricingService?.id === service.id ? 'text-[#00C851]' : 'text-[#74E600]'
                ]" />
                <h4 class="font-medium text-gray-900">{{ service.name }}</h4>
              </div>
              <p class="text-sm text-gray-600">Base: ₱{{ service.basePrice }}</p>
            </div>
          </div>
        </div>

        <!-- Updated pricing preview with green theme -->
        <div v-if="selectedPricingService" class="mb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Configure Pricing for {{ selectedPricingService.name }}
          </h3>
          
          <div class="bg-gradient-to-r from-[#A8EB12]/10 to-[#74E600]/10 border border-[#74E600]/30 rounded-lg p-4 mb-6">
            <h4 class="font-medium text-[#00C851] mb-2">Current Pricing Preview</h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-[#00C851]">Service Base Price:</span>
                <span class="font-bold text-[#00C851] ml-2">₱{{ currentServicePricing.basePrice }}</span>
              </div>
              <div>
                <span class="text-[#00C851]">Delivery Base Fee:</span>
                <span class="font-bold text-[#00C851] ml-2">₱{{ currentServicePricing.baseFee }}</span>
              </div>
              <div>
                <span class="text-[#00C851]">Total Starting Price:</span>
                <span class="font-bold text-[#74E600] ml-2">₱{{ parseFloat(currentServicePricing.basePrice) + parseFloat(currentServicePricing.baseFee) }}</span>
              </div>
              <div>
                <span class="text-[#00C851]">Minimum Fare:</span>
                <span class="font-bold text-[#00C851] ml-2">₱{{ currentServicePricing.minimumFare }}</span>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Base Fee -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Service Base Price (₱)</label>
              <input 
                type="number" 
                v-model="currentServicePricing.basePrice"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <!-- Delivery Base Fee -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Base Fee (₱)</label>
              <input 
                type="number" 
                v-model="currentServicePricing.baseFee"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <!-- Time-based Multiplier -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Time-based Multiplier</label>
              <select 
                v-model="currentServicePricing.timeMultiplier"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1.0">Normal Hours (1.0x)</option>
                <option value="1.2">Peak Hours (1.2x)</option>
                <option value="1.5">Rush Hours (1.5x)</option>
                <option value="2.0">Late Night (2.0x)</option>
              </select>
            </div>

            <!-- Distance Multiplier -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Distance Multiplier (per km)</label>
              <input 
                type="number" 
                step="0.1"
                v-model="currentServicePricing.distanceMultiplier"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <!-- Driver Availability Factor -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Driver Availability Factor</label>
              <select 
                v-model="currentServicePricing.availabilityFactor"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1.0">High Availability (1.0x)</option>
                <option value="1.3">Medium Availability (1.3x)</option>
                <option value="1.6">Low Availability (1.6x)</option>
                <option value="2.0">Very Low Availability (2.0x)</option>
              </select>
            </div>

            <!-- Minimum Fare -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Fare (₱)</label>
              <input 
                type="number" 
                v-model="currentServicePricing.minimumFare"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>

          <!-- Added Auto Generate button for pricing fields -->
          <div class="mt-6 flex justify-start items-center">
            <button
              @click="autoGeneratePricing"
              class="px-6 py-2 bg-gradient-to-r from-[#A8EB12] to-[#74E600] text-white rounded-lg hover:from-[#74E600] hover:to-[#3ED400] transition-all duration-200 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Auto Generate
            </button>
          </div>
        </div>

        <!-- Updated AI suggestions with green theme -->
        <div v-if="selectedPricingService" class="mb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">View AI Fee Suggestions for {{ selectedPricingService.name }}</h3>
          <div class="bg-gradient-to-r from-[#3ED400]/10 to-[#00C851]/10 border border-[#3ED400]/30 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-lg font-semibold text-[#00C851]">₱{{ aiSuggestion.suggestedFee }}</p>
                <p class="text-sm text-[#00C851]/80">{{ aiSuggestion.reason }}</p>
              </div>
              <button 
                @click="getAISuggestion"
                class="px-4 py-2 bg-gradient-to-r from-[#74E600] to-[#3ED400] text-white rounded-lg hover:from-[#3ED400] hover:to-[#00C851] transition-all duration-200 shadow-sm"
              >
                Get AI Suggestion
              </button>
            </div>
          </div>
        </div>

        <!-- Updated control buttons with green theme -->
        <div v-if="selectedPricingService" class="flex space-x-4">
          <button 
            @click="updateServicePricing"
            :disabled="updating"
            class="bg-gradient-to-r from-[#74E600] to-[#3ED400] text-white px-6 py-2 rounded-lg hover:from-[#3ED400] hover:to-[#00C851] transition-all duration-200 disabled:opacity-50 shadow-sm"
          >
            {{ updating ? 'Saving...' : 'Save' }}
          </button>
          <button 
            @click="resetServiceToDefaults"
            class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Reset to Defaults
          </button>
        </div>

        <div v-else class="text-center py-8 bg-gray-50 rounded-lg">
          <p class="text-gray-500">Select a service above to configure its pricing</p>
        </div>
      </div>
    </div>

    <!-- Updated flag user modal with green theme -->
    <div v-if="showFlagModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div class="flex items-center mb-4">
          <div class="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg mr-3">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">
            {{ flagModalData.isFlag ? 'Flag User' : 'Warn User' }}
          </h3>
        </div>

        <div class="mb-4">
          <p class="text-sm text-gray-600 mb-2">User: <strong>{{ flagModalData.user?.name }}</strong></p>
          <p class="text-sm text-gray-600 mb-4">Email: {{ flagModalData.user?.email }}</p>
        </div>

        <!-- Added warning message for flagging -->
        <div v-if="flagModalData.isFlag" class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <p class="text-sm text-yellow-800">
              <strong>Warning:</strong> Flagging this user will restrict their account access. Consider warning them first.
            </p>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Reason for {{ flagModalData.isFlag ? 'flagging' : 'warning' }}:
          </label>
          <!-- Added dropdown for predefined reasons -->
          <select 
            v-model="flagModalData.selectedReason"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          >
            <option value="">Select a reason...</option>
            <option value="Frequent order cancellations">Frequent order cancellations</option>
            <option value="Fake or invalid addresses">Fake or invalid addresses</option>
            <option value="Abusive behavior towards drivers">Abusive behavior towards drivers</option>
            <option value="Payment fraud or chargebacks">Payment fraud or chargebacks</option>
            <option value="Multiple account violations">Multiple account violations</option>
            <option value="Suspicious ordering patterns">Suspicious ordering patterns</option>
            <option value="Harassment of support staff">Harassment of support staff</option>
            <option value="Terms of service violation">Terms of service violation</option>
            <option value="Other">Other (specify below)</option>
          </select>
          
          <textarea 
            v-model="flagModalData.customReason"
            :placeholder="flagModalData.selectedReason === 'Other' ? 'Please specify the reason...' : 'Additional details (optional)...'"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>

        <div class="flex space-x-3">
          <button 
            @click="confirmFlagUser"
            :disabled="!flagModalData.selectedReason"
            :class="[
              'flex-1 px-4 py-2 rounded-lg transition-colors duration-200',
              flagModalData.isFlag 
                ? 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300' 
                : 'bg-orange-600 hover:bg-orange-700 text-white disabled:bg-orange-300'
            ]"
          >
            {{ flagModalData.isFlag ? 'Flag User' : 'Send Warning' }}
          </button>
          <button 
            @click="closeFlagModal"
            class="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Added notification display for admin feedback -->
    <div 
      v-if="notification.show" 
      :class="[
        'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md',
        notification.type === 'success' ? 'bg-green-500 text-white' : 
        notification.type === 'error' ? 'bg-red-500 text-white' : 
        notification.type === 'warning' ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'
      ]"
    >
      <div class="flex items-center justify-between">
        <span>{{ notification.message }}</span>
        <button @click="closeNotification" class="ml-4 text-xl font-bold">&times;</button>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  getPricingConfig, 
  updatePricingConfig, 
  getFraudStats, 
  getFraudPatterns, 
  getFlaggedUsers,
  getAllUsers,
  updateUserFlag,
  dismissFraudAlert,
  getUserFraudAnalytics,
  updateServicePricingConfig // Added import for updateServicePricingConfig
} from '@/lib/admin'
import { supabase } from '@/lib/supabase'
import { createNotification } from '@/utils/notifications'
import { UtensilsCrossed, Receipt, Truck, ShoppingCart, Pill, Gift } from 'lucide-vue-next'

export default {
  name: 'AdminPricingFraud',
  components: {
    UtensilsCrossed,
    Receipt, 
    Truck,
    ShoppingCart,
    Pill,
    Gift
  },
  data() {
    return {
      loading: true,
      updating: false,
      allUsers: [],
      userAnalytics: null,
      fraudStats: {
        totalAlerts: 0,
        flaggedUsers: 0,
        verifiedRate: 0
      },
      selectedPricingService: null,
      currentServicePricing: {
        basePrice: 50,
        baseFee: 30,
        timeMultiplier: '1.0',
        distanceMultiplier: 15,
        availabilityFactor: '1.0',
        minimumFare: 80
      },
      availableServices: [
        {
          id: '1a2b3c4d-5e6f-7890-1234-567890abcdef',
          name: 'Food Delivery',
          description: 'Order from restaurants and get it delivered hot and fresh',
          icon: UtensilsCrossed,
          basePrice: 50,
          type: 'food_delivery'
        },
        {
          id: '2b3c4d5e-6f78-9012-3456-7890abcdef12',
          name: 'Bill Payments',
          description: 'Pay your utilities, internet, and other bills',
          icon: Receipt,
          basePrice: 25,
          type: 'bill_payments'
        },
        {
          id: '3c4d5e6f-7890-1234-5678-90abcdef1234',
          name: 'Pick-up & Drop',
          description: 'Need something picked up or delivered',
          icon: Truck,
          basePrice: 75,
          type: 'pickup_drop'
        },
        {
          id: '4d5e6f78-9012-3456-7890-abcdef123456',
          name: 'Grocery Shopping',
          description: 'Get your groceries delivered to your doorstep',
          icon: ShoppingCart,
          basePrice: 100,
          type: 'grocery'
        },
        {
          id: '5e6f7890-1234-5678-90ab-cdef12345678',
          name: 'Medicine Delivery',
          description: 'Fast and secure delivery of prescription medications',
          icon: Pill,
          basePrice: 60,
          type: 'medicine_delivery'
        },
        {
          id: '6f789012-3456-7890-abcd-ef1234567890',
          name: 'Gift Delivery',
          description: 'Surprise your loved ones with special deliveries',
          icon: Gift,
          basePrice: 80,
          type: 'gift_delivery'
        }
      ],
      servicePricingConfigs: {}, // Store pricing for each service
      aiSuggestion: {
        suggestedFee: 275,
        reason: 'Based on current demand and driver availability'
      },
      fraudPatterns: {
        frequentCancels: 0,
        fakeAddresses: 0,
        abuseReports: 0
      },
      flaggedUsers: [],
      showFlagModal: false,
      flagModalData: {
        user: null,
        isFlag: false,
        selectedReason: '',
        customReason: ''
      },
      selectedUser: null,
      notification: {
        show: false,
        message: '',
        type: 'success'
      }
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {

    async loadData() {
      this.loading = true
      try {
        await Promise.all([
          this.loadPricingConfig(),
          this.loadFraudStats(),
          this.loadFraudPatterns(),
          this.loadFlaggedUsers(),
          this.loadAllUsers(),
          this.loadUserAnalytics(),
          this.loadServicePricingConfigs() // Added loading of service pricing configs
        ])
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        this.loading = false
      }
    },

    async loadAllUsers() {
      const { data, error } = await getAllUsers()
      if (!error && data) {
        this.allUsers = data
        console.log('✅ Loaded all users:', this.allUsers.length)
      } else {
        console.error('❌ Error loading users:', error)
        this.allUsers = []
      }
    },

    async loadPricingConfig() {
      const { data, error } = await getPricingConfig()
      if (!error && data) {
        this.dynamicPricing = {
          baseFee: data.base_fee || 50,
          timeMultiplier: data.time_multiplier?.toString() || '1.0',
          distanceMultiplier: data.distance_multiplier || 15,
          availabilityFactor: data.availability_factor?.toString() || '1.0',
          minimumFare: data.minimum_fare || 80,
          avgTripPrice: data.avg_trip_price || 245
        }
      }
    },

    async loadFraudStats() {
      const { data, error } = await getFraudStats()
      if (!error && data) {
        this.fraudStats = data
      }
    },

    async loadFraudPatterns() {
      const { data, error } = await getFraudPatterns()
      if (!error && data) {
        this.fraudPatterns = data
      }
    },

    async loadFlaggedUsers() {
      const { data, error } = await getFlaggedUsers()
      if (!error && data) {
        this.flaggedUsers = data
        console.log('✅ Loaded flagged users:', this.flaggedUsers.length)
      } else {
        console.error('❌ Error loading users:', error)
        this.flaggedUsers = []
      }
    },

    async refreshData() {
      await this.loadData()
    },

    async updatePricing() {
      this.updating = true
      try {
        const pricingData = {
          base_fee: parseFloat(this.dynamicPricing.baseFee),
          time_multiplier: parseFloat(this.dynamicPricing.timeMultiplier),
          distance_multiplier: parseFloat(this.dynamicPricing.distanceMultiplier),
          availability_factor: parseFloat(this.dynamicPricing.availabilityFactor),
          minimum_fare: parseFloat(this.dynamicPricing.minimumFare)
        }

        const { data, error } = await updatePricingConfig(pricingData)
        
        if (error) {
          alert('Error updating pricing: ' + error.message)
        } else {
          alert('Pricing updated successfully! Changes will apply to new bookings.')
          
          window.dispatchEvent(new CustomEvent('pricingUpdated', { 
            detail: pricingData 
          }))
        }
      } catch (error) {
        console.error('Error updating pricing:', error)
        alert('Error updating pricing configuration')
      } finally {
        this.updating = false
      }
    },

    resetToDefaults() {
      this.dynamicPricing = {
        baseFee: 50,
        timeMultiplier: '1.0',
        distanceMultiplier: 15,
        availabilityFactor: '1.0',
        minimumFare: 80,
        avgTripPrice: 245
      }
    },

    getAISuggestion() {
      const suggestions = [
        { fee: 275, reason: 'High demand, low driver availability' },
        { fee: 195, reason: 'Normal conditions, standard pricing' },
        { fee: 320, reason: 'Peak hours with weather conditions' },
        { fee: 150, reason: 'Low demand period, competitive pricing' },
        { fee: 240, reason: 'Moderate demand with good weather' },
        { fee: 380, reason: 'Holiday surge pricing recommended' }
      ]
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
      this.aiSuggestion = {
        suggestedFee: randomSuggestion.fee,
        reason: randomSuggestion.reason
      }
    },

    getAlertTypeClass(type) {
      const classes = {
        'Frequent Cancels': 'bg-red-100 text-red-800',
        'Fake Address': 'bg-yellow-100 text-yellow-800',
        'Abuse Report': 'bg-orange-100 text-orange-800'
      }
      return classes[type] || 'bg-gray-100 text-gray-800'
    },

    getRiskLevelClass(level) {
      const classes = {
        'Low': 'bg-green-100 text-green-800',
        'Medium': 'bg-yellow-100 text-yellow-800',
        'High': 'bg-red-100 text-red-800',
        'Critical': 'bg-purple-100 text-purple-800'
      }
      return classes[level] || 'bg-gray-100 text-gray-800'
    },

    investigateUser(alert) {
      const displayedRiskLevel = alert.risk_level || alert.riskLevel || 'Medium'
      
      const investigationDetails = {
        user: alert.user_name || alert.user || 'Unknown User',
        email: alert.user_email || alert.email || 'No email',
        riskLevel: displayedRiskLevel, // Use the exact same value as table
        reasons: alert.pattern || alert.description || 'Suspicious activity detected',
        alertType: alert.alert_type || alert.type || 'General Alert',
        date: this.formatDate(alert.created_at || alert.date)
      }
      
      const detailsMessage = `Investigation Details:

User: ${investigationDetails.user}
Email: ${investigationDetails.email}
Risk Level: ${investigationDetails.riskLevel}
Alert Type: ${investigationDetails.alertType}
Reasons: ${investigationDetails.reasons}
Date: ${investigationDetails.date}

Would you like to flag this user?`
      
      if (confirm(detailsMessage)) {
        this.selectedUser = {
          id: alert.user_id || alert.user,
          name: investigationDetails.user
        }
        this.showFlagModal = true
      }
    },

    async dismissAlert(alert) {
      if (!confirm(`Are you sure you want to dismiss this alert for ${alert.user_name || alert.user || 'Unknown User'}?`)) {
        return
      }
      
      try {
        const { error } = await dismissFraudAlert(alert.id)
        if (error) {
          console.error('Dismiss error:', error)
          this.showNotification('Error dismissing alert: ' + error.message, 'error')
        } else {
          // Remove the alert from the local array immediately for better UX
          this.flaggedUsers = this.flaggedUsers.filter(u => u.id !== alert.id)
          
          try {
            console.log('Attempting to send dismissal notification to user:', alert.user_id)
            console.log('Alert data:', alert)
            
            const notificationResult = await createNotification(
              alert.user_id,
              'Account Status Update - Cleared',
              `Great news! The security review on your account has been completed and cleared by our admin team. Your account is now in good standing and you can continue using our services normally.`,
              'success',
              '/profile'
            )
            
            console.log('Notification creation result:', notificationResult)
            
            if (notificationResult && notificationResult.error) {
              throw new Error(notificationResult.error.message || 'Failed to create notification')
            }
            
            console.log('Dismissal notification sent successfully to user:', alert.user_id)
            this.showNotification('Alert dismissed successfully and user has been notified', 'success')
          } catch (notificationError) {
            console.error('Failed to send dismissal notification:', notificationError)
            this.showNotification('Alert dismissed but failed to notify user: ' + notificationError.message, 'warning')
          }
        }

      } catch (error) {
        console.error('Error dismissing alert:', error)
        this.showNotification('Error dismissing alert: ' + error.message, 'error')
      }
    },

    async loadUserAnalytics() {
      const { data, error } = await getUserFraudAnalytics()
      if (!error && data) {
        this.userAnalytics = data
        console.log('✅ Loaded user analytics:', this.userAnalytics)
        
        // Update fraud patterns with real data
        if (data.analytics) {
          this.fraudPatterns = {
            frequentCancels: data.analytics.usersWithCancellations,
            fakeAddresses: data.analytics.usersWithFakeAddresses,
            abuseReports: data.analytics.usersWithAbuseReports
          }
        }
      } else {
        console.error('❌ Error loading user analytics:', error)
        this.userAnalytics = null
      }
    },

    async flagUser(user) {
      this.openFlagModal(user, true)
    },

    openFlagModal(user, isFlag = false) {
      this.flagModalData = {
        user: user,
        isFlag: isFlag,
        selectedReason: '',
        customReason: ''
      }
      this.showFlagModal = true
    },

    closeFlagModal() {
      this.showFlagModal = false
      this.flagModalData = {
        user: null,
        isFlag: false,
        selectedReason: '',
        customReason: ''
      }
    },

    async confirmFlagUser() {
      if (!this.flagModalData.selectedReason) {
        alert('Please select a reason.')
        return
      }

      try {
        const reason = this.flagModalData.selectedReason === 'Other' 
          ? this.flagModalData.customReason 
          : this.flagModalData.selectedReason + (this.flagModalData.customReason ? ` - ${this.flagModalData.customReason}` : '')

        const alertType = this.flagModalData.isFlag ? 'Manual Flag' : 'Warning'
        const riskLevel = this.flagModalData.isFlag ? 'High' : 'Medium'

        // Add to fraud alerts
        const { error } = await supabase
          .from('fraud_alerts')
          .insert({
            user_id: this.flagModalData.user.id,
            user_name: this.flagModalData.user.name,
            user_email: this.flagModalData.user.email,
            alert_type: alertType,
            pattern: reason,
            risk_level: riskLevel
          })
        
        if (error) {
          console.error('Error adding fraud alert:', error)
          alert('Error processing action: ' + error.message)
          return
        }

        const notificationTitle = this.flagModalData.isFlag 
          ? 'Account Flagged - Action Required' 
          : 'Account Warning - Please Review'
        
        const notificationMessage = this.flagModalData.isFlag
          ? `Your account has been flagged due to: ${reason}. Please contact support to resolve this issue. Your account access may be restricted.`
          : `You have received a warning regarding: ${reason}. Please review our terms of service and adjust your behavior accordingly to avoid further action.`
        
        console.log('Creating notification for user:', this.flagModalData.user.id)
        console.log('Notification title:', notificationTitle)
        console.log('Notification message:', notificationMessage)
        
        // Send notification to the user with better error handling
        try {
          const notificationResult = await createNotification(
            this.flagModalData.user.id,
            notificationTitle,
            notificationMessage,
            'system',
            '/profile'
          )
          
          console.log('Notification creation result:', notificationResult)
          
          if (notificationResult && notificationResult.error) {
            console.error('Error creating notification:', notificationResult.error)
            alert('Action processed but notification failed to send: ' + notificationResult.error.message)
          } else {
            console.log('Notification sent successfully')
            const actionText = this.flagModalData.isFlag ? 'flagged' : 'warned'
            alert(`User ${actionText} successfully and notification sent`)
          }
        } catch (notificationError) {
          console.error('Error sending notification:', notificationError)
          alert('Action processed but notification failed to send')
        }
        
        this.closeFlagModal()
        await this.loadData()
        
      } catch (error) {
        console.error('Error processing user action:', error)
        alert('Error processing user action: ' + error.message)
      }
    },

    viewUserDetails(user) {
      alert(`User Details:
Name: ${user.name}
Email: ${user.email}
Total Orders: ${user.totalOrders}
Cancellations: ${user.cancellations}
Fake Address Reports: ${user.fakeAddressReports}
Abuse Reports: ${user.abuseReports}
Risk Score: ${user.riskScore}
Risk Level: ${user.riskLevel}
Join Date: ${new Date(user.joinDate).toLocaleDateString()}`)
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString()
    },

    selectServiceForPricing(service) {
      this.selectedPricingService = service
      
      if (this.servicePricingConfigs[service.id]) {
        console.log('📋 Loading existing config for service:', service.name, this.servicePricingConfigs[service.id])
        this.currentServicePricing = { ...this.servicePricingConfigs[service.id] }
      } else {
        console.log('🆕 Using default config for service:', service.name)
        this.currentServicePricing = {
          basePrice: service.basePrice,
          baseFee: 30,
          timeMultiplier: '1.0',
          distanceMultiplier: 15,
          availabilityFactor: '1.0',
          minimumFare: 80
        }
      }
    },

    autoGeneratePricing() {
      if (!this.selectedPricingService) return;

      // Generate realistic pricing values based on service type
      const serviceType = this.selectedPricingService.name.toLowerCase();
      
      // Base pricing ranges for different services
      let basePrice, baseFee, minimumFare;
      
      if (serviceType.includes('food')) {
        basePrice = Math.floor(Math.random() * 30) + 20; // 20-50
        baseFee = Math.floor(Math.random() * 20) + 15; // 15-35
        minimumFare = Math.floor(Math.random() * 20) + 40; // 40-60
      } else if (serviceType.includes('medicine')) {
        basePrice = Math.floor(Math.random() * 25) + 25; // 25-50
        baseFee = Math.floor(Math.random() * 15) + 20; // 20-35
        minimumFare = Math.floor(Math.random() * 15) + 50; // 50-65
      } else if (serviceType.includes('grocery')) {
        basePrice = Math.floor(Math.random() * 40) + 30; // 30-70
        baseFee = Math.floor(Math.random() * 25) + 25; // 25-50
        minimumFare = Math.floor(Math.random() * 30) + 60; // 60-90
      } else if (serviceType.includes('bill')) {
        basePrice = Math.floor(Math.random() * 15) + 10; // 10-25
        baseFee = Math.floor(Math.random() * 10) + 5; // 5-15
        minimumFare = Math.floor(Math.random() * 10) + 20; // 20-30
      } else {
        // Default for other services
        basePrice = Math.floor(Math.random() * 35) + 25; // 25-60
        baseFee = Math.floor(Math.random() * 20) + 20; // 20-40
        minimumFare = Math.floor(Math.random() * 25) + 50; // 50-75
      }

      // Generate other multipliers
      const timeMultipliers = ['1.0', '1.2', '1.5', '2.0'];
      const availabilityFactors = ['1.0', '1.3', '1.6', '2.0'];
      
      this.currentServicePricing = {
        ...this.currentServicePricing,
        basePrice: basePrice,
        baseFee: baseFee,
        timeMultiplier: timeMultipliers[Math.floor(Math.random() * timeMultipliers.length)],
        distanceMultiplier: (Math.random() * 3 + 2).toFixed(1), // 2.0-5.0
        availabilityFactor: availabilityFactors[Math.floor(Math.random() * availabilityFactors.length)],
        minimumFare: minimumFare
      };

      // Show success message
      this.$toast.success('Pricing values auto-generated successfully!');
    },

    async updateServicePricing() {
      console.log('[v0] Save button clicked, starting update process');
      console.log('[v0] Selected service:', this.selectedPricingService);
      console.log('[v0] Current pricing:', this.currentServicePricing);
      
      if (!this.selectedPricingService) {
        this.$toast.error('Please select a service first');
        return;
      }

      this.updating = true;
      
      try {
        const pricingData = {
          service_id: this.selectedPricingService.id,
          service_type: this.selectedPricingService.category || 'general',
          service_name: this.selectedPricingService.name,
          base_price: parseFloat(this.currentServicePricing.basePrice),
          base_fee: parseFloat(this.currentServicePricing.baseFee),
          time_multiplier: parseFloat(this.currentServicePricing.timeMultiplier),
          distance_multiplier: parseFloat(this.currentServicePricing.distanceMultiplier),
          availability_factor: parseFloat(this.currentServicePricing.availabilityFactor),
          minimum_fare: parseFloat(this.currentServicePricing.minimumFare),
          updated_at: new Date().toISOString()
        };

        console.log('[v0] Saving pricing data to Supabase service_pricing_config table:', pricingData);

        const { data, error } = await supabase
          .from('service_pricing_config')
          .upsert(pricingData, { 
            onConflict: 'service_id',
            ignoreDuplicates: false 
          })
          .select();

        if (error) {
          console.error('[v0] Supabase save error:', error);
          throw new Error(`Database save failed: ${error.message}`);
        }

        if (!data || data.length === 0) {
          throw new Error('No data returned from database save operation');
        }

        console.log('[v0] ✅ Successfully saved to Supabase service_pricing_config table:', data);
        console.log('[v0] ✅ Saved record ID:', data[0].id);
        console.log('[v0] ✅ Confirmed service_id:', data[0].service_id);

        const { data: verifyData, error: verifyError } = await supabase
          .from('service_pricing_config')
          .select('*')
          .eq('service_id', this.selectedPricingService.id)
          .single();

        if (verifyError) {
          console.warn('[v0] Could not verify save:', verifyError);
        } else {
          console.log('[v0] ✅ Verified saved data in database:', verifyData);
        }

        // Update the service in availableServices array
        const serviceIndex = this.availableServices.findIndex(s => s.id === this.selectedPricingService.id);
        console.log('[v0] Service index found:', serviceIndex);
        
        if (serviceIndex !== -1) {
          this.availableServices[serviceIndex] = {
            ...this.availableServices[serviceIndex],
            basePrice: this.currentServicePricing.basePrice,
            baseFee: this.currentServicePricing.baseFee,
            timeMultiplier: this.currentServicePricing.timeMultiplier,
            distanceMultiplier: this.currentServicePricing.distanceMultiplier,
            availabilityFactor: this.currentServicePricing.availabilityFactor,
            minimumFare: this.currentServicePricing.minimumFare
          };
          console.log('[v0] Updated service in array:', this.availableServices[serviceIndex]);
        }

        const localPricingData = {
          serviceId: this.selectedPricingService.id,
          serviceName: this.selectedPricingService.name,
          basePrice: this.currentServicePricing.basePrice,
          baseFee: this.currentServicePricing.baseFee,
          timeMultiplier: this.currentServicePricing.timeMultiplier,
          distanceMultiplier: this.currentServicePricing.distanceMultiplier,
          availabilityFactor: this.currentServicePricing.availabilityFactor,
          minimumFare: this.currentServicePricing.minimumFare,
          updatedAt: new Date().toISOString()
        };

        // Store individual service pricing
        localStorage.setItem(`pricing_${this.selectedPricingService.id}`, JSON.stringify(localPricingData));
        
        // Also store in a general pricing object for BookService to access
        const allPricing = JSON.parse(localStorage.getItem('dynamicPricing') || '{}');
        allPricing[this.selectedPricingService.id] = localPricingData;
        localStorage.setItem('dynamicPricing', JSON.stringify(allPricing));

        console.log('[v0] ✅ Saved to localStorage successfully');
        console.log('[v0] All pricing data:', allPricing);

        this.$toast.success(`✅ Pricing successfully saved to Supabase database and applied to BookService for ${this.selectedPricingService.name}!`);
        
        // Trigger a storage event to notify BookService of the update
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'dynamicPricing',
          newValue: JSON.stringify(allPricing)
        }));
        
      } catch (error) {
        console.error('[v0] ❌ Error saving pricing to Supabase:', error);
        this.$toast.error(`❌ Failed to save pricing to database: ${error.message}`);
      } finally {
        this.updating = false;
      }
    },

    resetServiceToDefaults() {
      if (!this.selectedPricingService) return
      
      this.currentServicePricing = {
        basePrice: this.selectedPricingService.basePrice,
        baseFee: 30,
        timeMultiplier: '1.0',
        distanceMultiplier: 15,
        availabilityFactor: '1.0',
        minimumFare: 80
      }
    },

    async loadServicePricingConfigs() {
      try {
        console.log('🔄 Loading service pricing configs from database...')
        
        const { data, error } = await supabase
          .from('service_pricing_config')
          .select('*')
        
        if (error) {
          console.error('❌ Error loading service pricing configs:', error)
          return
        }
        
        console.log('✅ Loaded service pricing configs:', data)
        
        // Store configs by service_id for easy lookup
        this.servicePricingConfigs = {}
        if (data && data.length > 0) {
          data.forEach(config => {
            this.servicePricingConfigs[config.service_id] = {
              basePrice: config.base_price || 50,
              baseFee: config.base_fee || 30,
              timeMultiplier: config.time_multiplier?.toString() || '1.0',
              distanceMultiplier: config.distance_multiplier || 15,
              availabilityFactor: config.availability_factor?.toString() || '1.0',
              minimumFare: config.minimum_fare || 80
            }
          })
        }
        
        console.log('📊 Service pricing configs loaded:', this.servicePricingConfigs)
        
      } catch (error) {
        console.error('💥 Exception loading service pricing configs:', error)
      }
    },

    showNotification(message, type = 'success') {
      this.notification = {
        show: true,
        message,
        type
      }
      
      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        this.notification.show = false
      }, 5000)
    },
    
    closeNotification() {
      this.notification.show = false
    }
  }
}
</script>
