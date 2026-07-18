import { ref, watch, onUnmounted } from 'vue'

export function useDebounce<T>(value: () => T, delay = 300) {
  const debouncedValue = ref<T>(value()) as { value: T }
  let timeout: ReturnType<typeof setTimeout>

  watch(
    value,
    (newVal) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        debouncedValue.value = newVal
      }, delay)
    },
    { immediate: true },
  )

  onUnmounted(() => {
    clearTimeout(timeout)
  })

  return debouncedValue
}
