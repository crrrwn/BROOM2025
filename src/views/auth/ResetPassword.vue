<template>
  <div class="min-h-screen bg-gradient-to-br from-[#A8EBI2] to-[#74E600] flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#A8EBI2]/30 to-[#74E600]/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#3ED400]/30 to-[#00C851]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#74E600]/20 to-[#3ED400]/20 rounded-full blur-2xl animate-pulse delay-500"></div>
    </div>

    <div class="max-w-md w-full relative">
      <!-- Main Card -->
      <div class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-[#3ED400]/20 p-8 border border-white/30 animate-fade-in-up">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-2xl mb-4 shadow-lg shadow-[#3ED400]/30">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2h-6m6 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h2M7 7a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2V7z"></path>
            </svg>
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-[#3ED400] to-[#00C851] bg-clip-text text-transparent mb-2">
            Set New Password
          </h1>
          <p class="text-gray-800 text-sm leading-relaxed">
            Enter your new password to complete the reset
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="initializing" class="text-center py-8">
          <svg class="animate-spin h-8 w-8 text-[#3ED400] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Verifying reset link...</p>
        </div>

        <!-- Invalid Link Message -->
        <div v-else-if="!isValidSession" class="text-center py-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Invalid Reset Link</h2>
          <p class="text-gray-600 mb-6">This password reset link is invalid or has expired.</p>
          <router-link 
            to="/auth/forgot-password" 
            class="inline-flex items-center space-x-2 bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            <span>Request New Link</span>
          </router-link>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleUpdatePassword" class="space-y-6">
          <!-- New Password Field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-900">New Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                v-model="form.password"
                type="password"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white text-gray-900"
                placeholder="Enter new password"
              />
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-900">Confirm New Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <input
                v-model="form.confirmPassword"
                type="password"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white text-gray-900"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-2 animate-shake">
            <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{{ error }}</span>
          </div>

          <!-- Success Message -->
          <div v-if="success" class="bg-[#A8EBI2]/20 border border-[#3ED400]/30 text-[#00C851] px-4 py-3 rounded-xl flex items-center space-x-2 animate-bounce-in">
            <svg class="w-5 h-5 text-[#3ED400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{{ success }}</span>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white py-3 px-6 rounded-xl font-semibold shadow-lg shadow-[#3ED400]/30 hover:shadow-xl hover:shadow-[#3ED400]/40 focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300"
          >
            <span v-if="loading" class="flex items-center justify-center space-x-2">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Updating...</span>
            </span>
            <span v-else class="flex items-center justify-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Update Password</span>
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase, updatePassword } from '@/lib/supabase'

export default {
  name: 'ResetPassword',
  data() {
    return {
      form: {
        password: '',
        confirmPassword: ''
      },
      loading: false,
      initializing: true,
      isValidSession: false,
      error: '',
      success: ''
    }
  },
  async mounted() {
    await this.checkResetSession()
  },
  methods: {
    async checkResetSession() {
      try {
        // Check if user has a valid session for password reset
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (session && session.user) {
          this.isValidSession = true
        } else {
          // Check URL parameters for access token
          const urlParams = new URLSearchParams(window.location.hash.substring(1)); // Use hash for fragment parameters
          const accessToken = urlParams.get('access_token')
          const refreshToken = urlParams.get('refresh_token')
          
          if (accessToken && refreshToken) {
            // Set the session with the tokens from URL
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            })
            
            if (!error && data.session) {
              this.isValidSession = true
            }
          }
        }
      } catch (err) {
        console.error('Error checking reset session:', err)
      } finally {
        this.initializing = false
      }
    },
    
    async handleUpdatePassword() {
      this.error = ''
      this.success = ''

      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Passwords do not match'
        return
      }

      if (this.form.password.length < 6) {
        this.error = 'Password must be at least 6 characters long'
        return
      }

      this.loading = true

      try {
        const { data, error } = await updatePassword(this.form.password)

        if (error) {
          this.error = error.message
        } else {
          this.success = 'Password updated successfully! You can now log in with your new password.'
          setTimeout(() => {
            this.$router.push('/auth/login') // Redirect to login after successful reset
          }, 2000)
        }
      } catch (err) {
        this.error = 'An unexpected error occurred'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes bounce-in {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-bounce-in {
  animation: bounce-in 0.5s ease-out;
}
</style>
