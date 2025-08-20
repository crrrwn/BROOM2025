<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900">My Assignments</h1>
      <p class="text-gray-600 mt-1">Manage your current and completed deliveries</p>
    </div>

    <!-- Status Filter -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="status in statusFilters"
          :key="status.value"
          @click="activeFilter = status.value; loadAssignments()"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
            activeFilter === status.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ status.label }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="bg-white rounded-lg shadow-sm p-8">
      <div class="flex items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="ml-2 text-gray-600">Loading assignments...</span>
      </div>
    </div>

    <!-- Assignments List -->
    <div v-else-if="assignments.length === 0" class="bg-white rounded-lg shadow-sm p-8">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="mt-2 text-lg text-gray-600">No assignments found</p>
        <p class="text-sm text-gray-500">Your accepted deliveries will appear here</p>
      </div>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="assignment in assignments"
        :key="assignment.id"
        class="bg-white rounded-lg shadow-sm p-6"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <span :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              assignment.service_type === 'express' ? 'bg-red-100 text-red-800' :
              assignment.service_type === 'delivery' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            ]">
              {{ assignment.service_type.toUpperCase() }}
            </span>
            <span class="text-sm text-gray-500">Order #{{ assignment.id }}</span>
            <span :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
              assignment.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            ]">
              {{ assignment.status.replace('_', ' ').toUpperCase() }}
            </span>
          </div>
          <div class="text-right">
            <div class="text-xl font-bold text-green-600">
              ₱{{ assignment.total_fee?.toLocaleString() }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 class="font-semibold text-gray-900 mb-2">Pickup Location</h3>
            <p class="text-sm text-gray-600">{{ assignment.pickup_address }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ formatDate(assignment.pickup_date) }}</p>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-2">Delivery Location</h3>
            <p class="text-sm text-gray-600">{{ assignment.delivery_address }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ formatDate(assignment.delivery_date) }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4 text-sm text-gray-600">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {{ assignment.users?.first_name }} {{ assignment.users?.last_name }}
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ assignment.users?.phone }}
            </div>
          </div>

          <div class="flex space-x-2">
            <router-link
              :to="`/order/${assignment.id}/chat`"
              class="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 text-sm transition-colors duration-200"
            >
              Chat
            </router-link>
            
            <button
              v-if="assignment.status === 'accepted'"
              @click="updateStatus(assignment.id, 'in_progress')"
              :disabled="updatingStatus === assignment.id"
              class="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50 transition-colors duration-200"
            >
              Start Delivery
            </button>
            
            <button
              v-if="assignment.status === 'in_progress'"
              @click="updateStatus(assignment.id, 'completed')"
              :disabled="updatingStatus === assignment.id"
              class="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm disabled:opacity-50 transition-colors duration-200"
            >
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
import { getDriverAssignments, updateOrderStatus } from '@/lib/driver'

export default {
  name: 'MyAssignments',
  setup() {
    const toast = inject('toast')
    
    const isLoading = ref(false)
    const assignments = ref([])
    const updatingStatus = ref(null)
    const activeFilter = ref('')
    
    const statusFilters = [
      { label: 'All', value: '' },
      { label: 'Accepted', value: 'accepted' },
      { label: 'In Progress', value: 'in_progress' },
      { label: 'Completed', value: 'completed' }
    ]

    const loadAssignments = async () => {
      isLoading.value = true
      try {
        const data = await getDriverAssignments(activeFilter.value || null)
        assignments.value = data
      } catch (error) {
        console.error('Error loading assignments:', error)
        toast.error('Failed to load assignments')
      } finally {
        isLoading.value = false
      }
    }

    const updateStatus = async (orderId, status) => {
      updatingStatus.value = orderId
      try {
        await updateOrderStatus(orderId, status)
        toast.success(`Order ${status.replace('_', ' ')} successfully!`)
        // Reload assignments to reflect changes
        await loadAssignments()
      } catch (error) {
        console.error('Error updating status:', error)
        toast.error('Failed to update order status')
      } finally {
        updatingStatus.value = null
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString()
    }

    onMounted(() => {
      loadAssignments()
    })

    return {
      isLoading,
      assignments,
      updatingStatus,
      activeFilter,
      statusFilters,
      loadAssignments,
      updateStatus,
      formatDate
    }
  }
}
</script>
