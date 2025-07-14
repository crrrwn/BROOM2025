<template>
  <div class="min-h-screen bg-gradient-to-br from-[#A8EBI2] to-[#74E600] flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
      <!-- Success Icon -->
      <div class="mb-6">
        <div class="w-20 h-20 bg-gradient-to-r from-[#3ED400] to-[#00C851] rounded-full flex items-center justify-center mx-auto">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold text-gray-800 mb-4">
        Email Confirmed!
      </h1>

      <!-- Message -->
      <p class="text-gray-600 mb-8 leading-relaxed">
        Your email has been successfully verified. You can now sign in to your BROOOM SERVICES account and start booking our services.
      </p>

      <!-- Continue Button -->
      <button 
        @click="goToLogin"
        class="w-full bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white font-semibold py-3 px-6 rounded-xl hover:from-[#74E600] hover:to-[#3ED400] transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Continue to Sign In
      </button>

      <!-- Additional Info -->
      <p class="text-sm text-gray-500 mt-6">
        Welcome to BROOOM SERVICES! 🚚
      </p>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/lib/supabase'

export default {
  name: 'EmailConfirmed',
  methods: {
    async goToLogin() {
      // Sign out the user first to ensure they need to login again
      await supabase.auth.signOut()
      this.$router.push('/auth/login')
    }
  },
  mounted() {
    // Optional: Auto redirect after a few seconds
    // setTimeout(() => {
    //   this.goToLogin()
    // }, 3000)
  }
}
</script>
