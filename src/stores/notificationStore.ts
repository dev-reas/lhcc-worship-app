import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Notification } from '@/types/entities/notification'
import type { CreateNotificationDto } from '@/types/dto/exportDto'
import { generateId } from '@/utils/id'

const STORAGE_KEY = 'lhcc-notifications'

function loadNotifications(): Notification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveNotifications(notifications: Notification[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>(loadNotifications())
  const loading = ref(false)

  const unreadCount = computed(() => {
    return notifications.value.filter((n) => !n.read).length
  })

  const sortedNotifications = computed(() => {
    return [...notifications.value].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
  })

  async function fetchNotifications() {
    loading.value = true
    try {
      notifications.value = loadNotifications()
    } finally {
      loading.value = false
    }
  }

  async function addNotification(dto: CreateNotificationDto): Promise<Notification> {
    const notification: Notification = {
      id: generateId(),
      songId: dto.songId,
      fromKey: dto.fromKey,
      toKey: dto.toKey,
      timestamp: new Date().toISOString(),
      read: false,
    }
    notifications.value.push(notification)
    saveNotifications(notifications.value)
    return notification
  }

  async function markAsRead(id: string): Promise<void> {
    const idx = notifications.value.findIndex((n) => n.id === id)
    if (idx !== -1) {
      notifications.value[idx] = { ...notifications.value[idx], read: true }
      saveNotifications(notifications.value)
    }
  }

  async function markAllAsRead(): Promise<void> {
    notifications.value = notifications.value.map((n) => ({ ...n, read: true }))
    saveNotifications(notifications.value)
  }

  async function deleteNotification(id: string): Promise<void> {
    notifications.value = notifications.value.filter((n) => n.id !== id)
    saveNotifications(notifications.value)
  }

  async function getUnread(): Promise<Notification[]> {
    return notifications.value.filter((n) => !n.read)
  }

  async function deleteOlderThan(dateStr: string): Promise<void> {
    const cutoff = new Date(dateStr).getTime()
    notifications.value = notifications.value.filter(
      (n) => new Date(n.timestamp).getTime() >= cutoff,
    )
    saveNotifications(notifications.value)
  }

  return {
    notifications,
    loading,
    unreadCount,
    sortedNotifications,
    fetchNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnread,
    deleteOlderThan,
  }
})
