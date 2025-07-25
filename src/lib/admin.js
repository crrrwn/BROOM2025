import { supabase } from "./supabase"

// Admin authentication
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

// Admin data functions
export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })
  return { data, error }
}

export const getAllOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      users (first_name, last_name, email, contact_number),
      services (name, category)
    `)
    .order("created_at", { ascending: false })
  return { data, error }
}

export const getAllServices = async () => {
  const { data, error } = await supabase.from("services").select("*").order("name")
  return { data, error }
}

export const getAllPayments = async () => {
  const { data, error } = await supabase
    .from("payments")
    .select(`
      *,
      orders (id, total_amount),
      users (first_name, last_name, email)
    `)
    .order("created_at", { ascending: false })
  return { data, error }
}

export const updateUserStatus = async (userId, updates) => {
  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select()
  return { data, error }
}

export const updateOrderStatusAdmin = async (orderId, status) => {
  const { data, error } = await supabase
    .from("orders")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select()
  return { data, error }
}

export const createService = async (serviceData) => {
  const { data, error } = await supabase
    .from("services")
    .insert([
      {
        ...serviceData,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
  return { data, error }
}

export const updateService = async (serviceId, updates) => {
  const { data, error } = await supabase
    .from("services")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", serviceId)
    .select()
  return { data, error }
}

export const deleteService = async (serviceId) => {
  const { data, error } = await supabase.from("services").delete().eq("id", serviceId)
  return { data, error }
}

export const getAdminStats = async () => {
  try {
    // Get total users
    const { data: users, error: usersError } = await supabase.from("users").select("id", { count: "exact" })

    // Get total orders
    const { data: orders, error: ordersError } = await supabase.from("orders").select("id, status", { count: "exact" })

    // Get total services
    const { data: services, error: servicesError } = await supabase.from("services").select("id", { count: "exact" })

    // Get total revenue
    const { data: payments, error: paymentsError } = await supabase
      .from("payments")
      .select("amount")
      .eq("status", "completed")

    if (usersError || ordersError || servicesError || paymentsError) {
      throw new Error("Error fetching admin stats")
    }

    const totalRevenue = payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0
    const pendingOrders = orders?.filter((order) => order.status === "pending").length || 0
    const completedOrders = orders?.filter((order) => order.status === "completed").length || 0

    return {
      data: {
        totalUsers: users?.length || 0,
        totalOrders: orders?.length || 0,
        totalServices: services?.length || 0,
        totalRevenue,
        pendingOrders,
        completedOrders,
      },
      error: null,
    }
  } catch (error) {
    return { data: null, error }
  }
}
