import { createRouter, createWebHistory } from "vue-router"
import { supabase } from "@/lib/supabase"
// Import the admin authentication function
import { isAdminAuthenticated } from "@/lib/admin"

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  console.log("🔄 Navigation guard triggered:", to.path)

  // Handle admin routes first
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
