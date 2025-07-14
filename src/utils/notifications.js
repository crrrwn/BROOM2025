"use client"

// Import supabase client and vue-toastification
import { supabase } from "./supabaseClient"
import { useToast } from "vue-toastification"

// Notification utilities for the delivery app
export const createNotification = async (userId, title, message, type = "system", actionUrl = null) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert([
        {
          user_id: userId,
          title,
          message,
          type,
          action_url: actionUrl,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    return { data, error }
  } catch (error) {
    console.error("Error creating notification:", error)
    return { data: null, error }
  }
}

export const sendOrderUpdateNotification = async (userId, orderId, status, driverName = null) => {
  const statusTitles = {
    assigned: "Driver Assigned!",
    picked_up: "Order Picked Up!",
    in_transit: "Order In Transit!",
    delivered: "Order Delivered!",
    cancelled: "Order Cancelled",
  }

  const message = getOrderStatusMessage(status)

  return await createNotification(
    userId,
    statusTitles[status] || "Order Update",
    message,
    "order_update",
    `/order/${orderId}/track`,
  )
}

export const sendPaymentNotification = async (userId, orderId, paymentStatus) => {
  const message = getPaymentStatusMessage(paymentStatus)

  const titles = {
    verified: "Payment Verified!",
    rejected: "Payment Rejected",
  }

  return await createNotification(
    userId,
    titles[paymentStatus] || "Payment Update",
    message,
    "payment",
    `/order/${orderId}/track`,
  )
}

export const sendPromoNotification = async (userId, promoCode, discount) => {
  return await createNotification(
    userId,
    "Special Offer!",
    `Use promo code ${promoCode} to get ${discount}% off on your next order. Limited time offer!`,
    "promo",
    "/book-service",
  )
}

export const sendWelcomeNotification = async (userId, firstName) => {
  return await createNotification(
    userId,
    `Welcome to QuickServe, ${firstName}!`,
    "Thank you for joining QuickServe. Start by booking your first service and enjoy fast delivery in Calapan City.",
    "system",
    "/book-service",
  )
}

export const sendDeliveryReminderNotification = async (userId, orderId, eta) => {
  return await createNotification(
    userId,
    "Delivery Reminder",
    `Your order #${orderId} will arrive in approximately ${eta} minutes. Please be ready to receive your delivery.`,
    "delivery",
    `/order/${orderId}/track`,
  )
}

// Browser notification API helpers
export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications")
    return false
  }

  if (Notification.permission === "granted") {
    return true
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission()
    return permission === "granted"
  }

  return false
}

export const showBrowserNotification = (title, options = {}) => {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      ...options,
    })

    // Auto close after 5 seconds
    setTimeout(() => {
      notification.close()
    }, 5000)

    return notification
  }
}

export const sendPushNotification = async (userId, title, message, data = {}) => {
  // This would integrate with a push notification service like Firebase Cloud Messaging
  // For now, we'll just show a browser notification

  const hasPermission = await requestNotificationPermission()

  if (hasPermission) {
    showBrowserNotification(title, {
      body: message,
      data,
      requireInteraction: true,
    })
  }
}

// Notification sound utilities
export const playNotificationSound = (type = "default") => {
  const sounds = {
    default:
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    success:
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    error:
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  }

  try {
    const audio = new Audio(sounds[type] || sounds.default)
    audio.volume = 0.3
    audio.play().catch(() => {
      // Ignore errors if audio can't play
    })
  } catch (error) {
    console.log("Could not play notification sound:", error)
  }
}

// Notification batching to prevent spam
const notificationQueue = []
let isProcessingQueue = false

export const queueNotification = (notification) => {
  notificationQueue.push({
    ...notification,
    timestamp: Date.now(),
  })

  if (!isProcessingQueue) {
    processNotificationQueue()
  }
}

