<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-white shadow-sm p-4 flex items-center justify-between">
      <button @click="goBack" class="text-gray-600 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-semibold text-gray-900 capitalize">{{ serviceTypeDisplay }}</h1>
      <div class="w-6"></div>
    </header>

    <main class="flex-1 overflow-y-auto p-4">
      <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
        <div class="md:flex">
          <div class="md:flex-shrink-0">
            <img class="h-48 w-full object-cover md:w-48" :src="serviceImage" alt="Service image">
          </div>
          <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-green-500 font-semibold">{{ serviceTypeDisplay }}</div>
            <p class="block mt-1 text-lg leading-tight font-medium text-black">{{ serviceDetails.name }}</p>
            <p class="mt-2 text-gray-500">{{ serviceDetails.description }}</p>
            <div class="mt-4">
              <span class="text-2xl font-bold text-gray-900">₱{{ serviceDetails.basePrice }}</span>
              <span class="text-gray-500"> (base fee)</span>
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitOrder" class="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Service Request Form</h2>

        <!-- Common Fields -->
        <div>
          <label for="pickupAddress" class="block text-sm font-medium text-gray-700">Pickup Address</label>
          <input type="text" id="pickupAddress" v-model="formData.pickup_address" required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
        </div>
        <div>
          <label for="deliveryAddress" class="block text-sm font-medium text-gray-700">Delivery Address</label>
          <input type="text" id="deliveryAddress" v-model="formData.delivery_address" required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
        </div>
        <div>
          <label for="contactNumber" class="block text-sm font-medium text-gray-700">Contact Number</label>
          <input type="tel" id="contactNumber" v-model="formData.contact_number" required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
        </div>
        <div>
          <label for="zipCode" class="block text-sm font-medium text-gray-700">Zip Code</label>
          <input type="text" id="zipCode" v-model="formData.zip_code" required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
        </div>

        <!-- Dynamic Fields based on Service Type -->
        <div v-if="serviceType === 'food_delivery'" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Food Delivery Details</h3>
          <div>
            <label for="restaurant" class="block text-sm font-medium text-gray-700">Restaurant Name</label>
            <input type="text" id="restaurant" v-model="formData.restaurant" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="restaurantAddress" class="block text-sm font-medium text-gray-700">Restaurant Address</label>
            <input type="text" id="restaurantAddress" v-model="formData.restaurant_address" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="foodItems" class="block text-sm font-medium text-gray-700">Food Items (e.g., 2x Burger, 1x Fries)</label>
            <textarea id="foodItems" v-model="formData.food_items" rows="3" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
          </div>
          <div>
            <label for="estimatedAmount" class="block text-sm font-medium text-gray-700">Estimated Food Amount (₱)</label>
            <input type="number" id="estimatedAmount" v-model.number="formData.estimated_amount" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="restaurantContact" class="block text-sm font-medium text-gray-700">Restaurant Contact Number (Optional)</label>
            <input type="tel" id="restaurantContact" v-model="formData.restaurant_contact"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="foodNotes" class="block text-sm font-medium text-gray-700">Special Instructions (Optional)</label>
            <textarea id="foodNotes" v-model="formData.food_notes" rows="2"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
          </div>
        </div>

        <div v-else-if="serviceType === 'bill_payments'" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Bill Payment Details</h3>
          <div>
            <label for="billerName" class="block text-sm font-medium text-gray-700">Biller Name</label>
            <input type="text" id="billerName" v-model="formData.biller_name" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="accountNumber" class="block text-sm font-medium text-gray-700">Account Number</label>
            <input type="text" id="accountNumber" v-model="formData.account_number" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="billAmount" class="block text-sm font-medium text-gray-700">Bill Amount (₱)</label>
            <input type="number" id="billAmount" v-model.number="formData.bill_amount" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date</label>
            <input type="date" id="dueDate" v-model="formData.due_date" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="referenceNumber" class="block text-sm font-medium text-gray-700">Reference Number (Optional)</label>
            <input type="text" id="referenceNumber" v-model="formData.reference_number"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="billStatement" class="block text-sm font-medium text-gray-700">Upload Bill Statement (Optional)</label>
            <input type="file" id="billStatement" @change="handleFileUpload($event, 'billStatement')"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
            <p v-if="formData.reference_file_path" class="mt-2 text-sm text-gray-500">File uploaded: {{ formData.reference_file_path.split('/').pop() }}</p>
          </div>
        </div>

        <div v-else-if="serviceType === 'pickup_drop'" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Pick-up & Drop Details</h3>
          <div>
            <label for="pickupContact" class="block text-sm font-medium text-gray-700">Pickup Contact Number</label>
            <input type="tel" id="pickupContact" v-model="formData.pickup_contact" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="dropoffContact" class="block text-sm font-medium text-gray-700">Drop-off Contact Number</label>
            <input type="tel" id="dropoffContact" v-model="formData.dropoff_contact" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="itemType" class="block text-sm font-medium text-gray-700">Type of Item</label>
            <select id="itemType" v-model="formData.item_type" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
              <option value="">Select item type</option>
              <option value="documents">Documents</option>
              <option value="parcel">Parcel</option>
              <option value="food">Food</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div>
            <label for="itemDetails" class="block text-sm font-medium text-gray-700">Item Details (e.g., size, weight, fragility)</label>
            <textarea id="itemDetails" v-model="formData.item_details" rows="3" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
          </div>
          <div>
            <label for="deliveryNotes" class="block text-sm font-medium text-gray-700">Special Instructions (Optional)</label>
            <textarea id="deliveryNotes" v-model="formData.delivery_notes" rows="2"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
          </div>
        </div>

        <div v-else-if="serviceType === 'grocery'" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Grocery Shopping Details</h3>
          <div>
            <label for="preferredStore" class="block text-sm font-medium text-gray-700">Preferred Grocery Store (Optional)</label>
            <input type="text" id="preferredStore" v-model="formData.preferred_store"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="itemList" class="block text-sm font-medium text-gray-700">Grocery Item List</label>
            <textarea id="itemList" v-model="formData.item_list" rows="5" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="e.g.,&#10;- 1kg Rice&#10;- 1 dozen Eggs&#10;- 500g Chicken Breast"></textarea>
          </div>
          <div>
            <label for="budgetRange" class="block text-sm font-medium text-gray-700">Budget Range (Optional)</label>
            <input type="text" id="budgetRange" v-model="formData.budget_range"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="e.g., ₱500 - ₱1000">
          </div>
          <div>
            <label for="exactBudget" class="block text-sm font-medium text-gray-700">Exact Budget (₱) (Optional)</label>
            <input type="number" id="exactBudget" v-model.number="formData.exact_budget"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="brandPreferences" class="block text-sm font-medium text-gray-700">Brand Preferences (Optional)</label>
            <textarea id="brandPreferences" v-model="formData.brand_preferences" rows="2"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
          </div>
          <div>
            <label for="deliveryInstructions" class="block text-sm font-medium text-gray-700">Special Instructions (Optional)</label>
            <textarea id="deliveryInstructions" v-model="formData.delivery_instructions" rows="2"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
          </div>
        </div>

        <div v-else-if="serviceType === 'medicine_delivery'" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Medicine Delivery Details</h3>
          <div>
            <label for="pharmacy" class="block text-sm font-medium text-gray-700">Preferred Pharmacy (Optional)</label>
            <input type="text" id="pharmacy" v-model="formData.pharmacy"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="medicineList" class="block text-sm font-medium text-gray-700">Medicine List</label>
            <textarea id="medicineList" v-model="formData.medicine_list" rows="5" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="e.g.,&#10;- Paracetamol 500mg (10 tablets)&#10;- Amoxicillin 250mg/5ml (1 bottle)"></textarea>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="needsPrescription" v-model="formData.needs_prescription"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
            <label for="needsPrescription" class="ml-2 block text-sm text-gray-900">Prescription Required</label>
          </div>
          <div v-if="formData.needs_prescription">
            <label for="prescriptionFile" class="block text-sm font-medium text-gray-700">Upload Prescription</label>
            <input type="file" id="prescriptionFile" @change="handleFileUpload($event, 'prescription')" required
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
            <p v-if="formData.prescription_file_path" class="mt-2 text-sm text-gray-500">File uploaded: {{ formData.prescription_file_path.split('/').pop() }}</p>
          </div>
          <div>
            <label for="patientName" class="block text-sm font-medium text-gray-700">Patient Name (Optional)</label>
            <input type="text" id="patientName" v-model="formData.patient_name"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="estimatedCost" class="block text-sm font-medium text-gray-700">Estimated Cost (₱) (Optional)</label>
            <input type="number" id="estimatedCost" v-model.number="formData.estimated_cost"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
        </div>

        <div v-else-if="serviceType === 'gift_delivery'" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Gift Delivery Details</h3>
          <div>
            <label for="giftType" class="block text-sm font-medium text-gray-700">Type of Gift</label>
            <input type="text" id="giftType" v-model="formData.gift_type" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="giftStoreName" class="block text-sm font-medium text-gray-700">Store Name (Optional)</label>
            <input type="text" id="giftStoreName" v-model="formData.gift_store_name"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="giftStoreAddress" class="block text-sm font-medium text-gray-700">Store Address (Optional)</label>
            <input type="text" id="giftStoreAddress" v-model="formData.gift_store_address"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="giftDetails" class="block text-sm font-medium text-gray-700">Gift Details</label>
            <textarea id="giftDetails" v-model="formData.gift_details" rows="3" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
          </div>
          <div>
            <label for="recipientName" class="block text-sm font-medium text-gray-700">Recipient Name</label>
            <input type="text" id="recipientName" v-model="formData.recipient_name" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="recipientContact" class="block text-sm font-medium text-gray-700">Recipient Contact Number</label>
            <input type="tel" id="recipientContact" v-model="formData.recipient_contact" required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div>
            <label for="giftMessage" class="block text-sm font-medium text-gray-700">Gift Message (Optional)</label>
            <textarea id="giftMessage" v-model="formData.gift_message" rows="2"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
          </div>
          <div>
            <label for="deliverySchedule" class="block text-sm font-medium text-gray-700">Preferred Delivery Date/Time (Optional)</label>
            <input type="datetime-local" id="deliverySchedule" v-model="formData.delivery_schedule"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="isSurprise" v-model="formData.is_surprise"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
            <label for="isSurprise" class="ml-2 block text-sm text-gray-900">Surprise Delivery</label>
          </div>
        </div>

        <!-- Payment Method -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Payment Method</h3>
          <div class="mt-2 space-y-2">
            <div class="flex items-center">
              <input id="payment-gcash" name="payment-method" type="radio" value="gcash" v-model="formData.payment_method" required
                class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300">
              <label for="payment-gcash" class="ml-3 block text-sm font-medium text-gray-700">GCash</label>
            </div>
            <div class="flex items-center">
              <input id="payment-bank" name="payment-method" type="radio" value="bank" v-model="formData.payment_method" required
                class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300">
              <label for="payment-bank" class="ml-3 block text-sm font-medium text-gray-700">Online Banking</label>
            </div>
            <div class="flex items-center">
              <input id="payment-cod" name="payment-method" type="radio" value="cod" v-model="formData.payment_method" required
                class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300">
              <label for="payment-cod" class="ml-3 block text-sm font-medium text-gray-700">Cash on Delivery (COD)</label>
            </div>
          </div>
        </div>

        <!-- Total Fee Display -->
        <div class="mt-6 p-4 bg-green-50 rounded-md flex items-center justify-between">
          <span class="text-lg font-semibold text-green-800">Estimated Total Fee:</span>
          <span class="text-2xl font-bold text-green-900">₱{{ totalFee.toLocaleString() }}</span>
        </div>

        <button type="submit" :disabled="isSubmitting"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          {{ isSubmitting ? 'Booking...' : 'Book Service' }}
        </button>
      </form>
    </main>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getServiceById, createOrder, uploadFile, getFileUrl, getUserProfile } from '../../lib/supabase';
