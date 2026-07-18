<template>
  <router-link
    :to="`/songs/${song.id}`"
    class="song-card paper-surface"
  >
    <div class="song-card__header">
      <div class="song-card__badges">
        <span class="song-card__key-badge">{{ song.key }}</span>
        <span class="song-card__bpm-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          {{ song.bpm }}
        </span>
      </div>
    </div>

    <div class="song-card__body">
      <h3 class="song-card__title">{{ song.title }}</h3>
      <p class="song-card__artist">{{ song.artist }}</p>
    </div>

    <div class="song-card__footer">
      <span class="song-card__arrow" aria-hidden="true">→</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Song } from '@/types/entities/song'

defineProps<{
  song: Song
}>()
</script>

<style scoped>
.song-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-5);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
  text-decoration: none;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.song-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  opacity: 0;
  transition: opacity var(--transition-base);
}

.song-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
  transform: translateY(-3px);
}

.song-card:hover::before {
  opacity: 1;
}

.song-card:active {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.song-card__header {
  display: flex;
  justify-content: flex-end;
}

.song-card__badges {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.song-card__key-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-1) var(--space-3);
  font-family: var(--font-display);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-inverse);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-full);
  letter-spacing: var(--letter-spacing-wide);
  line-height: 1;
}

.song-card__bpm-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: var(--space-1) var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--font-size-2xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  background-color: var(--color-surface-sunken);
  border-radius: var(--radius-full);
  line-height: 1;
}

.song-card__bpm-badge svg {
  opacity: 0.6;
}

.song-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.song-card__title {
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  line-height: var(--line-height-tight);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-card__artist {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-card__footer {
  display: flex;
  justify-content: flex-end;
}

.song-card__arrow {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  transition: all var(--transition-base);
}

.song-card:hover .song-card__arrow {
  color: var(--color-primary);
  transform: translateX(4px);
}
</style>
