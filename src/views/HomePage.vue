<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 border-b-4 border-[#74E600]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <div class="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-xl flex items-center justify-center shadow-lg">
                <span class="text-white font-bold text-xs sm:text-sm">BS</span>
              </div>
              <span class="ml-2 sm:ml-3 text-base sm:text-xl font-bold text-[#3ED400] dark:bg-gradient-to-r dark:from-[#74E600] dark:to-[#3ED400] dark:bg-clip-text dark:text-transparent">BROOOM SERVICES</span>
            </div>
          </div>

          <div class="hidden md:flex items-center space-x-4 lg:space-x-8">
            <a href="#features" class="text-gray-700 dark:text-gray-300 hover:text-[#3ED400] dark:hover:text-[#74E600] transition-colors font-medium text-sm lg:text-base">Features</a>
            <a href="#services" class="text-gray-700 dark:text-gray-300 hover:text-[#3ED400] dark:hover:text-[#74E600] transition-colors font-medium text-sm lg:text-base">Services</a>
            <a href="#about" class="text-gray-700 dark:text-gray-300 hover:text-[#3ED400] dark:hover:text-[#74E600] transition-colors font-medium text-sm lg:text-base">About</a>
            <a href="#contact" class="text-gray-700 dark:text-gray-300 hover:text-[#3ED400] dark:hover:text-[#74E600] transition-colors font-medium text-sm lg:text-base">Contact</a>
          </div>

          <div class="flex items-center space-x-2 sm:space-x-4">
            <button @click="handleToggleDarkMode" class="p-1.5 sm:p-2 text-gray-400 hover:text-[#3ED400] dark:hover:text-[#74E600] transition-colors cursor-pointer">
              <svg v-if="!isDarkMode" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
              <svg v-else class="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </button>

            <div class="hidden sm:flex items-center space-x-2 lg:space-x-4">
              <button @click="handleGoToLogin" class="text-gray-700 dark:text-gray-300 hover:text-[#3ED400] dark:hover:text-[#74E600] transition-colors font-medium text-xs sm:text-sm lg:text-base cursor-pointer">
                Login
              </button>
              <button @click="handleGoToRegister" class="bg-gradient-to-r from-[#74E600] to-[#3ED400] text-white px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:from-[#3ED400] hover:to-[#00C851] transition-all duration-300 shadow-lg font-semibold text-xs sm:text-sm lg:text-base cursor-pointer">
                Get Started
              </button>
            </div>

            <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-1.5 sm:p-2 text-gray-400 hover:text-[#3ED400]">
              <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a href="#features" @click="mobileMenuOpen = false" class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-[#3ED400] dark:hover:text-[#74E600] font-medium text-base">Features</a>
          <a href="#services" @click="mobileMenuOpen = false" class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-[#3ED400] dark:hover:text-[#74E600] font-medium text-base">Services</a>
          <a href="#about" @click="mobileMenuOpen = false" class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-[#3ED400] dark:hover:text-[#74E600] font-medium text-base">About</a>
          <a href="#contact" @click="mobileMenuOpen = false" class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-[#3ED400] dark:hover:text-[#74E600] font-medium text-base">Contact</a>
          
          <!-- Mobile auth buttons -->
          <div class="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <button @click="handleGoToLogin" class="block mx-3 text-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-[#3ED400] font-medium w-full cursor-pointer">
              Login
            </button>
            <button @click="handleGoToRegister" class="block mx-3 bg-gradient-to-r from-[#74E600] to-[#3ED400] text-white px-4 py-2 rounded-lg text-center font-semibold w-full cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-[#A8EB12] via-[#74E600] to-[#3ED400] py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5 sm:opacity-10">
        <div class="absolute top-4 left-4 sm:top-10 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white rounded-full"></div>
        <div class="absolute top-16 right-8 sm:top-32 sm:right-20 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full"></div>
        <div class="absolute bottom-12 left-1/4 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-white rounded-full"></div>
        <div class="absolute bottom-16 right-1/3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <!-- Business Hours Badge -->
          <div class="inline-flex items-center bg-white/90 backdrop-blur-sm text-[#3ED400] px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 md:mb-8 shadow-lg border border-white/50">
            <svg class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1.5 sm:mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            OPEN DAILY 8AM-10PM
          </div>
          
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-lg px-2">
            Fast & Reliable
            <span class="block text-white drop-shadow-2xl">Delivery Service</span>
          </h1>
          <p class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/95 mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-medium px-4 drop-shadow-md">
            Get your food, groceries, medicines, and more delivered to your doorstep in Calapan City. 
            Quick, safe, and affordable delivery service you can trust.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-4 max-w-lg sm:max-w-none mx-auto">
            <button @click="handleGoToRegister" class="bg-white text-[#3ED400] px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl transform hover:scale-105 cursor-pointer">
              Start Ordering Now
            </button>
            <a href="#services" class="border-2 sm:border-3 border-white text-white px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-bold hover:bg-white hover:text-[#3ED400] transition-all duration-300 shadow-xl transform hover:scale-105">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6 px-4">
            Why Choose <span class="text-[#3ED400] dark:bg-gradient-to-r dark:from-[#74E600] dark:to-[#3ED400] dark:bg-clip-text dark:text-transparent">BROOOM SERVICES</span>?
          </h2>
          <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-4">
            We provide the best delivery experience with cutting-edge technology and reliable service.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div class="text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#A8EBI2]/20">
            <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Lightning Fast</h3>
            <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">Average delivery time of 30-45 minutes within Calapan City</p>
          </div>

          <div class="text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#A8EBI2]/20">
            <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Safe & Secure</h3>
            <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">Your orders are handled with care and delivered safely</p>
          </div>

          <div class="text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#A8EBI2]/20">
            <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Real-time Tracking</h3>
            <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">Track your order in real-time from pickup to delivery</p>
          </div>

          <div class="text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#A8EBI2]/20">
            <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Affordable Rates</h3>
            <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">Competitive pricing with transparent fees</p>
          </div>

          <div class="text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#A8EBI2]/20">
            <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">24/7 Support</h3>
            <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">Round-the-clock customer support via chat and phone</p>
          </div>

          <div class="text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#A8EBI2]/20">
            <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Easy to Use</h3>
            <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">Simple and intuitive mobile-friendly interface</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#A8EBI2]/10 to-[#74E600]/10 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6 px-4">
            Our <span class="text-[#3ED400] dark:bg-gradient-to-r dark:from-[#74E600] dark:to-[#3ED400] dark:bg-clip-text dark:text-transparent">Services</span>
          </h2>
          <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-4">
            We deliver everything you need, when you need it.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div class="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-[#74E600]">
            <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Food Delivery</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg">Order from your favorite restaurants and get hot, fresh meals delivered to your door.</p>
            <ul class="text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#74E600] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Fast food chains</li>
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#74E600] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Local restaurants</li>
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#74E600] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Specialty cuisines</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-[#3ED400]">
            <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Bill Payments</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg">Pay your utility bills, internet, and other services without leaving your home.</p>
            <ul class="text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#3ED400] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Electricity bills</li>
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#3ED400] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Water bills</li>
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#3ED400] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Internet & cable</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-[#00C851]">
            <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Pickup & Drop</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg">Need something picked up or delivered? We'll handle it for you quickly and safely.</p>
            <ul class="text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00C851] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Document delivery</li>
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00C851] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Package pickup</li>
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00C851] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Personal items</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-[#74E600]">
            <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Grocery Shopping</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg">Get fresh groceries and household essentials delivered from local stores.</p>
            <ul class="text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#74E600] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Fresh produce</li>
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#74E600] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Household items</li>
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#74E600] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Personal care</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-[#3ED400]">
            <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Medicine Delivery</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg">Get your prescriptions and over-the-counter medicines delivered safely.</p>
            <ul class="text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#3ED400] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Prescription drugs</li>
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#3ED400] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>OTC medicines</li>
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#3ED400] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Health supplements</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-[#00C851]">
            <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Gift Delivery</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg">Send gifts and surprises to your loved ones with our special delivery service.</p>
            <ul class="text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00C851] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Birthday gifts</li>
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00C851] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Flowers & cakes</li>
              <li class="flex items-center"><span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00C851] rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>Special occasions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6 px-4">
            About <span class="text-[#3ED400] dark:bg-gradient-to-r dark:from-[#74E600] dark:to-[#3ED400] dark:bg-clip-text dark:text-transparent">BROOOM SERVICES</span>
          </h2>
          <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-4">
            Your trusted delivery partner in Calapan City, Oriental Mindoro
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div class="order-2 lg:order-1">
            <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8">Our Story</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
              Founded on February 7, 2020, BROOOM SERVICES started with a simple mission: to make life easier for the people of Calapan City by providing fast, reliable, and affordable delivery services. We understand the challenges of busy schedules and the need for convenient solutions.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">
              What began as a small local delivery service has grown into a comprehensive platform that connects customers with restaurants, stores, and service providers throughout Oriental Mindoro. We're proud to be part of the community we serve.
            </p>
            <div class="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div class="text-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-[#A8EBI2]/20 to-[#74E600]/20 rounded-xl sm:rounded-2xl">
                <div class="text-2xl sm:text-3xl md:text-4xl font-black text-[#3ED400] dark:bg-gradient-to-r dark:from-[#74E600] dark:to-[#3ED400] dark:bg-clip-text dark:text-transparent mb-1 sm:mb-2 md:mb-3">500+</div>
                <div class="text-gray-600 dark:text-gray-300 font-semibold text-xs sm:text-sm md:text-base">Happy Customers</div>
              </div>
              <div class="text-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-[#74E600]/20 to-[#3ED400]/20 rounded-xl sm:rounded-2xl">
                <div class="text-2xl sm:text-3xl md:text-4xl font-black text-[#3ED400] dark:bg-gradient-to-r dark:from-[#3ED400] dark:to-[#00C851] dark:bg-clip-text dark:text-transparent mb-1 sm:mb-2 md:mb-3">50+</div>
                <div class="text-gray-600 dark:text-gray-300 font-semibold text-xs sm:text-sm md:text-base">Partner Stores</div>
              </div>
            </div>
          </div>

          <div class="order-1 lg:order-2 bg-gradient-to-br from-[#A8EBI2]/10 via-[#74E600]/10 to-[#3ED400]/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-[#74E600]/20">
            <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8">Our Mission</h3>
            <div class="space-y-3 sm:space-y-4 md:space-y-6">
              <div class="flex items-start">
                <div class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-full flex items-center justify-center mr-3 sm:mr-4 md:mr-6 mt-0.5 sm:mt-1 shadow-lg flex-shrink-0">
                  <svg class="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Fast & Reliable</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">Delivering your orders quickly and safely, every time.</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-full flex items-center justify-center mr-3 sm:mr-4 md:mr-6 mt-0.5 sm:mt-1 shadow-lg flex-shrink-0">
                  <svg class="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Community First</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">Supporting local businesses and serving our community.</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-full flex items-center justify-center mr-3 sm:mr-4 md:mr-6 mt-0.5 sm:mt-1 shadow-lg flex-shrink-0">
                  <svg class="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Innovation</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">Using technology to make delivery services better and more accessible.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Coverage Area Section -->
        <div class="mt-16 sm:mt-20 md:mt-24">
          <div class="text-center mb-8 sm:mb-12 md:mb-16">
            <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6">Our Coverage Area</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg px-4">We proudly serve the entire Calapan City and surrounding areas</p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div class="text-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#74E600]/20">
              <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg">
                <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h4 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">City Center</h4>
              <p class="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">Downtown Calapan, Government offices, Shopping centers</p>
            </div>

            <div class="text-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#3ED400]/20">
              <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg">
                <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h4 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Residential Areas</h4>
              <p class="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">All barangays within Calapan City limits</p>
            </div>

            <div class="text-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#00C851]/20 sm:col-span-2 lg:col-span-1">
              <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg">
                <svg class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </div>
              <h4 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">Nearby Towns</h4>
              <p class="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">Selected areas in neighboring municipalities</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-[#74E600] via-[#3ED400] to-[#00C851] relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5 sm:opacity-10">
        <div class="absolute top-4 left-4 sm:top-10 sm:left-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white rounded-full"></div>
        <div class="absolute top-16 right-8 sm:top-32 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-white rounded-full"></div>
        <div class="absolute bottom-12 left-1/4 w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-white rounded-full"></div>
        <div class="absolute bottom-16 right-1/3 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white rounded-full"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 md:mb-6">
          Ready to Get Started?
        </h2>
        <p class="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
          Join thousands of satisfied customers in Calapan City who trust BROOOM SERVICES for their delivery needs.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-4 max-w-lg sm:max-w-none mx-auto">
          <button @click="handleGoToRegister" class="bg-white text-[#3ED400] px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl transform hover:scale-105 cursor-pointer">
            Sign Up Now
          </button>
          <a href="#contact" class="border-2 sm:border-3 border-white text-white px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-bold hover:bg-white hover:text-[#3ED400] transition-all duration-300 shadow-xl transform hover:scale-105">
            Contact Us
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer id="contact" class="bg-gray-900 text-white py-12 sm:py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          <div class="col-span-1 sm:col-span-2">
            <div class="flex items-center mb-3 sm:mb-4 md:mb-6">
              <div class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <span class="text-white font-bold text-xs sm:text-xs md:text-sm">BS</span>
              </div>
              <span class="ml-2 sm:ml-2 md:ml-3 text-base sm:text-lg md:text-2xl font-bold text-[#74E600] dark:bg-gradient-to-r dark:from-[#74E600] dark:to-[#3ED400] dark:bg-clip-text dark:text-transparent">BROOOM SERVICES</span>
            </div>
            <p class="text-[#74E600] font-bold mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base md:text-lg">OPEN DAILY 8AM-10PM</p>
            <p class="text-gray-300 mb-3 sm:mb-4 md:mb-6 max-w-md text-sm sm:text-base md:text-lg leading-relaxed">
              Your trusted delivery partner in Calapan City. Fast, reliable, and affordable delivery services for all your needs.
            </p>
            <div class="flex space-x-3 sm:space-x-4 md:space-x-6">
              <a href="https://www.facebook.com/Brooomdeliveryservices" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-[#74E600] transition-colors transform hover:scale-110">
                <svg class="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-6 text-[#74E600]">Quick Links</h3>
            <ul class="space-y-1.5 sm:space-y-2 md:space-y-3">
              <li><a href="#features" class="text-gray-300 hover:text-[#74E600] transition-colors text-sm sm:text-base md:text-lg">Features</a></li>
              <li><a href="#services" class="text-gray-300 hover:text-[#74E600] transition-colors text-sm sm:text-base md:text-lg">Services</a></li>
              <li><a href="#about" class="text-gray-300 hover:text-[#74E600] transition-colors text-sm sm:text-base md:text-lg">About</a></li>
              <li><button @click="handleGoToRegister" class="text-gray-300 hover:text-[#74E600] transition-colors text-sm sm:text-base md:text-lg cursor-pointer">Sign Up</button></li>
              <li><button @click="handleGoToLogin" class="text-gray-300 hover:text-[#74E600] transition-colors text-sm sm:text-base md:text-lg cursor-pointer">Login</button></li>
            </ul>
          </div>

          <div>
            <h3 class="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-6 text-[#74E600]">Contact Info</h3>
            <ul class="space-y-2 sm:space-y-3 md:space-y-4 text-gray-300">
              <li class="flex items-center">
                <div class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-md sm:rounded-lg flex items-center justify-center mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                  <svg class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <span class="text-sm sm:text-base md:text-lg">+63 917 123 4567</span>
              </li>
              <li class="flex items-center">
                <div class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#3ED400] to-[#00C851] rounded-md sm:rounded-lg flex items-center justify-center mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                  <svg class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span class="text-sm sm:text-base md:text-lg">support@broomservices.ph</span>
              </li>
              <li class="flex items-start">
                <div class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#74E600] to-[#3ED400] rounded-md sm:rounded-lg flex items-center justify-center mr-2 sm:mr-3 md:mr-4 mt-0.5 sm:mt-1 flex-shrink-0">
                  <svg class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <span class="text-sm sm:text-base md:text-lg">Calapan City, Oriental Mindoro, Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 sm:mt-12 md:mt-16 pt-4 sm:pt-6 md:pt-8 text-center">
          <p class="text-gray-400 text-sm sm:text-base md:text-lg">
            © 2020 BROOOM SERVICES. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      mobileMenuOpen: false,
      isDarkMode: false
    }
  },
  mounted() {
    // Check for saved dark mode preference or default to light mode
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme === 'true') {
      this.isDarkMode = true
      document.documentElement.classList.add('dark')
    } else {
      this.isDarkMode = false
      document.documentElement.classList.remove('dark')
    }
  },
  methods: {
    handleGoToLogin() {
      console.log('Going to login page')
      this.mobileMenuOpen = false
      this.$router.push('/auth/login')
    },
    handleGoToRegister() {
      console.log('Going to register page')
      this.mobileMenuOpen = false
      this.$router.push('/auth/register')
    },
    handleToggleDarkMode() {
      console.log('Toggling dark mode')
      this.isDarkMode = !this.isDarkMode
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkMode', 'true')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkMode', 'false')
      }
    }
  }
}
</script>