import { calculateDeliveryFee } from '../../utils/pricing';
import { validateForm } from '../../utils/validation';
import { getCoordinates } from '../../utils/geocoding';

export default {
  name: 'ServiceDetails',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const currentUser = inject('currentUser');
    const toast = inject('toast');

    const serviceType = ref(route.params.type);
    const serviceDetails = ref({});
    const isSubmitting = ref(false);

    const formData = reactive({
      user_id: '',
      service_id: '',
      service_type: serviceType.value,
      pickup_address: '',
      delivery_address: '',
      contact_number: '',
      zip_code: '',
      payment_method: '',
      total_amount: 0,
      estimated_price: 0, // Add estimated_price to formData
      status: 'pending',
      service_details: {}, // To store dynamic service-specific data
      // Dynamic fields for specific services
      restaurant: '',
      restaurant_address: '',
      food_items: '',
      estimated_amount: null,
      restaurant_contact: '',
      food_notes: '',
      biller_name: '',
      account_number: '',
      bill_amount: null,
      due_date: '',
      reference_number: '',
      reference_file: null,
      reference_file_path: '',
      pickup_contact: '',
      dropoff_contact: '',
      item_type: '',
      item_details: '',
      delivery_notes: '',
      preferred_store: '',
      item_list: '',
      budget_range: '',
      exact_budget: null,
      brand_preferences: '',
      delivery_instructions: '',
      pharmacy: '',
      medicine_list: '',
      needs_prescription: false,
      prescription_file: null,
      prescription_file_path: '',
      patient_name: '',
      estimated_cost: null,
      gift_type: '',
      gift_store_name: '',
      gift_store_address: '',
      gift_details: '',
      recipient_name: '',
      recipient_contact: '',
      gift_message: '',
      delivery_schedule: '',
      is_surprise: false,
    });

    const services = [
      { id: 1, name: 'Food Delivery', type: 'food_delivery', description: 'Get your favorite meals delivered to your doorstep.', basePrice: 50, image: '/placeholder.svg?height=192&width=192' },
      { id: 2, name: 'Bill Payments', type: 'bill_payments', description: 'Pay your bills conveniently through our riders.', basePrice: 30, image: '/placeholder.svg?height=192&width=192' },
      { id: 3, name: 'Pick-up & Drop', type: 'pickup_drop', description: 'Send or receive packages with ease.', basePrice: 60, image: '/placeholder.svg?height=192&width=192' },
      { id: 4, name: 'Grocery Shopping', type: 'grocery', description: 'Your groceries, delivered fresh to your home.', basePrice: 70, image: '/placeholder.svg?height=192&width=192' },
      { id: 5, name: 'Medicine Delivery', type: 'medicine_delivery', description: 'Fast and reliable delivery of your essential medicines.', basePrice: 40, image: '/placeholder.svg?height=192&width=192' },
      { id: 6, name: 'Gift Delivery', type: 'gift_delivery', description: 'Send gifts to your loved ones, hassle-free.', basePrice: 55, image: '/placeholder.svg?height=192&width=192' },
    ];

    const serviceTypeDisplay = computed(() => {
      const service = services.find(s => s.type === serviceType.value);
      return service ? service.name : 'Service';
    });

    const serviceImage = computed(() => {
      const service = services.find(s => s.type === serviceType.value);
      return service ? service.image : '/placeholder.svg?height=192&width=192';
    });

    const totalFee = computed(() => {
      const basePrice = serviceDetails.value.basePrice || 0;
      let additionalFee = 0;

      if (serviceType.value === 'food_delivery' && formData.estimated_amount) {
        additionalFee += formData.estimated_amount * 0.05; // 5% commission for food
      } else if (serviceType.value === 'bill_payments' && formData.bill_amount) {
        additionalFee += formData.bill_amount * 0.02; // 2% commission for bills
      } else if (serviceType.value === 'grocery' && formData.exact_budget) {
        additionalFee += formData.exact_budget * 0.07; // 7% commission for groceries
      } else if (serviceType.value === 'medicine_delivery' && formData.estimated_cost) {
        additionalFee += formData.estimated_cost * 0.03; // 3% commission for medicine
      }

      // Example: Add a distance-based fee (dummy calculation)
      // In a real app, you'd use actual geocoding and distance matrix APIs
      const distanceFee = calculateDeliveryFee(formData.pickup_address, formData.delivery_address);
      additionalFee += distanceFee;

      return basePrice + additionalFee;
    });

    const loadServiceDetails = async () => {
      const service = services.find(s => s.type === serviceType.value);
      if (service) {
        serviceDetails.value = service;
        formData.service_id = service.name; // Changed from service.id to service.name
        formData.estimated_price = totalFee.value; // Initialize estimated_price
      } else {
        toast.error('Service not found.');
        router.push('/dashboard');
      }
    };

    const loadUserProfile = async () => {
      if (currentUser.value) {
        formData.user_id = currentUser.value.id;
        const { data: profile, error } = await getUserProfile(currentUser.value.id);
        if (profile) {
          formData.pickup_address = profile.address || '';
          formData.contact_number = profile.contact || '';
        } else if (error) {
          console.error('Error loading user profile:', error);
          toast.error('Failed to load user profile.');
        }
      }
    };

    const handleFileUpload = (event, type) => {
      const file = event.target.files[0];
      if (file) {
        if (type === 'billStatement') {
          formData.reference_file = file;
        } else if (type === 'prescription') {
          formData.prescription_file = file;
        }
      }
    };

    const uploadFiles = async () => {
      if (formData.reference_file) {
        const filePath = `${formData.user_id}/bills/${Date.now()}-${formData.reference_file.name}`;
        const { data, error } = await uploadFile('payment-proofs', filePath, formData.reference_file);
        if (error) {
          console.error('Error uploading bill statement:', error);
          toast.error('Failed to upload bill statement.');
          return null;
        }
        formData.reference_file_path = data.path;
      }

      if (formData.prescription_file) {
        const filePath = `${formData.user_id}/prescriptions/${Date.now()}-${formData.prescription_file.name}`;
        const { data, error } = await uploadFile('payment-proofs', filePath, formData.prescription_file);
        if (error) {
          console.error('Error uploading prescription:', error);
          toast.error('Failed to upload prescription.');
          return null;
        }
        formData.prescription_file_path = data.path;
      }
      return true;
    };

    const submitOrder = async () => {
      isSubmitting.value = true;
      toast.info('Processing your order...');

      // Basic validation
      const commonFields = ['pickup_address', 'delivery_address', 'contact_number', 'zip_code', 'payment_method'];
      const specificFields = {
        food_delivery: ['restaurant', 'restaurant_address', 'food_items', 'estimated_amount'],
        bill_payments: ['biller_name', 'account_number', 'bill_amount', 'due_date'],
        pickup_drop: ['pickup_contact', 'dropoff_contact', 'item_type', 'item_details'],
        grocery: ['item_list'],
        medicine_delivery: ['medicine_list'],
        gift_delivery: ['gift_type', 'gift_details', 'recipient_name', 'recipient_contact'],
      };

      const requiredFields = [...commonFields, ...(specificFields[serviceType.value] || [])];

      if (formData.needs_prescription && serviceType.value === 'medicine_delivery') {
        requiredFields.push('prescription_file');
      }

      const validationErrors = validateForm(formData, requiredFields);
      if (validationErrors.length > 0) {
        validationErrors.forEach(error => toast.error(error));
        isSubmitting.value = false;
        return;
      }

      try {
        // Upload files first if any
        const filesUploaded = await uploadFiles();
        if (filesUploaded === null) { // If uploadFiles returned null due to an error
          isSubmitting.value = false;
          return;
        }

        // Prepare service_details JSON based on service type
        const serviceSpecificData = {};
        switch (serviceType.value) {
          case 'food_delivery':
            Object.assign(serviceSpecificData, {
              restaurant: formData.restaurant,
              restaurant_address: formData.restaurant_address,
              food_items: formData.food_items,
              estimated_amount: formData.estimated_amount,
              restaurant_contact: formData.restaurant_contact,
              food_notes: formData.food_notes,
            });
            break;
          case 'bill_payments':
            Object.assign(serviceSpecificData, {
              biller_name: formData.biller_name,
              account_number: formData.account_number,
              bill_amount: formData.bill_amount,
              due_date: formData.due_date,
              reference_number: formData.reference_number,
              reference_file_path: formData.reference_file_path,
            });
            break;
          case 'pickup_drop':
            Object.assign(serviceSpecificData, {
              pickup_contact: formData.pickup_contact,
              dropoff_contact: formData.dropoff_contact,
              item_type: formData.item_type,
              item_details: formData.item_details,
              delivery_notes: formData.delivery_notes,
            });
            break;
          case 'grocery':
            Object.assign(serviceSpecificData, {
              preferred_store: formData.preferred_store,
              item_list: formData.item_list,
              budget_range: formData.budget_range,
              exact_budget: formData.exact_budget,
              brand_preferences: formData.brand_preferences,
              delivery_instructions: formData.delivery_instructions,
            });
            break;
          case 'medicine_delivery':
            Object.assign(serviceSpecificData, {
              pharmacy: formData.pharmacy,
              medicine_list: formData.medicine_list,
              needs_prescription: formData.needs_prescription,
              prescription_file_path: formData.prescription_file_path,
              patient_name: formData.patient_name,
              estimated_cost: formData.estimated_cost,
            });
            break;
          case 'gift_delivery':
            Object.assign(serviceSpecificData, {
              gift_type: formData.gift_type,
              gift_store_name: formData.gift_store_name,
              gift_store_address: formData.gift_store_address,
              gift_details: formData.gift_details,
              recipient_name: formData.recipient_name,
              recipient_contact: formData.recipient_contact,
              gift_message: formData.gift_message,
              delivery_schedule: formData.delivery_schedule,
              is_surprise: formData.is_surprise,
            });
            break;
        }

        // Include common fields in service_details for comprehensive record
        Object.assign(serviceSpecificData, {
          service_type: formData.service_type,
          service_name: serviceDetails.value.name,
          pickup_address: formData.pickup_address,
          delivery_address: formData.delivery_address,
          contact_number: formData.contact_number,
          zip_code: formData.zip_code,
          payment_method: formData.payment_method,
          total_fee: totalFee.value,
          form_submitted_at: new Date().toISOString(),
        });

        formData.service_details = serviceSpecificData;
        formData.total_amount = totalFee.value;
        formData.estimated_price = totalFee.value; // Ensure estimated_price is set

        const { data: order, error } = await createOrder(formData);

        if (error) {
          console.error('Error creating order:', error);
          toast.error('Failed to create order: ' + error.message);
        } else {
          toast.success('Order created successfully!');
          router.push({ name: 'OrderTracking', params: { id: order.id } });
        }
      } catch (error) {
        console.error('Error in submitOrder:', error);
        toast.error('An unexpected error occurred.');
      } finally {
        isSubmitting.value = false;
      }
    };

    const goBack = () => {
      router.back();
    };

    // Watch for changes in relevant fields to update totalFee
    watch(() => [
      formData.pickup_address,
      formData.delivery_address,
      formData.estimated_amount,
      formData.bill_amount,
      formData.exact_budget,
      formData.estimated_cost
    ], () => {
      formData.total_amount = totalFee.value;
      formData.estimated_price = totalFee.value;
    });

    onMounted(() => {
      loadServiceDetails();
      loadUserProfile();

      // Handle reorder functionality
      if (route.query.reorder) {
        // In a real application, you'd fetch the previous order details
        // and pre-fill the form. For this example, we'll just log it.
        console.log('Reordering order ID:', route.query.reorder);
        toast.info(`Reordering service based on Order ID: ${route.query.reorder}`);
        // You would typically fetch the order details and populate formData here
        // Example: const { data: prevOrder } = await getOrderById(route.query.reorder);
        // if (prevOrder) { Object.assign(formData, prevOrder); }
      }
    });

    return {
      serviceType,
      serviceDetails,
      serviceTypeDisplay,
      serviceImage,
      formData,
      totalFee,
      isSubmitting,
      handleFileUpload,
      submitOrder,
      goBack,
    };
  },
};
</script>

<style scoped>
/* Add any specific styles here if needed */
</style>
