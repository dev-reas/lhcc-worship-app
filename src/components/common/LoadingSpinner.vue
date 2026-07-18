<template>
  <div class="spinner-wrapper" role="status" aria-label="Loading">
    <span class="spinner" :class="`spinner--${size}`"></span>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
  },
)
</script>

<style scoped>
.spinner-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  display: block;
  border-radius: var(--radius-full);
  border-style: solid;
  border-color: var(--color-primary-subtle);
  border-top-color: var(--color-primary);
  animation: spin 0.8s linear infinite;
}

.spinner--sm {
  width: 16px;
  height: 16px;
  border-width: 2px;
}

.spinner--md {
  width: 28px;
  height: 28px;
  border-width: 3px;
}

.spinner--lg {
  width: 40px;
  height: 40px;
  border-width: 4px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
