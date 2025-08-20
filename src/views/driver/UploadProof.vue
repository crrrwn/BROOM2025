<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900">Upload Proof of Delivery</h1>
      <p class="text-gray-600 mt-1">Submit delivery evidence for completed orders</p>
    </div>

    <!-- Order Selection -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Select Completed Order</h2>
      <div v-if="completedOrders.length === 0" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="mt-2 text-lg text-gray-600">No completed orders</p>
        <p class="text-sm text-gray-500">Complete some deliveries first</p>
      </div>
      <div v-else class="space-y-3">
        <div
          v-for="order in completedOrders"
          :key="order.id"
          @click="selectedOrder = order"
          :class="[
            'p-4 border rounded-lg cursor-pointer transition-colors duration-200',
            selectedOrder?.id === order.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          ]"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">Order #{{ order.id }}</p>
              <p class="text-sm text-gray-600">{{ order.service_type }} - ₱{{ order.total_fee }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(order.completed_at) }}</p>
            </div>
            <div class="flex items-center">
              <span class="text-sm text-green-600 font-medium">Completed</span>
              <svg v-if="selectedOrder?.id === order.id" class="ml-2 w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Form -->
    <div v-if="selectedOrder" class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Upload Delivery Proof</h2>
      <form @submit.prevent="handleUpload" class="space-y-6">
        <!-- Pickup Photo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Pickup Photo *
          </label>
          <input
            @change="handleFileChange('pickupPhoto', $event)"
            type="file"
            accept="image/*"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-xs text-gray-500 mt-1">Photo of the item at pickup location</p>
        </div>

        <!-- Delivery Photo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Delivery Photo *
          </label>
          <input
            @change="handleFileChange('deliveryPhoto', $event)"
            type="file"
            accept="image/*"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-xs text-gray-500 mt-1">Photo of successful delivery</p>
        </div>

        <!-- Customer Signature/Receipt -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Customer Signature/Receipt (Optional)
          </label>
          <input
            @change="handleFileChange('signature', $event)"
            type="file"
            accept="image/*"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-xs text-gray-500 mt-1">Customer signature or receipt photo</p>
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Delivery Notes
          </label>
          <textarea
            v-model="form.notes"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any additional notes about the delivery..."
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="isUploading"
            class="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span v-if="isUploading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
            <span v-else>Submit Proof</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
import { getDriverAssignments, uploadDeliveryProof } from '@/lib/driver'

export default {
  name: 'UploadProof',
  setup() {
    const toast = inject('toast')
    
    const completedOrders = ref([])
    const selectedOrder = ref(null)
    const isUploading = ref(false)
    
    const form = ref({
      notes: ''
    })
    
    const files = ref({
      pickupPhoto: null,
      deliveryPhoto: null,
      signature: null
    })

    const loadCompletedOrders = async () => {
      try {
        const data = await getDriverAssignments('completed')
        completedOrders.value = data
      } catch (error) {
        console.error('Error loading completed orders:', error)
        toast.error('Failed to load completed orders')
      }
    }

    const handleFileChange = (type, event) => {
      const file = event.target.files[0]
      if (file) {
        files.value[type] = file
      }
    }

    const handleUpload = async () => {
      if (!selectedOrder.value) {
        toast.error('Please select an order')
        return
      }

      if (!files.value.pickupPhoto || !files.value.deliveryPhoto) {
        toast.error('Please upload both pickup and delivery photos')
        return
      }

      isUploading.value = true
      
      try {
        await uploadDeliveryProof(selectedOrder.value.id, form.value, files.value)
        toast.success('Delivery proof uploaded successfully!')
        
        // Reset form
        selectedOrder.value = null
        form.value.notes = ''
        files.value = {
          pickupPhoto: null,
          deliveryPhoto: null,
          signature: null
        }
        
        // Reload completed orders
        await loadCompletedOrders()
        
      } catch (error) {
        console.error('Error uploading proof:', error)
        toast.error('Failed to upload delivery proof')
      } finally {
        isUploading.value = false
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString()
    }

    onMounted(() => {
      loadCompletedOrders()
    })

    return {
      completedOrders,
      selectedOrder,
      isUploading,
      form,
      files,
      handleFileChange,
      handleUpload,
      formatDate
    }
  }
}
</script>
