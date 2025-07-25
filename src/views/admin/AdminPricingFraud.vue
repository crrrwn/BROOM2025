<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Pricing & Fraud Panel</h1>
        <p class="text-gray-600">Monitor pricing and detect fraudulent activities</p>
      </div>
    </div>

    <!-- Alert Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Fraud Alerts</p>
            <p class="text-2xl font-bold text-gray-900">{{ fraudStats.totalAlerts }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Flagged Users</p>
            <p class="text-2xl font-bold text-gray-900">{{ fraudStats.flaggedUsers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg. Trip Price</p>
            <p class="text-2xl font-bold text-gray-900">₱{{ dynamicPricing.avgTripPrice }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Verified Transactions</p>
            <p class="text-2xl font-bold text-gray-900">{{ fraudStats.verifiedRate }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Pricing Section -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Dynamic Pricing Controls</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Base Fee -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Base Fee (₱)</label>
          <input 
            type="number" 
            v-model="dynamicPricing.baseFee"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- Time-based Multiplier -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Time-based Multiplier</label>
          <select 
            v-model="dynamicPricing.timeMultiplier"
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
            v-model="dynamicPricing.distanceMultiplier"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- Driver Availability Factor -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Driver Availability Factor</label>
          <select 
            v-model="dynamicPricing.availabilityFactor"
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
            v-model="dynamicPricing.minimumFare"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- AI Fee Suggestions -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">AI Fee Suggestion</label>
          <div class="flex items-center space-x-2">
            <input 
              type="text" 
              :value="`₱${aiSuggestion.suggestedFee}`"
              readonly
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            >
            <button 
              @click="getAISuggestion"
              class="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Get AI
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">{{ aiSuggestion.reason }}</p>
        </div>
      </div>

      <div class="mt-6 flex space-x-4">
        <button 
          @click="updatePricing"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Update Pricing
        </button>
        <button 
          @click="resetToDefaults"
          class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          Reset to Defaults
        </button>
      </div>
    </div>

    <!-- Fraud Detection Patterns -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Fraud Detection Patterns</h2>
      
      <!-- Pattern Detection Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <h3 class="font-medium text-red-800">Frequent Cancels</h3>
          </div>
          <p class="text-2xl font-bold text-red-900">{{ fraudPatterns.frequentCancels }}</p>
          <p class="text-sm text-red-600">Users with 5+ cancels this week</p>
        </div>

        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            </svg>
            <h3 class="font-medium text-yellow-800">Fake Addresses</h3>
          </div>
          <p class="text-2xl font-bold text-yellow-900">{{ fraudPatterns.fakeAddresses }}</p>
          <p class="text-sm text-yellow-600">Suspicious location patterns</p>
        </div>

        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <h3 class="font-medium text-orange-800">Abuse Reports</h3>
          </div>
          <p class="text-2xl font-bold text-orange-900">{{ fraudPatterns.abuseReports }}</p>
          <p class="text-sm text-orange-600">Driver/User abuse reports</p>
        </div>
      </div>

      <!-- Alert System for Flagged Users -->
      <div class="border-t pt-6">
        <h3 class="text-md font-semibold text-gray-900 mb-4">Alert System - Flagged Users</h3>
        <div class="overflow-x-auto">
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
                        <span class="text-sm font-medium text-gray-700">{{ alert.user.charAt(0) }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ alert.user }}</div>
                      <div class="text-sm text-gray-500">{{ alert.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getAlertTypeClass(alert.type)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                    {{ alert.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ alert.pattern }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getRiskLevelClass(alert.riskLevel)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                    {{ alert.riskLevel }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ alert.date }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    @click="investigateUser(alert)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Investigate
                  </button>
                  <button 
                    @click="flagUser(alert)"
                    class="text-red-600 hover:text-red-900 mr-3"
                  >
                    Flag
                  </button>
                  <button 
                    @click="dismissAlert(alert)"
                    class="text-gray-600 hover:text-gray-900"
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
  </div>
</template>

<script>
export default {
  name: 'AdminPricingFraud',
  data() {
    return {
      fraudStats: {
        totalAlerts: 12,
        flaggedUsers: 8,
        verifiedRate: 94.2
      },
      dynamicPricing: {
        baseFee: 50,
        timeMultiplier: '1.0',
        distanceMultiplier: 15,
        availabilityFactor: '1.0',
        minimumFare: 80,
        avgTripPrice: 245
      },
      aiSuggestion: {
        suggestedFee: 275,
        reason: 'Based on current demand and driver availability'
      },
      fraudPatterns: {
        frequentCancels: 15,
        fakeAddresses: 8,
        abuseReports: 5
      },
      flaggedUsers: [
        {
          id: 1,
          user: 'John Doe',
          email: 'john@example.com',
          type: 'Frequent Cancels',
          pattern: '8 cancels in 3 days',
          riskLevel: 'High',
          date: 'Jan 25, 2025'
        },
        {
          id: 2,
          user: 'Jane Smith',
          email: 'jane@example.com',
          type: 'Fake Address',
          pattern: 'Non-existent locations',
          riskLevel: 'Medium',
          date: 'Jan 24, 2025'
        },
        {
          id: 3,
          user: 'Mike Johnson',
          email: 'mike@example.com',
          type: 'Abuse Report',
          pattern: 'Verbal abuse to drivers',
          riskLevel: 'High',
          date: 'Jan 23, 2025'
        },
        {
          id: 4,
          user: 'Sarah Wilson',
          email: 'sarah@example.com',
          type: 'Frequent Cancels',
          pattern: '12 cancels this week',
          riskLevel: 'Critical',
          date: 'Jan 25, 2025'
        }
      ]
    }
  },
  methods: {
    updatePricing() {
      // Update pricing logic
      alert('Pricing updated successfully!')
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
      // Simulate AI suggestion
      const suggestions = [
        { fee: 275, reason: 'High demand, low driver availability' },
        { fee: 195, reason: 'Normal conditions, standard pricing' },
        { fee: 320, reason: 'Peak hours with weather conditions' },
        { fee: 150, reason: 'Low demand period, competitive pricing' }
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
      alert(`Investigating user: ${alert.user}`)
    },
    flagUser(alert) {
      alert(`User ${alert.user} has been flagged for review`)
    },
    dismissAlert(alert) {
      const index = this.flaggedUsers.findIndex(u => u.id === alert.id)
      if (index > -1) {
        this.flaggedUsers.splice(index, 1)
      }
    }
  }
}
</script>
