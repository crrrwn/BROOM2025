<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6">
    <!-- Header -->
    <div class="mb-8">
      <div class="bg-white rounded-2xl p-6 shadow-sm border">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Book a Service
        </h1>
        <p class="text-gray-600">Select the service you need and we'll take care of the rest.</p>
      </div>
    </div>

    <!-- View Toggle -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-2">
        <button 
          @click="viewMode = 'grid'"
          :class="viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
          class="px-4 py-2 rounded-lg border transition-colors"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        </button>
        <button 
          @click="viewMode = 'list'"
          :class="viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
          class="px-4 py-2 rounded-lg border transition-colors"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Service Categories Grid View -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div 
        v-for="service in services" 
        :key="service.id" 
        @click="selectService(service)"
        class="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer group"
      >
        <div class="p-6">
          <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-green-200 transition-colors">
            <component :is="service.icon" class="h-8 w-8 text-green-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2 text-center">{{ service.name }}</h3>
          <p class="text-gray-600 text-center mb-4">{{ service.description }}</p>
          <div class="text-center">
            <span class="text-lg font-bold text-green-600">Starting at ₱{{ service.basePrice }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Categories List View -->
    <div v-else class="space-y-4 mb-8">
      <div 
        v-for="service in services" 
        :key="service.id" 
        @click="selectService(service)"
        class="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div class="flex items-center space-x-6">
          <div class="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
            <component :is="service.icon" class="h-7 w-7 text-green-600" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900">{{ service.name }}</h3>
            <p class="text-gray-600">{{ service.description }}</p>
          </div>
          <div class="text-right">
            <span class="text-lg font-bold text-green-600">Starting at ₱{{ service.basePrice }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Booking Modal -->
    <div v-if="selectedService" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-xl">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-white border-b p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <component :is="selectedService.icon" class="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">{{ selectedService.name }}</h2>
                <p class="text-gray-600">Fill in the details below</p>
              </div>
            </div>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <form @submit.prevent="submitBooking">
            <!-- Dynamic Form Fields -->
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <!-- Left Column - Service Details -->
              <div class="space-y-6">
                <div class="bg-gray-50 rounded-xl p-4 border">
                  <h3 class="text-lg font-bold text-gray-900 pb-2">Service Details</h3>
                </div>
                
                <!-- Food Delivery Fields -->
                <div v-if="selectedService.type === 'food_delivery'" class="space-y-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Restaurant/Store Name *</label>
                    <input 
                      v-model="bookingForm.restaurant" 
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="e.g., Jollibee, McDonald's, Max's Restaurant"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Restaurant Address *</label>
                    <div class="relative">
                      <input 
                        ref="restaurantAddressInput"
                        v-model="bookingForm.restaurantAddress" 
                        type="text" 
                        required
                        class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                        placeholder="Enter restaurant address in Calapan City"
                      >
                      <button 
                        @click="getCurrentRestaurantLocation"
                        type="button"
                        class="absolute right-3 top-3 text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-50 transition-colors"
                        title="Use current location for restaurant"
                      >
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </button>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Click the location icon to use current location</p>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Pin Restaurant Location</label>
                    <div class="h-48 sm:h-64 bg-gray-100 rounded-xl overflow-hidden border shadow-sm">
                      <div ref="restaurantMapContainer" class="w-full h-full"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Drag the pin to restaurant's exact location</p>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Food Order Details *</label>
                    <textarea 
                      v-model="bookingForm.foodItems" 
                      required
                      rows="4"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Example:&#10;1x Chickenjoy with Rice - ₱89&#10;2x Burger Steak - ₱65 each&#10;1x Large Coke - ₱45&#10;&#10;Total: ₱264"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Estimated Total Amount *</label>
                    <input 
                      v-model="bookingForm.estimatedAmount" 
                      type="number" 
                      step="0.01"
                      min="0"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Total cost of food items"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Special Instructions</label>
                    <textarea 
                      v-model="bookingForm.notes" 
                      rows="2"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="No onions, extra rice, utensils needed, etc."
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Contact Number for Restaurant *</label>
                    <input 
                      v-model="bookingForm.restaurantContact" 
                      type="tel" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Restaurant's phone number"
                    >
                  </div>
                </div>

                <!-- Bill Payments Fields -->
                <div v-if="selectedService.type === 'bill_payments'" class="space-y-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Utility Company/Biller *</label>
                    <select 
                      v-model="bookingForm.billerName" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    >
                      <option value="">Select Biller</option>
                      <option value="ORMECO">ORMECO (Oriental Mindoro Electric)</option>
                      <option value="Calapan Water District">Calapan Water District</option>
                      <option value="Smart Communications">Smart Communications</option>
                      <option value="Globe Telecom">Globe Telecom</option>
                      <option value="PLDT">PLDT</option>
                      <option value="Meralco">Meralco</option>
                      <option value="SSS">SSS</option>
                      <option value="PhilHealth">PhilHealth</option>
                      <option value="Pag-IBIG">Pag-IBIG</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div v-if="bookingForm.billerName === 'Other'">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Specify Biller Name *</label>
                    <input 
                      v-model="bookingForm.customBiller" 
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Enter biller name"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Account Number/Reference Number *</label>
                    <input 
                      v-model="bookingForm.accountNumber" 
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Your account or reference number"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Amount to Pay *</label>
                    <input 
                      v-model="bookingForm.amount" 
                      type="number" 
                      step="0.01"
                      min="0"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Amount in PHP"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
                    <input 
                      v-model="bookingForm.dueDate" 
                      type="date" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Bill Statement/Reference (Optional)</label>
                    <input 
                      @change="handleFileUpload"
                      type="file" 
                      accept="image/*,.pdf"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    >
                    <p class="text-xs text-gray-500 mt-1">Upload photo of bill or PDF statement</p>
                  </div>
                </div>

                <!-- Pick-up & Drop Fields -->
                <div v-if="selectedService.type === 'pickup_drop'" class="space-y-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Pick-up Location *</label>
                    <div class="relative">
                      <input 
                        ref="pickupAddressInput"
                        v-model="bookingForm.pickupAddress" 
                        type="text" 
                        required
                        class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                        placeholder="Complete address where we'll pick up the item"
                      >
                      <button 
                        @click="getCurrentPickupLocation"
                        type="button"
                        class="absolute right-3 top-3 text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-50 transition-colors"
                        title="Use current location for pickup"
                      >
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </button>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Click the location icon to use current location</p>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Pin Pick-up Location</label>
                    <div class="h-48 sm:h-64 bg-gray-100 rounded-xl overflow-hidden border shadow-sm">
                      <div ref="pickupMapContainer" class="w-full h-full"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Drag the pin to exact pickup location</p>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Pick-up Contact Person *</label>
                    <input 
                      v-model="bookingForm.pickupContact" 
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Name and phone number"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Item Description *</label>
                    <select 
                      v-model="bookingForm.itemType" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    >
                      <option value="">Select item type</option>
                      <option value="laundry">Laundry</option>
                      <option value="pet_food">Pet Food</option>
                      <option value="gas_delivery">Gas Delivery</option>
                      <option value="sack_rice">Sack of Rice Delivery</option>
                      <option value="document_delivery">Document Delivery</option>
                      <option value="shopping_delivery">Shopping Delivery</option>
                      <option value="boxes_items">Boxes or Items Delivery</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Item Details</label>
                    <textarea 
                      v-model="bookingForm.itemDetails" 
                      rows="2"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Describe the item (size, weight, fragile, etc.)"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Special Instructions</label>
                    <textarea 
                      v-model="bookingForm.deliveryNotes" 
                      rows="2"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Handle with care, call before delivery, etc."
                    ></textarea>
                  </div>
                </div>

                <!-- Gift Delivery Fields -->
                <div v-if="selectedService.type === 'gift_delivery'" class="space-y-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Gift Type *</label>
                    <select 
                      v-model="bookingForm.giftType" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    >
                      <option value="">Select gift type</option>
                      <option value="flowers">Flowers/Bouquet</option>
                      <option value="cake">Cake/Pastry</option>
                      <option value="food">Food/Meal</option>
                      <option value="gift_box">Gift Box/Package</option>
                      <option value="surprise">Surprise Package</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Store/Restaurant Name *</label>
                    <input 
                      v-model="bookingForm.giftStoreName" 
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="e.g., Flower Shop, Bakery, Restaurant"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Store/Restaurant Address *</label>
                    <div class="relative">
                      <input 
                        ref="giftStoreAddressInput"
                        v-model="bookingForm.giftStoreAddress" 
                        type="text" 
                        required
                        class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                        placeholder="Enter store address in Calapan City"
                      >
                      <button 
                        @click="getCurrentGiftStoreLocation"
                        type="button"
                        class="absolute right-3 top-3 text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-50 transition-colors"
                        title="Use current location for store"
                      >
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </button>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Click the location icon to use current location</p>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Pin Store Location</label>
                    <div class="h-48 sm:h-64 bg-gray-100 rounded-xl overflow-hidden border shadow-sm">
                      <div ref="giftStoreMapContainer" class="w-full h-full"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Drag the pin to store's exact location</p>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Gift Details *</label>
                    <textarea 
                      v-model="bookingForm.giftDetails" 
                      required
                      rows="3"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Describe the gift: Red roses bouquet, Chocolate cake with message, etc."
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Recipient Name *</label>
                    <input 
                      v-model="bookingForm.recipientName" 
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Full name of the recipient"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Recipient Contact Number *</label>
                    <input 
                      v-model="bookingForm.recipientContact" 
                      type="tel" 
                      required
                      pattern="09[0-9]{9}"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="09XXXXXXXXX"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Gift Message</label>
                    <textarea 
                      v-model="bookingForm.giftMessage" 
                      rows="3"
                      maxlength="200"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Your message to the recipient (max 200 characters)"
                    ></textarea>
                    <p class="text-xs text-gray-500 mt-1">{{ bookingForm.giftMessage?.length || 0 }}/200 characters</p>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Preferred Delivery Time *</label>
                    <input 
                      v-model="bookingForm.deliverySchedule" 
                      type="datetime-local" 
                      required
                      :min="new Date().toISOString().slice(0, 16)"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Surprise Delivery?</label>
                    <div class="flex items-center space-x-4">
                      <label class="flex items-center">
                        <input v-model="bookingForm.isSurprise" type="radio" :value="true" class="mr-2 text-green-600 focus:ring-green-500">
                        <span class="text-sm text-gray-900">Yes, it's a surprise</span>
                      </label>
                      <label class="flex items-center">
                        <input v-model="bookingForm.isSurprise" type="radio" :value="false" class="mr-2 text-green-600 focus:ring-green-500">
                        <span class="text-sm text-gray-900">No, recipient knows</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Medicine Delivery Fields -->
                <div v-if="selectedService.type === 'medicine_delivery'" class="space-y-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Pharmacy/Drugstore *</label>
                    <select 
                      v-model="bookingForm.pharmacy" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    >
                      <option value="">Select Pharmacy</option>
                      <option value="Mercury Drug">Mercury Drug</option>
                      <option value="Watsons">Watsons</option>
                      <option value="Rose Pharmacy">Rose Pharmacy</option>
                      <option value="TGP">The Generics Pharmacy</option>
                      <option value="SouthStar Drug">SouthStar Drug</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div v-if="bookingForm.pharmacy === 'Other'">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Specify Pharmacy Name *</label>
                    <input 
                      v-model="bookingForm.customPharmacy" 
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Enter pharmacy name"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Medicine List *</label>
                    <textarea 
                      v-model="bookingForm.medicineList" 
                      required
                      rows="4"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Example:&#10;Biogesic 500mg - 1 box&#10;Amoxicillin 500mg - 10 capsules&#10;Vitamin C - 1 bottle"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Prescription Required?</label>
                    <div class="flex items-center space-x-4 mb-3">
                      <label class="flex items-center">
                        <input v-model="bookingForm.needsPrescription" type="radio" :value="true" class="mr-2 text-green-600 focus:ring-green-500">
                        <span class="text-sm text-gray-900">Yes, prescription needed</span>
                      </label>
                      <label class="flex items-center">
                        <input v-model="bookingForm.needsPrescription" type="radio" :value="false" class="mr-2 text-green-600 focus:ring-green-500">
                        <span class="text-sm text-gray-900">No, over-the-counter</span>
                      </label>
                    </div>
                  </div>
                  <div v-if="bookingForm.needsPrescription">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Upload Prescription *</label>
                    <input 
                      @change="handleFileUpload"
                      type="file" 
                      accept="image/*,.pdf"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    >
                    <p class="text-xs text-gray-500 mt-1">Upload clear photo or PDF of prescription</p>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Patient Name *</label>
                    <input 
                      v-model="bookingForm.patientName" 
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Name of the patient"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Estimated Total Cost</label>
                    <input 
                      v-model="bookingForm.estimatedCost" 
                      type="number" 
                      step="0.01"
                      min="0"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Approximate cost of medicines"
                    >
                  </div>
                </div>

                <!-- Grocery Shopping Fields -->
                <div v-if="selectedService.type === 'grocery'" class="space-y-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Preferred Store *</label>
                    <select 
                      v-model="bookingForm.preferredStore" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    >
                      <option value="">Select Store</option>
                      <option value="SM Hypermarket">SM Hypermarket</option>
                      <option value="Puregold">Puregold</option>
                      <option value="Robinsons Supermarket">Robinsons Supermarket</option>
                      <option value="Savemore">Savemore</option>
                      <option value="Gaisano Grand Mall">Gaisano Grand Mall</option>
                      <option value="Local Market">Local Market/Palengke</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div v-if="bookingForm.preferredStore === 'Other'">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Specify Store Name *</label>
                    <input 
                      v-model="bookingForm.customStore" 
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Enter store name"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Shopping List *</label>
                    <textarea 
                      v-model="bookingForm.itemList" 
                      required
                      rows="6"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Example:&#10;Rice - 5kg NFA or Sinandomeng&#10;Chicken - 1kg whole chicken&#10;Eggs - 1 tray (30pcs)&#10;Milk - Alaska or Bear Brand 1L&#10;Bread - Gardenia White or Wheat&#10;Onions - 1/2 kg&#10;Tomatoes - 1/4 kg"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Budget Range *</label>
                    <select 
                      v-model="bookingForm.budgetRange" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    >
                      <option value="">Select Budget Range</option>
                      <option value="500-1000">₱500 - ₱1,000</option>
                      <option value="1000-2000">₱1,000 - ₱2,000</option>
                      <option value="2000-3000">₱2,000 - ₱3,000</option>
                      <option value="3000-5000">₱3,000 - ₱5,000</option>
                      <option value="5000+">₱5,000+</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Exact Budget Amount</label>
                    <input 
                      v-model="bookingForm.exactBudget" 
                      type="number" 
                      step="0.01"
                      min="0"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Your exact budget (optional)"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Brand Preferences</label>
                    <textarea 
                      v-model="bookingForm.brandPreferences" 
                      rows="2"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Any specific brands you prefer or want to avoid"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Special Instructions</label>
                    <textarea 
                      v-model="bookingForm.deliveryInstructions" 
                      rows="2"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Check expiry dates, choose fresh items, call if item not available, etc."
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Right Column - Address & Map -->
              <div class="space-y-6">
                <div class="bg-gray-50 rounded-xl p-4 border">
                  <h3 class="text-lg font-bold text-gray-900 pb-2">
                    <span v-if="selectedService.type === 'pickup_drop'">Drop-off Information</span>
                    <span v-else>Delivery Information</span>
                  </h3>
                </div>
                
                <!-- Address Input with Autocomplete -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <span v-if="selectedService.type === 'pickup_drop'">Drop-off Address *</span>
                    <span v-else>Delivery Address *</span>
                  </label>
                  <div class="relative">
                    <input 
                      ref="addressInput"
                      v-model="bookingForm.deliveryAddress" 
                      type="text" 
                      required
                      class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      :placeholder="selectedService.type === 'pickup_drop' ? 'Enter complete drop-off address in Calapan City' : 'Enter complete address in Calapan City'"
                    >
                    <button 
                      @click="getCurrentLocation"
                      type="button"
                      class="absolute right-3 top-3 text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-50 transition-colors"
                      title="Use current location"
                    >
                      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </button>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Click the location icon to use your current location</p>
                </div>

                <!-- Drop-off Contact for Pick-up & Drop service -->
                <div v-if="selectedService.type === 'pickup_drop'">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Drop-off Contact Person *</label>
                  <input 
                    v-model="bookingForm.dropoffContact" 
                    type="text" 
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    placeholder="Name and phone number of person receiving the item"
                  >
                </div>

                <!-- Zip Code Validation -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Zip Code *</label>
                  <input 
                    v-model="bookingForm.zipCode" 
                    type="text" 
                    required
                    pattern="5200"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    placeholder="5200"
                    readonly
                  >
                  <p class="text-xs text-gray-500 mt-1">We only serve Calapan City (5200)</p>
                  <p v-if="bookingForm.zipCode && bookingForm.zipCode !== '5200'" class="text-xs text-red-500 mt-1">
                    Sorry, we only deliver within Calapan City (Zip Code: 5200)
                  </p>
                </div>

                <!-- Contact Information -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Your Contact Number *</label>
                  <input 
                    v-model="bookingForm.contactNumber" 
                    type="tel" 
                    required
                    pattern="09[0-9]{9}"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                    placeholder="09XXXXXXXXX"
                  >
                </div>

                <!-- Payment Method Selection -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Payment Method *</label>
                  <div class="space-y-3">
                    <label class="flex items-center p-4 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <input v-model="bookingForm.paymentMethod" type="radio" value="gcash" class="mr-4 text-green-600 focus:ring-green-500">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                          <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="font-semibold text-gray-900">GCash</p>
                          <p class="text-sm text-gray-500">Pay via QR code</p>
                        </div>
                      </div>
                    </label>
                    
                    <label class="flex items-center p-4 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <input v-model="bookingForm.paymentMethod" type="radio" value="bank" class="mr-4 text-green-600 focus:ring-green-500">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                          <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="font-semibold text-gray-900">Online Banking</p>
                          <p class="text-sm text-gray-500">Bank transfer or QR</p>
                        </div>
                      </div>
                    </label>
                    
                    <label class="flex items-center p-4 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <input v-model="bookingForm.paymentMethod" type="radio" value="cod" class="mr-4 text-green-600 focus:ring-green-500">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                          <svg class="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="font-semibold text-gray-900">Cash on Delivery</p>
                          <p class="text-sm text-gray-500">Pay when order arrives</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Payment Proof Upload (for non-COD payments) -->
                <div v-if="bookingForm.paymentMethod && bookingForm.paymentMethod !== 'cod'" class="space-y-4">
                  <div class="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 class="font-bold text-green-800 mb-3">Payment Instructions</h4>
                    <div v-if="bookingForm.paymentMethod === 'gcash'" class="text-sm text-gray-800">
                      <p class="mb-2 font-semibold">Send payment to:</p>
                      <p class="font-bold text-green-600">GCash Number: 09123456789</p>
                      <p class="font-bold text-green-600">Account Name: BROOOM SERVICES</p>
                      <p class="mt-3 text-lg font-bold text-green-600">Amount: ₱{{ totalFee.toFixed(2) }}</p>
                    </div>
                    <div v-else-if="bookingForm.paymentMethod === 'bank'" class="text-sm text-gray-800">
                      <p class="mb-2 font-semibold">Send payment to:</p>
                      <p class="font-bold text-green-600">BPI Account: 1234-5678-90</p>
                      <p class="font-bold text-green-600">Account Name: BROOOM SERVICES</p>
                      <p class="mt-3 text-lg font-bold text-green-600">Amount: ₱{{ totalFee.toFixed(2) }}</p>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Reference Number *</label>
                    <input 
                      v-model="bookingForm.referenceNumber" 
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white"
                      placeholder="Enter payment reference number"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Upload Payment Proof (Optional)</label>
                    <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors bg-gray-50">
                      <input 
                        ref="paymentProofInput"
                        @change="handlePaymentProofUpload"
                        type="file" 
                        accept="image/*"
                        class="hidden"
                      >
                      
                      <!-- Upload Area -->
                      <div v-if="!paymentProofPreview" @click="$refs.paymentProofInput.click()" class="cursor-pointer">
                        <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <svg class="h-8 w-8 text-green-600" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </div>
                        <p class="text-base font-semibold text-gray-700 mb-2">Click to upload payment screenshot</p>
                        <p class="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                      </div>

                      <!-- Image Preview -->
                      <div v-else class="relative">
                        <img 
                          :src="paymentProofPreview" 
                          @click="showPaymentProofModal = true"
                          class="mx-auto max-h-40 rounded-xl cursor-pointer hover:opacity-80 transition-opacity shadow-lg"
                          alt="Payment proof"
                        >
                        <button 
                          @click="removePaymentProof"
                          type="button"
                          class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                        >
                          ×
                        </button>
                        <p class="text-sm text-gray-500 mt-3">Click image to view full size</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Google Map -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <span v-if="selectedService.type === 'pickup_drop'">Pin Drop-off Location</span>
                    <span v-else>Pin Your Location</span>
                  </label>
                  <div class="h-48 sm:h-64 bg-gray-100 rounded-xl overflow-hidden border shadow-sm">
                    <div ref="mapContainer" class="w-full h-full"></div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">
                    <span v-if="selectedService.type === 'pickup_drop'">Drag the pin to exact drop-off location</span>
                    <span v-else>Drag the pin to your exact location</span>
                  </p>
                </div>

                <!-- Delivery Fee -->
                <div class="bg-gray-50 border rounded-xl p-6 shadow-sm">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-semibold text-gray-700">Service Fee:</span>
                    <span class="text-lg font-bold text-green-600">₱{{ selectedService.basePrice }}</span>
                  </div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-semibold text-gray-700">Delivery Fee:</span>
                    <span class="text-lg font-bold text-blue-600">₱{{ deliveryFee.toFixed(2) }}</span>
                  </div>
                  <hr class="my-3 border-gray-200">
                  <div class="flex items-center justify-between">
                    <span class="text-base font-bold text-gray-900">Total:</span>
                    <span class="text-xl font-bold text-gray-900">₱{{ totalFee.toFixed(2) }}</span>
                  </div>
                  <p class="text-xs text-gray-500 mt-3">*Final fee may vary based on actual distance and service complexity</p>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex items-center justify-end space-x-4 mt-8 pt-6 border-t">
              <button 
                @click="closeModal"
                type="button" 
                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="!isFormValid || submitting"
                class="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
              >
                <span v-if="submitting">Processing...</span>
                <span v-else>Book Service - ₱{{ totalFee.toFixed(2) }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Payment Proof Modal -->
    <div v-if="showPaymentProofModal" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" @click="showPaymentProofModal = false">
      <div class="relative max-w-4xl max-h-full">
        <img :src="paymentProofPreview" class="max-w-full max-h-full rounded-2xl shadow-2xl" alt="Payment proof full size">
        <button 
          @click="showPaymentProofModal = false"
          class="absolute top-4 right-4 bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick, inject } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { validateZipCode, validatePhone, sanitizeInput, detectSpam } from '@/utils/validation'
import { calculateDeliveryPrice } from '@/utils/pricing'
import { geocodeAddress, getCurrentLocation as getGeoLocation, calculateDistance } from '@/utils/geocoding'
import { generateOrderBarcode } from '@/utils/barcode'
import { 
  UtensilsCrossed, 
  Receipt, 
  Truck, 
  ShoppingCart, 
  Pill, 
  Gift 
} from 'lucide-vue-next'

export default {
  name: 'BookService',
  components: {
    UtensilsCrossed,
    Receipt,
    Truck,
    ShoppingCart,
    Pill,
    Gift
  },
  setup() {
    const router = useRouter()
    const toast = inject('toast')
    const currentUser = inject('currentUser')
    
    const viewMode = ref('grid')
    const selectedService = ref(null)
    const submitting = ref(false)
    const map = ref(null)
    const marker = ref(null)
    const addressInput = ref(null)
    const mapContainer = ref(null)
    const userLocation = ref({ lat: 13.4119, lng: 121.1803 }) // Default to Calapan City center
    
    const restaurantAddressInput = ref(null)
    const restaurantMapContainer = ref(null)
    const restaurantMap = ref(null)
    const restaurantMarker = ref(null)
    const restaurantLocation = ref({ lat: 13.4119, lng: 121.1803 })

    const pickupAddressInput = ref(null)
    const pickupMapContainer = ref(null)
    const pickupMap = ref(null)
    const pickupMarker = ref(null)
    const pickupLocation = ref({ lat: 13.4119, lng: 121.1803 })

    // Gift Store Location refs
    const giftStoreAddressInput = ref(null)
    const giftStoreMapContainer = ref(null)
    const giftStoreMap = ref(null)
    const giftStoreMarker = ref(null)
    const giftStoreLocation = ref({ lat: 13.4119, lng: 121.1803 })
    
    const bookingForm = ref({
      deliveryAddress: '',
      zipCode: '5200',
      contactNumber: '',
      paymentMethod: '',
      // Food Delivery
      restaurant: '',
      restaurantAddress: '',
      foodItems: '',
      estimatedAmount: 0,
      notes: '',
      restaurantContact: '',
      // Bill Payments
      billerName: '',
      customBiller: '',
      accountNumber: '',
      amount: 0,
      dueDate: '',
      referenceFile: null,
      // Pick-up & Drop
      pickupAddress: '',
      pickupContact: '',
      dropoffContact: '', // This will be used for drop-off contact in the right column
      itemType: '',
      itemDetails: '',
      deliveryNotes: '',
      // Gift Delivery
      giftType: '',
      giftStoreName: '',
      giftStoreAddress: '',
      giftDetails: '',
      recipientName: '',
      recipientContact: '',
      giftMessage: '',
      deliverySchedule: '',
      isSurprise: false,
      // Medicine Delivery
      pharmacy: '',
      customPharmacy: '',
      medicineList: '',
      needsPrescription: false,
      prescriptionFile: null,
      patientName: '',
      estimatedCost: 0,
      // Grocery
      preferredStore: '',
      customStore: '',
      itemList: '',
      budgetRange: '',
      exactBudget: 0,
      brandPreferences: '',
      deliveryInstructions: '',
      referenceNumber: '',
      paymentProofFile: null,
    })

    const paymentProofPreview = ref(null)
    const showPaymentProofModal = ref(false)

    const services = ref([
      {
        id: '1a2b3c4d-5e6f-7890-1234-567890abcdef', // Example UUID
        name: 'Food Delivery',
        description: 'Order from restaurants and get it delivered hot and fresh',
        icon: UtensilsCrossed,
        basePrice: 50,
        type: 'food_delivery'
      },
      {
        id: '2b3c4d5e-6f78-9012-3456-7890abcdef12', // Example UUID
        name: 'Bill Payments',
        description: 'Pay your utilities, internet, and other bills',
        icon: Receipt,
        basePrice: 25,
        type: 'bill_payments'
      },
      {
        id: '3c4d5e6f-7890-1234-5678-90abcdef1234', // Example UUID
        name: 'Pick-up & Drop',
        description: 'Need something picked up or delivered',
        icon: Truck,
        basePrice: 75,
        type: 'pickup_drop'
      },
      {
        id: '4d5e6f78-9012-3456-7890-abcdef123456', // Example UUID
        name: 'Grocery Shopping',
        description: 'Get your groceries delivered to your doorstep',
        icon: ShoppingCart,
        basePrice: 100,
        type: 'grocery'
      },
      {
        id: '5e6f7890-1234-5678-90ab-cdef12345678', // Example UUID
        name: 'Medicine Delivery',
        description: 'Fast and secure delivery of prescription medications',
        icon: Pill,
        basePrice: 60,
        type: 'medicine_delivery'
      },
      {
        id: '6f789012-3456-7890-abcd-ef1234567890', // Example UUID
        name: 'Gift Delivery',
        description: 'Surprise your loved ones with special deliveries',
        icon: Gift,
        basePrice: 80,
        type: 'gift_delivery'
      }
    ])

    const deliveryFee = computed(() => {
      // Calculate distance-based delivery fee
      const baseDistance = 2 // km
      const baseFee = 30
      const perKmFee = 15
      
      // For now, assume 3km average distance
      // In real implementation, this would use actual map distance
      const estimatedDistance = 3
      const additionalDistance = Math.max(0, estimatedDistance - baseDistance)
      
      return baseFee + (additionalDistance * perKmFee)
    })

    const totalFee = computed(() => {
      if (!selectedService.value) return 0
      return selectedService.value.basePrice + deliveryFee.value
    })

    const isFormValid = computed(() => {
      if (!selectedService.value || !bookingForm.value.deliveryAddress || 
          bookingForm.value.zipCode !== '5200' || !bookingForm.value.contactNumber ||
          !bookingForm.value.paymentMethod) {
        return false
      }

      // Check payment proof for non-COD payments
      // Removed !bookingForm.value.paymentProofFile from this check
      if (bookingForm.value.paymentMethod !== 'cod') {
        if (!bookingForm.value.referenceNumber) {
          return false
        }
      }

      // Validate based on service type
      switch (selectedService.value.type) {
        case 'food_delivery':
          return bookingForm.value.restaurant && bookingForm.value.restaurantAddress && 
                 bookingForm.value.foodItems && 
                 bookingForm.value.estimatedAmount > 0 && bookingForm.value.restaurantContact
        case 'bill_payments':
          return bookingForm.value.billerName && bookingForm.value.accountNumber && bookingForm.value.amount > 0 &&
                 (bookingForm.value.billerName !== 'Other' || bookingForm.value.customBiller)
        case 'pickup_drop':
          return bookingForm.value.pickupAddress && bookingForm.value.pickupContact &&
                 bookingForm.value.dropoffContact && bookingForm.value.itemType
        case 'gift_delivery':
          return bookingForm.value.giftType && bookingForm.value.giftStoreName && 
                 bookingForm.value.giftStoreAddress && bookingForm.value.giftDetails &&
                 bookingForm.value.recipientName && bookingForm.value.recipientContact && bookingForm.value.deliverySchedule
        case 'medicine_delivery':
          return bookingForm.value.pharmacy && bookingForm.value.medicineList && bookingForm.value.patientName &&
                 (!bookingForm.value.needsPrescription || bookingForm.value.prescriptionFile) &&
                 (bookingForm.value.pharmacy !== 'Other' || bookingForm.value.customPharmacy)
        case 'grocery':
          return bookingForm.value.preferredStore && bookingForm.value.itemList && bookingForm.value.budgetRange &&
                 (bookingForm.value.preferredStore !== 'Other' || bookingForm.value.customStore)
        default:
          return false
      }
    })

    const selectService = (service) => {
      selectedService.value = service
      // Reset form
      Object.keys(bookingForm.value).forEach(key => {
        if (typeof bookingForm.value[key] === 'string') {
          bookingForm.value[key] = key === 'zipCode' ? '5200' : ''
        } else if (typeof bookingForm.value[key] === 'number') {
          bookingForm.value[key] = 0
        } else if (typeof bookingForm.value[key] === 'boolean') {
          bookingForm.value[key] = false
        } else {
          bookingForm.value[key] = null
        }
      })
      
      // Reset payment proof preview
      paymentProofPreview.value = null
      
      // Initialize map after modal opens
      nextTick(() => {
        initializeMap()
        initializeAutocomplete()
        if (service.type === 'food_delivery') {
          initializeRestaurantMap()
          initializeRestaurantAutocomplete()
        }
        if (service.type === 'pickup_drop') {
          initializePickupMap()
          initializePickupAutocomplete()
        }
        if (service.type === 'gift_delivery') {
          initializeGiftStoreMap()
          initializeGiftStoreAutocomplete()
        }
      })
    }

    const closeModal = () => {
      selectedService.value = null
      paymentProofPreview.value = null
    }

    const initializeMap = () => {
      if (!window.google || !mapContainer.value) return

      // Center map on Calapan City with accurate coordinates
      const calapanCenter = { lat: 13.4119, lng: 121.1803 }
      
      map.value = new window.google.maps.Map(mapContainer.value, {
        zoom: 15,
        center: calapanCenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
          }
        ]
      })

      marker.value = new window.google.maps.Marker({
        position: calapanCenter,
        map: map.value,
        draggable: true,
        title: 'Drag to set exact delivery location',
        animation: window.google.maps.Animation.DROP
      })

      // Update address when marker is dragged
      marker.value.addListener('dragend', async () => {
        const position = marker.value.getPosition()
        userLocation.value = { lat: position.lat(), lng: position.lng() }
        const address = await reverseGeocode(position.lat(), position.lng())
        if (address) {
          bookingForm.value.deliveryAddress = address
        }
      })

      // Add click listener to map
      map.value.addListener('click', (event) => {
        marker.value.setPosition(event.latLng)
        userLocation.value = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        reverseGeocode(event.latLng.lat(), event.latLng.lng()).then(address => {
          if (address) {
            bookingForm.value.deliveryAddress = address
          }
        })
      })
    }

    const initializeAutocomplete = () => {
      if (!window.google || !addressInput.value) return

      // Restrict to Calapan City area with accurate bounds
      const calapanBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(13.35, 121.12), // Southwest
        new window.google.maps.LatLng(13.47, 121.24)  // Northeast
      )

      const autocomplete = new window.google.maps.places.Autocomplete(addressInput.value, {
        bounds: calapanBounds,
        strictBounds: true,
        types: ['address'],
        componentRestrictions: { country: 'PH' }
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.geometry) {
          const location = place.geometry.location
          const lat = location.lat()
          const lng = location.lng()
          
          // Check if location is within Calapan City bounds
          if (calapanBounds.contains(location)) {
            map.value.setCenter(location)
            map.value.setZoom(16)
            marker.value.setPosition(location)
            userLocation.value = { lat, lng }
            bookingForm.value.deliveryAddress = place.formatted_address
          } else {
            toast?.error('Please select an address within Calapan City')
            bookingForm.value.deliveryAddress = ''
          }
        }
      })
    }

    const getCurrentLocation = async () => {
      try {
        const position = await getGeoLocation()
        const location = { lat: position.lat, lng: position.lng }
        
        if (location.lat >= 13.35 && location.lat <= 13.47 && 
            location.lng >= 121.12 && location.lng <= 121.24) {
          
          userLocation.value = location
          
          if (map.value && marker.value) {
            map.value.setCenter(location)
            map.value.setZoom(16)
            marker.value.setPosition(location)
          }

          const address = await reverseGeocode(position.lat, position.lng)
          if (address) {
            bookingForm.value.deliveryAddress = address
          }
        } else {
          toast?.error('Your current location is outside our service area (Calapan City)')
        }
      } catch (error) {
        toast?.error('Unable to get your location. Please enter address manually.')
      }
    }

    const reverseGeocode = async (lat, lng) => {
      if (!window.google) return null

      const geocoder = new window.google.maps.Geocoder()
      return new Promise((resolve) => {
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results[0]) {
            // Filter for Calapan City addresses
            const calapanResult = results.find(result => 
              result.formatted_address.toLowerCase().includes('calapan')
            )
            resolve(calapanResult ? calapanResult.formatted_address : results[0].formatted_address)
          } else {
            resolve(null)
          }
        })
      })
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (!file) return

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast?.error('File size must be less than 5MB')
        event.target.value = ''
        return
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        toast?.error('Please upload only JPG, PNG, or PDF files')
        event.target.value = ''
        return
      }

      // Store file for upload
      if (selectedService.value.type === 'bill_payments') {
        bookingForm.value.referenceFile = file
      } else if (selectedService.value.type === 'medicine_delivery') {
        bookingForm.value.prescriptionFile = file
      }
    }

    const handlePaymentProofUpload = (event) => {
      const file = event.target.files[0]
      if (!file) return

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast?.error('File size must be less than 5MB')
        event.target.value = ''
        return
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        toast?.error('Please upload only JPG or PNG files')
        event.target.value = ''
        return
      }

      // Store file and create preview
      bookingForm.value.paymentProofFile = file
      
      const reader = new FileReader()
      reader.onload = (e) => {
        paymentProofPreview.value = e.target.result
      }
      reader.readAsDataURL(file)
    }

    const removePaymentProof = () => {
      bookingForm.value.paymentProofFile = null
      paymentProofPreview.value = null
      const paymentInput = document.querySelector('input[type="file"][accept="image/*"]')
      if (paymentInput) {
        paymentInput.value = ''
      }
    }

    const validateFormInputs = () => {
      // Check for spam content
      const textFields = [
        bookingForm.value.restaurant,
        bookingForm.value.foodItems,
        bookingForm.value.notes,
        bookingForm.value.billerName,
        bookingForm.value.deliveryNotes,
        bookingForm.value.giftMessage,
        bookingForm.value.medicineList,
        bookingForm.value.itemList,
        bookingForm.value.deliveryInstructions,
        bookingForm.value.customBiller,
        bookingForm.value.customPharmacy,
        bookingForm.value.customStore,
        bookingForm.value.itemDetails,
        bookingForm.value.brandPreferences,
        bookingForm.value.recipientName,
        bookingForm.value.patientName,
        bookingForm.value.pickupContact,
        bookingForm.value.dropoffContact,
        bookingForm.value.giftStoreName,
        bookingForm.value.giftDetails,
      ].filter(Boolean)

      for (const text of textFields) {
        if (detectSpam(text)) {
          throw new Error('Please provide valid information without spam content')
        }
      }

      // Validate phone numbers
      if (bookingForm.value.contactNumber && !validatePhone(bookingForm.value.contactNumber)) {
        throw new Error('Please enter a valid Philippine mobile number (09XXXXXXXXX)')
      }

      if (selectedService.value.type === 'gift_delivery' && bookingForm.value.recipientContact) {
        if (!validatePhone(bookingForm.value.recipientContact)) {
          throw new Error('Please enter a valid recipient mobile number (09XXXXXXXXX)')
        }
      }

      // Validate zip code
      if (!validateZipCode(bookingForm.value.zipCode)) {
        throw new Error('We only serve Calapan City (Zip Code: 5200)')
      }
    }

    const uploadFile = async (file, path) => {
      const { data, error } = await supabase.storage
        .from('payment-proofs')
        .upload(path, file)
      
      if (error) throw error
      return data.path
    }

    const submitBooking = async () => {
      try {
        submitting.value = true
        
        // Validate form inputs
        validateFormInputs()

        // Get current user
        if (!currentUser.value) {
          throw new Error('Please log in to book a service')
        }

        // Use the service ID directly from the selectedService object
        const actualServiceId = selectedService.value.id;

        // Upload files if any
        let referenceFilePath = null
        let prescriptionFilePath = null
        let paymentProofPath = null

        if (bookingForm.value.referenceFile) {
          try {
            const fileName = `${currentUser.value.id}/${Date.now()}_${bookingForm.value.referenceFile.name}`
            const { data, error } = await supabase.storage
              .from('payment-proofs')
              .upload(fileName, bookingForm.value.referenceFile)
            
            if (error) throw error
            referenceFilePath = data.path
          } catch (uploadError) {
            console.error('Reference file upload error:', uploadError)
            throw new Error('Failed to upload reference file')
          }
        }

        if (bookingForm.value.prescriptionFile) {
          try {
            const fileName = `${currentUser.value.id}/${Date.now()}_${bookingForm.value.prescriptionFile.name}`
            const { data, error } = await supabase.storage
              .from('payment-proofs')
              .upload(fileName, bookingForm.value.prescriptionFile)
            
            if (error) throw error
            prescriptionFilePath = data.path
          } catch (uploadError) {
            console.error('Prescription file upload error:', uploadError)
            throw new Error('Failed to upload prescription file')
          }
        }

        if (bookingForm.value.paymentProofFile) {
          try {
            const fileName = `${currentUser.value.id}/${Date.now()}_payment_${bookingForm.value.paymentProofFile.name}`
            const { data, error } = await supabase.storage
              .from('payment-proofs')
              .upload(fileName, bookingForm.value.paymentProofFile)
            
            if (error) throw error
            paymentProofPath = data.path
          } catch (uploadError) {
            console.error('Payment proof upload error:', uploadError)
            throw new Error('Failed to upload payment proof')
          }
        }

        // Prepare comprehensive order data with ALL service-specific details
        const serviceDetails = {
          service_type: selectedService.value.type,
          service_name: selectedService.value.name,
          // Common fields
          delivery_address: sanitizeInput(bookingForm.value.deliveryAddress),
          contact_number: sanitizeInput(bookingForm.value.contactNumber),
          zip_code: bookingForm.value.zipCode,
          payment_method: bookingForm.value.paymentMethod,
          reference_number: bookingForm.value.referenceNumber || null,
          total_fee: totalFee.value,
          // Food delivery specific - ALL FIELDS SAVED
          restaurant: bookingForm.value.restaurant || null,
          restaurant_contact: bookingForm.value.restaurantContact || null,
          food_items: bookingForm.value.foodItems || null,
          estimated_amount: bookingForm.value.estimatedAmount || null,
          food_notes: bookingForm.value.notes || null,
          restaurant_address: bookingForm.value.restaurantAddress || null, // Added missing field
          // Bill payments specific - ALL FIELDS SAVED
          biller_name: bookingForm.value.billerName === 'Other' ? bookingForm.value.customBiller : bookingForm.value.billerName || null,
          account_number: bookingForm.value.accountNumber || null,
          bill_amount: bookingForm.value.amount || null,
          due_date: bookingForm.value.dueDate || null,
          // Pick-up & Drop specific - ALL FIELDS SAVED
          pickup_address: bookingForm.value.pickupAddress || null,
          pickup_contact: bookingForm.value.pickupContact || null,
          dropoff_address: bookingForm.value.deliveryAddress || null, // Use delivery address as dropoff
          dropoff_contact: bookingForm.value.dropoffContact || null,
          item_type: bookingForm.value.itemType || null,
          item_details: bookingForm.value.itemDetails || null,
          delivery_notes: bookingForm.value.deliveryNotes || null,
          // Gift delivery specific - ALL FIELDS SAVED
          gift_type: bookingForm.value.giftType || null,
          gift_store_name: bookingForm.value.giftStoreName || null,
          gift_store_address: bookingForm.value.giftStoreAddress || null,
          gift_details: bookingForm.value.giftDetails || null,
          recipient_name: bookingForm.value.recipientName || null,
          recipient_contact: bookingForm.value.recipientContact || null,
          gift_message: bookingForm.value.giftMessage || null,
          delivery_schedule: bookingForm.value.deliverySchedule || null,
          is_surprise: bookingForm.value.isSurprise || false,
          // Medicine delivery specific - ALL FIELDS SAVED
          pharmacy: bookingForm.value.pharmacy === 'Other' ? bookingForm.value.customPharmacy : bookingForm.value.pharmacy || null,
          patient_name: bookingForm.value.patientName || null,
          medicine_list: bookingForm.value.medicineList || null,
          needs_prescription: bookingForm.value.needsPrescription || false,
          estimated_cost: bookingForm.value.estimatedCost || null,
          // Grocery specific - ALL FIELDS SAVED
          preferred_store: bookingForm.value.preferredStore === 'Other' ? bookingForm.value.customStore : bookingForm.value.preferredStore || null,
          item_list: bookingForm.value.itemList || null,
          budget_range: bookingForm.value.budgetRange || null,
          exact_budget: bookingForm.value.exactBudget || null,
          brand_preferences: bookingForm.value.brandPreferences || null,
          delivery_instructions: bookingForm.value.deliveryInstructions || null,
          // File paths
          reference_file_path: referenceFilePath,
          prescription_file_path: prescriptionFilePath,
          payment_proof_path: paymentProofPath,
          // Timestamp
          form_submitted_at: new Date().toISOString()
        }

        const orderData = {
          user_id: currentUser.value.id,
          service_id: actualServiceId,
          pickup_address: bookingForm.value.pickupAddress || bookingForm.value.restaurantAddress || bookingForm.value.giftStoreAddress || bookingForm.value.deliveryAddress, // Dynamic pickup based on service
          pickup_contact: bookingForm.value.pickupContact || bookingForm.value.restaurantContact || bookingForm.value.contactNumber, // Dynamic contact
          delivery_address: sanitizeInput(bookingForm.value.deliveryAddress),
          delivery_contact: selectedService.value.type === 'pickup_drop' ? 
            sanitizeInput(bookingForm.value.dropoffContact) : 
            sanitizeInput(bookingForm.value.recipientContact || bookingForm.value.contactNumber), // Dynamic delivery contact
          package_description: sanitizeInput(
            bookingForm.value.itemDetails || 
            bookingForm.value.foodItems || 
            bookingForm.value.giftDetails || 
            bookingForm.value.medicineList ||
            bookingForm.value.itemList ||
            'Service booking'
          ),
          special_instructions: sanitizeInput(
            bookingForm.value.notes || 
            bookingForm.value.deliveryNotes || 
            bookingForm.value.deliveryInstructions || 
            bookingForm.value.brandPreferences ||
            bookingForm.value.giftMessage ||
            ''
          ),
          estimated_price: totalFee.value,
          final_price: totalFee.value,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          // CRITICAL: All form data saved in service_details as JSON
          service_details: JSON.stringify(serviceDetails)
        }

        console.log('Saving order with service details:', serviceDetails)

        // Create order in database
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([orderData])
          .select()
          .single()

        if (orderError) {
          console.error('Order creation error:', orderError)
          throw new Error('Failed to create order: ' + orderError.message)
        }

        if (!order || !order.id) {
          throw new Error('Order was not created properly')
        }

        // Create payment record
        const paymentData = {
          order_id: order.id,
          amount: totalFee.value,
          payment_method: bookingForm.value.paymentMethod,
          payment_status: bookingForm.value.paymentMethod === 'cod' ? 'cod' : 'pending',
          transaction_id: bookingForm.value.referenceNumber || null,
          payment_proof_url: paymentProofPath || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        const { error: paymentError } = await supabase
          .from('payments')
          .insert([paymentData])

        if (paymentError) {
          console.error('Payment record error:', paymentError)
          // Don't throw error for payment record, order is already created
          toast?.warning('Order created but payment record failed. Please contact support.')
        }

        // Generate and update order barcode
        try {
          const barcode = generateOrderBarcode(order.id)
          
          const { error: barcodeError } = await supabase
            .from('orders')
            .update({ barcode })
            .eq('id', order.id)

          if (barcodeError) {
            console.error('Barcode update error:', barcodeError)
            // Don't throw error, order is still valid
          }
        } catch (barcodeError) {
          console.error('Barcode generation error:', barcodeError)
          // Continue without barcode
        }

        // Success message and cleanup
        toast?.success(`Service booked successfully! Order #${order.id}`)
        closeModal()
        
        // Always redirect to My Orders after successful booking
        await router.push('/my-orders')

      } catch (error) {
        console.error('Booking submission error:', error)
        
        // Provide specific error messages
        let errorMessage = 'Failed to book service'
        
        if (error.message.includes('invalid input syntax for type uuid')) {
          errorMessage = 'Invalid service selected. Please try again.'
        } else if (error.message.includes('violates foreign key constraint')) {
          errorMessage = 'Service is no longer available. Please select another service.'
        } else if (error.message.includes('duplicate key value')) {
          errorMessage = 'Duplicate booking detected. Please check your orders.'
        } else if (error.message) {
          errorMessage = error.message
        }
        
        toast?.error(errorMessage)
      } finally {
        submitting.value = false
      }
    }

    const updateRestaurantAddress = () => {
      if (bookingForm.value.restaurant && bookingForm.value.restaurant !== 'Other|Custom Restaurant') {
        const [name, address] = bookingForm.value.restaurant.split('|')
        bookingForm.value.restaurantAddress = address
      } else {
        bookingForm.value.restaurantAddress = ''
      }
    }

    const initializeRestaurantMap = () => {
      if (!window.google || !restaurantMapContainer.value) return

      const calapanCenter = { lat: 13.4119, lng: 121.1803 }
      
      restaurantMap.value = new window.google.maps.Map(restaurantMapContainer.value, {
        zoom: 15,
        center: calapanCenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
          }
        ]
      })

      restaurantMarker.value = new window.google.maps.Marker({
        position: calapanCenter,
        map: restaurantMap.value,
        draggable: true,
        title: 'Drag to set restaurant location',
        animation: window.google.maps.Animation.DROP
      })

      restaurantMarker.value.addListener('dragend', async () => {
        const position = restaurantMarker.value.getPosition()
        restaurantLocation.value = { lat: position.lat(), lng: position.lng() }
        const address = await reverseGeocode(position.lat(), position.lng())
        if (address) {
          bookingForm.value.restaurantAddress = address
        }
      })

      restaurantMap.value.addListener('click', (event) => {
        restaurantMarker.value.setPosition(event.latLng)
        restaurantLocation.value = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        reverseGeocode(event.latLng.lat(), event.latLng.lng()).then(address => {
          if (address) {
            bookingForm.value.restaurantAddress = address
          }
        })
      })
    }

    const initializeRestaurantAutocomplete = () => {
      if (!window.google || !restaurantAddressInput.value) return

      const calapanBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(13.35, 121.12),
        new window.google.maps.LatLng(13.47, 121.24)
      )

      const autocomplete = new window.google.maps.places.Autocomplete(restaurantAddressInput.value, {
        bounds: calapanBounds,
        strictBounds: true,
        types: ['establishment'],
        componentRestrictions: { country: 'PH' }
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.geometry) {
          const location = place.geometry.location
          const lat = location.lat()
          const lng = location.lng()
          
          if (calapanBounds.contains(location)) {
            restaurantMap.value.setCenter(location)
            restaurantMap.value.setZoom(16)
            restaurantMarker.value.setPosition(location)
            restaurantLocation.value = { lat, lng }
            bookingForm.value.restaurantAddress = place.formatted_address
          } else {
            toast?.error('Please select a restaurant within Calapan City')
            bookingForm.value.restaurantAddress = ''
          }
        }
      })
    }

    const getCurrentRestaurantLocation = async () => {
      try {
        const position = await getGeoLocation()
        const location = { lat: position.lat, lng: position.lng }
        
        if (location.lat >= 13.35 && location.lat <= 13.47 && 
            location.lng >= 121.12 && location.lng <= 121.24) {
          
          restaurantLocation.value = location
          
          if (restaurantMap.value && restaurantMarker.value) {
            restaurantMap.value.setCenter(location)
            restaurantMap.value.setZoom(16)
            restaurantMarker.value.setPosition(location)
          }

          const address = await reverseGeocode(position.lat, position.lng)
          if (address) {
            bookingForm.value.restaurantAddress = address
          }
        } else {
          toast?.error('Your current location is outside our service area (Calapan City)')
        }
      } catch (error) {
        toast?.error('Unable to get your location. Please enter address manually.')
      }
    }

    const initializePickupMap = () => {
      if (!window.google || !pickupMapContainer.value) return

      const calapanCenter = { lat: 13.4119, lng: 121.1803 }
      
      pickupMap.value = new window.google.maps.Map(pickupMapContainer.value, {
        zoom: 15,
        center: calapanCenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
          }
        ]
      })

      pickupMarker.value = new window.google.maps.Marker({
        position: calapanCenter,
        map: pickupMap.value,
        draggable: true,
        title: 'Drag to set pickup location',
        animation: window.google.maps.Animation.DROP
      })

      pickupMarker.value.addListener('dragend', async () => {
        const position = pickupMarker.value.getPosition()
        pickupLocation.value = { lat: position.lat(), lng: position.lng() }
        const address = await reverseGeocode(position.lat(), position.lng())
        if (address) {
          bookingForm.value.pickupAddress = address
        }
      })

      pickupMap.value.addListener('click', (event) => {
        pickupMarker.value.setPosition(event.latLng)
        pickupLocation.value = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        reverseGeocode(event.latLng.lat(), event.latLng.lng()).then(address => {
          if (address) {
            bookingForm.value.pickupAddress = address
          }
        })
      })
    }

    const initializePickupAutocomplete = () => {
      if (!window.google || !pickupAddressInput.value) return

      const calapanBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(13.35, 121.12),
        new window.google.maps.LatLng(13.47, 121.24)
      )

      const autocomplete = new window.google.maps.places.Autocomplete(pickupAddressInput.value, {
        bounds: calapanBounds,
        strictBounds: true,
        types: ['address'],
        componentRestrictions: { country: 'PH' }
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.geometry) {
          const location = place.geometry.location
          const lat = location.lat()
          const lng = location.lng()
          
          if (calapanBounds.contains(location)) {
            pickupMap.value.setCenter(location)
            pickupMap.value.setZoom(16)
            pickupMarker.value.setPosition(location)
            pickupLocation.value = { lat, lng }
            bookingForm.value.pickupAddress = place.formatted_address
          } else {
            toast?.error('Please select an address within Calapan City')
            bookingForm.value.pickupAddress = ''
          }
        }
      })
    }

    const getCurrentPickupLocation = async () => {
      try {
        const position = await getGeoLocation()
        const location = { lat: position.lat, lng: position.lng }
        
        if (location.lat >= 13.35 && location.lat <= 13.47 && 
            location.lng >= 121.12 && location.lng <= 121.24) {
          
          pickupLocation.value = location
          
          if (pickupMap.value && pickupMarker.value) {
            pickupMap.value.setCenter(location)
            pickupMap.value.setZoom(16)
            pickupMarker.value.setPosition(location)
          }

          const address = await reverseGeocode(position.lat, position.lng)
          if (address) {
            bookingForm.value.pickupAddress = address
          }
        } else {
          toast?.error('Your current location is outside our service area (Calapan City)')
        }
      } catch (error) {
        toast?.error('Unable to get your location. Please enter address manually.')
      }
    }

    // Gift Store Location Functions
    const initializeGiftStoreMap = () => {
      if (!window.google || !giftStoreMapContainer.value) return

      const calapanCenter = { lat: 13.4119, lng: 121.1803 }
      
      giftStoreMap.value = new window.google.maps.Map(giftStoreMapContainer.value, {
        zoom: 15,
        center: calapanCenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
          }
        ]
      })

      giftStoreMarker.value = new window.google.maps.Marker({
        position: calapanCenter,
        map: giftStoreMap.value,
        draggable: true,
        title: 'Drag to set store location',
        animation: window.google.maps.Animation.DROP
      })

      giftStoreMarker.value.addListener('dragend', async () => {
        const position = giftStoreMarker.value.getPosition()
        giftStoreLocation.value = { lat: position.lat(), lng: position.lng() }
        const address = await reverseGeocode(position.lat(), position.lng())
        if (address) {
          bookingForm.value.giftStoreAddress = address
        }
      })

      giftStoreMap.value.addListener('click', (event) => {
        giftStoreMarker.value.setPosition(event.latLng)
        giftStoreLocation.value = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        reverseGeocode(event.latLng.lat(), event.latLng.lng()).then(address => {
          if (address) {
            bookingForm.value.giftStoreAddress = address
          }
        })
      })
    }

    const initializeGiftStoreAutocomplete = () => {
      if (!window.google || !giftStoreAddressInput.value) return

      const calapanBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(13.35, 121.12),
        new window.google.maps.LatLng(13.47, 121.24)
      )

      const autocomplete = new window.google.maps.places.Autocomplete(giftStoreAddressInput.value, {
        bounds: calapanBounds,
        strictBounds: true,
        types: ['establishment'],
        componentRestrictions: { country: 'PH' }
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.geometry) {
          const location = place.geometry.location
          const lat = location.lat()
          const lng = location.lng()
          
          if (calapanBounds.contains(location)) {
            giftStoreMap.value.setCenter(location)
            giftStoreMap.value.setZoom(16)
            giftStoreMarker.value.setPosition(location)
            giftStoreLocation.value = { lat, lng }
            bookingForm.value.giftStoreAddress = place.formatted_address
          } else {
            toast?.error('Please select a store within Calapan City')
            bookingForm.value.giftStoreAddress = ''
          }
        }
      })
    }

    const getCurrentGiftStoreLocation = async () => {
      try {
        const position = await getGeoLocation()
        const location = { lat: position.lat, lng: position.lng }
        
        if (location.lat >= 13.35 && location.lat <= 13.47 && 
            location.lng >= 121.12 && location.lng <= 121.24) {
          
          giftStoreLocation.value = location
          
          if (giftStoreMap.value && giftStoreMarker.value) {
            giftStoreMap.value.setCenter(location)
            giftStoreMap.value.setZoom(16)
            giftStoreMarker.value.setPosition(location)
          }

          const address = await reverseGeocode(position.lat, position.lng)
          if (address) {
            bookingForm.value.giftStoreAddress = address
          }
        } else {
          toast?.error('Your current location is outside our service area (Calapan City)')
        }
      } catch (error) {
        toast?.error('Unable to get your location. Please enter address manually.')
      }
    }

    // Load Google Maps API
    onMounted(() => {
      if (!window.google && import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&region=PH`
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }
    })

    return {
      viewMode,
      services,
      selectedService,
      bookingForm,
      deliveryFee,
      totalFee,
      isFormValid,
      submitting,
      addressInput,
      mapContainer,
      restaurantAddressInput,
      restaurantMapContainer,
      pickupAddressInput,
      pickupMapContainer,
      giftStoreAddressInput,
      giftStoreMapContainer,
      paymentProofPreview,
      showPaymentProofModal,
      selectService,
      closeModal,
      getCurrentLocation,
      getCurrentRestaurantLocation,
      getCurrentPickupLocation,
      getCurrentGiftStoreLocation,
      handleFileUpload,
      handlePaymentProofUpload,
      removePaymentProof,
      submitBooking,
      updateRestaurantAddress
    }
  }
}
</script>
