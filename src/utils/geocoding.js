// Google Maps Geocoding utilities
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// Geocode an address to get coordinates
export const geocodeAddress = async (address) => {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn("Google Maps API key not configured")
    return null
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`,
    )

    const data = await response.json()

    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location
      return {
        lat: location.lat,
        lng: location.lng,
        formatted_address: data.results[0].formatted_address,
      }
    }

    return null
  } catch (error) {
    console.error("Geocoding error:", error)
    return null
  }
}

// Calculate distance between two coordinates
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return Math.round(distance * 100) / 100 // Round to 2 decimal places
}

// Convert degrees to radians
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180)
}

// Get current user location
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  })
}

// Reverse geocode coordinates to get address
export const reverseGeocode = async (lat, lng) => {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn("Google Maps API key not configured")
    return null
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
    )

    const data = await response.json()

    if (data.status === "OK" && data.results.length > 0) {
      return data.results[0].formatted_address
    }

    return null
  } catch (error) {
    console.error("Reverse geocoding error:", error)
    return null
  }
}
