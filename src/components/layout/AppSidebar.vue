<template>
  <div v-if="!isMobile" class="app-sidebar" :class="{ open }">
    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
        @click="$emit('close')"
      >
        <span class="nav-icon" v-html="item.icon"></span>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-divider"></div>
      <div class="sidebar-church">
        <span class="church-icon">✝</span>
        <div class="church-text">
          <span class="church-name">Lord of the Harvest</span>
          <span class="church-sub">Community Church</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile overlay -->
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="isMobile && open"
        class="sidebar-overlay"
        @click="$emit('close')"
      ></div>
    </transition>
    <transition name="slide-right">
      <div v-if="isMobile && open" class="mobile-sidebar">
        <nav class="sidebar-nav">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ active: isActive(item.path) }"
            @click="$emit('close')"
          >
            <span class="nav-icon" v-html="item.icon"></span>
            <span class="nav-label">{{ item.label }}</span>
          </router-link>
        </nav>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{
  open: boolean
}>()

defineEmits<{
  close: []
}>()

const route = useRoute()
const isMobile = ref(false)

const navItems = [
  {
    path: '/home',
    label: 'Home',
    icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2.25 9l6.75-6.75 6.75 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.75 7.5v6.75a.75.75 0 00.75.75h3v-3.75a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3.75h3a.75.75 0 00.75-.75V7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    path: '/songs',
    label: 'Songs',
    icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2.25v9.38a2.62 2.62 0 101.5 2.37" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.25 13.5a1.12 1.12 0 100 2.25 1.12 1.12 0 000-2.25z" stroke="currentColor" stroke-width="1.5"/><path d="M11.63 4.88L6 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    path: '/lineups',
    label: 'Lineups',
    icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2.25" width="12" height="13.5" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M3 6h12M7.5 2.25V6M7.5 9.75h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  },
  {
    path: '/templates',
    label: 'Templates',
    icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2.25" y="2.25" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="10.5" y="2.25" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="2.25" y="10.5" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="10.5" y="10.5" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>',
  },
]

function isActive(path: string): boolean {
  return route.path === path || route.path.startsWith(path + '/')
}

function checkMobile() {
  isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.app-sidebar {
  position: fixed;
  top: var(--header-height);
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background-color: var(--color-surface);
  border-right: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  padding: var(--space-4) 0;
  overflow-y: auto;
  z-index: var(--z-above);
}

@media (min-width: 1024px) {
  .app-sidebar {
    top: 0;
    padding-top: var(--space-8);
  }
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: 0 var(--space-3);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  position: relative;
}

.nav-item:hover {
  background-color: var(--color-surface-sunken);
  color: var(--color-text);
}

.nav-item.active {
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background-color: var(--color-primary);
  border-radius: 0 var(--radius-full) var(--radius-full) 0;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-label {
  white-space: nowrap;
}

.sidebar-footer {
  margin-top: auto;
  padding: 0 var(--space-4);
}

.sidebar-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-border) 20%,
    var(--color-border) 80%,
    transparent
  );
  margin-bottom: var(--space-4);
}

.sidebar-church {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
}

.church-icon {
  font-size: var(--font-size-lg);
  color: var(--color-secondary);
}

.church-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.church-name {
  font-family: var(--font-display);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.church-sub {
  font-family: var(--font-body);
  font-size: var(--font-size-2xs);
  color: var(--color-text-muted);
}

/* ── Mobile Sidebar ── */

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: var(--z-overlay);
  backdrop-filter: blur(2px);
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: var(--color-surface);
  border-right: 1px solid var(--color-border-light);
  z-index: var(--z-overlay);
  padding: var(--space-6) var(--space-3);
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform var(--transition-slow);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-100%);
}
</style>
