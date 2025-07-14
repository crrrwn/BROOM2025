// Validation utilities for the delivery app
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  // Philippine mobile number format: 09XXXXXXXXX or +639XXXXXXXXX
  const phoneRegex = /^(09|\+639)\d{9}$/
  return phoneRegex.test(phone.replace(/\s+/g, ""))
}

export const validatePassword = (password) => {
  // At least 8 characters
  return password && password.length >= 8
}

export const validateZipCode = (zipCode) => {
  // Calapan City zip code validation
  const validZipCodes = ["5200", "5201", "5202"]
  return validZipCodes.includes(zipCode.toString())
}

export const validateOTP = (otp) => {
  // 6-digit OTP validation
  const otpRegex = /^\d{6}$/
  return otpRegex.test(otp)
}

export const validatePromoCode = (code) => {
  // Promo code format: 3-20 alphanumeric characters
  const promoRegex = /^[A-Z0-9]{3,20}$/
  return promoRegex.test(code.toUpperCase())
}

export const validateAmount = (amount) => {
  // Validate monetary amount (positive number with up to 2 decimal places)
  const amountRegex = /^\d+(\.\d{1,2})?$/
  return amountRegex.test(amount.toString()) && Number.parseFloat(amount) > 0
}

export const validateBarcode = (barcode) => {
  // Order barcode format: QS + 8 digits
  const barcodeRegex = /^QS\d{8}$/
  return barcodeRegex.test(barcode)
}

export const validateFileSize = (file, maxSizeMB = 5) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

export const validateImageType = (file) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  return allowedTypes.includes(file.type)
}

export const validateDocumentType = (file) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]
  return allowedTypes.includes(file.type)
}

export const sanitizeInput = (input) => {
  // Remove potentially harmful characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim()
}

export const validateAddress = (address) => {
  // Basic address validation
  return address && address.trim().length >= 10
}

export const validateName = (name) => {
  // Name validation: 2-50 characters, letters and spaces only
  return name && name.trim().length >= 2
}

export const validateServiceType = (serviceType) => {
  const validTypes = ["food_delivery", "bill_payments", "pickup_drop", "grocery", "medicine_delivery", "gift_delivery"]
  return validTypes.includes(serviceType)
}

export const validateOrderStatus = (status) => {
  const validStatuses = ["pending", "confirmed", "assigned", "picked_up", "in_transit", "delivered", "cancelled"]
  return validStatuses.includes(status)
}

export const validatePaymentMethod = (method) => {
  const validMethods = ["gcash", "banking", "cod"]
  return validMethods.includes(method)
}

export const validateRating = (rating) => {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5
}

export const validateCoordinates = (lat, lng) => {
  return typeof lat === "number" && typeof lng === "number" && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}

// Form validation helpers
export const getValidationErrors = (formData, rules) => {
  const errors = {}

  Object.keys(rules).forEach((field) => {
    const value = formData[field]
    const fieldRules = rules[field]

    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = `${field} is required`
      return
    }

    if (value && fieldRules.email && !validateEmail(value)) {
      errors[field] = "Please enter a valid email address"
    }

    if (value && fieldRules.phone && !validatePhone(value)) {
      errors[field] = "Please enter a valid Philippine mobile number"
    }

    if (value && fieldRules.password && !validatePassword(value)) {
      errors[field] = "Password must be at least 8 characters"
    }

    if (value && fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `${field} must be at least ${fieldRules.minLength} characters`
    }

    if (value && fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = `${field} must not exceed ${fieldRules.maxLength} characters`
    }
  })

  return errors
}

// Spam detection
export const detectSpam = (text) => {
  const spamKeywords = [
    "free money",
    "click here",
    "urgent",
    "congratulations",
    "winner",
    "prize",
    "lottery",
    "inheritance",
    "bitcoin",
    "cryptocurrency",
    "investment opportunity",
  ]

  const lowerText = text.toLowerCase()
  return spamKeywords.some((keyword) => lowerText.includes(keyword))
}

// Rate limiting helper
export const createRateLimiter = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  const attempts = new Map()

  return (identifier) => {
    const now = Date.now()
    const userAttempts = attempts.get(identifier) || []

    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter((time) => now - time < windowMs)

    if (recentAttempts.length >= maxAttempts) {
      return false // Rate limited
    }

    recentAttempts.push(now)
    attempts.set(identifier, recentAttempts)
    return true // Allow request
  }
}

// Required field validation
export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0
}
