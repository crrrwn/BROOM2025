<template>
  <div class="min-h-screen bg-white space-y-6 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-[#3ED400] to-[#00C851] bg-clip-text text-transparent">Driver Applications</h1>
        <p class="text-gray-600 mt-1">Review and manage driver applications</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div class="flex items-center">
          <div class="p-3 bg-gradient-to-br from-[#A8EB12] to-[#74E600] rounded-xl shadow-md">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending Applications</p>
            <p class="text-2xl font-bold text-[#3ED400]">{{ stats.pending }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div class="flex items-center">
          <div class="p-3 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-xl shadow-md">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Approved</p>
            <p class="text-2xl font-bold text-[#00C851]">{{ stats.approved }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div class="flex items-center">
          <div class="p-3 bg-gradient-to-br from-red-400 to-red-600 rounded-xl shadow-md">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Rejected</p>
            <p class="text-2xl font-bold text-red-600">{{ stats.rejected }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Applications Table -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 bg-gradient-to-r from-[#A8EB12] to-[#74E600] border-b border-gray-200">
        <h2 class="text-lg font-semibold text-white">Recent Applications</h2>
      </div>
      <!-- Added loading state -->
      <div v-if="loading" class="p-6 text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ED400] mx-auto"></div>
        <p class="mt-2 text-gray-600">Loading applications...</p>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Using dynamic applications data instead of static rows -->
            <tr v-for="application in applications" :key="application.id" class="hover:bg-gray-50 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-full flex items-center justify-center shadow-md">
                    <span class="text-white font-semibold text-sm">
                      {{ getInitials(application.first_name, application.last_name) }}
                    </span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ application.first_name }} {{ application.last_name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ application.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(application.status)" class="inline-flex px-3 py-1 text-xs font-medium rounded-full">
                  {{ application.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(application.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ application.motorcycle_brand }} {{ application.motorcycle_model }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  v-if="application.status === 'pending'"
                  @click="updateApplicationStatus(application.id, 'approved')"
                  class="text-[#00C851] hover:text-[#3ED400] mr-3 font-medium transition-colors duration-200"
                  :disabled="updating"
                >
                  Approve
                </button>
                <button 
                  v-if="application.status === 'pending'"
                  @click="updateApplicationStatus(application.id, 'rejected')"
                  class="text-red-600 hover:text-red-800 mr-3 font-medium transition-colors duration-200"
                  :disabled="updating"
                >
                  Reject
                </button>
                <button @click="viewDetails(application)" class="text-[#74E600] hover:text-[#A8EB12] mr-3 font-medium transition-colors duration-200">
                  View Details
                </button>
                <!-- Added View Document button -->
                <button @click="viewDocument(application)" class="text-[#3ED400] hover:text-[#00C851] font-medium transition-colors duration-200">
                  View Document
                </button>
              </td>
            </tr>
            <!-- Added empty state -->
            <tr v-if="applications.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                No applications found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Driver Details Modal -->
    <!-- Added modal to display detailed driver information -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-gradient-to-r from-[#A8EB12] to-[#74E600] border-b border-gray-200 rounded-t-xl">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-white">Driver Application Details</h2>
            <button @click="closeDetailsModal" class="text-white hover:text-gray-200 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6" v-if="selectedApplication">
          <!-- Personal Information -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-[#3ED400] mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Personal Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">First Name</label>
                <p class="text-gray-900 font-medium">{{ selectedApplication.first_name || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Last Name</label>
                <p class="text-gray-900 font-medium">{{ selectedApplication.last_name || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Email</label>
                <p class="text-gray-900 font-medium">{{ selectedApplication.email || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Phone Number</label>
                <p class="text-gray-900 font-medium">{{ selectedApplication.phone || selectedApplication.phone_number || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Date of Birth</label>
                <p class="text-gray-900 font-medium">{{ formatDate(selectedApplication.birth_date || selectedApplication.date_of_birth) || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Gender</label>
                <p class="text-gray-900 font-medium">{{ selectedApplication.gender || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-[#3ED400] mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Address Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">House No./Street Address</label>
                <p class="text-gray-900 font-medium">{{ selectedApplication.house_street_address || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Barangay</label>
                <p class="text-gray-900 font-medium">{{ selectedApplication.barangay || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <!-- Vehicle Information -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-[#3ED400] mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Vehicle Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Motorcycle Brand</label>
                <p class="text-gray-900 font-medium">{{ selectedApplication.motorcycle_brand || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Motorcycle Model</label>
                <p class="text-gray-900 font-medium">{{ selectedApplication.motorcycle_model || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Plate Number</label>
                <p class="text-gray-900 font-medium">{{ selectedApplication.motorcycle_plate || selectedApplication.plate_number || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Year Model</label>
                <p class="text-gray-900 font-medium">{{ selectedApplication.motorcycle_year || selectedApplication.year_model || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <!-- License Information -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-[#3ED400] mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              License Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Driver's License Number</label>
                <p class="text-gray-900 font-medium">{{ selectedApplication.license_number || selectedApplication.drivers_license_number || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">License Expiry Date</label>
                <p class="text-gray-900 font-medium">{{ formatDate(selectedApplication.license_expiry || selectedApplication.license_expiry_date) || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <!-- Application Status -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-[#3ED400] mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Application Status
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Current Status</label>
                <span :class="getStatusClass(selectedApplication.status)" class="inline-flex px-3 py-1 text-xs font-medium rounded-full mt-1">
                  {{ selectedApplication.status }}
                </span>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Applied Date</label>
                <p class="text-gray-900 font-medium">{{ formatDate(selectedApplication.created_at) || 'N/A' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-sm font-medium text-gray-600">Last Updated</label>
                <p class="text-gray-900 font-medium">{{ formatDate(selectedApplication.updated_at) || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <!-- Added View Document button in modal -->
            <button 
              @click="viewDocument(selectedApplication)"
              class="px-6 py-2 bg-gradient-to-r from-[#74E600] to-[#3ED400] text-white rounded-lg hover:from-[#A8EB12] hover:to-[#74E600] transition-all duration-200 font-medium"
            >
              View Document
            </button>
            <button 
              v-if="selectedApplication.status === 'pending'"
              @click="updateApplicationStatus(selectedApplication.id, 'rejected')"
              class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              :disabled="updating"
            >
              Reject Application
            </button>
            <button 
              v-if="selectedApplication.status === 'pending'"
              @click="updateApplicationStatus(selectedApplication.id, 'approved')"
              class="px-6 py-2 bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white rounded-lg hover:from-[#74E600] hover:to-[#3ED400] transition-all duration-200 font-medium"
              :disabled="updating"
            >
              Approve Application
            </button>
            <button 
              @click="closeDetailsModal"
              class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Documents Modal -->
    <div v-if="showDocumentsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-gradient-to-r from-[#A8EB12] to-[#74E600] border-b border-gray-200 rounded-t-xl">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-white">Driver Documents</h2>
            <button @click="closeDocumentsModal" class="text-white hover:text-gray-200 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <!-- Driver Info Header -->
          <div class="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-lg font-semibold text-[#3ED400] mb-2">
              {{ selectedDriverForDocs?.first_name }} {{ selectedDriverForDocs?.last_name }}
            </h3>
            <p class="text-gray-600">{{ selectedDriverForDocs?.email }}</p>
          </div>

          <!-- Loading State -->
          <div v-if="loadingDocuments" class="text-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3ED400] mx-auto"></div>
            <p class="mt-4 text-gray-600">Loading documents...</p>
          </div>

          <!-- Documents Grid -->
          <div v-else-if="driverDocuments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="document in driverDocuments" :key="document.id" class="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div class="p-4">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-semibold text-gray-900 capitalize">{{ document.document_type.replace('_', ' ') }}</h4>
                  <span class="text-xs text-gray-500">{{ formatDate(document.created_at) }}</span>
                </div>
                
                <!-- Document Preview -->
                <div class="mb-4">
                  <div v-if="isImageFile(document.file_url)" class="relative">
                    <img 
                      :src="document.file_url" 
                      :alt="document.document_type"
                      class="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      @click="openFullImage(document.file_url)"
                    />
                  </div>
                  <div v-else class="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
                    <div class="text-center">
                      <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      <p class="text-sm text-gray-500">{{ getFileType(document.file_url) }} Document</p>
                    </div>
                  </div>
                </div>

                <!-- Document Actions -->
                <div class="flex space-x-2">
                  <a 
                    :href="document.file_url" 
                    target="_blank" 
                    class="flex-1 bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white text-center py-2 px-4 rounded-lg hover:from-[#74E600] hover:to-[#3ED400] transition-all duration-200 text-sm font-medium"
                  >
                    View Full
                  </a>
                  <a 
                    :href="document.file_url" 
                    :download="document.original_filename || `${document.document_type}.${getFileExtension(document.file_url)}`"
                    class="flex-1 bg-gray-600 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- No Documents State -->
          <div v-else class="text-center py-12">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No Documents Found</h3>
            <p class="text-gray-500">This driver hasn't uploaded any documents yet.</p>
          </div>

          <!-- Close Button -->
          <div class="flex justify-end mt-6 pt-4 border-t border-gray-200">
            <button 
              @click="closeDocumentsModal"
              class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Image Modal -->
    <div v-if="showFullImageModal" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-60 p-4" @click="closeFullImageModal">
      <div class="max-w-4xl max-h-full">
        <img :src="fullImageUrl" alt="Document" class="max-w-full max-h-full object-contain rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../../lib/supabase'

export default {
  name: 'AdminDriverApplications',
  data() {
    return {
      applications: [],
      stats: {
        pending: 0,
        approved: 0,
        rejected: 0
      },
      loading: true,
      updating: false,
      showDetailsModal: false,
      selectedApplication: null,
      showDocumentsModal: false,
      selectedDriverForDocs: null,
      driverDocuments: [],
      loadingDocuments: false,
      showFullImageModal: false,
      fullImageUrl: ''
    }
  },
  async mounted() {
    await this.fetchApplications()
  },
  methods: {
    async fetchApplications() {
      try {
        this.loading = true
        
        const { data, error } = await supabase
          .from('driver_applications')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) {
          console.error('Error fetching applications:', error)
          return
        }
        
        this.applications = data || []
        this.calculateStats()
      } catch (error) {
        console.error('Error:', error)
      } finally {
        this.loading = false
      }
    },
    
    calculateStats() {
      this.stats = {
        pending: this.applications.filter(app => app.status === 'pending').length,
        approved: this.applications.filter(app => app.status === 'approved').length,
        rejected: this.applications.filter(app => app.status === 'rejected').length
      }
    },
    
    async updateApplicationStatus(applicationId, newStatus) {
      try {
        this.updating = true
        
        const { error } = await supabase
          .from('driver_applications')
          .update({ 
            status: newStatus,
            updated_at: new Date().toISOString()
          })
          .eq('id', applicationId)
        
        if (error) {
          console.error('Error updating application:', error)
          return
        }
        
        // Update local data
        const application = this.applications.find(app => app.id === applicationId)
        if (application) {
          application.status = newStatus
          application.updated_at = new Date().toISOString()
        }
        
        if (this.selectedApplication && this.selectedApplication.id === applicationId) {
          this.selectedApplication.status = newStatus
          this.selectedApplication.updated_at = new Date().toISOString()
        }
        
        this.calculateStats()
        
        if (this.showDetailsModal) {
          this.closeDetailsModal()
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        this.updating = false
      }
    },
    
    getInitials(firstName, lastName) {
      return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
    },
    
    getStatusClass(status) {
      switch (status) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-800'
        case 'approved':
          return 'bg-green-100 text-green-800'
        case 'rejected':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    
    viewDetails(application) {
      console.log('[v0] ViewDetails clicked, application data:', application)
      console.log('[v0] Application fields:', Object.keys(application))
      console.log('[v0] Field values check:')
      console.log('phone:', application.phone || application.phone_number)
      console.log('birth_date:', application.birth_date || application.date_of_birth)
      console.log('house_street_address:', application.house_street_address)
      console.log('barangay:', application.barangay)
      console.log('motorcycle_plate:', application.motorcycle_plate || application.plate_number)
      console.log('motorcycle_year:', application.motorcycle_year || application.year_model)
      console.log('license_number:', application.license_number || application.drivers_license_number)
      console.log('license_expiry:', application.license_expiry || application.license_expiry_date)
      
      this.selectedApplication = application
      this.showDetailsModal = true
      console.log('[v0] Modal should be showing, selectedApplication:', this.selectedApplication)
    },
    
    closeDetailsModal() {
      this.showDetailsModal = false
      this.selectedApplication = null
    },
    
    async viewDocument(application) {
      try {
        this.selectedDriverForDocs = application
        this.showDocumentsModal = true
        this.loadingDocuments = true
        this.driverDocuments = []

        console.log('[v0] === COMPREHENSIVE DOCUMENT DEBUG START ===')
        console.log('[v0] Application object:', application)
        console.log('[v0] Application ID:', application.id)
        console.log('[v0] Application email:', application.email)

        console.log('[v0] Step 1: Checking table structure...')
        try {
          const { data: tableCheck, error: tableError } = await supabase
            .from('driver_documents')
            .select('*')
            .limit(1)
          
          console.log('[v0] Table exists, sample row:', tableCheck)
          console.log('[v0] Table error:', tableError)
        } catch (tableErr) {
          console.log('[v0] Table might not exist:', tableErr)
        }

        console.log('[v0] Step 2: Checking total document count...')
        const { count, error: countError } = await supabase
          .from('driver_documents')
          .select('*', { count: 'exact', head: true })
        
        console.log('[v0] Total documents in table:', count)
        console.log('[v0] Count error:', countError)

        console.log('[v0] Step 3: Getting all documents to check application_ids...')
        const { data: allDocs, error: allError } = await supabase
          .from('driver_documents')
          .select('id, application_id, user_id, document_type, created_at')
          .limit(10)
        
        console.log('[v0] All documents (first 10):', allDocs)
        console.log('[v0] All docs error:', allError)

        console.log('[v0] Step 4: Trying multiple query variations...')
        
        // Query 1: By application_id
        const { data: query1, error: error1 } = await supabase
          .from('driver_documents')
          .select('*')
          .eq('application_id', application.id)
        console.log('[v0] Query 1 (application_id):', query1, 'Error:', error1)

        // Query 2: By user_id
        const { data: query2, error: error2 } = await supabase
          .from('driver_documents')
          .select('*')
          .eq('user_id', application.id)
        console.log('[v0] Query 2 (user_id):', query2, 'Error:', error2)

        if (application.email) {
          const { data: query3, error: error3 } = await supabase
            .from('driver_documents')
            .select('*')
            .eq('email', application.email)
          console.log('[v0] Query 3 (email):', query3, 'Error:', error3)
        }

        const { data: query4, error: error4 } = await supabase
          .from('driver_documents')
          .select('*')
          .ilike('driver_name', `%${application.first_name}%`)
        console.log('[v0] Query 4 (driver_name):', query4, 'Error:', error4)

        console.log('[v0] === COMPREHENSIVE DOCUMENT DEBUG END ===')

        // Use the first successful query result
        this.driverDocuments = query1 || query2 || []

      } catch (error) {
        console.error('[v0] Catch block error:', error)
      } finally {
        this.loadingDocuments = false
      }
    },

    closeDocumentsModal() {
      this.showDocumentsModal = false
      this.selectedDriverForDocs = null
      this.driverDocuments = []
    },

    isImageFile(url) {
      if (!url) return false
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
      return imageExtensions.some(ext => url.toLowerCase().includes(ext))
    },

    getFileType(url) {
      if (!url) return 'Unknown'
      const extension = this.getFileExtension(url)
      switch (extension.toLowerCase()) {
        case 'pdf': return 'PDF'
        case 'doc':
        case 'docx': return 'Word'
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif': return 'Image'
        default: return 'File'
      }
    },

    getFileExtension(url) {
      if (!url) return ''
      return url.split('.').pop() || ''
    },

    openFullImage(imageUrl) {
      this.fullImageUrl = imageUrl
      this.showFullImageModal = true
    },

    closeFullImageModal() {
      this.showFullImageModal = false
      this.fullImageUrl = ''
    }
  }
}
</script>
