<template>
  <header class="app-header">
    <div class="header-left">
      <button
        class="menu-toggle"
        aria-label="Toggle navigation"
        @click="$emit('toggleSidebar')"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </button>
      <router-link to="/home" class="header-brand">
        <span class="brand-icon">✦</span>
        <span class="brand-text">
          <span class="brand-church">LHCC</span>
          <span class="brand-app">Worship</span>
        </span>
      </router-link>
    </div>

    <div class="header-right">
      <button
        v-if="hasRole"
        class="role-badge"
        :class="isLeader ? 'role-leader' : 'role-member'"
        @click="handleRoleClick"
      >
        <span class="role-dot"></span>
        {{ isLeader ? 'Leader' : 'Member' }}
      </button>

      <button
        class="theme-switch"
        :class="{ 'is-dark': isDark }"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="handleThemeSwitch"
      >
        <span class="switch-track">
          <span class="switch-decor switch-clouds" aria-hidden="true">
            <span class="cloud cloud-1">
              <span class="cloud-bump cloud-bump-l"></span>
              <span class="cloud-bump cloud-bump-r"></span>
            </span>
            <span class="cloud cloud-2">
              <span class="cloud-bump cloud-bump-t"></span>
            </span>
          </span>
          <span class="switch-decor switch-stars" aria-hidden="true">
            <span class="star star-1"></span>
            <span class="star star-2"></span>
            <span class="star star-3"></span>
          </span>
          <span class="switch-knob">
            <svg class="knob-icon knob-sun" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="2.5" fill="currentColor" />
              <path d="M7 1.5v1.5M7 11v1.5M1.5 7H3M11 7h1.5M3.3 3.3l1 1M9.7 9.7l1 1M3.3 10.7l1-1M9.7 4.3l1-1" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
            </svg>
            <svg class="knob-icon knob-moon" viewBox="0 0 14 14" fill="none">
              <path d="M11.5 8a4.5 4.5 0 01-5-5 4.5 4.5 0 105 5z" fill="currentColor" />
            </svg>
          </span>
        </span>
      </button>

      <router-link
        v-if="isLeader && unreadCount > 0"
        to="/notifications"
        class="notification-link"
        aria-label="Notifications"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M13.5 6.75a4.5 4.5 0 10-9 0c0 5.25-2.25 6.75-2.25 6.75h13.5s-2.25-1.5-2.25-6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M10.3 15.75a1.5 1.5 0 01-2.6 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="notification-badge">{{ unreadCount }}</span>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useRole } from '@/composables/useRole'
import { useNotificationStore } from '@/stores/notificationStore'

defineEmits<{
  toggleSidebar: []
}>()

const router = useRouter()
const { isDark, toggleTheme } = useTheme()
const { hasRole, isLeader } = useRole()
const notificationStore = useNotificationStore()

const unreadCount = computed(() => notificationStore.unreadCount)

function handleRoleClick() {
  router.push('/')
}

function handleThemeSwitch(e: MouseEvent) {
  toggleTheme({ x: e.clientX, y: e.clientY })
}
</script>

<style scoped>
/* ═══════════════════════════════════════════
   HEADER SHELL
   ═══════════════════════════════════════════ */

.app-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 var(--space-4);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border-light);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

