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
            Reset Password
          </h1>
          <p class="text-gray-600 text-sm leading-relaxed">
            Enter your email to receive a password reset link
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleResetPassword" class="space-y-6">
          <!-- Email Field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Email Address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              <input
                v-model="email"
                type="email"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white text-gray-900"
                placeholder="Enter your email address"
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
              <span>Sending...</span>
            </span>
            <span v-else class="flex items-center justify-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              <span>Send Reset Link</span>
            </span>
          </button>
        </form>

        <!-- Back to Login -->
        <div class="mt-8 text-center">
          <router-link 
            to="/auth/login" 
            class="inline-flex items-center space-x-2 text-[#3ED400] hover:text-[#00C851] text-sm font-medium transition-colors duration-300 group"
          >
            <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Back to Sign In</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resetPassword } from '@/lib/supabase'

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      loading: false,
      error: '',
      success: ''
    }
  },
  methods: {
    async handleResetPassword() {
      this.error = ''
      this.success = ''
      this.loading = true

      try {
        const { data, error } = await resetPassword(this.email)

        if (error) {
          this.error = error.message
        } else {
          this.success = 'Password reset link sent to your email!'
          this.email = ''
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
