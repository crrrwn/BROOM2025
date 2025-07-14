<template>
  <div class="min-h-screen bg-gradient-to-br from-[#A8EBI2] via-[#74E600] to-[#3ED400] flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/30 relative z-10 animate-fade-in">
      <!-- Logo Section -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#3ED400] via-[#00C851] to-[#74E600] rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-[#3ED400] to-[#00C851] bg-clip-text text-transparent mb-3">
          BROOOM SERVICES
        </h1>
        <p class="text-gray-600 text-lg font-medium">Welcome back!</p>
        <p class="text-gray-500 text-sm">Sign in to continue your journey</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
              </svg>
            </div>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-300 hover:border-[#74E600] bg-gray-50/50 text-gray-900 placeholder-gray-500"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-300 hover:border-[#74E600] bg-gray-50/50 text-gray-900 placeholder-gray-500"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div v-if="error" class="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-4 rounded-xl flex items-center animate-slide-up">
          <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <span class="font-medium">{{ error }}</span>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gradient-to-r from-[#3ED400] via-[#00C851] to-[#74E600] text-white py-4 px-6 rounded-xl hover:from-[#74E600] hover:via-[#3ED400] hover:to-[#00C851] focus:outline-none focus:ring-4 focus:ring-[#3ED400]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-if="loading">Signing you in...</span>
          <span v-else">Sign In</span>
        </button>
      </form>

      <div class="mt-8 space-y-6">
        <div class="text-center">
          <router-link 
            to="/auth/forgot-password" 
            class="text-[#00C851] hover:text-[#3ED400] text-sm font-semibold transition-colors duration-300 hover:underline"
          >
            Forgot your password?
          </router-link>
        </div>
        
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500 font-medium">New to Brooom Services?</span>
          </div>
        </div>
        
        <div class="text-center">
          <router-link 
            to="/auth/register" 
            class="inline-flex items-center justify-center w-full py-3 px-6 border-2 border-[#3ED400] text-[#00C851] font-semibold rounded-xl hover:bg-[#3ED400] hover:text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create New Account
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { signIn } from '@/lib/supabase'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleLogin(event) {
      if (event) {
        event.preventDefault()
      }
      
      console.log('🔐 Login attempt started')
      this.error = ''
      this.loading = true

      try {
        console.log('📧 Email:', this.form.email)
        
        // Validate inputs
        if (!this.form.email || !this.form.password) {
          this.error = 'Please fill in all fields'
          return
        }

        console.log('📡 Calling Supabase signIn...')
        
        // Call the signIn function from Supabase
        const result = await signIn(this.form.email, this.form.password)
        
        console.log('📨 Supabase result:', result)
        
        if (result && result.data && result.data.user) {
          console.log('✅ Login successful! User:', result.data.user)
          
          // Clear form
          this.form.email = ''
          this.form.password = ''
          
          // Navigate to dashboard immediately
          console.log('🔄 Navigating to dashboard...')
          this.$router.push('/dashboard')
          
        } else if (result && result.error) {
          console.error('❌ Login error:', result.error)
          this.error = result.error.message || 'Login failed. Please try again.'
        } else {
          console.error('❌ Unexpected result format:', result)
          this.error = 'Login failed. Please try again.'
        }
        
      } catch (err) {
        console.error('💥 Login exception:', err)
        this.error = 'An error occurred. Please try again.'
      } finally {
        this.loading = false
        console.log('🏁 Login attempt completed')
      }
    }
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>
