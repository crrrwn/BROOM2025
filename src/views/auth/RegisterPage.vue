<template>
  <div class="min-h-screen bg-gradient-to-br from-[#A8EBI2] via-[#74E600] to-[#3ED400] flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/30 relative z-10 animate-fade-in">
      <!-- Logo Section -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-gradient-to-br from-[#3ED400] via-[#00C851] to-[#74E600] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <span class="text-white font-bold text-2xl">BS</span>
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-[#3ED400] to-[#00C851] bg-clip-text text-transparent mb-3">
          BROOOM SERVICES
        </h1>
        <p class="text-gray-600 text-lg font-medium">Join our community!</p>
        <p class="text-gray-500 text-sm">Create your account to get started</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- Name Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              First Name <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <input
                v-model="form.firstName"
                type="text"
                required
                class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-300 hover:border-[#74E600] bg-gray-50/50 text-gray-900 placeholder-gray-500"
                placeholder="Juan"
              />
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Middle Name
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <input
                v-model="form.middleName"
                type="text"
                class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-300 hover:border-[#74E600] bg-gray-50/50 text-gray-900 placeholder-gray-500"
                placeholder="Santos"
              />
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">
            Last Name <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <input
              v-model="form.lastName"
              type="text"
              required
              class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-300 hover:border-[#74E600] bg-gray-50/50 text-gray-900 placeholder-gray-500"
              placeholder="Dela Cruz"
            />
          </div>
        </div>

        <!-- Contact Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Email Address <span class="text-red-500">*</span>
            </label>
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
                placeholder="juan@example.com"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Contact Number <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <input
                v-model="form.contactNumber"
                type="tel"
                required
                class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-300 hover:border-[#74E600] bg-gray-50/50 text-gray-900 placeholder-gray-500"
                placeholder="09123456789"
              />
            </div>
          </div>
        </div>

        <!-- Address Information -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">
            House No./Street Address <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <input
              v-model="form.houseStreetAddress"
              type="text"
              required
              class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-300 hover:border-[#74E600] bg-gray-50/50 text-gray-900 placeholder-gray-500"
              placeholder="123 Main Street, Block 1 Lot 2"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">
            Barangay <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <select
              v-model="form.barangay"
              required
              class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-300 bg-gray-50/50 hover:border-[#74E600] text-gray-900 appearance-none cursor-pointer"
            >
              <option value="" class="text-gray-500">Select Barangay</option>
              <option v-for="barangay in barangayList" :key="barangay" :value="barangay" class="text-gray-900">
                {{ barangay }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Password Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Password <span class="text-red-500">*</span>
            </label>
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
                placeholder="••••••••"
              />
            </div>
            <p class="text-xs text-gray-500 mt-1 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
              Password must be at least 8 characters long
            </p>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Confirm Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <input
                v-model="form.confirmPassword"
                type="password"
                required
                class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-300 hover:border-[#74E600] bg-gray-50/50 text-gray-900 placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <!-- Error and Success Messages -->
        <div v-if="error" class="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-4 rounded-xl flex items-center animate-slide-up">
          <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <span class="font-medium">{{ error }}</span>
        </div>

        <div v-if="success" class="bg-gradient-to-r from-[#A8EBI2] to-[#74E600]/20 border-2 border-[#74E600] text-[#00C851] px-4 py-4 rounded-xl flex items-center animate-slide-up">
          <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <span class="font-medium">{{ success }}</span>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          @click="handleRegister"
          class="w-full bg-gradient-to-r from-[#3ED400] via-[#00C851] to-[#74E600] hover:from-[#74E600] hover:via-[#3ED400] hover:to-[#00C851] text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#3ED400]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl cursor-pointer"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating your account...
          </span>
          <span v-else>Create Account</span>
        </button>
      </form>

      <!-- Login Link -->
      <div class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <router-link 
            to="/auth/login" 
            class="inline-flex items-center justify-center w-full py-3 px-6 border-2 border-[#3ED400] text-[#00C851] font-semibold rounded-xl hover:bg-[#3ED400] hover:text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In Instead
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { signUp } from '@/lib/supabase'
import { validateEmail, validatePhone, validatePassword, validateName } from '@/utils/validation'

export default {
  name: 'RegisterPage',
  data() {
    return {
      form: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        houseStreetAddress: '',
        barangay: '',
        password: '',
        confirmPassword: ''
      },
      barangayList: [
        'Balingayan',
        'Balite',
        'Baruyan',
        'Batino',
        'Bayanan I',
        'Bayanan II',
        'Biga',
        'Bondoc',
        'Bucayao',
        'Buhuan',
        'Bulusan',
        'Calero',
        'Camansihan',
        'Camilmil',
        'Canubing I',
        'Canubing II',
        'Comunal',
        'Guinobatan',
        'Gulod',
        'Gutad',
        'Ibaba East',
        'Ibaba West',
        'Ilaya',
        'Lalud',
        'Lazareto',
        'Libis',
        'Lumangbayan',
        'Mahal na Pangalan',
        'Maidlang',
        'Malad',
        'Malamig',
        'Managpi',
        'Masipit',
        'Nag-iba I',
        'Nag-iba II',
        'Navotas',
        'Pachoca',
        'Palhi',
        'Panggalaan',
        'Parang',
        'Patas',
        'Personas',
        'Puting Tubig',
        'Salong',
        'San Antonio',
        'San Vicente Central',
        'San Vicente East',
        'San Vicente North',
        'San Vicente South',
        'San Vicente West',
        'Sapul',
        'Silonay',
        'Sta. Cruz',
        'Sta. Isabel',
        'Sta. Maria Village',
        'Sta. Rita',
        'Sto. Nino',
        'Suqui',
        'Tawagan',
        'Tawiran',
        'Tibag',
        'Wawa'
      ],
      loading: false,
      error: '',
      success: ''
    }
  },
  methods: {
    async handleRegister(event) {
      if (event) {
        event.preventDefault()
      }
      
      this.error = ''
      this.success = ''

      // Validation
      if (!validateName(this.form.firstName)) {
        this.error = 'Please enter a valid first name'
        return
      }

      if (!validateName(this.form.lastName)) {
        this.error = 'Please enter a valid last name'
        return
      }

      if (!validateEmail(this.form.email)) {
        this.error = 'Please enter a valid email address'
        return
      }

      if (!validatePhone(this.form.contactNumber)) {
        this.error = 'Please enter a valid Philippine mobile number (09XXXXXXXXX)'
        return
      }

      if (!this.form.houseStreetAddress.trim()) {
        this.error = 'Please enter your house number and street address'
        return
      }

      if (!this.form.barangay) {
        this.error = 'Please select your barangay'
        return
      }

      if (!validatePassword(this.form.password)) {
        this.error = 'Password must be at least 8 characters long'
        return
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Passwords do not match'
        return
      }

      this.loading = true

      try {
        const userData = {
          firstName: this.form.firstName.trim(),
          middleName: this.form.middleName.trim(),
          lastName: this.form.lastName.trim(),
          contactNumber: this.form.contactNumber.trim(),
          houseStreetAddress: this.form.houseStreetAddress.trim(),
          barangay: this.form.barangay
        }

        console.log('Attempting registration with:', userData)
        const { data, error } = await signUp(this.form.email.trim(), this.form.password, userData)

        if (error) {
          console.error('Registration error:', error)
          this.error = error.message
        } else {
          console.log('Registration successful:', data)
          this.success = 'Account created successfully! Please check your email to confirm your account.'
          // Reset form
          this.form = {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            contactNumber: '',
            houseStreetAddress: '',
            barangay: '',
            password: '',
            confirmPassword: ''
          }
        }
      } catch (err) {
        console.error('Registration error:', err)
        this.error = 'An unexpected error occurred. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
