<template>
  <div ref="containerEl" class="practice-scroll-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const containerEl = ref<HTMLDivElement | null>(null)

function getContainer(): HTMLDivElement | null {
  return containerEl.value
}

defineExpose({ getContainer })
</script>

<style scoped>
.practice-scroll-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding: 4.5rem 2rem 8rem;
}

@media (min-width: 768px) {
  .practice-scroll-container {
    padding: 5rem 4rem 9rem;
  }
}

@media (min-width: 1024px) {
  .practice-scroll-container {
    padding: 5.5rem 6rem 9rem;
  }
}
</style>
