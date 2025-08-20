<template>
  <!-- Applied green theme with white background and improved styling -->
  <div class="min-h-screen bg-white space-y-6 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-[#3ED400] to-[#00C851] bg-clip-text text-transparent">System Settings</h1>
        <p class="text-gray-600 mt-1">Configure system-wide settings and preferences</p>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200',
            activeTab === tab.id
              ? 'border-[#3ED400] text-[#00C851]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="mt-6">
      <!-- Manage Services Tab -->
      <div v-if="activeTab === 'categories'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Service Categories</h2>
            <button @click="showAddCategoryModal = true" class="bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white px-6 py-3 rounded-xl hover:from-[#74E600] hover:to-[#3ED400] transition-all duration-300 shadow-lg font-medium">
              Add Service
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gradient-to-r from-[#A8EB12] to-[#74E600]">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Service</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Base Price</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="service in categories" :key="service.id" class="hover:bg-gray-50 transition-colors duration-200">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-lg flex items-center justify-center mr-3 shadow-md">
                        <i :class="service.icon" class="text-white"></i>
                      </div>
                      <div class="text-sm font-medium text-gray-900">{{ service.name }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ service.type }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ service.description }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₱{{ service.base_price }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-3 inline-flex text-xs leading-5 font-semibold rounded-full',
                      service.is_active ? 'bg-gradient-to-r from-[#3ED400]/20 to-[#00C851]/20 text-[#00C851]' : 'bg-red-100 text-red-800'
                    ]">
                      {{ service.is_active ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button @click="editCategory(service)" class="text-[#74E600] hover:text-[#A8EB12] font-medium transition-colors duration-200">Edit</button>
                    <button @click="toggleCategoryStatus(service)" class="text-[#3ED400] hover:text-[#00C851] font-medium transition-colors duration-200">
                      {{ service.is_active ? 'Deactivate' : 'Activate' }}
                    </button>
                    <button @click="deleteCategory(service.id)" class="text-red-600 hover:text-red-800 font-medium transition-colors duration-200">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- QR Codes Tab -->
      <div v-if="activeTab === 'qrcodes'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Payment QR Codes</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="qrCode in paymentQRCodes" :key="qrCode.id" class="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div class="text-center">
                <div class="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                  <img v-if="qrCode.image_url" :src="qrCode.image_url" :alt="qrCode.name" class="w-full h-full object-cover rounded-xl">
                  <i v-else class="fas fa-qrcode text-4xl text-[#3ED400]"></i>
                </div>
                <h3 class="font-medium text-gray-900 mb-2">{{ qrCode.name }}</h3>
                <p class="text-sm text-gray-500 mb-4">{{ qrCode.description }}</p>
                <div class="space-y-2">
                  <button @click="uploadQRCode(qrCode)" class="w-full bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white px-4 py-2 rounded-xl hover:from-[#74E600] hover:to-[#3ED400] transition-all duration-300 text-sm font-medium">
                    {{ qrCode.image_url ? 'Replace' : 'Upload' }} QR Code
                  </button>
                  <button v-if="qrCode.image_url" @click="downloadQRCode(qrCode)" class="w-full bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition-all duration-300 text-sm font-medium">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Promo Codes Tab -->
      <div v-if="activeTab === 'promos'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Promo Codes & Discounts</h2>
            <button @click="showAddPromoModal = true" class="bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white px-6 py-3 rounded-xl hover:from-[#74E600] hover:to-[#3ED400] transition-all duration-300 shadow-lg font-medium">
              Create Promo Code
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gradient-to-r from-[#A8EB12] to-[#74E600]">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Code</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Discount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Valid Until</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Usage</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="promo in promoCodes" :key="promo.id" class="hover:bg-gray-50 transition-colors duration-200">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ promo.code }}</div>
                    <div class="text-sm text-gray-500">{{ promo.description }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-3 inline-flex text-xs leading-5 font-semibold rounded-full',
                      promo.discount_type === 'percentage' ? 'bg-gradient-to-r from-[#74E600]/20 to-[#3ED400]/20 text-[#00C851]' : 'bg-gradient-to-r from-[#3ED400]/20 to-[#00C851]/20 text-[#3ED400]'
                    ]">
                      {{ promo.discount_type === 'percentage' ? 'Percentage' : 'Fixed' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ promo.discount_type === 'percentage' ? promo.discount_value + '%' : '₱' + promo.discount_value }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(promo.valid_until) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ promo.used_count || 0 }}/{{ promo.max_uses || '∞' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-3 inline-flex text-xs leading-5 font-semibold rounded-full',
                      promo.is_active ? 'bg-gradient-to-r from-[#3ED400]/20 to-[#00C851]/20 text-[#00C851]' : 'bg-red-100 text-red-800'
                    ]">
                      {{ promo.is_active ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button @click="editPromo(promo)" class="text-[#74E600] hover:text-[#A8EB12] font-medium transition-colors duration-200">Edit</button>
                    <button @click="togglePromoStatus(promo)" class="text-[#3ED400] hover:text-[#00C851] font-medium transition-colors duration-200">
                      {{ promo.is_active ? 'Deactivate' : 'Activate' }}
                    </button>
                    <button @click="deletePromo(promo.id)" class="text-red-600 hover:text-red-800 font-medium transition-colors duration-200">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- System Logs Tab -->
      <div v-if="activeTab === 'logs'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-900">System Logs</h2>
            <div class="flex space-x-2">
              <select v-model="logFilter" class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200">
                <option value="all">All Actions</option>
                <option value="user">User Management</option>
                <option value="order">Order Management</option>
                <option value="driver">Driver Management</option>
                <option value="system">System Changes</option>
                <option value="fraud">Fraud Detection</option>
              </select>
              <button @click="exportLogs" class="bg-gradient-to-r from-[#74E600] to-[#3ED400] text-white px-6 py-2 rounded-xl hover:from-[#A8EB12] hover:to-[#74E600] transition-all duration-300 shadow-lg font-medium">
                Export Logs
              </button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gradient-to-r from-[#A8EB12] to-[#74E600]">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Timestamp</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Admin</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Details</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">IP Address</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="log in filteredLogs" :key="log.id" class="hover:bg-gray-50 transition-colors duration-200">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDateTime(log.created_at) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ log.admin_name || 'System' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ log.action }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-3 inline-flex text-xs leading-5 font-semibold rounded-full',
                      getCategoryColor(log.categories)
                    ]">
                      {{ log.categories }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{{ log.details }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ log.ip_address || 'N/A' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Category Modal -->
    <div v-if="showAddCategoryModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-2xl rounded-xl bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Add New Service</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
              <input v-model="newCategory.name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <input v-model="newCategory.type" type="text" placeholder="e.g., food_delivery" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea v-model="newCategory.description" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200" rows="3"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Base Price (₱)</label>
              <input v-model.number="newCategory.base_price" type="number" step="0.01" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Icon Class</label>
              <input v-model="newCategory.icon" type="text" placeholder="fas fa-utensils" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200">
            </div>
          </div>
          <div class="flex justify-end space-x-2 mt-6">
            <button @click="showAddCategoryModal = false" class="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all duration-200 font-medium">Cancel</button>
            <button @click="addCategory" class="px-6 py-2 bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white rounded-xl hover:from-[#74E600] hover:to-[#3ED400] transition-all duration-300 font-medium">Add Service</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Promo Modal -->
    <div v-if="showAddPromoModal || showEditPromoModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-2xl rounded-xl bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ showEditPromoModal ? 'Edit' : 'Create' }} Promo Code</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
              <input v-model="currentPromo.code" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input v-model="currentPromo.description" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
              <select v-model="currentPromo.discount_type" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
              <input v-model="currentPromo.discount_value" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Valid Until</label>
              <input v-model="currentPromo.valid_until" type="date" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Max Uses (leave empty for unlimited)</label>
              <input v-model="currentPromo.max_uses" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Order Amount</label>
              <input v-model="currentPromo.min_order_amount" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ED400] transition-all duration-200">
            </div>
          </div>
          <div class="flex justify-end space-x-2 mt-6">
            <button @click="closePromoModal" class="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all duration-200 font-medium">Cancel</button>
            <button @click="savePromo" class="px-6 py-2 bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white rounded-xl hover:from-[#74E600] hover:to-[#3ED400] transition-all duration-300 font-medium">
              {{ showEditPromoModal ? 'Update' : 'Create' }} Promo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success/Error Notifications -->
    <div v-if="notification.show" :class="[
      'fixed top-4 right-4 p-4 rounded-xl shadow-lg z-50 transition-all duration-300',
      notification.type === 'success' ? 'bg-gradient-to-r from-[#3ED400] to-[#00C851] text-white' : 'bg-red-500 text-white'
    ]">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import { supabase } from '@/lib/supabase'

export default {
  name: 'AdminSystemSettings',
  data() {
    return {
      activeTab: 'categories',
      logFilter: 'all',
      showAddCategoryModal: false,
      showAddPromoModal: false,
      showEditPromoModal: false,
      loading: false,
      notification: {
        show: false,
        type: 'success',
        message: ''
      },
      tabs: [
        { id: 'categories', name: 'Manage Services' },
        { id: 'qrcodes', name: 'QR Codes' },
        { id: 'promos', name: 'Promo Codes' },
        { id: 'logs', name: 'System Logs' }
      ],
      categories: [], // This will now store services instead of categories
      paymentQRCodes: [
        {
          id: 1,
          name: 'GCash Payment',
          description: 'GCash QR Code for payments',
          payment_method: 'gcash',
          image_url: null
        },
        {
          id: 2,
          name: 'BPI Online Banking',
          description: 'BPI Online Banking QR Code',
          payment_method: 'bpi',
          image_url: null
        }
      ],
      promoCodes: [],
      systemLogs: [],
      newCategory: {
        name: '',
        type: '',
        description: '',
        base_price: 50.00,
        icon: 'fas fa-star'
      },
      currentPromo: {
        code: '',
        description: '',
        discount_type: 'percentage',
        discount_value: 0,
        valid_until: '',
        max_uses: null,
        min_order_amount: 0
      }
    }
  },
  computed: {
    filteredLogs() {
      if (this.logFilter === 'all') {
        return this.systemLogs
      }
      return this.systemLogs.filter(log => {
        switch (this.logFilter) {
          case 'user':
            return log.categories === 'User Management'
          case 'order':
            return log.categories === 'Order Management'
          case 'driver':
            return log.categories === 'Driver Management'
          case 'system':
            return log.categories === 'System Changes'
          case 'fraud':
            return log.categories === 'Fraud Detection'
          default:
            return true
        }
      })
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        await Promise.all([
          this.loadServices(),
          this.loadPromoCodes(),
          this.loadSystemLogs(),
          this.loadPaymentQRCodes()
        ])
      } catch (error) {
        console.error('Error loading data:', error)
        this.showNotification('Error loading data', 'error')
      } finally {
        this.loading = false
      }
    },

    async loadServices() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('name')

        if (error) throw error
        this.categories = data || []
      } catch (error) {
        console.error('Error loading services:', error)
        this.showNotification('Error loading services', 'error')
      }
    },

    async addCategory() {
      if (!this.newCategory.name || !this.newCategory.description || !this.newCategory.type) {
        this.showNotification('Please fill in all required fields', 'error')
        return
      }

      try {
        console.log('Attempting to add service:', this.newCategory)
        
        let defaultBasePrice = 50.00
        let categoryValue = 'General' // Default category
        
        // Set base price and category based on service type
        switch(this.newCategory.type.toLowerCase()) {
          case 'food_delivery':
          case 'food':
            defaultBasePrice = 50.00
            categoryValue = 'Delivery'
            break
          case 'bill_payments':
          case 'bills':
            defaultBasePrice = 25.00
            categoryValue = 'Financial'
            break
          case 'pickup_drop':
          case 'transport':
            defaultBasePrice = 75.00
            categoryValue = 'Transport'
            break
          case 'grocery_shopping':
          case 'groceries':
            defaultBasePrice = 100.00
            categoryValue = 'Shopping'
            break
          case 'medicine_delivery':
          case 'medicine':
            defaultBasePrice = 60.00
            categoryValue = 'Healthcare'
            break
          case 'gift_delivery':
          case 'gifts':
            defaultBasePrice = 80.00
            categoryValue = 'Delivery'
            break
          case 'documents':
            defaultBasePrice = 50.00
            categoryValue = 'Documents'
            break
          case 'packages':
            defaultBasePrice = 80.00
            categoryValue = 'Delivery'
            break
          case 'laundry':
            defaultBasePrice = 100.00
            categoryValue = 'Services'
            break
          default:
            defaultBasePrice = 50.00
            categoryValue = 'General'
        }
        
        const { data, error } = await supabase
          .from('services')
          .insert([{
            name: this.newCategory.name,
            type: this.newCategory.type,
            description: this.newCategory.description,
            base_price: this.newCategory.base_price || defaultBasePrice,
            icon: this.newCategory.icon || 'fas fa-star',
            categories: categoryValue,
            is_active: true
          }])
          .select()

        if (error) {
          console.error('Supabase error:', error)
          this.showNotification(`Database error: ${error.message}`, 'error')
          return
        }

        if (!data || data.length === 0) {
          this.showNotification('No data returned from database', 'error')
          return
        }

        this.categories.push(data[0])
        this.newCategory = { 
          name: '', 
          type: '', 
          description: '', 
          base_price: 50.00, 
          icon: 'fas fa-star' 
        }
        this.showAddCategoryModal = false
        this.showNotification('Service added successfully', 'success')
        await this.logAdminAction('Service Added', 'System Changes', `Added new service: ${data[0].name}`)
      } catch (error) {
        console.error('Error adding service:', error)
        this.showNotification(`Error adding service: ${error.message || 'Unknown error'}`, 'error')
      }
    },

    async editCategory(service) {
      this.newCategory = { ...service }
      this.showAddCategoryModal = true
    },

    async toggleCategoryStatus(service) {
      try {
        const { error } = await supabase
          .from('services')
          .update({ is_active: !service.is_active })
          .eq('id', service.id)

        if (error) throw error

        service.is_active = !service.
        this.showNotification(`Service ${service.is_active ? 'activated' : 'deactivated'} successfully`, 'success')
        await this.logAdminAction('Service Status Changed', 'System Changes', `Changed ${service.name} status to ${service.is_active ? 'Active' : 'Inactive'}`)
      } catch (error) {
        console.error('Error updating service status:', error)
        this.showNotification('Error updating service status', 'error')
      }
    },

    async deleteCategory(serviceId) {
      if (!confirm('Are you sure you want to delete this service?')) return

      try {
        const service = this.categories.find(c => c.id === serviceId)
        const { error } = await supabase
          .from('services')
          .delete()
          .eq('id', serviceId)

        if (error) throw error

        this.categories = this.categories.filter(c => c.id !== serviceId)
        this.showNotification('Service deleted successfully', 'success')
        await this.logAdminAction('Service Deleted', 'System Changes', `Deleted service: ${service.name}`)
      } catch (error) {
        console.error('Error deleting service:', error)
        this.showNotification('Error deleting service', 'error')
      }
    },

    async loadPaymentQRCodes() {
      try {
        const { data, error } = await supabase
          .from('payment_qr_codes')
          .select('*')
          .in('payment_method', ['gcash', 'bpi'])

        if (error) throw error
        if (data && data.length > 0) {
          this.paymentQRCodes = data
        }
      } catch (error) {
        console.error('Error loading payment QR codes:', error)
      }
    },

    async uploadQRCode(qrCode) {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = async (e) => {
        const file = e.target.files[0]
        if (file) {
          try {
            // Upload to Supabase storage
            const fileName = `qr-${qrCode.payment_method}-${Date.now()}.${file.name.split('.').pop()}`
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('qr-codes')
              .upload(fileName, file)

            if (uploadError) throw uploadError

            // Get public URL
            const { data: urlData } = supabase.storage
              .from('qr-codes')
              .getPublicUrl(fileName)

            // Update database
            const { error: updateError } = await supabase
              .from('payment_qr_codes')
              .upsert({
                payment_method: qrCode.payment_method,
                name: qrCode.name,
                description: qrCode.description,
                image_url: urlData.publicUrl
              })

            if (updateError) throw updateError

            qrCode.image_url = urlData.publicUrl
            this.showNotification('QR Code updated successfully', 'success')
            await this.logAdminAction('QR Code Updated', 'System Changes', `Updated QR code: ${qrCode.name}`)
          } catch (error) {
            console.error('Error uploading QR code:', error)
            this.showNotification('Error uploading QR code', 'error')
          }
        }
      }
      input.click()
    },

    downloadQRCode(qrCode) {
      const link = document.createElement('a')
      link.href = qrCode.image_url
      link.download = `${qrCode.name.replace(/\s+/g, '_')}_QR.png`
      link.click()
    },

    async loadPromoCodes() {
      try {
        const { data, error } = await supabase
          .from('promo_codes')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        this.promoCodes = data || []
      } catch (error) {
        console.error('Error loading promo codes:', error)
      }
    },

    async savePromo() {
      if (!this.currentPromo.code || !this.currentPromo.description) {
        this.showNotification('Please fill in all required fields', 'error')
        return
      }

      try {
        if (this.showEditPromoModal) {
          // Update existing promo
          const { error } = await supabase
            .from('promo_codes')
            .update({
              code: this.currentPromo.code,
              description: this.currentPromo.description,
              discount_type: this.currentPromo.discount_type,
              discount_value: this.currentPromo.discount_value,
              valid_until: this.currentPromo.valid_until,
              max_uses: this.currentPromo.max_uses || null,
              min_order_amount: this.currentPromo.min_order_amount || 0
            })
            .eq('id', this.currentPromo.id)

          if (error) throw error

          // Update local array
          const index = this.promoCodes.findIndex(p => p.id === this.currentPromo.id)
          if (index !== -1) {
            this.promoCodes[index] = { ...this.currentPromo }
          }

          this.showNotification('Promo code updated successfully', 'success')
          await this.logAdminAction('Promo Code Updated', 'System Changes', `Updated promo code: ${this.currentPromo.code}`)
        } else {
          // Create new promo
          const { data, error } = await supabase
            .from('promo_codes')
            .insert([{
              code: this.currentPromo.code,
              description: this.currentPromo.description,
              discount_type: this.currentPromo.discount_type,
              discount_value: this.currentPromo.discount_value,
              valid_until: this.currentPromo.valid_until,
              max_uses: this.currentPromo.max_uses || null,
              min_order_amount: this.currentPromo.min_order_amount || 0,
              is_active: true,
              used_count: 0
            }])
            .select()

          if (error) throw error

          this.promoCodes.unshift(data[0])
          this.showNotification('Promo code created successfully', 'success')
          await this.logAdminAction('Promo Code Created', 'System Changes', `Created promo code: ${this.currentPromo.code}`)
        }

        this.closePromoModal()
      } catch (error) {
        console.error('Error saving promo code:', error)
        this.showNotification('Error saving promo code', 'error')
      }
    },

    editPromo(promo) {
      this.currentPromo = { ...promo }
      this.showEditPromoModal = true
    },

    async togglePromoStatus(promo) {
      try {
        const { error } = await supabase
          .from('promo_codes')
          .update({ is_active: !promo.is_active })
          .eq('id', promo.id)

        if (error) throw error

        promo.is_active = !promo.is_active
        this.showNotification(`Promo code ${promo.is_active ? 'activated' : 'deactivated'} successfully`, 'success')
        await this.logAdminAction('Promo Status Changed', 'System Changes', `Changed ${promo.code} status to ${promo.is_active ? 'Active' : 'Inactive'}`)
      } catch (error) {
        console.error('Error updating promo status:', error)
        this.showNotification('Error updating promo status', 'error')
      }
    },

    async deletePromo(promoId) {
      if (!confirm('Are you sure you want to delete this promo code?')) return

      try {
        const promo = this.promoCodes.find(p => p.id === promoId)
        const { error } = await supabase
          .from('promo_codes')
          .delete()
          .eq('id', promoId)

        if (error) throw error

        this.promoCodes = this.promoCodes.filter(p => p.id !== promoId)
        this.showNotification('Promo code deleted successfully', 'success')
        await this.logAdminAction('Promo Code Deleted', 'System Changes', `Deleted promo code: ${promo.code}`)
      } catch (error) {
        console.error('Error deleting promo code:', error)
        this.showNotification('Error deleting promo code', 'error')
      }
    },

    closePromoModal() {
      this.showAddPromoModal = false
      this.showEditPromoModal = false
      this.currentPromo = {
        code: '',
        description: '',
        discount_type: 'percentage',
        discount_value: 0,
        valid_until: '',
        max_uses: null,
        min_order_amount: 0
      }
    },

    async loadSystemLogs() {
      try {
        const { data, error } = await supabase
          .from('admin_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100)

        if (error) throw error
        this.systemLogs = data || []
      } catch (error) {
        console.error('Error loading system logs:', error)
      }
    },

    async logAdminAction(action, category, details) {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        const { error } = await supabase
          .from('admin_logs')
          .insert([{
            admin_id: user?.id,
            admin_name: user?.email || 'Admin User',
            action: action,
            categories: category,
            details: details,
            ip_address: await this.getClientIP()
          }])

        if (error) throw error
        
        // Reload logs to show the new entry
        await this.loadSystemLogs()
      } catch (error) {
        console.error('Error logging admin action:', error)
      }
    },

    async getClientIP() {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        return data.ip
      } catch (error) {
        return 'Unknown'
      }
    },

    getCategoryColor(category) {
      const colors = {
        'User Management': 'bg-blue-100 text-blue-800',
        'Order Management': 'bg-green-100 text-green-800',
        'Driver Management': 'bg-yellow-100 text-yellow-800',
        'System Changes': 'bg-purple-100 text-purple-800',
        'Fraud Detection': 'bg-red-100 text-red-800'
      }
      return colors[category] || 'bg-gray-100 text-gray-800'
    },

    exportLogs() {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Timestamp,Admin,Action,Category,Details,IP Address\n" +
        this.filteredLogs.map(log => 
          `"${this.formatDateTime(log.created_at)}","${log.admin_name}","${log.action}","${log.categories}","${log.details}","${log.ip_address}"`
        ).join("\n")
      
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `system_logs_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString()
    },

    formatDateTime(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleString()
    },

    showNotification(message, type = 'success') {
      this.notification = {
        show: true,
        type: type,
        message: message
      }
      setTimeout(() => {
        this.notification.show = false
      }, 3000)
    }
  }
}
</script>
