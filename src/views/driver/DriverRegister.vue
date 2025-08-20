<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <div class="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900">Driver Registration</h2>
        <p class="mt-2 text-gray-700">Join our delivery team and start earning today</p>
      </div>

      <div class="bg-white shadow-xl rounded-lg p-8">
        <form @submit.prevent="submitApplication" class="space-y-8">
          <!-- Personal Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  v-model="formData.firstName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Second Name</label>
                <input
                  v-model="formData.secondName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Enter your second name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                <input
                  v-model="formData.middleName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Enter your middle name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  v-model="formData.lastName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Suffix</label>
                <select
                  v-model="formData.suffix"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Select suffix</option>
                  <option value="Jr.">Jr.</option>
                  <option value="Sr.">Sr.</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select
                  v-model="formData.gender"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                <input
                  v-model="formData.contact"
                  type="tel"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="09XXXXXXXXX"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="your.email@example.com"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  v-model="formData.password"
                  type="password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Create a strong password"
                />
              </div>
            </div>
          </div>

          <!-- Added Address Information section -->
          <!-- Address Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">House No./Street Address *</label>
                <input
                  v-model="formData.houseStreetAddress"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="123 Main Street, Block 1 Lot 2"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Barangay *</label>
                <select
                  v-model="formData.barangay"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Select Barangay</option>
                  <option v-for="barangay in barangayList" :key="barangay" :value="barangay">
                    {{ barangay }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Added License Information section -->
          <!-- License Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">License Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Driver's License Number *</label>
                <input
                  v-model="formData.licenseNumber"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="N01-12-123456"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">License Expiry Date *</label>
                <input
                  v-model="formData.licenseExpiryDate"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input
                  v-model="formData.dateOfBirth"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">License Type *</label>
                <select
                  v-model="formData.licenseType"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Select License Type</option>
                  <option value="Non-Professional">Non-Professional</option>
                  <option value="Professional">Professional</option>
                  <option value="Conductor">Conductor</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Motorcycle Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Motorcycle Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                <input
                  v-model="formData.motorcycleBrand"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="e.g., Honda, Yamaha, Suzuki"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Model *</label>
                <input
                  v-model="formData.motorcycleModel"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="e.g., Wave, Mio, Raider"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Plate Number *</label>
                <input
                  v-model="formData.motorcyclePlate"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="ABC-1234"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                <input
                  v-model="formData.motorcycleYear"
                  type="number"
                  required
                  min="1990"
                  max="2024"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="2020"
                />
              </div>
            </div>
          </div>

          <!-- Experience -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Driving Experience *</label>
              <select
                v-model="formData.experience"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="">Select experience level</option>
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
          </div>

          <!-- Document Uploads -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Driver's License *</label>
                <input
                  @change="handleFileChange('license', $event)"
                  type="file"
                  accept="image/*"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <div v-if="files.license.file" class="mt-2 text-sm text-green-600 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  {{ files.license.file.name }}
                </div>
                <div v-if="files.license.previewUrl" class="mt-4">
                  <img :src="files.license.previewUrl" alt="License Preview" class="max-w-full h-auto rounded-md shadow-sm" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">OR/CR *</label>
                <input
                  @change="handleFileChange('orcr', $event)"
                  type="file"
                  accept="image/*"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <div v-if="files.orcr.file" class="mt-2 text-sm text-green-600 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  {{ files.orcr.file.name }}
                </div>
                <div v-if="files.orcr.previewUrl" class="mt-4">
                  <img :src="files.orcr.previewUrl" alt="OR/CR Preview" class="max-w-full h-auto rounded-md shadow-sm" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Selfie *</label>
                <input
                  @change="handleFileChange('selfie', $event)"
                  type="file"
                  accept="image/*"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <div v-if="files.selfie.file" class="mt-2 text-sm text-green-600 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  {{ files.selfie.file.name }}
                </div>
                <div v-if="files.selfie.previewUrl" class="mt-4">
                  <img :src="files.selfie.previewUrl" alt="Selfie Preview" class="max-w-full h-auto rounded-md shadow-sm" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Profile Picture *</label>
                <input
                  @change="handleFileChange('profilePicture', $event)"
                  type="file"
                  accept="image/*"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <div v-if="files.profilePicture.file" class="mt-2 text-sm text-green-600 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  {{ files.profilePicture.file.name }}
                </div>
                <div v-if="files.profilePicture.previewUrl" class="mt-4">
                  <img :src="files.profilePicture.previewUrl" alt="Profile Picture Preview" class="max-w-full h-auto rounded-md shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          <!-- Error/Success Messages -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-md p-4">
            <div class="flex">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-md p-4">
            <div class="flex">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <div class="ml-3">
                <p class="text-sm text-green-800">{{ successMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
              <span v-else>Submit Application</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { registerDriver } from '../../lib/driver.js'

export default {
  name: 'DriverRegister',
  data() {
    return {
      formData: {
        firstName: '',
        secondName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        gender: '',
        contact: '',
        email: '',
        password: '',
        houseStreetAddress: '',
        barangay: '',
        licenseNumber: '',
        licenseExpiryDate: '',
        dateOfBirth: '',
        licenseType: '',
        motorcycleBrand: '',
        motorcycleModel: '',
        motorcyclePlate: '',
        motorcycleYear: '',
        experience: ''
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
      files: {
        license: { file: null, previewUrl: null },
        orcr: { file: null, previewUrl: null },
        selfie: { file: null, previewUrl: null },
        profilePicture: { file: null, previewUrl: null }
      },
      isSubmitting: false,
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    handleFileChange(fileType, event) {
      const file = event.target.files[0]
      if (file) {
        // Revoke previous URL to prevent memory leaks
        if (this.files[fileType].previewUrl) {
          URL.revokeObjectURL(this.files[fileType].previewUrl)
        }
        this.files[fileType].file = file
        this.files[fileType].previewUrl = URL.createObjectURL(file)
      } else {
        this.files[fileType].file = null
        if (this.files[fileType].previewUrl) {
          URL.revokeObjectURL(this.files[fileType].previewUrl)
        }
        this.files[fileType].previewUrl = null
      }
    },
    
    validateForm() {
      // Check required fields
      const requiredFields = [
        'firstName', 'lastName', 'gender', 'contact', 'email', 'password', 
        'houseStreetAddress', 'barangay', 'licenseNumber', 'licenseExpiryDate', 
        'dateOfBirth', 'licenseType', 'motorcycleBrand', 'motorcycleModel', 
        'motorcyclePlate', 'motorcycleYear', 'experience'
      ]
      
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          throw new Error(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`)
        }
      }
      
      // Check required files
      const requiredFiles = ['license', 'orcr', 'selfie', 'profilePicture']
      for (const fileType of requiredFiles) {
        if (!this.files[fileType].file) {
          throw new Error(`${fileType.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`)
        }
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.formData.email)) {
        throw new Error('Please enter a valid email address')
      }
      
      // Validate phone number
      const phoneRegex = /^09\d{9}$/
      if (!phoneRegex.test(this.formData.contact)) {
        throw new Error('Please enter a valid phone number (09XXXXXXXXX)')
      }
    },
    
    async submitApplication() {
      this.errorMessage = ''
      this.successMessage = ''
      this.isSubmitting = true
      
      try {
        // Validate form
        this.validateForm()
        
        // Prepare files for upload
        const filesToUpload = {
          license: this.files.license.file,
          orcr: this.files.orcr.file,
          selfie: this.files.selfie.file,
          profilePicture: this.files.profilePicture.file
        }

        // Submit application and upload files
        const result = await registerDriver(this.formData, filesToUpload)
        
        this.successMessage = 'Application submitted successfully! You will be notified once your application is reviewed.'
        
        // Revoke all object URLs after successful submission to free up memory
        Object.values(this.files).forEach(fileObj => {
          if (fileObj.previewUrl) {
            URL.revokeObjectURL(fileObj.previewUrl)
          }
        })

        // Reset form after successful submission
        setTimeout(() => {
          this.$router.push('/driver/login')
        }, 3000)
        
      } catch (error) {
        console.error('Registration error:', error)
        this.errorMessage = error.message || 'Failed to submit application. Please try again.'
      } finally {
        this.isSubmitting = false
      }
    }
  },
  beforeUnmount() {
    // Clean up object URLs when component is unmounted
    Object.values(this.files).forEach(fileObj => {
      if (fileObj.previewUrl) {
        URL.revokeObjectURL(fileObj.previewUrl)
      }
    })
  }
}
</script>
