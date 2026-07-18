<template>
  <nav class="mobile-nav">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="mobile-nav-item"
      :class="{ active: isActive(item.path) }"
    >
      <span class="mobile-nav-icon" v-html="item.icon"></span>
      <span class="mobile-nav-label">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  {
    path: '/home',
    label: 'Home',
    icon: '<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><path d="M2.25 9l6.75-6.75 6.75 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.75 7.5v6.75a.75.75 0 00.75.75h3v-3.75a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3.75h3a.75.75 0 00.75-.75V7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    path: '/songs',
    label: 'Songs',
    icon: '<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><path d="M9 2.25v9.38a2.62 2.62 0 101.5 2.37" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.25 13.5a1.12 1.12 0 100 2.25 1.12 1.12 0 000-2.25z" stroke="currentColor" stroke-width="1.5"/><path d="M11.63 4.88L6 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    path: '/lineups',
    label: 'Lineups',
    icon: '<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><rect x="3" y="2.25" width="12" height="13.5" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M3 6h12M7.5 2.25V6M7.5 9.75h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    path: '/templates',
    label: 'Templates',
    icon: '<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><rect x="2.25" y="2.25" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="10.5" y="2.25" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="2.25" y="10.5" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="10.5" y="10.5" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>',
  },
]

function isActive(path: string): boolean {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  display: flex;
  align-items: stretch;
  height: var(--mobile-nav-height);
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border-light);
  padding: var(--space-1) var(--space-2);
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.mobile-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: var(--space-1);
  border-radius: var(--radius-lg);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: all var(--transition-fast);
  -webkit-tap-highlight-color: transparent;
}

.mobile-nav-item.active {
  color: var(--color-primary);
}

.mobile-nav-item.active .mobile-nav-icon {
  background-color: var(--color-primary-subtle);
  border-radius: var(--radius-full);
}

.mobile-nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 28px;
  transition: background-color var(--transition-fast);
}

.mobile-nav-label {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-wide);
}
</style>
