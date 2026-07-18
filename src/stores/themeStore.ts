import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const THEME_KEY = 'lhcc-theme'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  }

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  function setTheme(dark: boolean) {
    isDark.value = dark
  }

  function initializeTheme() {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored !== null) {
      isDark.value = stored === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  watch(isDark, () => {
    localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light')
    applyTheme()
  })

  return {
    isDark,
    toggleTheme,
    setTheme,
    initializeTheme,
  }
})