@media (min-width: 768px) {
  .app-header {
    padding: 0 var(--space-8);
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

@media (min-width: 768px) {
  .header-left {
    gap: var(--space-4);
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

@media (min-width: 768px) {
  .header-right {
    gap: var(--space-3);
  }
}

/* ═══════════════════════════════════════════
   MENU TOGGLE
   ═══════════════════════════════════════════ */

.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.menu-toggle:hover {
  background-color: var(--color-surface-sunken);
  color: var(--color-text);
}

@media (min-width: 1024px) {
  .menu-toggle {
    display: none;
  }
}

/* ═══════════════════════════════════════════
   BRAND
   ═══════════════════════════════════════════ */

.header-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.header-brand:hover {
  opacity: 0.8;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

@media (min-width: 768px) {
  .brand-icon {
    width: 36px;
    height: 36px;
    font-size: var(--font-size-base);
  }
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.brand-church {
  font-family: var(--font-display);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  letter-spacing: var(--letter-spacing-wide);
}

.brand-app {
  font-family: var(--font-body);
  font-size: var(--font-size-2xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  letter-spacing: var(--letter-spacing-wider);
  text-transform: uppercase;
}

/* ═══════════════════════════════════════════
   ROLE BADGE
   ═══════════════════════════════════════════ */

.role-badge {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-wide);
  transition: all var(--transition-fast);
}

.role-leader {
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
}

.role-leader:hover {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.role-member {
  background-color: var(--color-secondary-subtle);
  color: var(--color-secondary);
}

.role-member:hover {
  background-color: var(--color-secondary);
  color: var(--color-text-inverse);
}

.role-dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background-color: currentColor;
}

/* ═══════════════════════════════════════════
   SKY & NIGHT — Capsule Theme Switch
   ═══════════════════════════════════════════ */

.theme-switch {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

.theme-switch:focus-visible .switch-track {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.switch-track {
  position: relative;
  width: var(--switch-width);
  height: var(--switch-height);
  border-radius: var(--radius-full);
  background: linear-gradient(180deg, var(--switch-sky-top), var(--switch-sky-bottom));
  overflow: hidden;
  transition: background 400ms ease;
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.06);
}

.theme-switch.is-dark .switch-track {
  background: linear-gradient(180deg, var(--switch-night-top), var(--switch-night-bottom));
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.2),
    0 1px 3px rgba(0, 0, 0, 0.15);
}

/* ── Clouds ── */

.switch-decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.switch-clouds {
  opacity: 1;
  transition: opacity 350ms ease;
}

.theme-switch.is-dark .switch-clouds {
  opacity: 0;
}

.cloud {
  position: absolute;
  background: var(--switch-cloud-color);
  border-radius: var(--radius-full);
}

.cloud-1 {
  width: 14px;
  height: 5px;
  right: 5px;
  top: 8px;
}

.cloud-1 .cloud-bump-l {
  position: absolute;
  width: 6px;
  height: 6px;
  background: inherit;
  border-radius: inherit;
  top: -3px;
  left: 2px;
}

.cloud-1 .cloud-bump-r {
  position: absolute;
  width: 8px;
  height: 7px;
  background: inherit;
  border-radius: inherit;
  top: -4px;
  right: 1px;
}

.cloud-2 {
  width: 10px;
  height: 4px;
  right: 12px;
  top: 17px;
}

.cloud-2 .cloud-bump-t {
  position: absolute;
  width: 5px;
  height: 5px;
  background: inherit;
  border-radius: inherit;
  top: -3px;
  left: 2px;
}

/* ── Stars ── */

.switch-stars {
  opacity: 0;
  transition: opacity 350ms ease 80ms;
}

.theme-switch.is-dark .switch-stars {
  opacity: 1;
}

.star {
  position: absolute;
  background: var(--switch-star-color);
  border-radius: var(--radius-full);
}

.star-1 {
  width: 2px;
  height: 2px;
  left: 8px;
  top: 7px;
  animation: star-twinkle 3s ease-in-out infinite;
}

.star-2 {
  width: 1.5px;
  height: 1.5px;
  left: 16px;
  top: 14px;
  animation: star-twinkle 3s ease-in-out 1s infinite;
}

.star-3 {
  width: 1px;
  height: 1px;
  left: 10px;
  top: 19px;
  animation: star-twinkle 3s ease-in-out 2s infinite;
}

@keyframes star-twinkle {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* ── Knob ── */

.switch-knob {
  position: absolute;
  top: var(--switch-knob-offset);
  left: var(--switch-knob-offset);
  width: var(--switch-knob-size);
  height: var(--switch-knob-size);
  border-radius: var(--radius-full);
  background: linear-gradient(145deg, var(--switch-sun-color), #F0C020);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    left 400ms cubic-bezier(0.34, 1.2, 0.64, 1),
    background 400ms ease,
    box-shadow 400ms ease;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 0 8px var(--switch-sun-glow);
  z-index: 2;
}

.theme-switch.is-dark .switch-knob {
  left: calc(var(--switch-width) - var(--switch-knob-size) - var(--switch-knob-offset));
  background: linear-gradient(145deg, var(--switch-moon-color), #C8C4BE);
  box-shadow:
    0 1px 3px var(--switch-moon-shadow),
    inset 0 -1px 2px rgba(0, 0, 0, 0.06);
}

/* ── Knob Icons ── */

.knob-icon {
  position: absolute;
  width: 14px;
  height: 14px;
  transition:
    opacity 300ms ease,
    transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.knob-sun {
  color: #FFF8E1;
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

.theme-switch.is-dark .knob-sun {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}

.knob-moon {
  color: #3D3A45;
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}

.theme-switch.is-dark .knob-moon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

/* ═══════════════════════════════════════════
   NOTIFICATION LINK
   ═══════════════════════════════════════════ */

.notification-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.notification-link:hover {
  background-color: var(--color-surface-sunken);
  color: var(--color-text);
}

.notification-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-error);
  color: white;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: var(--font-weight-bold);
  border-radius: var(--radius-full);
  line-height: 1;
}
</style>