const processNotificationQueue = async () => {
  isProcessingQueue = true

  while (notificationQueue.length > 0) {
    const notification = notificationQueue.shift()

    // Group similar notifications within 5 seconds
    const similarNotifications = notificationQueue.filter(
      (n) => n.type === notification.type && Date.now() - n.timestamp < 5000,
    )

    if (similarNotifications.length > 0) {
      // Remove similar notifications from queue
      similarNotifications.forEach((similar) => {
        const index = notificationQueue.indexOf(similar)
        if (index > -1) notificationQueue.splice(index, 1)
      })

      // Send grouped notification
      await sendGroupedNotification(notification, similarNotifications)
    } else {
      // Send individual notification
      await sendIndividualNotification(notification)
    }

    // Wait 1 second between notifications
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  isProcessingQueue = false
}

const sendGroupedNotification = async (mainNotification, similarNotifications) => {
  const count = similarNotifications.length + 1
  const title = `${count} ${mainNotification.type} updates`
  const message = `You have ${count} new ${mainNotification.type} notifications`

  await createNotification(mainNotification.userId, title, message, mainNotification.type)
}

const sendIndividualNotification = async (notification) => {
  await createNotification(
    notification.userId,
    notification.title,
    notification.message,
    notification.type,
    notification.actionUrl,
  )
}

// Notification preferences
export const getNotificationPreferences = (userId) => {
  const key = `notification_prefs_${userId}`
  const defaultPrefs = {
    orderUpdates: true,
    paymentUpdates: true,
    promoOffers: true,
    deliveryReminders: true,
    systemNotifications: true,
    soundEnabled: true,
    browserNotifications: true,
  }

  try {
    const saved = localStorage.getItem(key)
    return saved ? { ...defaultPrefs, ...JSON.parse(saved) } : defaultPrefs
  } catch (error) {
    return defaultPrefs
  }
}

export const setNotificationPreferences = (userId, preferences) => {
  const key = `notification_prefs_${userId}`
  try {
    localStorage.setItem(key, JSON.stringify(preferences))
    return true
  } catch (error) {
    console.error("Error saving notification preferences:", error)
    return false
  }
}

export const shouldSendNotification = (userId, notificationType) => {
  const preferences = getNotificationPreferences(userId)

  const typeMap = {
    order_update: "orderUpdates",
    payment: "paymentUpdates",
    promo: "promoOffers",
    delivery: "deliveryReminders",
    system: "systemNotifications",
  }

  const prefKey = typeMap[notificationType]
  return prefKey ? preferences[prefKey] : true
}

// Notification analytics
export const trackNotificationEvent = (eventType, notificationId, userId) => {
  // This would typically send to an analytics service
  console.log("Notification event:", {
    eventType, // 'sent', 'opened', 'clicked', 'dismissed'
    notificationId,
    userId,
    timestamp: new Date().toISOString(),
  })
}

// Clean up old notifications
export const cleanupOldNotifications = async (userId, daysToKeep = 30) => {
  try {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("user_id", userId)
      .lt("created_at", cutoffDate.toISOString())

    if (error) {
      console.error("Error cleaning up notifications:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error cleaning up notifications:", error)
    return false
  }
}

// Toast notification wrapper
export const useNotifications = () => {
  const toast = useToast()

  const showSuccess = (message) => {
    toast.success(message)
  }

  const showError = (message) => {
    toast.error(message)
  }

  const showWarning = (message) => {
    toast.warning(message)
  }

  const showInfo = (message) => {
    toast.info(message)
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}

// Order status notifications
export const getOrderStatusMessage = (status) => {
  const messages = {
    pending: "Your order has been placed and is pending confirmation.",
    confirmed: "Your order has been confirmed and is being prepared.",
    picked_up: "Your order has been picked up by the driver.",
    in_transit: "Your order is on the way to the destination.",
    delivered: "Your order has been successfully delivered!",
    cancelled: "Your order has been cancelled.",
  }

  return messages[status] || "Order status updated."
}

// Payment status notifications
export const getPaymentStatusMessage = (status) => {
  const messages = {
    pending: "Payment is pending verification.",
    verified: "Payment has been verified successfully!",
    rejected: "Payment was rejected. Please try again.",
  }

  return messages[status] || "Payment status updated."
}
