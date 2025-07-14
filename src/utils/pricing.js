// Base pricing configuration
export const PRICING_CONFIG = {
  BASE_RATES: {
    documents: 50,
    packages: 80,
    food: 40,
    groceries: 60,
    medicine: 70,
    laundry: 100,
  },
  DISTANCE_RATES: {
    documents: 10,
    packages: 15,
    food: 12,
    groceries: 8,
    medicine: 20,
    laundry: 5,
  },
  MINIMUM_FEES: {
    documents: 50,
    packages: 80,
    food: 40,
    groceries: 60,
    medicine: 70,
    laundry: 100,
  },
}

// Calculate delivery price
export const calculateDeliveryPrice = (serviceCategory, distanceKm = 0) => {
  const baseRate = PRICING_CONFIG.BASE_RATES[serviceCategory] || 50
  const distanceRate = PRICING_CONFIG.DISTANCE_RATES[serviceCategory] || 10
  const minimumFee = PRICING_CONFIG.MINIMUM_FEES[serviceCategory] || 50

  const distanceFee = distanceKm * distanceRate
  const totalPrice = baseRate + distanceFee

  return Math.max(totalPrice, minimumFee)
}

// Format price for display
export const formatPrice = (price) => {
  return `₱${price.toFixed(2)}`
}

// Calculate distance fee only
export const calculateDistanceFee = (serviceCategory, distanceKm) => {
  const distanceRate = PRICING_CONFIG.DISTANCE_RATES[serviceCategory] || 10
  return distanceKm * distanceRate
}
