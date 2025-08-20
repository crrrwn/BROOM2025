<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900">Driver Profile</h1>
      <p class="text-gray-600 mt-1">Manage your profile and preferences</p>
    </div>

    <!-- Profile Information -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
      <form @submit.prevent="updateProfile" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              v-model="profile.first_name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              v-model="profile.last_name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
            <input
              v-model="profile.contact"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="profile.email"
              type="email"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="isUpdating"
            class="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
          >
            <span v-if="isUpdating">Updating...</span>
            <span v-else>Update Profile</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Motorcycle Information -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Motorcycle Information</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Brand</label>
          <input
            v-model="profile.motorcycle_brand"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Model</label>
          <input
            v-model="profile.motorcycle_model"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Plate Number</label>
          <input
            v-model="profile.motorcycle_plate"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
          <input
            v-model="profile.motorcycle_year"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Work Preferences -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Work Preferences</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Availability</label>
          <select
            v-model="profile.availability"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="weekends">Weekends Only</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Experience</label>
          <select
            v-model="profile.experience"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="less_than_1">Less than 1 year</option>
            <option value="1_to_3">1-3 years</option>
            <option value="3_to_5">3-5 years</option>
            <option value="more_than_5">More than 5 years</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Performance Statistics -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Performance Statistics</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">{{ stats.totalDeliveries }}</div>
          <div class="text-sm text-gray-600">Total Deliveries</div>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <div class="text-2xl font-bold text-green-600">{{ stats.completed }}</div>
          <div class="text-sm text-gray-600">Completed</div>
        </div>
        <div class="text-center p-4 bg-yellow-50 rounded-lg">
          <div class="text-2xl font-bold text-yellow-600">{{ completionRate }}%</div>
          <div class="text-sm text-gray-600">Completion Rate</div>
        </div>
        <div class="text-center p-4 bg-purple-50 rounded-lg">
          <div class="text-2xl font-bold text-purple-600">₱{{ stats.totalEarnings.toLocaleString() }}</div>
          <div class="text-sm text-gray-600">Total Earnings</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, inject } from 'vue'
import { getCurrentDriver, updateDriverProfile, getDriverStats } from '@/lib/driver'

export default {
  name: 'DriverProfile',
  setup() {
    const toast = inject('toast')
    
    const isUpdating = ref(false)
    const profile = ref({})
    const stats = ref({
      totalDeliveries: 0,
      completed: 0,
      inProgress: 0,
      totalEarnings: 0
    })

    const completionRate = computed(() => {
      if (stats.value.totalDeliveries === 0) return 0
      return Math.round((stats.value.completed / stats.value.totalDeliveries) * 100)
    })

    const loadProfile = async () => {
      try {
        const driver = getCurrentDriver()
        if (driver) {
          profile.value = { ...driver }
        }

        const driverStats = await getDriverStats()
        stats.value = driverStats
      } catch (error) {
        console.error('Error loading profile:', error)
        toast.error('Failed to load profile')
      }
    }

    const updateProfile = async () => {
      isUpdating.value = true
      try {
        await updateDriverProfile(profile.value)
        toast.success('Profile updated successfully!')
      } catch (error) {
        console.error('Error updating profile:', error)
        toast.error('Failed to update profile')
      } finally {
        isUpdating.value = false
      }
    }

    onMounted(() => {
      loadProfile()
    })

    return {
      isUpdating,
      profile,
      stats,
      completionRate,
      updateProfile
    }
  }
}
</script>
