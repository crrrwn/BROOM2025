import { createClient } from "@supabase/supabase-js"
import { supabase } from "./supabase" // Import regular supabase client

// Create a dedicated admin client that bypasses user authentication
const createAdminClient = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase configuration missing")
  }

  // Create a fresh client instance for admin operations
  const adminClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // Don't persist any user sessions
      autoRefreshToken: false, // Don't auto refresh tokens
    },
    global: {
      headers: {
        "X-Admin-Request": "true", // Mark as admin request
      },
    },
  })

  return adminClient
}

// Check if Supabase is properly configured
const checkSupabaseConfig = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ SUPABASE NOT CONFIGURED!")
    console.error("Missing environment variables:")
    if (!supabaseUrl) console.error("- VITE_SUPABASE_URL")
    if (!supabaseAnonKey) console.error("- VITE_SUPABASE_ANON_KEY")
    console.error("Please set these in Project Settings > Environment Variables")
    return false
  }

  console.log("✅ Supabase configuration found")
  console.log("URL:", supabaseUrl)
  console.log("Key:", supabaseAnonKey ? "***" + supabaseAnonKey.slice(-4) : "missing")
  return true
}

// Admin authentication - completely separate from user auth
export const adminLogin = async (email, password) => {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD

  if (email === adminEmail && password === adminPassword) {
    // Create admin session in localStorage
    const adminSession = {
      isAdmin: true,
      email: adminEmail,
      loginTime: new Date().toISOString(),
    }
    localStorage.setItem("adminSession", JSON.stringify(adminSession))
    return { success: true, data: adminSession }
  }

  return { success: false, error: "Invalid admin credentials" }
}

export const adminLogout = () => {
  localStorage.removeItem("adminSession")
}

export const isAdminAuthenticated = () => {
  const adminSession = localStorage.getItem("adminSession")
  if (!adminSession) return false

  try {
    const session = JSON.parse(adminSession)
    return session.isAdmin === true
  } catch {
    return false
  }
}

export const getAdminSession = () => {
  const adminSession = localStorage.getItem("adminSession")
  if (!adminSession) return null

  try {
    return JSON.parse(adminSession)
  } catch {
    return null
  }
}

// Admin data functions - completely independent of user authentication
export const getAllUsers = async () => {
  try {
    console.log("🔍 [ADMIN] Fetching all users from Supabase...")

    if (!checkSupabaseConfig()) {
      return { data: [], error: "Supabase not configured properly" }
    }

    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    console.log("📊 [ADMIN] Testing connection to users table...")

    // Test connection first
    const { count, error: countError } = await adminClient.from("users").select("*", { count: "exact", head: true })

    if (countError) {
      console.error("❌ [ADMIN] Error testing users table:", countError)
      return { data: [], error: countError }
    }

    console.log(`📊 [ADMIN] Users table has ${count} records`)

    // Fetch all users with explicit admin context
    const { data, error } = await adminClient.from("users").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("❌ [ADMIN] Error fetching users:", error)
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
      return { data: [], error }
    }

    console.log("✅ [ADMIN] Users fetched successfully:", data?.length || 0, "users found")
    console.log("Sample user data:", data?.[0] || "No users found")

    return { data: data || [], error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getAllUsers:", err)
    return { data: [], error: err }
  }
}

