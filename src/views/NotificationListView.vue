<template>
  <div class="notification-list-view">
    <header class="view-header">
      <div class="header-text">
        <h1 class="view-title">Notifications</h1>
        <p class="view-subtitle">Transpose requests from your team</p>
      </div>
      <button
        v-if="sortedNotifications.length > 0 && unreadCount > 0"
        class="mark-all-btn"
        @click="handleMarkAllRead"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9,11 12,14 22,4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
        Mark All Read
      </button>
    </header>

    <div v-if="loading" class="notification-loading">
      <LoadingSpinner size="lg" />
    </div>

    <div v-else-if="sortedNotifications.length === 0" class="notification-empty">
      <EmptyState
        icon="🔔"
        message="No transpose notifications yet. When team members request key changes, they'll appear here."
      />
    </div>

    <div v-else class="notification-list">
      <TransitionGroup name="list" tag="div" class="notification-items">
        <div
          v-for="notification in sortedNotifications"
          :key="notification.id"
          class="notification-card paper-surface"
          :class="{ 'notification-card--unread': !notification.read }"
        >
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>

          <div class="card-body">
            <div class="card-top">
              <h3 class="card-song-title">{{ songTitles[notification.songId] ?? 'Loading...' }}</h3>
              <span v-if="!notification.read" class="unread-dot" aria-label="Unread"></span>
            </div>

            <div class="card-transpose">
              <span class="key-badge key-badge--from">{{ notification.fromKey }}</span>
              <svg class="transpose-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
              <span class="key-badge key-badge--to">{{ notification.toKey }}</span>
            </div>

            <div class="card-footer">
              <span class="card-time">{{ relativeTime(notification.timestamp) }}</span>
              <div class="card-actions">
                <button
                  v-if="!notification.read"
                  class="action-btn"
                  title="Mark as read"
                  @click="handleMarkRead(notification.id)"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9,11 12,14 22,4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                </button>
                <button
                  class="action-btn action-btn--delete"
                  title="Delete notification"
                  @click="handleDelete(notification.id)"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'
import { useSongStore } from '@/stores/songStore'
import { relativeTime } from '@/utils/date'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import type { Notification } from '@/types/entities/notification'

const notificationStore = useNotificationStore()
const songStore = useSongStore()

const { sortedNotifications, unreadCount, loading } = notificationStore

const songTitles = reactive<Record<string, string>>({})

async function resolveSongTitles(notifications: Notification[]) {
  for (const n of notifications) {
    if (!songTitles[n.songId]) {
      const song = await songStore.getById(n.songId)
      songTitles[n.songId] = song?.title ?? 'Unknown Song'
    }
  }
}

function handleMarkAllRead() {
  notificationStore.markAllAsRead()
}

function handleMarkRead(id: string) {
  notificationStore.markAsRead(id)
}

function handleDelete(id: string) {
  notificationStore.deleteNotification(id)
}

onMounted(async () => {
  await notificationStore.fetchNotifications()
  await resolveSongTitles(notificationStore.sortedNotifications)
})
</script>

<style scoped>
.notification-list-view {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
  animation: fade-up 0.5s ease-out;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Header ── */

.view-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-8);
}

.view-title {
  font-family: var(--font-display);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-1);
}

.view-subtitle {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.mark-all-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-inverse);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 2px 8px rgba(45, 74, 62, 0.2);
  white-space: nowrap;
}

.mark-all-btn:hover {
  box-shadow: 0 4px 16px rgba(45, 74, 62, 0.3);
  transform: translateY(-1px);
  filter: brightness(1.08);
}

.mark-all-btn:active {
  transform: translateY(0);
  box-shadow: var(--shadow-xs);
}

/* ── Loading / Empty ── */

.notification-loading {
  display: flex;
  justify-content: center;
  padding: var(--space-16) 0;
}

.notification-empty {
  padding: var(--space-8) 0;
}

/* ── Notification List ── */

.notification-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* ── Notification Card ── */

.notification-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-6);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.notification-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(184, 146, 74, 0.02) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.notification-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md), var(--shadow-glow);
  transform: translateY(-1px);
}

.notification-card:active {
  transform: translateY(0);
}

.notification-card--unread {
  border-left: 3px solid var(--color-secondary);
}

.notification-card--unread::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(184, 146, 74, 0.04) 0%,
    transparent 50%
  );
  pointer-events: none;
}

/* ── Card Icon ── */

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: linear-gradient(145deg, var(--color-primary), var(--color-primary-light));
  color: var(--color-text-inverse);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(45, 74, 62, 0.15);
}

/* ── Card Body ── */

.card-body {
  flex: 1;
  min-width: 0;
}

.card-top {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.card-song-title {
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unread-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-secondary);
  flex-shrink: 0;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.8);
  }
}

/* ── Transpose Display ── */

.card-transpose {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.key-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  padding: var(--space-1) var(--space-2);
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-md);
  letter-spacing: var(--letter-spacing-wide);
}

.key-badge--from {
  background-color: var(--color-surface-sunken);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border-light);
}

.key-badge--to {
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
  border: 1px solid transparent;
}

.transpose-arrow {
  color: var(--color-secondary);
  flex-shrink: 0;
}

/* ── Card Footer ── */

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-time {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.card-actions {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.notification-card:hover .card-actions {
  opacity: 1;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
}

.action-btn--delete:hover {
  background-color: rgba(179, 58, 58, 0.1);
  color: var(--color-error);
}

/* ── List Transitions ── */

.list-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.list-move {
  transition: transform 0.3s ease;
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .notification-list-view {
    padding: var(--space-6) var(--space-4);
  }

  .view-header {
    flex-direction: column;
    gap: var(--space-4);
  }

  .view-title {
    font-size: var(--font-size-3xl);
  }

  .mark-all-btn {
    width: 100%;
    justify-content: center;
  }

  .notification-card {
    padding: var(--space-4);
    gap: var(--space-3);
  }

  .card-actions {
    opacity: 1;
  }
}
</style>
