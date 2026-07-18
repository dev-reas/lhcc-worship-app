<template>
  <div class="practice-controls">
    <div class="practice-controls__inner">
      <button
        class="practice-controls__btn practice-controls__btn--secondary"
        title="Rewind"
        @click="$emit('rewind')"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="1,4 1,10 7,10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      </button>

      <button
        class="practice-controls__btn practice-controls__btn--play"
        :title="isPlaying ? 'Pause' : 'Play'"
        @click="isPlaying ? $emit('pause') : $emit('play')"
      >
        <svg v-if="!isPlaying" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="6,3 20,12 6,21" />
        </svg>
        <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <rect x="5" y="3" width="5" height="18" rx="1" />
          <rect x="14" y="3" width="5" height="18" rx="1" />
        </svg>
      </button>

      <button
        class="practice-controls__btn practice-controls__btn--secondary"
        title="Forward"
        @click="$emit('forward')"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23,4 23,10 17,10" />
          <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10" />
        </svg>
      </button>

      <div class="practice-controls__divider" />

      <div class="practice-controls__bpm">
        <button
          class="practice-controls__bpm-btn"
          title="Decrease tempo"
          @click="$emit('bpm-change', bpm - 1)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <span class="practice-controls__bpm-value">{{ bpm }}</span>

        <button
          class="practice-controls__bpm-btn"
          title="Increase tempo"
          @click="$emit('bpm-change', bpm + 1)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isPlaying: boolean
  bpm: number
}>()

defineEmits<{
  play: []
  pause: []
  rewind: []
  forward: []
  'bpm-change': [value: number]
}>()
</script>

<style scoped>
.practice-controls {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 300;
  padding: 0.75rem 1.25rem calc(0.75rem + env(safe-area-inset-bottom, 0px));
  background: rgba(14, 16, 20, 0.75);
  backdrop-filter: blur(20px) saturate(1.2);
  -webkit-backdrop-filter: blur(20px) saturate(1.2);
  border-top: 1px solid rgba(62, 66, 74, 0.3);
}

@media (min-width: 768px) {
  .practice-controls {
    padding: 0.85rem 2.5rem calc(0.85rem + env(safe-area-inset-bottom, 0px));
  }
}

.practice-controls__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  max-width: 480px;
  margin: 0 auto;
}

.practice-controls__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 180ms ease;
  -webkit-tap-highlight-color: transparent;
  color: #A8A098;
  border-radius: 50%;
}

.practice-controls__btn:hover {
  color: #E8E4DE;
}

.practice-controls__btn:active {
  transform: scale(0.92);
}

.practice-controls__btn--secondary {
  width: 44px;
  height: 44px;
}

.practice-controls__btn--play {
  width: 60px;
  height: 60px;
  background: rgba(123, 166, 114, 0.2);
  border: 2px solid rgba(123, 166, 114, 0.4);
  color: #7BA672;
}

.practice-controls__btn--play:hover {
  background: rgba(123, 166, 114, 0.3);
  border-color: rgba(123, 166, 114, 0.6);
  color: #8FB886;
  box-shadow: 0 0 20px rgba(123, 166, 114, 0.15);
}

.practice-controls__btn--play:active {
  transform: scale(0.95);
}

.practice-controls__divider {
  width: 1px;
  height: 28px;
  background: rgba(62, 66, 74, 0.4);
  margin: 0 0.25rem;
  flex-shrink: 0;
}

.practice-controls__bpm {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.practice-controls__bpm-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(62, 66, 74, 0.4);
  background: rgba(34, 38, 46, 0.6);
  border-radius: 50%;
  cursor: pointer;
  color: #A8A098;
  transition: all 180ms ease;
  -webkit-tap-highlight-color: transparent;
}

.practice-controls__bpm-btn:hover {
  border-color: rgba(168, 160, 152, 0.5);
  color: #E8E4DE;
  background: rgba(62, 66, 74, 0.5);
}

.practice-controls__bpm-btn:active {
  transform: scale(0.9);
}

.practice-controls__bpm-value {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: #D4B06A;
  min-width: 2.5rem;
  text-align: center;
  line-height: 1;
  user-select: none;
}
</style>