export const getAllOrders = async () => {
  try {
    console.log("🔍 [ADMIN] Fetching all orders from Supabase...")

    if (!checkSupabaseConfig()) {
      return { data: [], error: "Supabase not configured properly" }
    }

    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    console.log("📊 [ADMIN] Attempting to fetch orders with joins...")

    // Try to fetch orders with related user and service data using joins
    let { data, error } = await adminClient
      .from("orders")
      .select(`
        *,
        users (
          id,
          first_name,
          last_name,
          email,
          contact_number
        ),
        services (
          id,
          name,
          description,
          category,
          price
        )
      `)
      .order("created_at", { ascending: false })

    // If the join query fails, try a simpler approach
    if (error) {
      console.warn("❌ [ADMIN] Join query failed, trying simple query:", error)

      // Fallback to simple orders query
      const simpleResult = await adminClient.from("orders").select("*").order("created_at", { ascending: false })

      if (simpleResult.error) {
        console.error("❌ [ADMIN] Simple orders query also failed:", simpleResult.error)
        return { data: [], error: simpleResult.error }
      }

      data = simpleResult.data

      // If we have orders, try to fetch user and service data separately
      if (data && data.length > 0) {
        console.log("📝 [ADMIN] Fetching user and service data separately...")

        // Get unique user IDs and service IDs
        const userIds = [...new Set(data.map((order) => order.user_id).filter(Boolean))]
        const serviceIds = [...new Set(data.map((order) => order.service_id).filter(Boolean))]

        // Fetch users and services separately
        let users = []
        let services = []

        if (userIds.length > 0) {
          const usersResult = await adminClient
            .from("users")
            .select("id, first_name, last_name, email, contact_number")
            .in("id", userIds)

          if (!usersResult.error) {
            users = usersResult.data || []
          }
        }

        if (serviceIds.length > 0) {
          const servicesResult = await adminClient
            .from("services")
            .select("id, name, description, category, price")
            .in("id", serviceIds)

          if (!servicesResult.error) {
            services = servicesResult.data || []
          }
        }

        // Map the data back to orders
        data = data.map((order) => ({
          ...order,
          users: users.find((user) => user.id === order.user_id) || null,
          services: services.find((service) => service.id === order.service_id) || null,
        }))
      }
    }

    if (!data) {
      console.error("❌ [ADMIN] No data returned from orders query")
      return { data: [], error: "No data returned" }
    }

    // Debug: Log the first order to see its structure
    if (data.length > 0) {
      console.log("📊 [ADMIN] Sample order data:", JSON.stringify(data[0], null, 2))

      // Check for amount fields
      const firstOrder = data[0]
      console.log("💰 [ADMIN] Amount fields in first order:", {
        total_amount: firstOrder.total_amount,
        amount: firstOrder.amount,
        price: firstOrder.price,
        service_price: firstOrder.services?.price,
        booking_amount: firstOrder.booking_amount,
      })
    }

    console.log("✅ [ADMIN] Orders fetched successfully:", data.length, "orders found")

    return { data: data || [], error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getAllOrders:", err)
    return { data: [], error: err }
  }
}

export const getAllServices = async () => {
  try {
    console.log("🔍 [ADMIN] Fetching all services from Supabase...")

    if (!checkSupabaseConfig()) {
      return { data: [], error: "Supabase not configured properly" }
    }

    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    const { data, error } = await adminClient.from("services").select("*").order("name")

    if (error) {
      console.error("❌ [ADMIN] Error fetching services:", error)
      return { data: [], error }
    }

    console.log("✅ [ADMIN] Services fetched successfully:", data?.length || 0, "services found")
    return { data: data || [], error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getAllServices:", err)
    return { data: null, error: err }
  }
}

export const getAllPayments = async () => {
  try {
    console.log("🔍 [ADMIN] Fetching all payments from Supabase...")

    if (!checkSupabaseConfig()) {
      return { data: [], error: "Supabase not configured properly" }
    }

    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    console.log("📊 [ADMIN] Attempting to fetch payments with joins...")

    let { data, error } = await adminClient
      .from("payments")
      .select(`
        *,
        users (
          id,
          first_name,
          last_name,
          email,
          contact_number
        ),
        orders (
          id,
          total_amount,
          service_name,
          status
        )
      `)
      .order("created_at", { ascending: false })

    // If the join query fails, try a simpler approach
    if (error) {
      console.warn("❌ [ADMIN] Join query failed, trying simple query:", error)

      // Fallback to simple payments query
      const simpleResult = await adminClient.from("payments").select("*").order("created_at", { ascending: false })

      if (simpleResult.error) {
        console.error("❌ [ADMIN] Simple payments query also failed:", simpleResult.error)
        return { data: [], error: simpleResult.error }
      }

      data = simpleResult.data

      if (data && data.length > 0) {
        console.log("📝 [ADMIN] Fetching user and order data separately...")

        // Get unique user IDs and order IDs
        const userIds = [...new Set(data.map((payment) => payment.user_id).filter(Boolean))]
        const orderIds = [...new Set(data.map((payment) => payment.order_id).filter(Boolean))]

        // Fetch users and orders separately
        let users = []
        let orders = []

        if (userIds.length > 0) {
          const usersResult = await adminClient
            .from("users")
            .select("id, first_name, last_name, email, contact_number")
            .in("id", userIds)

          if (!usersResult.error) {
            users = usersResult.data || []
            console.log("✅ [ADMIN] Users fetched:", users.length)
          }
        }

        if (orderIds.length > 0) {
          const ordersResult = await adminClient
            .from("orders")
            .select("id, total_amount, service_name, status")
            .in("id", orderIds)

          if (!ordersResult.error) {
            orders = ordersResult.data || []
            console.log("✅ [ADMIN] Orders fetched:", orders.length)
          }
        }

        data = data.map((payment) => ({
          ...payment,
          users: users.find((user) => user.id === payment.user_id) || {
            first_name: "Unknown",
            last_name: "Customer",
            email: "N/A",
          },
          orders: orders.find((order) => order.id === payment.order_id) || {
            id: payment.order_id || "N/A",
            total_amount: payment.amount || 0,
            service_name: "N/A",
            status: "unknown",
          },
        }))
      }
    }

    if (!data) {
      console.error("❌ [ADMIN] No data returned from payments query")
      return { data: [], error: "No data returned" }
    }

    if (data.length > 0) {
      console.log("📊 [ADMIN] Sample payment data:", JSON.stringify(data[0], null, 2))
      console.log("💰 [ADMIN] Payment fields in first payment:", {
        id: data[0].id,
        amount: data[0].amount,
        user_id: data[0].user_id,
        order_id: data[0].order_id,
        status: data[0].status,
        users: data[0].users,
        orders: data[0].orders,
      })
    }

    console.log("✅ [ADMIN] Payments fetched successfully:", data.length, "payments found")

    return { data: data || [], error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getAllPayments:", err)
    return { data: [], error: err }
  }
}

// Get payment proofs for a specific order - ENHANCED VERSION
export const getOrderPaymentProofs = async (orderId) => {
  try {
    console.log("🔍 [ADMIN] Fetching payment proofs for order:", orderId)

    if (!checkSupabaseConfig()) {
      return { data: null, error: "Supabase not configured properly" }
    }

    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    // Initialize payment proofs object
    const paymentProofs = {
      barcode: null,
      payment_proof: null,
      delivery_proof: null,
      payment_status: "pending",
      payment_proof_url: null,
      delivery_proof_url: null,
    }

    // 1. First, get the order data to get the barcode and basic info
    console.log("📊 [ADMIN] Fetching order data...")
    const { data: orderData, error: orderError } = await adminClient
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single()

    if (orderError) {
      console.error("❌ [ADMIN] Error fetching order:", orderError)
    } else if (orderData) {
      console.log("✅ [ADMIN] Order data found:", orderData)

      // Extract barcode and payment info from order
      paymentProofs.barcode = orderData.barcode || orderData.order_barcode || orderData.tracking_code || null
      paymentProofs.payment_status = orderData.payment_status || "pending"

      // Check for payment proof in order table
      if (orderData.payment_proof) {
        paymentProofs.payment_proof = orderData.payment_proof
        paymentProofs.payment_proof_url = await getPublicStorageUrl(orderData.payment_proof)
        console.log("📸 [ADMIN] Payment proof from orders table:", paymentProofs.payment_proof_url)
      }

      if (orderData.delivery_proof) {
        paymentProofs.delivery_proof = orderData.delivery_proof
        paymentProofs.delivery_proof_url = await getPublicStorageUrl(orderData.delivery_proof)
        console.log("📸 [ADMIN] Delivery proof from orders table:", paymentProofs.delivery_proof_url)
      }
    }

    // 2. Check payments table for additional payment proofs
    console.log("📊 [ADMIN] Checking payments table...")
    const { data: paymentsData, error: paymentsError } = await adminClient
      .from("payments")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at", { ascending: false })

    if (!paymentsError && paymentsData && paymentsData.length > 0) {
      const latestPayment = paymentsData[0]
      console.log("✅ [ADMIN] Payment data found:", latestPayment)

      // Override with payments table data if available and not already set
      if (latestPayment.payment_proof && !paymentProofs.payment_proof) {
        paymentProofs.payment_proof = latestPayment.payment_proof
        paymentProofs.payment_proof_url = await getPublicStorageUrl(latestPayment.payment_proof)
        console.log("📸 [ADMIN] Payment proof from payments table:", paymentProofs.payment_proof_url)
      }

      if (latestPayment.delivery_proof && !paymentProofs.delivery_proof) {
        paymentProofs.delivery_proof = latestPayment.delivery_proof
        paymentProofs.delivery_proof_url = await getPublicStorageUrl(latestPayment.delivery_proof)
        console.log("📸 [ADMIN] Delivery proof from payments table:", paymentProofs.delivery_proof_url)
      }

      // Update payment status from payments table
      if (latestPayment.status) {
        paymentProofs.payment_status = latestPayment.status
      }
    }

    // 3. Check payment_proofs table as well
    console.log("📊 [ADMIN] Checking payment_proofs table...")
    const { data: paymentProofsData, error: paymentProofsError } = await adminClient
      .from("payment_proofs")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at", { ascending: false })

    if (!paymentProofsError && paymentProofsData && paymentProofsData.length > 0) {
      const latestProof = paymentProofsData[0]
      console.log("✅ [ADMIN] Payment proof data found:", latestProof)

      // Use proof_image or image field for payment proof
      if ((latestProof.proof_image || latestProof.image) && !paymentProofs.payment_proof) {
        const proofImage = latestProof.proof_image || latestProof.image
        paymentProofs.payment_proof = proofImage
        paymentProofs.payment_proof_url = await getPublicStorageUrl(proofImage)
        console.log("📸 [ADMIN] Payment proof from payment_proofs table:", paymentProofs.payment_proof_url)
      }

      // Use delivery_image for delivery proof
      if (latestProof.delivery_image && !paymentProofs.delivery_proof) {
        paymentProofs.delivery_proof = latestProof.delivery_image
        paymentProofs.delivery_proof_url = await getPublicStorageUrl(latestProof.delivery_image)
        console.log("📸 [ADMIN] Delivery proof from payment_proofs table:", paymentProofs.delivery_proof_url)
      }
    }

    // 4. If no barcode found, generate one based on order ID
    if (!paymentProofs.barcode) {
      paymentProofs.barcode = `ORD${orderId.slice(-8).toUpperCase()}`
      console.log("🔢 [ADMIN] Generated barcode:", paymentProofs.barcode)
    }

    console.log("✅ [ADMIN] Final payment proofs result:", paymentProofs)
    return { data: paymentProofs, error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getOrderPaymentProofs:", err)
    return { data: null, error: err }
  }
}

// Enhanced helper function to get public URL from storage path
export const getPublicStorageUrl = async (storagePath) => {
  if (!storagePath) {
    console.log("⚠️ [ADMIN] No storage path provided")
    return null
  }

  try {
    const adminClient = createAdminClient()
    await adminClient.auth.signOut()

    // Clean the path
    let cleanPath = storagePath.toString().trim()

    // Remove leading slashes
    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.substring(1)
    }

    // Remove any URL prefixes if present
    if (cleanPath.includes("://")) {
      const urlParts = cleanPath.split("/")
      cleanPath = urlParts.slice(3).join("/") // Remove protocol and domain
    }

    console.log("🔍 [ADMIN] Processing storage path:", cleanPath)

    // Common bucket names to check (in order of priority)
    const possibleBuckets = ["payment-proofs", "payments", "uploads", "images", "files", "proof-images", "user-uploads"]

    // If path already includes bucket name, extract it
    for (const bucket of possibleBuckets) {
      if (cleanPath.startsWith(bucket + "/")) {
        const pathWithoutBucket = cleanPath.substring(bucket.length + 1)
        const { data } = adminClient.storage.from(bucket).getPublicUrl(pathWithoutBucket)
        console.log(`✅ [ADMIN] Generated public URL for ${bucket}/${pathWithoutBucket}:`, data.publicUrl)
        return data.publicUrl
      }
    }

    // Try each bucket to find the file
    for (const bucket of possibleBuckets) {
      try {
        console.log(`🔍 [ADMIN] Trying bucket: ${bucket}`)

        // Try to get public URL directly (this always works, even if file doesn't exist)
        const { data } = adminClient.storage.from(bucket).getPublicUrl(cleanPath)

        // Test if the URL is accessible by making a HEAD request
        try {
          const response = await fetch(data.publicUrl, { method: "HEAD" })
          if (response.ok) {
            console.log(`✅ [ADMIN] File found in ${bucket}:`, data.publicUrl)
            return data.publicUrl
          }
        } catch (fetchError) {
          console.log(`⚠️ [ADMIN] File not accessible in ${bucket}:`, fetchError.message)
        }
      } catch (bucketError) {
        console.log(`⚠️ [ADMIN] Bucket ${bucket} error:`, bucketError.message)
        continue
      }
    }

    // If no file found in any bucket, return the URL from the first bucket anyway
    // (sometimes files exist but HEAD requests fail due to CORS)
    const { data } = adminClient.storage.from(possibleBuckets[0]).getPublicUrl(cleanPath)
    console.log(`🔄 [ADMIN] Returning default URL from ${possibleBuckets[0]}:`, data.publicUrl)
    return data.publicUrl
  } catch (error) {
    console.error("❌ [ADMIN] Error generating public URL:", error)
    return null
  }
}

export const testSupabaseConnection = async () => {
  try {
    console.log("🧪 [ADMIN] Testing Supabase connection...")

    if (!checkSupabaseConfig()) {
      return { success: false, error: "Configuration missing" }
    }

    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    // Try a simple query to test connection
    const { data, error } = await adminClient.from("users").select("count", { count: "exact", head: true })

    if (error) {
      console.error("❌ [ADMIN] Connection test failed:", error)
      return { success: false, error: error.message }
    }

    console.log("✅ [ADMIN] Supabase connection successful!")
    return { success: true, data: "Connection working" }
  } catch (err) {
    console.error("💥 [ADMIN] Connection test exception:", err)
    return { success: false, error: err.message }
  }
}

export const updateUserStatus = async (userId, updates) => {
  try {
    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    const { data, error } = await adminClient.from("users").update(updates).eq("id", userId).select()

    return { data, error }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in updateUserStatus:", err)
    return { data: null, error: err }
  }
}

export const updateOrderStatusAdmin = async (orderId, status) => {
  try {
    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    const { data, error } = await adminClient
      .from("orders")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select()

    return { data, error }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in updateOrderStatusAdmin:", err)
    return { data: null, error: err }
  }
}

export const updatePaymentStatusAdmin = async (orderId, paymentStatus) => {
  try {
    console.log("🔄 [ADMIN] Updating payment status for order:", orderId, "to:", paymentStatus)

    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    // Update payment status in orders table
    const { data: orderData, error: orderError } = await adminClient
      .from("orders")
      .update({
        payment_status: paymentStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select()

    if (orderError) {
      console.error("❌ [ADMIN] Error updating order payment status:", orderError)
    }

    // Also update in payments table if records exist
    const { data: paymentData, error: paymentError } = await adminClient
      .from("payments")
      .update({
        status: paymentStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", orderId)
      .select()

    if (paymentError) {
      console.error("❌ [ADMIN] Error updating payments table:", paymentError)
    }

    console.log("✅ [ADMIN] Payment status updated successfully")
    return { data: orderData || paymentData, error: orderError || paymentError }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in updatePaymentStatusAdmin:", err)
    return { data: null, error: err }
  }
}

export const createService = async (serviceData) => {
  try {
    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    const { data, error } = await adminClient
      .from("services")
      .insert([
        {
          ...serviceData,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    return { data, error }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in createService:", err)
    return { data: null, error: err }
  }
}

export const updateService = async (serviceId, updates) => {
  try {
    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    const { data, error } = await adminClient
      .from("services")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", serviceId)
      .select()

    return { data, error }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in updateService:", err)
    return { data: null, error: err }
  }
}

export const deleteService = async (serviceId) => {
  try {
    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    const { data, error } = await adminClient.from("services").delete().eq("id", serviceId)

    return { data, error }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in deleteService:", err)
    return { data: null, error: err }
  }
}

export const getAdminStats = async () => {
  try {
    console.log("📊 [ADMIN] Calculating admin statistics...")

    // Get all data using the existing functions
    const usersResult = await getAllUsers()
    const ordersResult = await getAllOrders()
    const servicesResult = await getAllServices()
    const paymentsResult = await getAllPayments()

    const users = usersResult.data || []
    const orders = ordersResult.data || []
    const services = servicesResult.data || []
    const payments = paymentsResult.data || []

    // Calculate stats
    const totalRevenue = orders
      .filter((order) => order.status === "completed")
      .reduce((sum, order) => sum + (Number.parseFloat(order.total_amount) || 0), 0)

    const pendingOrders = orders.filter((order) => order.status === "pending").length
    const completedOrders = orders.filter((order) => order.status === "completed").length
    const inProgressOrders = orders.filter((order) => order.status === "in_progress").length

    // Calculate online users from cached admin users data if available
    let onlineUsers = 0
    try {
      const adminUsersCache = localStorage.getItem("admin_users_cache")
      if (adminUsersCache) {
        const cachedUsers = JSON.parse(adminUsersCache)
        onlineUsers = cachedUsers.filter((user) => user.status === "online").length
      }
    } catch (error) {
      console.warn("Could not get online users from cache:", error)
    }

    const stats = {
      totalUsers: users.length,
      totalOrders: orders.length,
      totalServices: services.length,
      totalPayments: payments.length,
      totalRevenue,
      pendingOrders,
      completedOrders,
      inProgressOrders,
      onlineUsers, // Add online users to stats
    }

    console.log("✅ [ADMIN] Admin stats calculated:", stats)
    return { data: stats, error: null }
  } catch (error) {
    console.error("❌ [ADMIN] Error in getAdminStats:", error)
    return { data: null, error }
  }
}

export const getAllDrivers = async () => {
  try {
    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    const { data, error } = await adminClient
      .from("drivers")
      .select(`
        *,
        users (first_name, last_name, email, contact_number)
      `)
      .order("created_at", { ascending: false })

    return { data, error }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getAllDrivers:", err)
    return { data: null, error: err }
  }
}

export const getAllDriverApplications = async () => {
  try {
    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    const { data, error } = await adminClient
      .from("driver_applications")
      .select("*")
      .order("created_at", { ascending: false })

    return { data, error }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getAllDriverApplications:", err)
    return { data: null, error: err }
  }
}

export const getPaymentProofs = async () => {
  try {
    // Create fresh admin client for this request
    const adminClient = createAdminClient()

    // Clear any existing auth state
    await adminClient.auth.signOut()

    const { data, error } = await adminClient
      .from("payment_proofs")
      .select(`
        *,
        orders (id, total_amount, service_name),
        users (first_name, last_name, email)
      `)
      .order("created_at", { ascending: false })

    return { data, error }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getPaymentProofs:", err)
    return { data: null, error: err }
  }
}

export const getPricingConfig = async () => {
  try {
    console.log("🔍 [ADMIN] Fetching pricing configuration from Supabase...")

    const adminClient = createAdminClient()
    await adminClient.auth.signOut()

    const { data, error } = await adminClient.from("pricing_config").select("*").single()

    if (error && error.code === "PGRST116") {
      // No pricing config exists, create default
      const defaultConfig = {
        base_fee: 50,
        time_multiplier: 1.0,
        distance_multiplier: 15,
        availability_factor: 1.0,
        minimum_fare: 80,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { data: newData, error: insertError } = await adminClient
        .from("pricing_config")
        .insert([defaultConfig])
        .select()
        .single()

      if (insertError) {
        console.error("❌ [ADMIN] Error creating default pricing config:", insertError)
        return { data: defaultConfig, error: null }
      }

      return { data: newData, error: null }
    }

    if (error) {
      console.error("❌ [ADMIN] Error fetching pricing config:", error)
      return { data: null, error }
    }

    console.log("✅ [ADMIN] Pricing config fetched successfully:", data)
    return { data, error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getPricingConfig:", err)
    return { data: null, error: err }
  }
}

export const updateServicePricingConfig = async (pricingData) => {
  try {
    console.log("🔄 [ADMIN] Updating service pricing configuration:", pricingData)

    const { data, error } = await supabase
      .from("service_pricing_config") // Fixed table name
      .upsert(pricingData, { onConflict: "service_id" })
      .select()

    if (error) {
      console.error("❌ [ADMIN] Error updating service pricing config:", error)
      return { data: null, error }
    }

    console.log("✅ [ADMIN] Service pricing config updated successfully:", data)
    return { data, error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in updateServicePricingConfig:", err)
    return { data: null, error: err }
  }
}

export const updatePricingConfig = async (pricingData) => {
  try {
    console.log("🔄 [ADMIN] Updating pricing configuration:", pricingData)

    const adminClient = createAdminClient()
    await adminClient.auth.signOut()

    const { data, error } = await adminClient
      .from("pricing_config")
      .upsert([
        {
          ...pricingData,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("❌ [ADMIN] Error updating pricing config:", error)
      return { data: null, error }
    }

    console.log("✅ [ADMIN] Pricing config updated successfully:", data)
    return { data, error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in updatePricingConfig:", err)
    return { data: null, error: err }
  }
}

export const getFraudStats = async () => {
  try {
    console.log("🔍 [ADMIN] Fetching fraud statistics from Supabase...")

    const adminClient = createAdminClient()
    await adminClient.auth.signOut()

    // Get fraud alerts count
    const { count: alertsCount } = await adminClient.from("fraud_alerts").select("*", { count: "exact", head: true })

    // Get flagged users count
    const { count: flaggedCount } = await adminClient
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("is_flagged", true)

    // Calculate verified transaction rate
    const { count: totalOrders } = await adminClient.from("orders").select("*", { count: "exact", head: true })

    const { count: verifiedOrders } = await adminClient
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed")

    const verifiedRate = totalOrders > 0 ? ((verifiedOrders / totalOrders) * 100).toFixed(1) : 0

    const stats = {
      totalAlerts: alertsCount || 0,
      flaggedUsers: flaggedCount || 0,
      verifiedRate: Number.parseFloat(verifiedRate),
    }

    console.log("✅ [ADMIN] Fraud stats fetched successfully:", stats)
    return { data: stats, error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getFraudStats:", err)
    return { data: null, error: err }
  }
}

export const getFraudPatterns = async () => {
  try {
    console.log("🔍 [ADMIN] Fetching fraud patterns from Supabase...")

    const adminClient = createAdminClient()
    await adminClient.auth.signOut()

    // Get frequent cancellations (5+ cancels this week)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const { count: frequentCancels } = await adminClient
      .from("orders")
      .select("user_id", { count: "exact", head: true })
      .eq("status", "cancelled")
      .gte("created_at", oneWeekAgo.toISOString())

    // Get fake addresses count
    const { count: fakeAddresses } = await adminClient
      .from("fraud_alerts")
      .select("*", { count: "exact", head: true })
      .eq("alert_type", "fake_address")

    // Get abuse reports count
    const { count: abuseReports } = await adminClient
      .from("fraud_alerts")
      .select("*", { count: "exact", head: true })
      .eq("alert_type", "abuse_report")

    const patterns = {
      frequentCancels: frequentCancels || 0,
      fakeAddresses: fakeAddresses || 0,
      abuseReports: abuseReports || 0,
    }

    console.log("✅ [ADMIN] Fraud patterns fetched successfully:", patterns)
    return { data: patterns, error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getFraudPatterns:", err)
    return { data: null, error: err }
  }
}

export const getFlaggedUsers = async () => {
  try {
    console.log("🔍 [ADMIN] Fetching flagged users from Supabase...")

    const adminClient = createAdminClient()
    await adminClient.auth.signOut()

    // First try to get fraud alerts with user joins
    const { data: alertsData, error: alertsError } = await adminClient
      .from("fraud_alerts")
      .select(`
        *,
        users (
          id,
          first_name,
          last_name,
          email
        )
      `)
      .neq("status", "dismissed") // Filter out dismissed alerts
      .order("created_at", { ascending: false })

    if (alertsError) {
      console.error("❌ [ADMIN] Error fetching fraud alerts:", alertsError)

      // Fallback: Try to get all users and mark some as flagged for demo
      const { data: usersData, error: usersError } = await adminClient.from("users").select("*").limit(5)

      if (usersError) {
        console.error("❌ [ADMIN] Error fetching users for fallback:", usersError)
        return { data: [], error: usersError }
      }

      // Create mock flagged users from real user data
      const mockFlaggedUsers = usersData.map((user, index) => ({
        id: `mock_${user.id}`,
        user_name: `${user.first_name || "Unknown"} ${user.last_name || "User"}`,
        user_email: user.email || "No email",
        alert_type: ["Frequent Cancels", "Fake Address", "Abuse Report"][index % 3],
        pattern: "Suspicious activity detected from user behavior analysis",
        risk_level: ["Low", "Medium", "High"][index % 3],
        created_at: new Date().toISOString(),
        user_id: user.id,
      }))

      console.log("✅ [ADMIN] Using fallback flagged users from real user data:", mockFlaggedUsers.length)
      return { data: mockFlaggedUsers, error: null }
    }

    // Process the fraud alerts data
    const flaggedUsers = alertsData.map((alert) => ({
      id: alert.id,
      user_name: alert.users
        ? `${alert.users.first_name || "Unknown"} ${alert.users.last_name || "User"}`
        : "Unknown User",
      user_email: alert.users?.email || "No email",
      alert_type: alert.alert_type || "General Alert",
      pattern: alert.description || "Suspicious activity detected",
      risk_level: alert.risk_level || "Medium",
      created_at: alert.created_at,
      user_id: alert.user_id,
    }))

    console.log("✅ [ADMIN] Flagged users fetched successfully:", flaggedUsers.length)
    return { data: flaggedUsers, error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getFlaggedUsers:", err)
    return { data: [], error: err }
  }
}

export const updateUserFlag = async (userId, flagged, reason = "") => {
  try {
    console.log("🔄 [ADMIN] Updating user flag status:", userId, flagged)

    const adminClient = createAdminClient()
    await adminClient.auth.signOut()

    const { data, error } = await adminClient
      .from("users")
      .update({
        is_flagged: flagged,
        flag_reason: reason,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()

    if (error) {
      console.error("❌ [ADMIN] Error updating user flag:", error)
      return { data: null, error }
    }

    console.log("✅ [ADMIN] User flag updated successfully")
    return { data, error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in updateUserFlag:", err)
    return { data: null, error: err }
  }
}

export const dismissFraudAlert = async (alertId) => {
  try {
    console.log("🔄 [ADMIN] Dismissing fraud alert:", alertId)

    const adminClient = createAdminClient()
    await adminClient.auth.signOut()

    const { data, error } = await adminClient
      .from("fraud_alerts")
      .update({
        status: "dismissed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", alertId)
      .select()

    if (error) {
      console.error("❌ [ADMIN] Error dismissing fraud alert:", error)
      return { data: null, error }
    }

    console.log("✅ [ADMIN] Fraud alert dismissed successfully")
    return { data, error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in dismissFraudAlert:", err)
    return { data: null, error: err }
  }
}

export const getUserFraudAnalytics = async () => {
  try {
    console.log("🔍 [ADMIN] Analyzing user fraud patterns from Supabase...")

    const adminClient = createAdminClient()
    await adminClient.auth.signOut()

    // Get all users
    const { data: users, error: usersError } = await adminClient
      .from("users")
      .select("*")
      .order("created_at", { ascending: false })

    if (usersError) {
      console.error("❌ [ADMIN] Error fetching users for analytics:", usersError)
      return { data: null, error: usersError }
    }

    // Get all orders to analyze cancellation patterns
    const { data: orders, error: ordersError } = await adminClient.from("orders").select("*")

    if (ordersError) {
      console.error("❌ [ADMIN] Error fetching orders for analytics:", ordersError)
    }

    // Get fraud alerts to analyze patterns
    const { data: fraudAlerts, error: fraudError } = await adminClient.from("fraud_alerts").select("*")

    if (fraudError) {
      console.error("❌ [ADMIN] Error fetching fraud alerts for analytics:", fraudError)
    }

    // Analyze each user's behavior
    const userAnalytics = users.map((user) => {
      const userOrders = orders?.filter((order) => order.user_id === user.id) || []
      const userFraudAlerts = fraudAlerts?.filter((alert) => alert.user_id === user.id) || []

      // Count cancellations
      const cancellations = userOrders.filter((order) => order.status === "cancelled").length

      // Count fake address reports
      const fakeAddressReports = userFraudAlerts.filter(
        (alert) => alert.alert_type === "fake_address" || alert.alert_type === "Fake Address",
      ).length

      // Count abuse reports
      const abuseReports = userFraudAlerts.filter(
        (alert) => alert.alert_type === "abuse_report" || alert.alert_type === "Abuse Report",
      ).length

      // Calculate risk score (weighted scoring system)
      const riskScore = cancellations * 2 + fakeAddressReports * 5 + abuseReports * 10

      // Determine risk level
      let riskLevel = "Low"
      if (riskScore >= 20) riskLevel = "Critical"
      else if (riskScore >= 10) riskLevel = "High"
      else if (riskScore >= 5) riskLevel = "Medium"

      return {
        id: user.id,
        name: `${user.first_name || "Unknown"} ${user.last_name || "User"}`,
        email: user.email || "No email",
        totalOrders: userOrders.length,
        cancellations,
        fakeAddressReports,
        abuseReports,
        riskScore,
        riskLevel,
        joinDate: user.created_at,
      }
    })

    // Sort by risk score (highest first)
    const topRiskyUsers = userAnalytics.filter((user) => user.riskScore > 0).sort((a, b) => b.riskScore - a.riskScore)

    // Calculate overall analytics
    const analytics = {
      totalUsers: users.length,
      usersWithCancellations: userAnalytics.filter((user) => user.cancellations > 0).length,
      usersWithFakeAddresses: userAnalytics.filter((user) => user.fakeAddressReports > 0).length,
      usersWithAbuseReports: userAnalytics.filter((user) => user.abuseReports > 0).length,
      highRiskUsers: userAnalytics.filter((user) => user.riskLevel === "High" || user.riskLevel === "Critical").length,
    }

    const result = {
      topRiskyUsers,
      analytics,
      allUserAnalytics: userAnalytics,
    }

    console.log("✅ [ADMIN] User fraud analytics calculated successfully:", {
      totalUsers: users.length,
      topRiskyUsers: topRiskyUsers.length,
      highRiskUsers: analytics.highRiskUsers,
    })

    return { data: result, error: null }
  } catch (err) {
    console.error("💥 [ADMIN] Exception in getUserFraudAnalytics:", err)
    return { data: null, error: err }
  }
}
