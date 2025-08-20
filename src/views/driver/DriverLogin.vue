<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4">
          <svg class="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-white">Driver Login</h2>
        <p class="mt-2 text-blue-200">Sign in to your driver account</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-lg shadow-xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-md p-3">
            <div class="flex">
              <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-sm text-red-700">{{ errorMessage }}</p>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Links -->
        <div class="mt-6 text-center space-y-2">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <router-link to="/driver/register" class="text-blue-600 hover:text-blue-500 font-medium">
              Apply as Driver
            </router-link>
          </p>
          <p class="text-xs text-gray-500">
            Note: You can only login after admin approval
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

export default {
  name: 'DriverLogin',
  setup() {
    const router = useRouter()
    
    const isLoading = ref(false)
    const errorMessage = ref('')
    const form = ref({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      if (isLoading.value) return
      
      isLoading.value = true
      errorMessage.value = ''
      
      try {
        console.log('Attempting driver login with:', form.value.email)
        
        // Query the driver_applications table directly
        const { data, error } = await supabase
          .from('driver_applications')
          .select('*')
          .eq('email', form.value.email)
          .eq('password_hash', form.value.password)
          .single()

        if (error) {
          console.error('Supabase login error:', error)
          
          if (error.code === 'PGRST116') {
            errorMessage.value = 'Invalid email or password. Please check your credentials.'
          } else {
            errorMessage.value = `Login failed: ${error.message}`
          }
          return
        }

        if (!data) {
          errorMessage.value = 'Invalid credentials or application not found.'
          return
        }

        console.log('Driver application found:', data)

        // Check if the application is approved
        if (data.status !== 'approved') {
          if (data.status === 'pending') {
            errorMessage.value = 'Your application is still pending admin approval. Please wait for review.'
          } else if (data.status === 'rejected') {
            errorMessage.value = 'Your application has been rejected. Please contact support for more information.'
          } else {
            errorMessage.value = 'Your application is not yet approved. Please wait for admin review.'
          }
          return
        }

        // Login successful - store session
        const driverSession = {
          id: data.id,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          status: data.status,
          motorcycle_brand: data.motorcycle_brand,
          motorcycle_model: data.motorcycle_model,
          motorcycle_plate: data.motorcycle_plate,
          loginTime: new Date().toISOString()
        }
        
        localStorage.setItem('driverSession', JSON.stringify(driverSession))
        
        console.log('Driver login successful, redirecting to dashboard')
        
        // Redirect to driver dashboard
        router.push('/driver/dashboard')
        
      } catch (error) {
        console.error('Error in handleLogin:', error)
        errorMessage.value = 'An unexpected error occurred. Please try again.'
      } finally {
        isLoading.value = false
      }
    }

    return {
      form,
      isLoading,
      errorMessage,
      handleLogin
    }
  }
}
</script>
