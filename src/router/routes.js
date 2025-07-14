import { createRouter, createWebHistory } from "vue-router"
import { supabase } from "@/lib/supabase"

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Allow access to reset-password page regardless of auth state,
  // as the page itself handles session validation for reset tokens.
  if (to.path === "/auth/reset-password") {
    next()
    return
  }

  if (to.meta.requiresAuth && !user) {
    next("/auth/login")
  } else if (to.meta.requiresGuest && user) {
    next("/dashboard")
  } else {
    next()
  }
})

export default router
