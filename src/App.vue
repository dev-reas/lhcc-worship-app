<template>
  <div class="app grain-overlay">
    <AppLayout v-if="hasRole && !isPracticeRoute" />
    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useRole } from '@/composables/useRole'
import { useTheme } from '@/composables/useTheme'
import { useSongStore } from '@/stores/songStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { seedData } from '@/seedData'

const route = useRoute()
const { hasRole, initializeRole } = useRole()
const { initializeTheme } = useTheme()
const songStore = useSongStore()
const notificationStore = useNotificationStore()

const isPracticeRoute = computed(() => route.name === 'practice')

onMounted(() => {
  initializeTheme()
  initializeRole()
  songStore.seedSongs(seedData as any)
  notificationStore.fetchNotifications()
})
</script>

<style>
/* Global styles imported via main.ts */
</style>
