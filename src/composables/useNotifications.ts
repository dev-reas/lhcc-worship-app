import { ref, onUnmounted } from 'vue'
import type { Notification } from '@/types/entities/notification'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration: number
  notification?: Notification
}

const toasts = ref<Toast[]>([])
let toastCounter = 0

export function useNotifications() {
  function addToast(
    message: string,
    type: Toast['type'] = 'info',
    duration = 5000,
    notification?: Notification,
  ): string {
    const id = `toast-${++toastCounter}`
    const toast: Toast = { id, message, type, duration, notification }
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id)
      }, duration)
    }

    return id
  }

  function dismissToast(id: string) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function clearAll() {
    toasts.value = []
  }

  onUnmounted(() => {
    clearAll()
  })

  return {
    toasts,
    addToast,
    dismissToast,
    clearAll,
  }
}
