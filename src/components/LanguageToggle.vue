<template>
  <div class="relative">
    <button
      @click="showDropdown = !showDropdown"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
      </svg>
      <span class="text-sm font-medium">{{ currentLanguage.name }}</span>
      <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
      @click.stop
    >
      <div class="py-1">
        <button
          v-for="language in languages"
          :key="language.code"
          @click="changeLanguage(language.code)"
          class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          :class="{ 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400': currentLocale === language.code }"
        >
          <span class="text-lg mr-3">{{ language.flag }}</span>
          <div class="flex-1 text-left">
            <div class="font-medium">{{ language.name }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">{{ language.nativeName }}</div>
          </div>
          <svg
            v-if="currentLocale === language.code"
            class="w-4 h-4 text-blue-600 dark:text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'

export default {
  name: 'LanguageToggle',
  data() {
    return {
      showDropdown: false,
      languages: [
        {
          code: 'en',
          name: 'English',
          nativeName: 'English',
          flag: '🇺🇸'
        },
        {
          code: 'tl',
          name: 'Filipino',
          nativeName: 'Tagalog',
          flag: '🇵🇭'
        }
      ]
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    currentLanguage() {
      return this.languages.find(lang => lang.code === this.currentLocale) || this.languages[0]
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', this.closeDropdown)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown)
  },
  methods: {
    changeLanguage(locale) {
      const toast = useToast()
      if (locale !== this.currentLocale) {
        this.$i18n.locale = locale
        localStorage.setItem('language', locale)
        
        const languageName = this.languages.find(lang => lang.code === locale)?.name || locale
        toast.success(`Language changed to ${languageName}`)
      }
      this.showDropdown = false
    },
    closeDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false
      }
    }
  }
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
