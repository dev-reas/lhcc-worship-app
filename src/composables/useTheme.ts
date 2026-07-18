import { computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore'

interface ToggleOrigin {
  x: number
  y: number
}

export function useTheme() {
  const store = useThemeStore()

  const isDark = computed(() => store.isDark)

  function toggleTheme(origin?: ToggleOrigin) {
  if (
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    store.toggleTheme()
    return
  }

  if (origin) {
    const root = document.documentElement
    root.style.setProperty('--vt-origin-x', `${origin.x}px`)
    root.style.setProperty('--vt-origin-y', `${origin.y}px`)
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight)
    root.style.setProperty('--vt-max-radius', `${maxRadius}px`)
  }

  const transition = document.startViewTransition(() => {
    store.toggleTheme()
  })

  transition.finished.finally(() => {
    const root = document.documentElement
    root.style.removeProperty('--vt-origin-x')
    root.style.removeProperty('--vt-origin-y')
    root.style.removeProperty('--vt-max-radius')
  })
  }

  function initializeTheme() {
    store.initializeTheme()
  }

  return {
    isDark,
    toggleTheme,
    initializeTheme,
  }
}
