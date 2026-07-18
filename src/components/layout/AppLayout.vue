<template>
  <div class="app-layout" :class="{ 'has-sidebar': !isMobile }">
    <AppHeader
      class="layout-header"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
    />
    <AppSidebar
      :open="sidebarOpen"
      @close="sidebarOpen = false"
    />
    <main class="app-main" :class="{ 'sidebar-open': sidebarOpen && !isMobile }">
      <div class="app-content">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
    <MobileNav v-if="isMobile" />
    <NotificationToast />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import MobileNav from './MobileNav.vue'
import NotificationToast from '@/components/notifications/NotificationToast.vue'

const sidebarOpen = ref(false)
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < 1024
  if (!isMobile.value) sidebarOpen.value = false
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
.app-layout {
  display: grid;
  grid-template-rows: var(--header-height) 1fr;
  grid-template-columns: 1fr;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: var(--color-bg);
  position: relative;
}

.app-layout.has-sidebar {
  grid-template-columns: 1fr;
}

/* ── Mobile: header spans full width ── */

.layout-header {
  grid-column: 1;
  grid-row: 1;
}

/* ── Desktop: header only in main content area, sidebar full height ── */

@media (min-width: 1024px) {
  .app-layout.has-sidebar {
    grid-template-columns: var(--sidebar-width) 1fr;
  }

  .layout-header {
    grid-column: 2;
    grid-row: 1;
  }
}

.app-main {
  grid-column: 1;
  grid-row: 2;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: var(--space-8);
}

@media (min-width: 1024px) {
  .app-main {
    grid-column: 2;
    padding-bottom: 0;
  }
}

.app-content {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
}

@media (min-width: 768px) {
  .app-content {
    padding: var(--space-8) var(--space-8);
  }
}

@media (min-width: 1024px) {
  .app-content {
    padding: var(--space-8) var(--space-10);
  }
}
</style>
