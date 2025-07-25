<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Services Management</h1>
        <p class="text-gray-600 mt-1">Manage all available services</p>
      </div>
      <button
        @click="showCreateModal = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>Add Service</span>
      </button>
    </div>

    <!-- Services Grid -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>

    <div v-else-if="services.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
      </svg>
      <p class="text-gray-500 text-lg">No services available</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="service in services" :key="service.id" class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ service.name }}</h3>
          <div class="flex space-x-2">
            <button
              @click="editService(service)"
              class="text-blue-600 hover:text-blue-800 p-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button
              @click="confirmDelete(service)"
              class="text-red-600 hover:text-red-800 p-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="space-y-2 mb-4">
          <p class="text-sm text-gray-600">
            <span class="font-medium">Category:</span> {{ service.category }}
          </p>
          <p class="text-sm text-gray-600">
            <span class="font-medium">Base Price:</span> ₱{{ formatCurrency(service.base_price) }}
          </p>
          <p class="text-sm text-gray-600">
            <span class="font-medium">Status:</span>
            <span :class="service.is_active ? 'text-green-600' : 'text-red-600'" class="font-medium">
              {{ service.is_active ? 'Active' : 'Inactive' }}
            </span>
          </p>
        </div>
        
        <p class="text-sm text-gray-700 mb-4">{{ service.description }}</p>
        
        <div class="flex justify-between items-center">
          <button
            @click="toggleServiceStatus(service)"
            :class="service.is_active ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'"
            class="px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200"
          >
            {{ service.is_active ? 'Deactivate' : 'Activate' }}
          </button>
          <span class="text-xs text-gray-500">
            Created {{ formatDate(service.created_at) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Create/Edit Service Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModals">
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">
            {{ showCreateModal ? 'Create New Service' : 'Edit Service' }}
          </h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="showCreateModal ? createService() : updateService()" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
              <input
                v-model="serviceForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter service name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                v-model="serviceForm.category"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select category</option>
                <option value="delivery">Delivery</option>
                <option value="pickup">Pickup</option>
                <option value="transport">Transport</option>
                <option value="logistics">Logistics</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Base Price (₱)</label>
              <input
                v-model.number="serviceForm.base_price"
                type="number"
                step="0.01"
                min="0"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="serviceForm.is_active"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option :value="true">Active</option>
                <option :value="false">Inactive</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="serviceForm.description"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter service description"
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModals"
              class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {{ submitting ? 'Saving...' : (showCreateModal ? 'Create Service' : 'Update Service') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showDeleteModal = false">
      <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4" @click.stop>
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Delete Service</h3>
            <p class="text-sm text-gray-600">This action cannot be undone.</p>
          </div>
        </div>
        
        <p class="text-gray-700 mb-6">
          Are you sure you want to delete "<strong>{{ serviceToDelete?.name }}</strong>"?
        </p>
        
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            @click="deleteService"
            :disabled="submitting"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {{ submitting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllServices, createService, updateService, deleteService } from '@/lib/admin'

export default {
  name: 'AdminServices',
  data() {
    return {
      services: [],
      loading: true,
      showCreateModal: false,
      showEditModal: false,
      showDeleteModal: false,
      submitting: false,
      serviceToDelete: null,
      editingService: null,
      serviceForm: {
        name: '',
        category: '',
        description: '',
        base_price: 0,
        is_active: true
      }
    }
  },
  methods: {
    async loadServices() {
      try {
        this.loading = true
        const { data, error } = await getAllServices()
        
        if (error) {
          console.error('Error loading services:', error)
        } else {
          this.services = data || []
        }
      } catch (error) {
        console.error('Error loading services:', error)
      } finally {
        this.loading = false
      }
    },
    async createService() {
      try {
        this.submitting = true
        const { data, error } = await createService(this.serviceForm)
        
        if (error) {
          console.error('Error creating service:', error)
        } else {
          this.services.unshift(data[0])
          this.closeModals()
          this.resetForm()
        }
      } catch (error) {
        console.error('Error creating service:', error)
      } finally {
        this.submitting = false
      }
    },
    async updateService() {
      try {
        this.submitting = true
        const { data, error } = await updateService(this.editingService.id, this.serviceForm)
        
        if (error) {
          console.error('Error updating service:', error)
        } else {
          const index = this.services.findIndex(s => s.id === this.editingService.id)
          if (index !== -1) {
            this.services[index] = data[0]
          }
          this.closeModals()
          this.resetForm()
        }
      } catch (error) {
        console.error('Error updating service:', error)
      } finally {
        this.submitting = false
      }
    },
    async deleteService() {
      try {
        this.submitting = true
        const { error } = await deleteService(this.serviceToDelete.id)
        
        if (error) {
          console.error('Error deleting service:', error)
        } else {
          this.services = this.services.filter(s => s.id !== this.serviceToDelete.id)
          this.showDeleteModal = false
          this.serviceToDelete = null
        }
      } catch (error) {
        console.error('Error deleting service:', error)
      } finally {
        this.submitting = false
      }
    },
    async toggleServiceStatus(service) {
      try {
        const { error } = await updateService(service.id, { is_active: !service.is_active })
        
        if (error) {
          console.error('Error updating service status:', error)
        } else {
          const index = this.services.findIndex(s => s.id === service.id)
          if (index !== -1) {
            this.services[index].is_active = !this.services[index].is_active
          }
        }
      } catch (error) {
        console.error('Error updating service status:', error)
      }
    },
    editService(service) {
      this.editingService = service
      this.serviceForm = {
        name: service.name,
        category: service.category,
        description: service.description || '',
        base_price: service.base_price,
        is_active: service.is_active
      }
      this.showEditModal = true
    },
    confirmDelete(service) {
      this.serviceToDelete = service
      this.showDeleteModal = true
    },
    closeModals() {
      this.showCreateModal = false
      this.showEditModal = false
      this.editingService = null
      this.resetForm()
    },
    resetForm() {
      this.serviceForm = {
        name: '',
        category: '',
        description: '',
        base_price: 0,
        is_active: true
      }
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount || 0)
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  },
  mounted() {
    this.loadServices()
  }
}
</script>
