import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://uywvvasebsmhfknvqide.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5d3Z2YXNlYnNtaGZrbnZxaWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzU2NDYsImV4cCI6MjA2NzIxMTY0Nn0.bvfUPm3PqnlTDzItB7hIHxebuysJTyr1HHNbHONER7E"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth functions
export const signUp = async (email, password, userData) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/email-confirmed`,
        data: {
          first_name: userData.firstName,
          middle_name: userData.middleName,
          last_name: userData.lastName,
          contact_number: userData.contactNumber,
          house_street_address: userData.houseStreetAddress,
          barangay: userData.barangay,
          full_name: `${userData.firstName} ${userData.middleName || ""} ${userData.lastName}`
            .replace(/\s+/g, " ")
            .trim(),
        },
      },
    })

    if (error) throw error

    // If signup successful, also create user profile in users table
    if (data.user) {
      const { error: profileError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          email: email,
          first_name: userData.firstName,
          middle_name: userData.middleName,
          last_name: userData.lastName,
          contact_number: userData.contactNumber,
          contact: userData.contactNumber, // Also save in contact field
          house_street_address: userData.houseStreetAddress,
          address: userData.houseStreetAddress, // Also save in address field
          barangay: userData.barangay,
          email_verified: false,
          created_at: new Date().toISOString(),
        },
      ])

      if (profileError) {
        console.error("Profile creation error:", profileError)
      }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Signup error:", error)
    return { data: null, error }
  }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  return { data, error }
}

export const updatePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  return { data, error }
}

// User profile functions
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  return { user, error }
}

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()
  return { data, error }
}

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()
  return { data, error }
}

export const createUserProfile = async (user) => {
  const userData = {
    id: user.id,
    email: user.email,
    first_name: user.user_metadata?.first_name || "",
    middle_name: user.user_metadata?.middle_name || "",
    last_name: user.user_metadata?.last_name || "",
    contact_number: user.user_metadata?.contact_number || "",
    contact: user.user_metadata?.contact_number || "", // Also save in contact field
    house_street_address: user.user_metadata?.house_street_address || "",
    address: user.user_metadata?.house_street_address || "", // Also save in address field
    barangay: user.user_metadata?.barangay || "",
    email_verified: user.email_confirmed_at ? true : false,
    created_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from("users")
    .upsert([userData]) // Use upsert to handle existing records
    .select()
    .single()

  return { data, error }
}

// Services functions
export const getServices = async () => {
  const { data, error } = await supabase.from("services").select("*").eq("is_active", true).order("name")
  return { data, error }
}

export const getServiceById = async (serviceId) => {
  const { data, error } = await supabase.from("services").select("*").eq("id", serviceId).single()
  return { data, error }
}

// Orders functions
export const createOrder = async (orderData) => {
  const { data, error } = await supabase.from("orders").insert([orderData]).select().single()
  return { data, error }
}

export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      services (name, category),
      payments (*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
  return { data, error }
}

export const getOrderById = async (orderId) => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      services (name, description, category),
      payments (*),
      order_tracking (*)
    `)
    .eq("id", orderId)
    .single()
  return { data, error }
}

export const updateOrderStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId)
    .select()
    .single()
  return { data, error }
}

// Payments functions
export const createPayment = async (paymentData) => {
  const { data, error } = await supabase.from("payments").insert([paymentData]).select().single()
  return { data, error }
}

export const updatePaymentStatus = async (paymentId, status) => {
  const { data, error } = await supabase
    .from("payments")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", paymentId)
    .select()
    .single()
  return { data, error }
}

// Chat functions
export const getChatMessages = async (orderId) => {
  const { data, error } = await supabase
    .from("chat_messages")
    .select(`
      *,
      users (first_name, last_name)
    `)
    .eq("order_id", orderId)
    .order("created_at", { ascending: true })
  return { data, error }
}

export const sendChatMessage = async (messageData) => {
  const { data, error } = await supabase.from("chat_messages").insert([messageData]).select().single()
  return { data, error }
}

// Real-time subscriptions
export const subscribeToOrderUpdates = (orderId, callback) => {
  return supabase
    .channel(`order-${orderId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "orders",
        filter: `id=eq.${orderId}`,
      },
      callback,
    )
    .subscribe()
}

export const subscribeToChatMessages = (orderId, callback) => {
  return supabase
    .channel(`chat-${orderId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chat_messages",
        filter: `order_id=eq.${orderId}`,
      },
      callback,
    )
    .subscribe()
}

// Generic table subscription function
export const subscribeToTable = (tableName, callback, filter = null) => {
  const channel = supabase.channel(`${tableName}-changes`)

  const subscription = channel.on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: tableName,
      ...(filter && { filter }),
    },
    callback,
  )

  return subscription.subscribe()
}

// Unsubscribe function
export const unsubscribe = (subscription) => {
  if (subscription && typeof subscription.unsubscribe === "function") {
    return subscription.unsubscribe()
  }
  return Promise.resolve()
}

// File upload functions
export const uploadFile = async (bucket, path, file) => {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file)
  return { data, error }
}

export const getFileUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export const deleteFile = async (bucket, path) => {
  const { data, error } = await supabase.storage.from(bucket).remove([path])
  return { data, error }
}

// Database helpers
export const insertRecord = async (table, data) => {
  const { data: result, error } = await supabase.from(table).insert(data).select()
  return { data: result, error }
}

export const updateRecord = async (table, id, data) => {
  const { data: result, error } = await supabase.from(table).update(data).eq("id", id).select()
  return { data: result, error }
}

export const deleteRecord = async (table, id) => {
  const { data, error } = await supabase.from(table).delete().eq("id", id)
  return { data, error }
}

export const fetchRecords = async (table, filters = {}, options = {}) => {
  let query = supabase.from(table).select(options.select || "*")

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      query = query.in(key, value)
    } else {
      query = query.eq(key, value)
    }
  })

  if (options.orderBy) {
    query = query.order(options.orderBy.column, {
      ascending: options.orderBy.ascending !== false,
    })
  }

  if (options.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query
  return { data, error }
}
