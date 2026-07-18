<template>
  <span v-if="count > 0" class="notification-badge" :class="{ 'notification-badge--pulse': count > 0 }">
    {{ displayCount }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  count: number
}>()

const displayCount = computed(() => (props.count > 99 ? '99+' : String(props.count)))
</script>

<style scoped>
.notification-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background-color: var(--color-error);
  color: #fff;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: var(--font-weight-bold);
  line-height: 1;
  border-radius: var(--radius-full);
  pointer-events: none;
  user-select: none;
}

.notification-badge--pulse {
  animation: badge-pulse 2s ease-in-out infinite;
}

@keyframes badge-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(179, 58, 58, 0.4);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(179, 58, 58, 0);
  }
}
</style>
