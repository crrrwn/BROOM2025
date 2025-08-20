import { createRouter, createWebHistory } from "vue-router"
import { supabase } from "@/lib/supabase"
// Import the admin authentication function
import { isAdminAuthenticated } from "@/lib/admin"
import { isDriverAuthenticated } from "@/lib/driver"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("@/views/auth/LoginPage.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/auth/register",
    name: "Register",
    component: () => import("@/views/auth/RegisterPage.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/auth/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/auth/ForgotPassword.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/auth/reset-password",
    name: "ResetPassword",
    component: () => import("@/views/auth/ResetPassword.vue"),
    // Removed requiresGuest: true here to allow access during password reset flow
  },
  {
    path: "/auth/email-confirmed",
    name: "EmailConfirmed",
    component: () => import("@/views/auth/EmailConfirmed.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/dashboard/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/book-service",
    name: "BookService",
    component: () => import("@/views/dashboard/BookService.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/service/:type",
    name: "ServiceDetails",
    component: () => import("@/views/services/ServiceDetails.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/my-orders",
    name: "MyOrders",
    component: () => import("@/views/dashboard/MyOrders.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/upload-payment",
    name: "UploadPayment",
    component: () => import("@/views/dashboard/UploadPayment.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/dashboard/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/order/:id/tracking",
    name: "OrderTracking",
    component: () => import("@/views/orders/OrderTracking.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/order/:id/chat",
    name: "ChatWithDriver",
    component: () => import("@/views/orders/ChatWithDriver.vue"),
    meta: { requiresAuth: true },
  },
  // Admin routes with layout
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: () => import("@/views/admin/AdminLogin.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/admin",
    component: () => import("@/components/AdminSidebarLayout.vue"),
    meta: { requiresAdmin: true },
    redirect: "/admin/dashboard", // Add redirect to dashboard
    children: [
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: () => import("@/views/admin/AdminDashboard.vue"),
      },
      {
        path: "users",
        name: "AdminUsers",
        component: () => import("@/views/admin/AdminUsers.vue"),
      },
      {
        path: "orders",
        name: "AdminOrders",
        component: () => import("@/views/admin/AdminOrders.vue"),
      },
      {
        path: "services",
        name: "AdminServices",
        component: () => import("@/views/admin/AdminServices.vue"),
      },
      {
        path: "payments",
        name: "AdminPayments",
        component: () => import("@/views/admin/AdminPayments.vue"),
      },
      {
        path: "drivers",
        name: "AdminDrivers",
        component: () => import("@/views/admin/AdminDrivers.vue"),
      },
      {
        path: "driver-applications",
        name: "AdminDriverApplications",
        component: () => import("@/views/admin/AdminDriverApplications.vue"),
      },
      {
        path: "pricing-fraud",
        name: "AdminPricingFraud",
        component: () => import("@/views/admin/AdminPricingFraud.vue"),
      },
      {
        path: "system-settings",
        name: "AdminSystemSettings",
        component: () => import("@/views/admin/AdminSystemSettings.vue"),
      },
    ],
  },
  // Driver routes with layout
  {
    path: "/driver/login",
    name: "DriverLogin",
    component: () => import("@/views/driver/DriverLogin.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/driver/register",
    name: "DriverRegister",
    component: () => import("@/views/driver/DriverRegister.vue"),
    // No meta restrictions - accessible to anyone
  },
  {
    path: "/driver",
    component: () => import("@/components/DriverSidebarLayout.vue"),
    meta: { requiresDriver: true },
    redirect: "/driver/dashboard",
    children: [
      {
        path: "dashboard",
        name: "DriverDashboard",
        component: () => import("@/views/driver/DriverDashboard.vue"),
      },
      {
        path: "available-bookings",
        name: "DriverAvailableBookings",
        component: () => import("@/views/driver/AvailableBookings.vue"),
      },
      {
        path: "my-assignments",
        name: "DriverMyAssignments",
        component: () => import("@/views/driver/MyAssignments.vue"),
      },
      {
        path: "upload-proof",
        name: "DriverUploadProof",
        component: () => import("@/views/driver/UploadProof.vue"),
      },
      {
        path: "profile",
        name: "DriverProfile",
        component: () => import("@/views/driver/DriverProfile.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  console.log("🔄 Navigation guard triggered:", to.path)
  console.log("[v0] Navigation from:", from.path, "to:", to.path)
  console.log("[v0] Route meta:", to.meta)

  // Handle driver registration first - always allow access
  if (to.path === "/driver/register") {
    console.log("✅ Allowing access to driver registration")
    next()
    return
  }

  // Handle admin routes
  if (to.path.startsWith("/admin")) {
    if (to.path === "/admin/login") {
      // Allow access to admin login page
      if (isAdminAuthenticated()) {
        // If already authenticated as admin, redirect to admin dashboard
        console.log("✅ Admin already authenticated, redirecting to dashboard")
        next("/admin/dashboard")
      } else {
        // Allow access to admin login
        console.log("✅ Allowing access to admin login")
        next()
      }
      return
    } else if (to.meta.requiresAdmin || to.path.startsWith("/admin")) {
      // For other admin routes, check admin authentication
      if (!isAdminAuthenticated()) {
        console.log("❌ Admin not authenticated, redirecting to admin login")
        next("/admin/login")
      } else {
        console.log("✅ Admin authenticated, allowing access")
        next()
      }
      return
    }
  }

  // Handle other driver routes (except registration which is handled above)
  if (to.path.startsWith("/driver")) {
    console.log("[v0] Driver route detected:", to.path)
    console.log("[v0] Checking driver authentication...")

    if (to.path === "/driver/login") {
      // Allow access to driver login page
      if (isDriverAuthenticated()) {
        // If already authenticated as driver, redirecting to driver dashboard
        console.log("✅ Driver already authenticated, redirecting to dashboard")
        next("/driver/dashboard")
      } else {
        // Allow access to driver login
        console.log("✅ Allowing access to driver login")
        next()
      }
      return
    } else if (to.meta.requiresDriver || to.path.startsWith("/driver")) {
      // For other driver routes, check driver authentication
      const isAuthenticated = isDriverAuthenticated()
      console.log("[v0] Driver authentication result:", isAuthenticated)

      if (!isAuthenticated) {
        console.log("❌ Driver not authenticated, redirecting to driver login")
        next("/driver/login")
      } else {
        console.log("✅ Driver authenticated, allowing access to:", to.path)
        next()
      }
      return
    }
  }

  // Handle regular user routes
  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("👤 Current user:", user?.email || "Not logged in")

  // Allow access to reset-password page regardless of auth state
  if (to.path === "/auth/reset-password") {
    console.log("✅ Allowing access to reset password page")
    next()
    return
  }

  if (to.meta.requiresAuth && !user) {
    console.log("🚫 Auth required, redirecting to login")
    next("/auth/login")
  } else if (to.meta.requiresGuest && user) {
    console.log("👋 User already logged in, redirecting to dashboard")
    next("/dashboard")
  } else {
    console.log("✅ Navigation allowed")
    next()
  }
})

export default router
