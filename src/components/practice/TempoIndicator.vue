<template>
  <div class="tempo-indicator">
    <div
      class="tempo-indicator__pulse"
      :class="{ 'tempo-indicator__pulse--active': isPlaying }"
      :style="pulseStyle"
    />
    <span class="tempo-indicator__bpm">{{ bpm }}</span>
    <span class="tempo-indicator__unit">BPM</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  bpm: number
  isPlaying: boolean
}>()

const pulseStyle = computed(() => ({
  animationDuration: props.isPlaying ? `${60 / props.bpm}s` : '0s',
}))
</script>

<style scoped>
.tempo-indicator {
  position: fixed;
  bottom: 6.5rem;
  right: 1.25rem;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  padding: 0.5rem 0.85rem;
  background: rgba(14, 16, 20, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(62, 66, 74, 0.4);
  border-radius: 0.75rem;
  z-index: 200;
  user-select: none;
}

@media (min-width: 768px) {
  .tempo-indicator {
    bottom: 7rem;
    right: 2rem;
  }
}

.tempo-indicator__pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6B6560;
  flex-shrink: 0;
  margin-right: 0.35rem;
  align-self: center;
  transition: background 200ms ease;
}

.tempo-indicator__pulse--active {
  background: #D4B06A;
  animation: beat-pulse 1s ease-in-out infinite;
}

@keyframes beat-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(212, 176, 106, 0.4);
  }
  50% {
    transform: scale(1.4);
    opacity: 0.8;
    box-shadow: 0 0 8px 2px rgba(212, 176, 106, 0.3);
  }
}

.tempo-indicator__bpm {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: #E8E4DE;
  line-height: 1;
}

.tempo-indicator__unit {
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6B6560;
}
</style>
