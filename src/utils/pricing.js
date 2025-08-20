import { supabase } from "@/lib/supabase"

// Base pricing configuration (fallback values)
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

export const getDynamicPricingConfig = async () => {
  try {
    // First try to get service-specific pricing
    const { data: servicePricing, error: serviceError } = await supabase.from("service_pricing_config").select("*")

    // Also get global pricing config
    const { data: globalPricing, error: globalError } = await supabase.from("pricing_config").select("*").single()

    if (serviceError && globalError) {
      console.warn("Failed to fetch pricing config, using defaults:", { serviceError, globalError })
      return null
    }

    return {
      servicePricing: servicePricing || [],
      globalPricing: globalPricing || null,
    }
  } catch (error) {
    console.error("Error fetching dynamic pricing:", error)
    return null
  }
}

export const calculateDeliveryPrice = async (serviceCategory, distanceKm = 0) => {
  try {
    // Try to get dynamic pricing first
    const dynamicConfig = await getDynamicPricingConfig()

    let baseRate = PRICING_CONFIG.BASE_RATES[serviceCategory] || 50
    let distanceRate = PRICING_CONFIG.DISTANCE_RATES[serviceCategory] || 10
    let minimumFee = PRICING_CONFIG.MINIMUM_FEES[serviceCategory] || 50

    if (dynamicConfig) {
      // Check if there's service-specific pricing
      const serviceConfig = dynamicConfig.servicePricing.find((config) => config.service_type === serviceCategory)

      if (serviceConfig) {
        baseRate = Number.parseFloat(serviceConfig.base_price) || baseRate
        distanceRate = Number.parseFloat(serviceConfig.distance_multiplier) || distanceRate
        minimumFee = Number.parseFloat(serviceConfig.minimum_fare) || minimumFee
      } else if (dynamicConfig.globalPricing) {
        // Use global pricing if no service-specific config
        const global = dynamicConfig.globalPricing
        baseRate = Number.parseFloat(global.base_fee) || baseRate
        distanceRate = Number.parseFloat(global.distance_multiplier) || distanceRate
        minimumFee = Number.parseFloat(global.minimum_fare) || minimumFee
      }
    }

    const distanceFee = distanceKm * distanceRate
    const totalPrice = baseRate + distanceFee

    return Math.max(totalPrice, minimumFee)
  } catch (error) {
    console.error("Error calculating dynamic delivery price:", error)
    // Fallback to static calculation
    const baseRate = PRICING_CONFIG.BASE_RATES[serviceCategory] || 50
    const distanceRate = PRICING_CONFIG.DISTANCE_RATES[serviceCategory] || 10
    const minimumFee = PRICING_CONFIG.MINIMUM_FEES[serviceCategory] || 50

    const distanceFee = distanceKm * distanceRate
    const totalPrice = baseRate + distanceFee

    return Math.max(totalPrice, minimumFee)
  }
}

// Format price for display
export const formatPrice = (price) => {
  return `₱${price.toFixed(2)}`
}

export const calculateDistanceFee = async (serviceCategory, distanceKm) => {
  try {
    const dynamicConfig = await getDynamicPricingConfig()
    let distanceRate = PRICING_CONFIG.DISTANCE_RATES[serviceCategory] || 10

    if (dynamicConfig) {
      const serviceConfig = dynamicConfig.servicePricing.find((config) => config.service_type === serviceCategory)

      if (serviceConfig) {
        distanceRate = Number.parseFloat(serviceConfig.distance_multiplier) || distanceRate
      } else if (dynamicConfig.globalPricing) {
        distanceRate = Number.parseFloat(dynamicConfig.globalPricing.distance_multiplier) || distanceRate
      }
    }

    return distanceKm * distanceRate
  } catch (error) {
    console.error("Error calculating dynamic distance fee:", error)
    const distanceRate = PRICING_CONFIG.DISTANCE_RATES[serviceCategory] || 10
    return distanceKm * distanceRate
  }
}
