<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Manage your personal information and account settings</p>
      </div>

      <!-- Auth Loading State -->
      <div v-if="isAuthLoading" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-6">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p class="text-gray-600 dark:text-gray-400">Loading authentication...</p>
        </div>
      </div>

      <!-- Profile Loading State -->
      <div v-else-if="isLoadingProfile" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-6">
        <div class="animate-pulse">
          <div class="flex items-center space-x-6 mb-8">
            <div class="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div class="flex-1">
              <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-3"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
              <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div class="h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div class="h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div class="h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
          </div>
        </div>
      </div>

      <!-- No User State -->
      <div v-else-if="!currentUser" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-6">
        <div class="text-center">
          <svg class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Not Authenticated</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Please log in to view your profile</p>
          <button 
            @click="$router.push('/auth/login')" 
            class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>

      <!-- Profile Content -->
      <div v-else class="space-y-6">
        <!-- Profile Header Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-6">
              <div class="relative">
                <img 
                  :src="userAvatar" 
                  :alt="displayName" 
                  class="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow-lg"
                >
                <button 
                  @click="showAvatarUpload = true" 
                  class="absolute -bottom-2 -right-2 bg-green-600 text-white rounded-full p-3 hover:bg-green-700 transition-colors shadow-lg"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </button>
              </div>
              
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ displayName }}</h2>
                <p class="text-gray-600 dark:text-gray-300">{{ displayEmail }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Member since {{ formatDate(userCreatedAt) }}</p>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white text-center min-w-[120px]">
              <p class="text-sm opacity-90">Total Orders</p>
              <p class="text-2xl font-bold">{{ userStats.totalOrders }}</p>
            </div>
          </div>
        </div>

        <!-- Personal Information Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h3>
              <p class="text-gray-600 dark:text-gray-400 mt-1">Update your personal details and contact information</p>
            </div>
            <button 
              v-if="!isEditing" 
              @click="startEditing" 
              class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
            >
              <svg class="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Edit Profile
            </button>
          </div>

          <form @submit.prevent="handleUpdateProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- First Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="profileForm.firstName" 
                  :disabled="!isEditing" 
                  type="text" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-600 disabled:text-gray-500 transition-colors"
                  placeholder="Enter your first name"
                >
              </div>
              
              <!-- Last Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="profileForm.lastName" 
                  :disabled="!isEditing" 
                  type="text" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-600 disabled:text-gray-500 transition-colors"
                  placeholder="Enter your last name"
                >
              </div>
              
              <!-- Middle Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Middle Name</label>
                <input 
                  v-model="profileForm.middleName" 
                  :disabled="!isEditing" 
                  type="text" 
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-600 disabled:text-gray-500 transition-colors"
                  placeholder="Enter your middle name (optional)"
                >
              </div>
              
              <!-- Contact Number -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Number <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="profileForm.contact" 
                  :disabled="!isEditing" 
                  type="tel" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-600 disabled:text-gray-500 transition-colors"
                  placeholder="Enter your contact number"
                >
              </div>
              
              <!-- Email Address -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input 
                  v-model="profileForm.email" 
                  disabled 
                  type="email" 
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                >
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                  <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  Email cannot be changed for security reasons
                </p>
              </div>
              
              <!-- Address -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address <span class="text-red-500">*</span>
                </label>
                <textarea 
                  v-model="profileForm.address" 
                  :disabled="!isEditing" 
                  rows="3" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-600 disabled:text-gray-500 transition-colors resize-none"
                  placeholder="Enter your complete address"
                ></textarea>
              </div>
              
              <!-- Barangay -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Barangay</label>
                <input 
                  v-model="profileForm.barangay" 
                  :disabled="!isEditing" 
                  type="text" 
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-600 disabled:text-gray-500 transition-colors"
                  placeholder="Enter your barangay"
                >
              </div>
            </div>

            <!-- Action Buttons -->
            <div v-if="isEditing" class="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button 
                type="button" 
                @click="cancelEdit" 
                class="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                :disabled="isLoading" 
                class="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
              >
                <span v-if="isLoading" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Save Changes
                </span>
              </button>
            </div>
          </form>
        </div>

        <!-- Account Statistics -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account Statistics</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
              <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mb-1">{{ userStats.totalOrders }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
            </div>
            
            <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
              <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mb-1">₱{{ userStats.totalSpent.toLocaleString() }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
            </div>
            
            <div class="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl">
              <div class="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mb-1">{{ userStats.averageRating.toFixed(1) }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Avatar Upload Modal -->
      <div v-if="showAvatarUpload" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Profile Picture</h3>
          
          <div class="mb-4">
            <input 
              type="file" 
              accept="image/*" 
              @change="handleAvatarUpload" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            >
          </div>

          <div v-if="avatarPreview" class="mb-4 text-center">
            <img :src="avatarPreview" alt="Avatar preview" class="w-24 h-24 rounded-full mx-auto object-cover border-4 border-green-500">
          </div>

          <div class="flex space-x-3">
            <button 
              @click="showAvatarUpload = false" 
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="uploadAvatar" 
              :disabled="!avatarFile || isAvatarLoading" 
              class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isAvatarLoading">Uploading...</span>
              <span v-else>Upload</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, inject, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'

export default {
  name: 'Profile',
  setup() {
    const router = useRouter()
    const currentUser = inject('currentUser')
    const toast = inject('toast')
    const isAuthLoading = inject('isLoading')
    
    const isEditing = ref(false)
    const isLoading = ref(false)
    const isLoadingProfile = ref(true)
    const isAvatarLoading = ref(false)
    const showAvatarUpload = ref(false)
    const avatarFile = ref(null)
    const avatarPreview = ref('')
    const userStats = ref({
      totalOrders: 0,
      totalSpent: 0,
      averageRating: 4.5
    })
    
    const profileForm = ref({
      firstName: '',
      lastName: '',
      middleName: '',
      contact: '',
      email: '',
      address: '',
      barangay: ''
    })

    const originalProfileData = ref({})

    const displayName = computed(() => {
      const first = profileForm.value.firstName || ''
      const middle = profileForm.value.middleName || ''
      const last = profileForm.value.lastName || ''
      const fullName = `${first} ${middle} ${last}`.replace(/\s+/g, ' ').trim()
      return fullName || 'User'
    })

    const displayEmail = computed(() => {
      return profileForm.value.email || currentUser.value?.email || 'No email'
    })

    const userCreatedAt = computed(() => {
      return currentUser.value?.created_at || new Date().toISOString()
    })

    const userAvatar = computed(() => {
      const avatarUrl = currentUser.value?.user_metadata?.avatar_url
      if (avatarUrl) return avatarUrl
      
      const firstName = profileForm.value.firstName || 'User'
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}&background=16a34a&color=fff&size=200`
    })

    // Fetch user profile from Supabase
    const fetchUserProfile = async () => {
      if (!currentUser.value?.id) {
        isLoadingProfile.value = false
        return
      }

      const userId = currentUser.value.id

      try {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)

        if (userError) {
          throw userError
        }

        if (userData && userData.length > 0) {
          const user = userData[0]
          
          // Map data to form
          profileForm.value = {
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            middleName: user.middle_name || '',
            contact: user.contact || user.contact_number || '',
            email: user.email || currentUser.value.email || '',
            address: user.house_street_address || user.address || '',
            barangay: user.barangay || ''
          }
          
        } else {
          profileForm.value = {
            firstName: '',
            lastName: '',
            middleName: '',
            contact: '',
            email: currentUser.value.email || '',
            address: '',
            barangay: ''
          }
        }

        originalProfileData.value = { ...profileForm.value }

      } catch (error) {
        console.error('Fetch error:', error)
        toast.error('Failed to load profile: ' + error.message)
        
        // Fallback data
        profileForm.value = {
          firstName: '',
          lastName: '',
          middleName: '',
          contact: '',
          email: currentUser.value?.email || '',
          address: '',
          barangay: ''
        }
        originalProfileData.value = { ...profileForm.value }
      } finally {
        isLoadingProfile.value = false
      }
    }

    const loadUserStats = async () => {
      if (!currentUser.value?.id) return

      try {
        const { data: orders, error } = await supabase
          .from('orders')
          .select('total_amount, status')
          .eq('user_id', currentUser.value.id)

        if (!error && orders) {
          userStats.value.totalOrders = orders.length
          userStats.value.totalSpent = orders.reduce((sum, order) => {
            return sum + (parseFloat(order.total_amount) || 0)
          }, 0)
        }
      } catch (error) {
        console.error('Error loading stats:', error)
      }
    }

    const startEditing = () => {
      isEditing.value = true
      originalProfileData.value = { ...profileForm.value }
    }

    const cancelEdit = () => {
      profileForm.value = { ...originalProfileData.value }
      isEditing.value = false
    }

    const handleUpdateProfile = async () => {
      if (!currentUser.value?.id) {
        toast.error('No user logged in')
        return
      }

      isLoading.value = true

      try {
        const updateData = {
          id: currentUser.value.id,
          email: currentUser.value.email,
          first_name: profileForm.value.firstName || '',
          last_name: profileForm.value.lastName || '',
          middle_name: profileForm.value.middleName || '',
          contact: profileForm.value.contact || '',
          contact_number: profileForm.value.contact || '',
          house_street_address: profileForm.value.address || '',
          address: profileForm.value.address || '',
          barangay: profileForm.value.barangay || '',
          updated_at: new Date().toISOString()
        }

        const { data, error } = await supabase
          .from('users')
          .upsert(updateData)
          .select()

        if (error) {
          throw error
        }

        // Update auth metadata
        await supabase.auth.updateUser({
          data: {
            first_name: profileForm.value.firstName,
            last_name: profileForm.value.lastName,
            middle_name: profileForm.value.middleName,
            contact_number: profileForm.value.contact,
            house_street_address: profileForm.value.address,
            barangay: profileForm.value.barangay,
            full_name: displayName.value
          }
        })

        toast.success('Profile updated successfully!')
        isEditing.value = false
        originalProfileData.value = { ...profileForm.value }
        
      } catch (error) {
        console.error('Update error:', error)
        toast.error('Failed to update profile: ' + error.message)
      } finally {
        isLoading.value = false
      }
    }

    const handleAvatarUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error('File size must be less than 5MB')
          return
        }

        avatarFile.value = file
        
        const reader = new FileReader()
        reader.onload = (e) => {
          avatarPreview.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const uploadAvatar = async () => {
      if (!avatarFile.value) return

      isAvatarLoading.value = true

      try {
        const fileExt = avatarFile.value.name.split('.').pop()
        const fileName = `avatar-${currentUser.value.id}-${Date.now()}.${fileExt}`
        const filePath = `avatars/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(filePath, avatarFile.value)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('uploads')
          .getPublicUrl(filePath)

        await supabase.auth.updateUser({
          data: { avatar_url: publicUrl }
        })

        toast.success('Profile picture updated!')
        showAvatarUpload.value = false
        avatarFile.value = null
        avatarPreview.value = ''
      } catch (error) {
        console.error('Avatar upload error:', error)
        toast.error('Failed to upload avatar: ' + error.message)
      } finally {
        isAvatarLoading.value = false
      }
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    }

    // Watch for currentUser changes
    watch(currentUser, async (newUser) => {
      if (newUser?.id) {
        await fetchUserProfile()
        await loadUserStats()
      } else {
        isLoadingProfile.value = false
      }
    }, { immediate: true })

    // Load data on mount
    onMounted(async () => {
      if (currentUser.value?.id) {
        await fetchUserProfile()
        await loadUserStats()
      }
    })

    return {
      isEditing,
      isLoading,
      isLoadingProfile,
      isAvatarLoading,
      isAuthLoading,
      showAvatarUpload,
      avatarFile,
      avatarPreview,
      profileForm,
      userStats,
      displayName,
      displayEmail,
      userCreatedAt,
      userAvatar,
      currentUser,
      startEditing,
      cancelEdit,
      handleUpdateProfile,
      handleAvatarUpload,
      uploadAvatar,
      formatDate
    }
  }
}
</script>
 