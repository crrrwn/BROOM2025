<template>
  <div class="min-h-screen bg-white space-y-6 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-[#3ED400] to-[#00C851] bg-clip-text text-transparent">Orders Management</h1>
        <p class="text-gray-600 mt-1">Manage all customer orders</p>
      </div>
      <div class="flex items-center space-x-4">
        <select
          v-model="statusFilter"
          class="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-200"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          v-model="paymentStatusFilter"
          class="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-200"
        >
          <option value="">All Payment Status</option>
          <option value="pending">Payment Pending</option>
          <option value="approved">Payment Approved</option>
          <option value="rejected">Payment Rejected</option>
        </select>
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search orders..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3ED400] focus:border-[#3ED400] transition-all duration-200"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <button
          @click="refreshOrders"
          class="px-6 py-2 bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white rounded-xl hover:from-[#74E600] hover:to-[#3ED400] transition-all duration-300 shadow-lg font-medium"
        >
          Refresh
        </button>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-[#A8EB12] to-[#74E600]">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Order ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Service</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Payment Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Order Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Driver</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="9" class="px-6 py-12 text-center">
                <div class="flex justify-center items-center">
                  <svg class="animate-spin h-8 w-8 text-[#3ED400]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="ml-2 text-gray-600">Loading orders...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredOrders.length === 0">
              <td colspan="9" class="px-6 py-12 text-center text-gray-500">
                No orders found
              </td>
            </tr>
            <tr v-else v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">#{{ order.id.slice(0, 8) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-full flex items-center justify-center shadow-md">
                    <span class="text-white font-semibold text-xs">
                      {{ getCustomerInitial(order) }}
                    </span>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">
                      {{ getCustomerName(order) }}
                    </div>
                    <div class="text-sm text-gray-500">{{ getCustomerEmail(order) }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ getServiceName(order) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">₱{{ getOrderAmount(order) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getPaymentStatusClass(order.payment_status)" class="inline-flex px-3 py-1 text-xs font-medium rounded-full">
                  {{ order.payment_status || 'pending' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select
                  v-if="order.status !== 'cancelled'"
                  :value="order.status"
                  @change="updateOrderStatus(order.id, $event.target.value)"
                  :class="getStatusSelectClass(order.status)"
                  class="text-xs font-medium rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-[#3ED400] transition-all duration-200"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <span v-else :class="getStatusClass(order.status)" class="inline-flex px-3 py-1 text-xs font-medium rounded-full">
                  Cancelled
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="order.assigned_driver" class="text-sm text-gray-900">
                  {{ order.assigned_driver }}
                </div>
                <button
                  v-else-if="order.status !== 'cancelled' && order.status !== 'completed'"
                  @click="openDriverAssignment(order)"
                  class="text-[#74E600] hover:text-[#A8EB12] text-sm font-medium transition-colors duration-200"
                >
                  Assign Driver
                </button>
                <span v-else class="text-sm text-gray-500">-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(order.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewOrder(order)"
                    class="text-[#74E600] hover:text-[#A8EB12] font-medium transition-colors duration-200"
                  >
                    View
                  </button>
                  <button
                    @click="viewChatLogs(order)"
                    class="text-[#3ED400] hover:text-[#00C851] font-medium transition-colors duration-200"
                  >
                    Chat
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
      <div class="bg-white rounded-xl p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl" @click.stop>
        <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h3 class="text-xl font-bold bg-gradient-to-r from-[#3ED400] to-[#00C851] bg-clip-text text-transparent">Service Booking Details</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Added prominent service booking form details section -->
        <!-- Service Booking Form Details -->
        <div class="mb-8 bg-gradient-to-br from-[#A8EB12]/10 to-[#3ED400]/10 rounded-xl p-6 border border-[#3ED400]/20">
          <h4 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <svg class="w-6 h-6 text-[#3ED400] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            Service Booking Form Details
          </h4>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Service Information -->
            <div class="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h5 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 text-[#74E600] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Service Selected
              </h5>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Service Type</label>
                  <p class="mt-1 text-lg font-bold text-[#3ED400]">{{ getServiceName(selectedOrder) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Service ID</label>
                  <p class="mt-1 text-sm text-gray-600 font-mono">{{ selectedOrder.service_id || 'N/A' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Service Category</label>
                  <p class="mt-1 text-sm text-gray-900">{{ getServiceCategory(selectedOrder) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Final Amount</label>
                  <p class="mt-1 text-xl font-bold text-[#00C851]">₱{{ getOrderAmount(selectedOrder) }}</p>
                </div>
              </div>
            </div>

            <!-- Customer Form Data -->
            <div class="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h5 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 text-[#74E600] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Customer Information
              </h5>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Full Name</label>
                  <p class="mt-1 text-sm font-semibold text-gray-900">{{ getCustomerName(selectedOrder) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email Address</label>
                  <p class="mt-1 text-sm text-gray-900">{{ getCustomerEmail(selectedOrder) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Contact Number</label>
                  <p class="mt-1 text-sm text-gray-900">{{ getCustomerContact(selectedOrder) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Booking Date</label>
                  <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedOrder.created_at) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Location & Service Details -->
          <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Pickup & Delivery Information -->
            <div class="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h5 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 text-[#00C851] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Location Details
              </h5>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Pickup Address</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.pickup_address || 'N/A' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Delivery Address</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.delivery_address || 'N/A' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Distance</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.distance || 'N/A' }} km</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Estimated Duration</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.estimated_duration || 'N/A' }} minutes</p>
                </div>
              </div>
            </div>

            <!-- Booking Preferences -->
            <div class="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h5 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 text-[#A8EB12] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Booking Preferences
              </h5>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Preferred Date</label>
                  <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedOrder.scheduled_date) || 'ASAP' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Preferred Time</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.scheduled_time || 'Flexible' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Special Instructions</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.special_instructions || 'None provided' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Items/Description</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedOrder.items || selectedOrder.description || 'No items specified' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Added comprehensive service details section similar to MyOrders -->
          <!-- Detailed Service Information -->
          <div v-if="selectedOrder.service_details" class="mt-6 bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h5 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 text-[#3ED400] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Service Details
            </h5>
            <div class="bg-gray-50 rounded-lg p-4">
              <div v-html="formatServiceDetails(selectedOrder.service_details, getServiceTypeFromOrder(selectedOrder))" class="text-sm text-gray-700"></div>
            </div>
          </div>
        </div>

        <!-- Simplified additional order information section -->
        <!-- Additional Order Information -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Order Status -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 text-[#3ED400] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Order Status
            </h4>
            <div class="space-y-2">
              <div>
                <label class="block text-xs font-medium text-gray-600">Current Status</label>
                <span :class="getStatusClass(selectedOrder.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                  {{ formatStatus(selectedOrder.status) }}
                </span>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600">Payment Status</label>
                <span :class="getPaymentStatusClass(selectedOrder.payment_status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                  {{ formatPaymentStatus(selectedOrder.payment_status) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Driver Information -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 text-[#74E600] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Driver Assignment
            </h4>
            <div class="space-y-2">
              <div>
                <label class="block text-xs font-medium text-gray-600">Assigned Driver</label>
                <p class="text-sm text-gray-900">{{ selectedOrder.assigned_driver || 'Not assigned yet' }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600">Driver Contact</label>
                <p class="text-sm text-gray-900">{{ selectedOrder.driver_contact || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <!-- Tracking Information -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 text-[#00C851] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
              Tracking
            </h4>
            <div class="space-y-2">
              <div>
                <label class="block text-xs font-medium text-gray-600">Order ID</label>
                <p class="text-sm text-gray-900 font-mono">#{{ selectedOrder.id }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600">Tracking Number</label>
                <p class="text-sm text-gray-900 font-mono">{{ selectedOrder.tracking_number || 'N/A' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Removed the Raw Order Data (Debug) section -->
        <!-- Raw Order Data (for debugging) -->
        <!-- <div class="mt-6">
          <details class="bg-gray-100 rounded-lg p-4">
            <summary class="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
              View Raw Order Data (Debug)
            </summary>
            <pre class="mt-3 text-xs text-gray-600 overflow-auto max-h-40 bg-white p-3 rounded border">{{ JSON.stringify(selectedOrder, null, 2) }}</pre>
          </details>
        </div> -->

        <!-- Action Buttons -->
        <div class="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            @click="viewChatLogs(selectedOrder)"
            class="px-4 py-2 bg-gradient-to-r from-[#74E600] to-[#3ED400] text-white rounded-lg hover:from-[#A8EB12] hover:to-[#74E600] transition-all duration-300 font-medium"
          >
            View Chat Logs
          </button>
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Driver Assignment Modal -->
    <div v-if="showDriverModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeDriverModal">
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">Assign Driver</h3>
          <button @click="closeDriverModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <!-- AI Suggested Drivers -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">AI Suggested Drivers (Based on Proximity & Availability)</h4>
            <div class="space-y-3">
              <div v-for="driver in suggestedDrivers" :key="driver.id" 
                   class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                   @click="assignDriver(driver.id, driver.name)">
                <div class="flex justify-between items-center">
                  <div>
                    <h5 class="font-semibold text-gray-900">{{ driver.name }}</h5>
                    <p class="text-sm text-gray-600">{{ driver.distance }} away • Rating: {{ driver.rating }}/5</p>
                    <p class="text-sm text-green-600">{{ driver.status }}</p>
                  </div>
                  <div class="text-right">
                    <span class="text-sm font-medium text-blue-600">{{ driver.completion_rate }}% completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Manual Driver Selection -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Manual Driver Selection</h4>
            <select v-model="selectedDriverId" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select a driver manually</option>
              <option v-for="driver in allDrivers" :key="driver.id" :value="driver.id">
                {{ driver.name }} - {{ driver.status }}
              </option>
            </select>
            <button
              v-if="selectedDriverId"
              @click="assignDriver(selectedDriverId, getDriverName(selectedDriverId))"
              class="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Assign Selected Driver
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Logs Modal -->
    <div v-if="showChatModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeChatModal">
      <div class="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">Chat Logs</h3>
          <button @click="closeChatModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="message in chatLogs" :key="message.id" 
               :class="['flex', message.sender_type === 'customer' ? 'justify-start' : 'justify-end']">
            <div :class="[
              'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
              message.sender_type === 'customer' 
                ? 'bg-gray-100 text-gray-900' 
                : 'bg-blue-600 text-white'
            ]">
              <div class="text-sm font-medium mb-1">
                {{ message.sender_type === 'customer' ? 'Customer' : 'Driver' }}
              </div>
              <div class="text-sm">{{ message.message }}</div>
              <div class="text-xs opacity-75 mt-1">
                {{ formatDate(message.created_at) }}
              </div>
            </div>
          </div>
          <div v-if="chatLogs.length === 0" class="text-center text-gray-500 py-8">
            No chat messages found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllOrders, updateOrderStatusAdmin, getAllServices } from '@/lib/admin'
import { supabase } from '@/lib/supabase'

export default {
  name: 'AdminOrders',
  data() {
    return {
      orders: [],
      services: [],
      loading: true,
      searchQuery: '',
      statusFilter: '',
      paymentStatusFilter: '',
      selectedOrder: null,
      showDriverModal: false,
      showChatModal: false,
      chatLogs: [],
      selectedDriverId: '',
      suggestedDrivers: [
        {
          id: 'driver1',
          name: 'Juan Dela Cruz',
          distance: '2.5 km',
          rating: 4.8,
          status: 'Available',
          completion_rate: 95
        },
        {
          id: 'driver2',
          name: 'Maria Santos',
          distance: '3.1 km',
          rating: 4.9,
          status: 'Available',
          completion_rate: 98
        },
        {
          id: 'driver3',
          name: 'Pedro Garcia',
          distance: '4.2 km',
          rating: 4.7,
          status: 'Available',
          completion_rate: 92
        }
      ],
      allDrivers: [
        { id: 'driver1', name: 'Juan Dela Cruz', status: 'Available' },
        { id: 'driver2', name: 'Maria Santos', status: 'Available' },
        { id: 'driver3', name: 'Pedro Garcia', status: 'Available' },
        { id: 'driver4', name: 'Ana Rodriguez', status: 'Busy' },
        { id: 'driver5', name: 'Carlos Mendoza', status: 'Offline' }
      ]
    }
  },
  computed: {
    filteredOrders() {
      let filtered = this.orders

      // Filter by status
      if (this.statusFilter) {
        filtered = filtered.filter(order => order.status === this.statusFilter)
      }

      // Filter by payment status
      if (this.paymentStatusFilter) {
        filtered = filtered.filter(order => (order.payment_status || 'pending') === this.paymentStatusFilter)
      }

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(order => 
          order.id.toLowerCase().includes(query) ||
          this.getCustomerName(order).toLowerCase().includes(query) ||
          this.getCustomerEmail(order).toLowerCase().includes(query) ||
          this.getServiceName(order).toLowerCase().includes(query)
        )
      }

      return filtered
    }
  },
  methods: {
    async loadOrders() {
      try {
        this.loading = true
        console.log('🔄 Loading orders and services...')
        
        const { data: servicesData, error: servicesError } = await getAllServices()
        
        if (servicesError) {
          console.error('❌ Error loading services:', servicesError)
          this.services = []
        } else {
          this.services = servicesData || []
          console.log('✅ Services loaded:', this.services.length)
          console.log('📋 Available services:', this.services.map(s => ({ 
            id: s.id, 
            name: s.name, 
            type: s.type,
            category: s.category || s.categories
          })))
        }
        
        const { data: ordersData, error: ordersError } = await getAllOrders()
        
        if (ordersError) {
          console.error('❌ Error loading orders:', ordersError)
          this.orders = []
        } else {
          this.orders = ordersData || []
          console.log('✅ Orders loaded:', this.orders.length)
          
          if (this.orders.length > 0) {
            console.log('📊 Sample order service data:', {
              service_id: this.orders[0].service_id,
              service_id_type: typeof this.orders[0].service_id,
              services_joined: this.orders[0].services,
              available_fields: Object.keys(this.orders[0])
            })
          }
        }

      } catch (error) {
        console.error('💥 Error loading data:', error)
        this.orders = []
        this.services = []
      } finally {
        this.loading = false
      }
    },

    async refreshOrders() {
      await this.loadOrders()
    },

    async updateOrderStatus(orderId, newStatus) {
      try {
        console.log('🔄 Updating order status:', orderId, newStatus)
        
        const { error } = await updateOrderStatusAdmin(orderId, newStatus)
        
        if (error) {
          console.error('❌ Error updating order status:', error)
          alert('Failed to update order status. Please try again.')
        } else {
          // Update local data
          const orderIndex = this.orders.findIndex(o => o.id === orderId)
          if (orderIndex !== -1) {
            this.orders[orderIndex].status = newStatus
            console.log('✅ Order status updated locally')
          }
          
          // Update selected order if it's the same
          if (this.selectedOrder && this.selectedOrder.id === orderId) {
            this.selectedOrder.status = newStatus
          }
        }
      } catch (error) {
        console.error('💥 Error updating order status:', error)
        alert('Failed to update order status. Please try again.')
      }
    },

    async assignDriver(driverId, driverName) {
      try {
        console.log('🔄 Assigning driver:', driverId, driverName)
        
        // Update local data
        const orderIndex = this.orders.findIndex(o => o.id === this.selectedOrder.id)
        if (orderIndex !== -1) {
          this.orders[orderIndex].assigned_driver = driverName
        }
        
        this.closeDriverModal()
        alert(`Driver ${driverName} assigned successfully`)
      } catch (error) {
        console.error('💥 Error assigning driver:', error)
        alert('Failed to assign driver. Please try again.')
      }
    },

    // Helper methods for data display
    getCustomerName(order) {
      if (order.users) {
        return `${order.users.first_name || ''} ${order.users.last_name || ''}`.trim() || 'Unknown Customer'
      }
      return 'Unknown Customer'
    },

    getCustomerEmail(order) {
      return order.users?.email || 'No email'
    },

    getCustomerContact(order) {
      return order.users?.contact_number || 'No contact'
    },

    getCustomerInitial(order) {
      const name = this.getCustomerName(order)
      return name.charAt(0).toUpperCase()
    },

    getServiceName(order) {
      console.log(`🔍 Getting service name for order ${order.id?.slice(0, 8)}`)
      console.log(`📊 Order service data:`, {
        service_id: order.service_id,
        service_id_type: typeof order.service_id,
        services_joined: order.services,
        available_fields: Object.keys(order)
      })
      
      // First try: Use joined services data
      if (order.services && order.services.name) {
        console.log(`✅ Found service via join: ${order.services.name}`)
        return order.services.name
      }
      
      // Second try: Find service by service_id in loaded services
      if (order.service_id && this.services.length > 0) {
        console.log(`🔍 Looking for service_id: "${order.service_id}" (${typeof order.service_id}) in ${this.services.length} services`)
        console.log(`📋 Available services:`, this.services.map(s => ({ 
          id: s.id, 
          id_type: typeof s.id, 
          name: s.name, 
          type: s.type 
        })))
        
        // Try exact match first
        let service = this.services.find(s => {
          const match = s.id === order.service_id
          console.log(`Comparing: ${s.id} (${typeof s.id}) === ${order.service_id} (${typeof order.service_id}) = ${match}`)
          return match
        })
        
        // Try string/number conversions if exact match fails
        if (!service) {
          console.log(`🔄 Trying type conversions...`)
          if (typeof order.service_id === 'string') {
            const numericServiceId = parseInt(order.service_id)
            if (!isNaN(numericServiceId)) {
              service = this.services.find(s => s.id === numericServiceId)
              console.log(`🔍 Trying numeric conversion: ${numericServiceId} - Found: ${service?.name}`)
            }
          } else if (typeof order.service_id === 'number') {
            const stringServiceId = order.service_id.toString()
            service = this.services.find(s => s.id === stringServiceId)
            console.log(`🔍 Trying string conversion: "${stringServiceId}" - Found: ${service?.name}`)
          }
        }
        
        // Try UUID matching if service_id looks like a UUID
        if (!service && typeof order.service_id === 'string' && order.service_id.includes('-')) {
          service = this.services.find(s => s.id === order.service_id || s.uuid === order.service_id)
          console.log(`🔍 Trying UUID matching: ${order.service_id} - Found: ${service?.name}`)
        }
        
        // Try loose matching by service type/name if still no match
        if (!service && order.service_id) {
          const serviceIdStr = order.service_id.toString().toLowerCase()
          service = this.services.find(s => 
            s.type?.toLowerCase() === serviceIdStr ||
            s.name?.toLowerCase().includes(serviceIdStr) ||
            s.category?.toLowerCase() === serviceIdStr ||
            s.categories?.toLowerCase() === serviceIdStr
          )
          console.log(`🔍 Trying loose matching for: ${serviceIdStr} - Found: ${service?.name}`)
        }
        
        if (service) {
          console.log(`✅ Found service: ${service.name}`)
          return service.name
        } else {
          console.warn(`⚠️ No service found for service_id: "${order.service_id}"`)
          console.log('Available service data:', this.services)
        }
      } else {
        console.warn(`⚠️ No service_id or services not loaded. service_id: ${order.service_id}, services count: ${this.services.length}`)
      }
      
      // Third try: Use direct service name fields from order
      const directFields = ['service_name', 'service_type', 'category', 'type', 'name']
      for (const field of directFields) {
        if (order[field]) {
          console.log(`✅ Using ${field} field: ${order[field]}`)
          return this.formatServiceName(order[field])
        }
      }
      
      // Fourth try: Check order details object
      if (order.details && typeof order.details === 'object') {
        for (const field of directFields) {
          if (order.details[field]) {
            console.log(`✅ Using details.${field}: ${order.details[field]}`)
            return this.formatServiceName(order.details[field])
          }
        }
      }
      
      // Fifth try: Map common service IDs to names
      const serviceIdMap = {
        '1': 'Food Delivery',
        '2': 'Bill Payments', 
        '3': 'Pick-up & Drop',
        '4': 'Grocery Shopping',
        '5': 'Medicine Delivery',
        '6': 'Gift Delivery',
        'food': 'Food Delivery',
        'bills': 'Bill Payments',
        'pickup': 'Pick-up & Drop',
        'grocery': 'Grocery Shopping',
        'medicine': 'Medicine Delivery',
        'gift': 'Gift Delivery'
      }
      
      if (order.service_id && serviceIdMap[order.service_id.toString().toLowerCase()]) {
        const mappedName = serviceIdMap[order.service_id.toString().toLowerCase()]
        console.log(`✅ Using service ID mapping: ${order.service_id} -> ${mappedName}`)
        return mappedName
      }
      
      console.warn(`❌ No service name found for order ${order.id?.slice(0, 8)}`)
      console.log(`🔍 Final order data:`, order)
      
      if (order.service_id) {
        return `Service ID: ${order.service_id}`
      }
      return 'Service Not Found'
    },

    getServiceCategory(order) {
      console.log(`🔍 Getting service category for order ${order.id?.slice(0, 8)}`)
      
      // First try: Use joined services data
      if (order.services) {
        const category = order.services.category || order.services.categories || order.services.description || order.services.type
        if (category) {
          console.log(`✅ Found category via join: ${category}`)
          return category
        }
      }
      
      // Second try: Find service by service_id in loaded services
      if (order.service_id && this.services.length > 0) {
        let service = this.services.find(s => s.id === order.service_id)
        
        if (!service && typeof order.service_id === 'string') {
          const numericServiceId = parseInt(order.service_id)
          service = this.services.find(s => s.id === numericServiceId)
        }
        
        if (!service && typeof order.service_id === 'number') {
          const stringServiceId = order.service_id.toString()
          service = this.services.find(s => s.id === stringServiceId)
        }
        
        if (service) {
          const category = service.category || service.categories || service.description || service.type
          console.log(`✅ Found category via service_id lookup: ${category}`)
          return category || 'General'
        }
      }
      
      if (order.service_category) {
        return order.service_category
      }
      
      if (order.category) {
        return order.category
      }
      
      return 'General'
    },

    getOrderAmount(order) {
      // Specifically look for final_price field
      if (order.final_price !== undefined && order.final_price !== null) {
        console.log(`💰 Order ${order.id.slice(0,8)} final_price: ${order.final_price} (${typeof order.final_price})`)
        return this.formatCurrency(order.final_price)
      }
      
      // If final_price is not available, show a placeholder
      console.warn(`⚠️ Order ${order.id.slice(0,8)} has no final_price field`)
      return this.formatCurrency(0)
    },

    formatCurrency(amount) {
      // Handle different types of input
      let numAmount = amount
      
      // Convert string to number if needed
      if (typeof amount === 'string') {
        // Remove any non-numeric characters except decimal point
        numAmount = parseFloat(amount.replace(/[^\d.-]/g, ''))
      }
      
      // Ensure it's a valid number
      if (isNaN(numAmount)) {
        numAmount = 0
      }
      
      // Format with Philippine peso
      return new Intl.NumberFormat('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(numAmount)
    },

    formatPaymentStatus(status) {
      if (!status) return 'Pending'
      return status.charAt(0).toUpperCase() + status.slice(1)
    },

    formatStatus(status) {
      if (!status) return 'Unknown'
      return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')
    },

    async viewOrder(order) {
      try {
        console.log('👁️ Fetching fresh order data for order ID:', order.id)
        
        // Fetch the specific order with all related data
        const { data: freshOrderData, error } = await supabase
          .from('orders')
          .select(`
            *,
            users (
              id,
              first_name,
              last_name,
              email,
              contact_number
            ),
            services (
              id,
              name,
              type,
              category,
              categories,
              description
            )
          `)
          .eq('id', order.id)
          .single()

        if (error) {
          console.error('❌ Error fetching fresh order data:', error)
          // Fallback to cached data if database fetch fails
          this.selectedOrder = order
        } else {
          console.log('✅ Fresh order data fetched:', freshOrderData)
          console.log('📊 Available fields in database:', Object.keys(freshOrderData))
          console.log('💰 Final price from database:', freshOrderData.final_price)
          console.log('🏷️ Service data from database:', freshOrderData.services)
          console.log('👤 User data from database:', freshOrderData.users)
          console.log('📋 Service details from database:', freshOrderData.service_details)
          
          this.selectedOrder = freshOrderData
        }
      } catch (error) {
        console.error('💥 Error in viewOrder:', error)
        // Fallback to cached data
        this.selectedOrder = order
      }
    },

    openDriverAssignment(order) {
      this.selectedOrder = order
      this.selectedDriverId = ''
      this.showDriverModal = true
    },

    getDriverName(driverId) {
      const driver = this.allDrivers.find(d => d.id === driverId)
      return driver ? driver.name : ''
    },

    closeModal() {
      this.selectedOrder = null
    },

    closeDriverModal() {
      this.showDriverModal = false
      this.selectedDriverId = ''
    },

    closeChatModal() {
      this.showChatModal = false
      this.chatLogs = []
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A'
      try {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch (error) {
        return 'Invalid Date'
      }
    },

    getStatusClass(status) {
      const classes = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'confirmed': 'bg-blue-100 text-blue-800',
        'in_progress': 'bg-purple-100 text-purple-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },

    getPaymentStatusClass(status) {
      const classes = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'approved': 'bg-green-100 text-green-800',
        'rejected': 'bg-red-100 text-red-800',
        'completed': 'bg-blue-100 text-blue-800',
        'failed': 'bg-red-100 text-red-800'
      }
      return classes[status || 'pending'] || 'bg-yellow-100 text-yellow-800'
    },

    getStatusSelectClass(status) {
      const classes = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'confirmed': 'bg-blue-100 text-blue-800',
        'in_progress': 'bg-purple-100 text-purple-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },

    formatServiceName(serviceName) {
      if (!serviceName) return 'Unknown Service'
      
      // Convert snake_case or kebab-case to Title Case
      return serviceName
        .replace(/[_-]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    },

    formatServiceDetails(details, serviceType) {
      try {
        const parsed = typeof details === 'string' ? JSON.parse(details) : details;
        let formattedDetails = '';

        // Helper to format keys for display
        const formatKey = (key) => key.replace(/([_])/g, ' ').replace(/^./, str => str.toUpperCase());

        formattedDetails += `<div class="space-y-2">`;

        // Common fields that might be in service_details but are already displayed outside
        const excludedKeys = [
          'service_type', 'service_name', 'delivery_address', 'contact_number',
          'zip_code', 'payment_method', 'total_fee', 'pickup_address',
          'pickup_contact', 'dropoff_address', 'dropoff_contact',
          'package_description', 'special_instructions', 'form_submitted_at'
        ];

        // Helper function to handle file paths with public URLs
        const handleFilePath = (filePath, label) => {
          if (!filePath) return '';
          
          try {
            const { data } = supabase.storage.from('payment-proofs').getPublicUrl(filePath);
            if (data && data.publicUrl) {
              const isImage = filePath.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/);
              if (isImage) {
                return `<div class="mt-2"><strong>${label}:</strong><br><img src="${data.publicUrl}" alt="${label}" class="mt-2 max-w-xs rounded-lg border shadow-sm cursor-pointer" onclick="window.open('${data.publicUrl}', '_blank')" style="max-height: 200px; object-fit: contain;"></div>`;
              } else {
                return `<p><strong>${label}:</strong> <a href="${data.publicUrl}" target="_blank" class="text-blue-600 hover:underline">View File</a></p>`;
              }
            } else {
              return `<p><strong>${label}:</strong> File not available</p>`;
            }
          } catch (error) {
            console.error('Error getting public URL:', error);
            return `<p><strong>${label}:</strong> File not available</p>`;
          }
        };

        // Determine service type from various sources
        const detectedServiceType = serviceType || parsed.service_type || this.getServiceTypeFromOrder(this.selectedOrder);

        switch (detectedServiceType) {
          case 'food_delivery':
          case 'food':
            if (parsed.restaurant) formattedDetails += `<p><strong>Restaurant:</strong> ${parsed.restaurant}</p>`;
            if (parsed.restaurant_address) formattedDetails += `<p><strong>Restaurant Address:</strong> ${parsed.restaurant_address}</p>`;
            if (parsed.food_items) formattedDetails += `<p><strong>Food Items:</strong> ${parsed.food_items}</p>`;
            if (parsed.estimated_amount) formattedDetails += `<p><strong>Estimated Amount:</strong> ₱${parsed.estimated_amount.toLocaleString()}</p>`;
            if (parsed.restaurant_contact) formattedDetails += `<p><strong>Restaurant Contact:</strong> ${parsed.restaurant_contact}</p>`;
            if (parsed.food_notes) formattedDetails += `<p><strong>Special Instructions:</strong> ${parsed.food_notes}</p>`;
            if (parsed.payment_proof_path) {
              formattedDetails += handleFilePath(parsed.payment_proof_path, 'Payment Proof');
            }
            break;

          case 'bill_payments':
          case 'bills':
            if (parsed.reference_number) formattedDetails += `<p><strong>Reference number:</strong> ${parsed.reference_number}</p>`;
            if (parsed.biller_name) formattedDetails += `<p><strong>Biller name:</strong> ${parsed.biller_name}</p>`;
            if (parsed.account_number) formattedDetails += `<p><strong>Account number:</strong> ${parsed.account_number}</p>`;
            if (parsed.bill_amount) formattedDetails += `<p><strong>Bill amount:</strong> ₱${parsed.bill_amount.toLocaleString()}</p>`;
            if (parsed.due_date) formattedDetails += `<p><strong>Due date:</strong> ${new Date(parsed.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>`;
            formattedDetails += `<p><strong>Is surprise:</strong> ${parsed.is_surprise ? 'Yes' : 'No'}</p>`;
            formattedDetails += `<p><strong>Needs prescription:</strong> ${parsed.needs_prescription ? 'Yes' : 'No'}</p>`;
            if (parsed.reference_file_path) {
              formattedDetails += handleFilePath(parsed.reference_file_path, 'Reference file path');
            } else {
              formattedDetails += `<p><strong>Reference file path:</strong></p>`;
            }
            break;

          case 'pickup_drop':
          case 'pickup':
            if (parsed.pickup_contact) formattedDetails += `<p><strong>Pickup Contact:</strong> ${parsed.pickup_contact}</p>`;
            if (parsed.dropoff_contact) formattedDetails += `<p><strong>Drop-off Contact:</strong> ${parsed.dropoff_contact}</p>`;
            if (parsed.item_type) formattedDetails += `<p><strong>Item Type:</strong> ${formatKey(parsed.item_type)}</p>`;
            if (parsed.item_details) formattedDetails += `<p><strong>Item Details:</strong> ${parsed.item_details}</p>`;
            if (parsed.delivery_notes) formattedDetails += `<p><strong>Special Instructions:</strong> ${parsed.delivery_notes}</p>`;
            if (parsed.payment_proof_path) {
              formattedDetails += handleFilePath(parsed.payment_proof_path, 'Payment Proof');
            }
            break;

          case 'gift_delivery':
          case 'gift':
            if (parsed.gift_type) formattedDetails += `<p><strong>Gift Type:</strong> ${formatKey(parsed.gift_type)}</p>`;
            if (parsed.gift_store_name) formattedDetails += `<p><strong>Store Name:</strong> ${parsed.gift_store_name}</p>`;
            if (parsed.gift_store_address) formattedDetails += `<p><strong>Store Address:</strong> ${parsed.gift_store_address}</p>`;
            if (parsed.gift_details) formattedDetails += `<p><strong>Gift Details:</strong> ${parsed.gift_details}</p>`;
            if (parsed.recipient_name) formattedDetails += `<p><strong>Recipient Name:</strong> ${parsed.recipient_name}</p>`;
            if (parsed.recipient_contact) formattedDetails += `<p><strong>Recipient Contact:</strong> ${parsed.recipient_contact}</p>`;
            if (parsed.gift_message) formattedDetails += `<p><strong>Gift Message:</strong> ${parsed.gift_message}</p>`;
            if (parsed.delivery_schedule) formattedDetails += `<p><strong>Delivery Schedule:</strong> ${new Date(parsed.delivery_schedule).toLocaleString()}</p>`;
            formattedDetails += `<p><strong>Surprise Delivery:</strong> ${parsed.is_surprise ? 'Yes' : 'No'}</p>`;
            if (parsed.payment_proof_path) {
              formattedDetails += handleFilePath(parsed.payment_proof_path, 'Payment Proof');
            }
            break;

          case 'medicine_delivery':
          case 'medicine':
            if (parsed.pharmacy) formattedDetails += `<p><strong>Pharmacy:</strong> ${parsed.pharmacy}</p>`;
            if (parsed.medicine_list) formattedDetails += `<p><strong>Medicine List:</strong> ${parsed.medicine_list}</p>`;
            formattedDetails += `<p><strong>Prescription Required:</strong> ${parsed.needs_prescription ? 'Yes' : 'No'}</p>`;
            if (parsed.prescription_file_path) {
              formattedDetails += handleFilePath(parsed.prescription_file_path, 'Prescription');
            }
            if (parsed.patient_name) formattedDetails += `<p><strong>Patient Name:</strong> ${parsed.patient_name}</p>`;
            if (parsed.estimated_cost) formattedDetails += `<p><strong>Estimated Cost:</strong> ₱${parsed.estimated_cost.toLocaleString()}</p>`;
            if (parsed.payment_proof_path) {
              formattedDetails += handleFilePath(parsed.payment_proof_path, 'Payment Proof');
            }
            break;

          case 'grocery':
          case 'grocery_shopping':
            if (parsed.preferred_store) formattedDetails += `<p><strong>Preferred Store:</strong> ${parsed.preferred_store}</p>`;
            if (parsed.item_list) formattedDetails += `<p><strong>Shopping List:</strong> ${parsed.item_list}</p>`;
            if (parsed.budget_range) formattedDetails += `<p><strong>Budget Range:</strong> ${parsed.budget_range}</p>`;
            if (parsed.exact_budget && parsed.exact_budget > 0) formattedDetails += `<p><strong>Exact Budget:</strong> ₱${parsed.exact_budget.toLocaleString()}</p>`;
            if (parsed.brand_preferences) formattedDetails += `<p><strong>Brand Preferences:</strong> ${parsed.brand_preferences}</p>`;
            if (parsed.delivery_instructions) formattedDetails += `<p><strong>Special Instructions:</strong> ${parsed.delivery_instructions}</p>`;
            if (parsed.payment_proof_path) {
              formattedDetails += handleFilePath(parsed.payment_proof_path, 'Payment Proof');
            }
            break;

          default:
            // Fallback for any other service type or unhandled fields
            Object.entries(parsed)
              .filter(([key, value]) => value !== null && value !== '' && !excludedKeys.includes(key))
              .forEach(([key, value]) => {
                let displayValue = value;
                if (typeof value === 'boolean') {
                  displayValue = value ? 'Yes' : 'No';
                } else if (key.includes('date') || key.includes('schedule')) {
                  try {
                    displayValue = new Date(value).toLocaleString();
                  } catch (e) {/* ignore */}
                } else if (key.includes('amount') || key.includes('cost') || key.includes('budget')) {
                  if (typeof value === 'number') {
                    displayValue = `₱${value.toLocaleString()}`;
                  }
                } else if (key.includes('_path')) {
                  formattedDetails += handleFilePath(value, formatKey(key));
                  return;
                }
                formattedDetails += `<p><strong>${formatKey(key)}:</strong> ${displayValue}</p>`;
              });
        }

        formattedDetails += `</div>`;
        return formattedDetails;
      } catch (e) {
        console.error("Error parsing service details:", e);
        return `<p>${details}</p>`;
      }
    },

    getServiceTypeFromOrder(order) {
      if (!order) return null;
      
      // Try various fields that might contain service type
      const serviceTypeSources = [
        order.service_type,
        order.services?.type,
        order.services?.category,
        order.services?.categories,
        order.services?.name?.toLowerCase()
      ];
      
      for (const source of serviceTypeSources) {
        if (source) {
          const normalized = source.toLowerCase().replace(/[_\s-]/g, '_');
          // Map common variations to standard types
          const typeMap = {
            'food_delivery': 'food_delivery',
            'food': 'food_delivery',
            'bill_payments': 'bill_payments',
            'bills': 'bill_payments',
            'pickup_drop': 'pickup_drop',
            'pickup': 'pickup_drop',
            'pick_up_drop': 'pickup_drop',
            'gift_delivery': 'gift_delivery',
            'gift': 'gift_delivery',
            'medicine_delivery': 'medicine_delivery',
            'medicine': 'medicine_delivery',
            'grocery_shopping': 'grocery',
            'grocery': 'grocery'
          };
          
          if (typeMap[normalized]) {
            return typeMap[normalized];
          }
        }
      }
      
      return null;
    },

    async viewOrder(order) {
      try {
        console.log('👁️ Fetching fresh order data for order ID:', order.id)
        
        // Fetch the specific order with all related data
        const { data: freshOrderData, error } = await supabase
          .from('orders')
          .select(`
            *,
            users (
              id,
              first_name,
              last_name,
              email,
              contact_number
            ),
            services (
              id,
              name,
              type,
              category,
              categories,
              description
            )
          `)
          .eq('id', order.id)
          .single()

        if (error) {
          console.error('❌ Error fetching fresh order data:', error)
          // Fallback to cached data if database fetch fails
          this.selectedOrder = order
        } else {
          console.log('✅ Fresh order data fetched:', freshOrderData)
          console.log('📊 Available fields in database:', Object.keys(freshOrderData))
          console.log('💰 Final price from database:', freshOrderData.final_price)
          console.log('🏷️ Service data from database:', freshOrderData.services)
          console.log('👤 User data from database:', freshOrderData.users)
          console.log('📋 Service details from database:', freshOrderData.service_details)
          
          this.selectedOrder = freshOrderData
        }
      } catch (error) {
        console.error('💥 Error in viewOrder:', error)
        // Fallback to cached data
        this.selectedOrder = order
      }
    },

    async viewChatLogs(order) {
      try {
        console.log('💬 Fetching chat logs for order ID:', order.id)
        
        // Fetch chat logs for the specific order
        const { data: chatLogsData, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('order_id', order.id)
          .order('created_at', { ascending: true })

        if (error) {
          console.error('❌ Error fetching chat logs:', error)
          this.chatLogs = []
          alert('Failed to fetch chat logs. Please try again.')
        } else {
          console.log('✅ Chat logs fetched:', chatLogsData.length)
          this.chatLogs = chatLogsData
          this.showChatModal = true
        }
      } catch (error) {
        console.error('💥 Error in viewChatLogs:', error)
        this.chatLogs = []
        alert('Failed to fetch chat logs. Please try again.')
      }
    }
  },
  mounted() {
    this.loadOrders()
  }
}
</script>
