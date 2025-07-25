<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">System Settings</h1>
        <p class="text-gray-600">Configure system-wide settings and preferences</p>
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
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="mt-6">
      <!-- Manage Categories Tab -->
      <div v-if="activeTab === 'categories'" class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Service Categories</h2>
            <button @click="showAddCategoryModal = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add Category
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="category in categories" :key="category.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <i :class="category.icon" class="text-blue-600"></i>
                      </div>
                      <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ category.description }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ category.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ category.serviceCount }} services</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button @click="editCategory(category)" class="text-blue-600 hover:text-blue-900">Edit</button>
                    <button @click="toggleCategoryStatus(category)" class="text-yellow-600 hover:text-yellow-900">
                      {{ category.status === 'Active' ? 'Deactivate' : 'Activate' }}
                    </button>
                    <button @click="deleteCategory(category.id)" class="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- QR Codes Tab -->
      <div v-if="activeTab === 'qrcodes'" class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">QR Code Management</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="qrCode in qrCodes" :key="qrCode.id" class="border border-gray-200 rounded-lg p-4">
              <div class="text-center">
                <div class="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img v-if="qrCode.image" :src="qrCode.image" :alt="qrCode.name" class="w-full h-full object-cover rounded-lg">
                  <i v-else class="fas fa-qrcode text-4xl text-gray-400"></i>
                </div>
                <h3 class="font-medium text-gray-900 mb-2">{{ qrCode.name }}</h3>
                <p class="text-sm text-gray-500 mb-4">{{ qrCode.description }}</p>
                <div class="space-y-2">
                  <button @click="uploadQRCode(qrCode)" class="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm">
                    {{ qrCode.image ? 'Replace' : 'Upload' }} QR Code
                  </button>
                  <button v-if="qrCode.image" @click="downloadQRCode(qrCode)" class="w-full bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 text-sm">
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
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Promo Codes & Discounts</h2>
            <button @click="showAddPromoModal = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Create Promo Code
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="promo in promoCodes" :key="promo.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ promo.code }}</div>
                    <div class="text-sm text-gray-500">{{ promo.description }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      promo.type === 'Percentage' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    ]">
                      {{ promo.type }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ promo.type === 'Percentage' ? promo.discount + '%' : '₱' + promo.discount }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ promo.validUntil }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ promo.used }}/{{ promo.maxUses }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      promo.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ promo.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button @click="editPromo(promo)" class="text-blue-600 hover:text-blue-900">Edit</button>
                    <button @click="togglePromoStatus(promo)" class="text-yellow-600 hover:text-yellow-900">
                      {{ promo.status === 'Active' ? 'Deactivate' : 'Activate' }}
                    </button>
                    <button @click="deletePromo(promo.id)" class="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- System Logs Tab -->
      <div v-if="activeTab === 'logs'" class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-900">System Logs</h2>
            <div class="flex space-x-2">
              <select v-model="logFilter" class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Actions</option>
                <option value="user">User Management</option>
                <option value="order">Order Management</option>
                <option value="driver">Driver Management</option>
                <option value="system">System Changes</option>
              </select>
              <button @click="exportLogs" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Export Logs
              </button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="log in filteredLogs" :key="log.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ log.timestamp }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ log.admin }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ log.action }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      getCategoryColor(log.category)
                    ]">
                      {{ log.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{{ log.details }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ log.ipAddress }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Category Modal -->
    <div v-if="showAddCategoryModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Add New Category</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
              <input v-model="newCategory.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea v-model="newCategory.description" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Icon Class</label>
              <input v-model="newCategory.icon" type="text" placeholder="fas fa-home" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>
          <div class="flex justify-end space-x-2 mt-6">
            <button @click="showAddCategoryModal = false" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancel</button>
            <button @click="addCategory" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Category</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Promo Modal -->
    <div v-if="showAddPromoModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Create Promo Code</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
              <input v-model="newPromo.code" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input v-model="newPromo.description" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
              <select v-model="newPromo.type" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
              <input v-model="newPromo.discount" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Valid Until</label>
              <input v-model="newPromo.validUntil" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Max Uses</label>
              <input v-model="newPromo.maxUses" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>
          <div class="flex justify-end space-x-2 mt-6">
            <button @click="showAddPromoModal = false" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancel</button>
            <button @click="addPromo" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Promo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSystemSettings',
  data() {
    return {
      activeTab: 'categories',
      logFilter: 'all',
      showAddCategoryModal: false,
      showAddPromoModal: false,
      tabs: [
        { id: 'categories', name: 'Manage Categories' },
        { id: 'qrcodes', name: 'QR Codes' },
        { id: 'promos', name: 'Promo Codes' },
        { id: 'logs', name: 'System Logs' }
      ],
      categories: [
        {
          id: 1,
          name: 'House Cleaning',
          description: 'Professional house cleaning services',
          icon: 'fas fa-home',
          status: 'Active',
          serviceCount: 5
        },
        {
          id: 2,
          name: 'Laundry Services',
          description: 'Wash, dry, and fold laundry services',
          icon: 'fas fa-tshirt',
          status: 'Active',
          serviceCount: 3
        },
        {
          id: 3,
          name: 'Delivery Services',
          description: 'Package and food delivery',
          icon: 'fas fa-truck',
          status: 'Active',
          serviceCount: 8
        },
        {
          id: 4,
          name: 'Maintenance',
          description: 'Home and appliance maintenance',
          icon: 'fas fa-tools',
          status: 'Inactive',
          serviceCount: 2
        }
      ],
      qrCodes: [
        {
          id: 1,
          name: 'Payment QR',
          description: 'For customer payments',
          image: '/placeholder.svg?height=128&width=128'
        },
        {
          id: 2,
          name: 'App Download QR',
          description: 'Download mobile app',
          image: null
        },
        {
          id: 3,
          name: 'Support QR',
          description: 'Customer support contact',
          image: '/placeholder.svg?height=128&width=128'
        }
      ],
      promoCodes: [
        {
          id: 1,
          code: 'WELCOME20',
          description: 'Welcome discount for new users',
          type: 'Percentage',
          discount: 20,
          validUntil: '2025-03-31',
          used: 45,
          maxUses: 100,
          status: 'Active'
        },
        {
          id: 2,
          code: 'SAVE50',
          description: '₱50 off on orders above ₱500',
          type: 'Fixed',
          discount: 50,
          validUntil: '2025-02-28',
          used: 23,
          maxUses: 50,
          status: 'Active'
        },
        {
          id: 3,
          code: 'HOLIDAY15',
          description: 'Holiday special discount',
          type: 'Percentage',
          discount: 15,
          validUntil: '2025-01-31',
          used: 67,
          maxUses: 200,
          status: 'Expired'
        }
      ],
      systemLogs: [
        {
          id: 1,
          timestamp: '2025-01-25 14:30:25',
          admin: 'Admin User',
          action: 'User Account Banned',
          category: 'User Management',
          details: 'Banned user ID: 1234 for violating terms of service',
          ipAddress: '192.168.1.100'
        },
        {
          id: 2,
          timestamp: '2025-01-25 13:45:12',
          admin: 'Admin User',
          action: 'Order Status Updated',
          category: 'Order Management',
          details: 'Changed order #ORD-2025-001 status from Pending to Completed',
          ipAddress: '192.168.1.100'
        },
        {
          id: 3,
          timestamp: '2025-01-25 12:20:08',
          admin: 'Admin User',
          action: 'Driver Approved',
          category: 'Driver Management',
          details: 'Approved driver application for John Doe (ID: 5678)',
          ipAddress: '192.168.1.100'
        },
        {
          id: 4,
          timestamp: '2025-01-25 11:15:33',
          admin: 'Admin User',
          action: 'Promo Code Created',
          category: 'System Changes',
          details: 'Created new promo code: WELCOME20 with 20% discount',
          ipAddress: '192.168.1.100'
        },
        {
          id: 5,
          timestamp: '2025-01-25 10:05:17',
          admin: 'Admin User',
          action: 'Category Added',
          category: 'System Changes',
          details: 'Added new service category: Pet Care Services',
          ipAddress: '192.168.1.100'
        }
      ],
      newCategory: {
        name: '',
        description: '',
        icon: ''
      },
      newPromo: {
        code: '',
        description: '',
        type: 'Percentage',
        discount: 0,
        validUntil: '',
        maxUses: 100
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
            return log.category === 'User Management'
          case 'order':
            return log.category === 'Order Management'
          case 'driver':
            return log.category === 'Driver Management'
          case 'system':
            return log.category === 'System Changes'
          default:
            return true
        }
      })
    }
  },
  methods: {
    // Category Management
    addCategory() {
      if (this.newCategory.name && this.newCategory.description) {
        const newId = Math.max(...this.categories.map(c => c.id)) + 1
        this.categories.push({
          id: newId,
          name: this.newCategory.name,
          description: this.newCategory.description,
          icon: this.newCategory.icon || 'fas fa-star',
          status: 'Active',
          serviceCount: 0
        })
        this.newCategory = { name: '', description: '', icon: '' }
        this.showAddCategoryModal = false
        this.addSystemLog('Category Added', 'System Changes', `Added new category: ${this.newCategory.name}`)
      }
    },
    editCategory(category) {
      // Implementation for editing category
      console.log('Edit category:', category)
    },
    toggleCategoryStatus(category) {
      category.status = category.status === 'Active' ? 'Inactive' : 'Active'
      this.addSystemLog('Category Status Changed', 'System Changes', `Changed ${category.name} status to ${category.status}`)
    },
    deleteCategory(categoryId) {
      if (confirm('Are you sure you want to delete this category?')) {
        const category = this.categories.find(c => c.id === categoryId)
        this.categories = this.categories.filter(c => c.id !== categoryId)
        this.addSystemLog('Category Deleted', 'System Changes', `Deleted category: ${category.name}`)
      }
    },

    // QR Code Management
    uploadQRCode(qrCode) {
      // Implementation for QR code upload
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            qrCode.image = e.target.result
            this.addSystemLog('QR Code Updated', 'System Changes', `Updated QR code: ${qrCode.name}`)
          }
          reader.readAsDataURL(file)
        }
      }
      input.click()
    },
    downloadQRCode(qrCode) {
      // Implementation for QR code download
      const link = document.createElement('a')
      link.href = qrCode.image
      link.download = `${qrCode.name.replace(/\s+/g, '_')}_QR.png`
      link.click()
    },

    // Promo Code Management
    addPromo() {
      if (this.newPromo.code && this.newPromo.description) {
        const newId = Math.max(...this.promoCodes.map(p => p.id)) + 1
        this.promoCodes.push({
          id: newId,
          code: this.newPromo.code,
          description: this.newPromo.description,
          type: this.newPromo.type,
          discount: this.newPromo.discount,
          validUntil: this.newPromo.validUntil,
          used: 0,
          maxUses: this.newPromo.maxUses,
          status: 'Active'
        })
        this.addSystemLog('Promo Code Created', 'System Changes', `Created promo code: ${this.newPromo.code}`)
        this.newPromo = { code: '', description: '', type: 'Percentage', discount: 0, validUntil: '', maxUses: 100 }
        this.showAddPromoModal = false
      }
    },
    editPromo(promo) {
      // Implementation for editing promo
      console.log('Edit promo:', promo)
    },
    togglePromoStatus(promo) {
      promo.status = promo.status === 'Active' ? 'Inactive' : 'Active'
      this.addSystemLog('Promo Status Changed', 'System Changes', `Changed ${promo.code} status to ${promo.status}`)
    },
    deletePromo(promoId) {
      if (confirm('Are you sure you want to delete this promo code?')) {
        const promo = this.promoCodes.find(p => p.id === promoId)
        this.promoCodes = this.promoCodes.filter(p => p.id !== promoId)
        this.addSystemLog('Promo Code Deleted', 'System Changes', `Deleted promo code: ${promo.code}`)
      }
    },

    // System Logs
    getCategoryColor(category) {
      const colors = {
        'User Management': 'bg-blue-100 text-blue-800',
        'Order Management': 'bg-green-100 text-green-800',
        'Driver Management': 'bg-yellow-100 text-yellow-800',
        'System Changes': 'bg-purple-100 text-purple-800'
      }
      return colors[category] || 'bg-gray-100 text-gray-800'
    },
    exportLogs() {
      // Implementation for exporting logs
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Timestamp,Admin,Action,Category,Details,IP Address\n" +
        this.filteredLogs.map(log => 
          `"${log.timestamp}","${log.admin}","${log.action}","${log.category}","${log.details}","${log.ipAddress}"`
        ).join("\n")
      
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `system_logs_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    addSystemLog(action, category, details) {
      const newLog = {
        id: this.systemLogs.length + 1,
        timestamp: new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        }),
        admin: 'Admin User',
        action: action,
        category: category,
        details: details,
        ipAddress: '192.168.1.100'
      }
      this.systemLogs.unshift(newLog)
    }
  }
}
</script>
