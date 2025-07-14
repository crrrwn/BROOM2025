import { createApp } from "vue"
import { createI18n } from "vue-i18n"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import App from "./App.vue"
import router from "./router/routes.js"
import "./style.css"

// Import translation files
const messages = {
  en: {
    nav: {
      home: "Home",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      profile: "Profile",
      logout: "Logout",
    },
    sidebar: {
      dashboard: "Dashboard",
      bookService: "Book Service",
      myOrders: "My Orders",
      uploadPayment: "Upload Payment",
      profile: "Profile",
    },
    home: {
      hero: {
        title1: "Fast & Reliable",
        title2: "Delivery Service",
        subtitle:
          "Get anything delivered quickly and safely in Calapan City. From food to groceries, bills to medicines - we deliver it all!",
        getStarted: "Get Started",
        signIn: "Sign In",
      },
      features: {
        title: "Why Choose QuickServe?",
        subtitle: "We provide the best delivery experience with cutting-edge technology",
        fast: {
          title: "Lightning Fast",
          description: "Average delivery time of 30-45 minutes",
        },
        tracking: {
          title: "Real-time Tracking",
          description: "Track your order live on the map",
        },
        services: {
          title: "Multiple Services",
          description: "Food, groceries, bills, and more",
        },
        secure: {
          title: "Secure Payments",
          description: "Multiple payment options available",
        },
        support: {
          title: "24/7 Support",
          description: "Always here to help you",
        },
        ai: {
          title: "AI Assistant",
          description: "Smart chatbot for instant help",
        },
      },
      services: {
        title: "Our Services",
        subtitle: "Everything you need, delivered to your doorstep",
        food: {
          title: "Food Delivery",
          description: "Hot meals from your favorite restaurants",
        },
        bills: {
          title: "Bill Payments",
          description: "Pay utilities and other bills easily",
        },
        pickup: {
          title: "Pick-up & Drop",
          description: "Send and receive packages anywhere",
        },
        grocery: {
          title: "Grocery Shopping",
          description: "Fresh groceries delivered daily",
        },
        medicine: {
          title: "Medicine Delivery",
          description: "Prescription medicines delivered safely",
        },
        gift: {
          title: "Gift Delivery",
          description: "Surprise your loved ones",
        },
      },
      cta: {
        title: "Ready to get started?",
        subtitle: "Join thousands of satisfied customers.",
        button: "Sign Up Now",
      },
      footer: {
        description: "QuickServe is Calapan City's premier delivery service, connecting you with everything you need.",
        services: "Services",
        support: "Support",
        help: "Help Center",
        contact: "Contact Us",
        faq: "FAQ",
        privacy: "Privacy Policy",
        rights: "All rights reserved.",
      },
    },
    auth: {
      loginSuccess: "Login successful!",
      logoutSuccess: "Logged out successfully",
      registerSuccess: "Registration successful! Please verify your email.",
      otpSent: "OTP sent to your email",
      otpVerified: "Email verified successfully!",
      passwordReset: "Password reset link sent to your email",
    },
    errors: {
      loadUserData: "Failed to load user data",
      logout: "Failed to logout",
      invalidCredentials: "Invalid email or password",
      emailExists: "Email already exists",
      invalidOTP: "Invalid or expired OTP",
      networkError: "Network error. Please try again.",
    },
  },
  tl: {
    nav: {
      home: "Tahanan",
      login: "Mag-login",
      register: "Mag-rehistro",
      dashboard: "Dashboard",
      profile: "Profile",
      logout: "Mag-logout",
    },
    sidebar: {
      dashboard: "Dashboard",
      bookService: "Mag-book ng Serbisyo",
      myOrders: "Mga Order Ko",
      uploadPayment: "I-upload ang Bayad",
      profile: "Profile",
    },
    home: {
      hero: {
        title1: "Mabilis at Maaasahan",
        title2: "Serbisyong Delivery",
        subtitle:
          "Makakuha ng kahit ano na mabilis at ligtas sa Calapan City. Mula sa pagkain hanggang grocery, bills hanggang gamot - ideliver namin lahat!",
        getStarted: "Magsimula",
        signIn: "Mag-sign In",
      },
      features: {
        title: "Bakit Piliin ang QuickServe?",
        subtitle: "Nagbibigay kami ng pinakamahusay na delivery experience gamit ang makabagong teknolohiya",
        fast: {
          title: "Napakabilis",
          description: "Average na oras ng delivery: 30-45 minuto",
        },
        tracking: {
          title: "Real-time Tracking",
          description: "I-track ang inyong order live sa mapa",
        },
        services: {
          title: "Maraming Serbisyo",
          description: "Pagkain, grocery, bills, at marami pa",
        },
        secure: {
          title: "Secure na Bayad",
          description: "Maraming paraan ng pagbabayad",
        },
        support: {
          title: "24/7 Support",
          description: "Laging handang tumulong sa inyo",
        },
        ai: {
          title: "AI Assistant",
          description: "Matalinong chatbot para sa instant na tulong",
        },
      },
      services: {
        title: "Aming mga Serbisyo",
        subtitle: "Lahat ng kailangan ninyo, ideliver sa inyong pintuan",
        food: {
          title: "Food Delivery",
          description: "Mainit na pagkain mula sa mga paboritong restaurant",
        },
        bills: {
          title: "Bayad ng Bills",
          description: "Magbayad ng utilities at iba pang bills nang madali",
        },
        pickup: {
          title: "Pick-up & Drop",
          description: "Magpadala at tumanggap ng packages kahit saan",
        },
        grocery: {
          title: "Grocery Shopping",
          description: "Sariwang grocery na ideliver araw-araw",
        },
        medicine: {
          title: "Medicine Delivery",
          description: "Prescription medicines na ideliver nang ligtas",
        },
        gift: {
          title: "Gift Delivery",
          description: "Sorpresahin ang mga mahal ninyo sa buhay",
        },
      },
      cta: {
        title: "Handa na bang magsimula?",
        subtitle: "Sumali sa libu-libong satisfied customers.",
        button: "Mag-sign Up Ngayon",
      },
      footer: {
        description:
          "Ang QuickServe ay pangunahing delivery service ng Calapan City, nag-uugnay sa inyo sa lahat ng kailangan ninyo.",
        services: "Mga Serbisyo",
        support: "Suporta",
        help: "Help Center",
        contact: "Makipag-ugnayan",
        faq: "FAQ",
        privacy: "Privacy Policy",
        rights: "Lahat ng karapatan ay nakalaan.",
      },
    },
    auth: {
      loginSuccess: "Matagumpay na nag-login!",
      logoutSuccess: "Matagumpay na nag-logout",
      registerSuccess: "Matagumpay na nag-register! Pakiverify ang inyong email.",
      otpSent: "OTP na-send sa inyong email",
      otpVerified: "Email na-verify na!",
      passwordReset: "Password reset link na-send sa inyong email",
    },
    errors: {
      loadUserData: "Hindi ma-load ang user data",
      logout: "Hindi ma-logout",
      invalidCredentials: "Mali ang email o password",
      emailExists: "Existing na ang email",
      invalidOTP: "Mali o expired na ang OTP",
      networkError: "Network error. Subukan ulit.",
    },
  },
}

// Create i18n instance
const i18n = createI18n({
  locale: localStorage.getItem("language") || "en",
  fallbackLocale: "en",
  messages,
})

// Toast configuration
const toastOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
}

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(Toast, toastOptions)

app.mount("#app")
