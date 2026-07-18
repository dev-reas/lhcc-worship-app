<template>
  <div class="entry-card" :class="{ 'entry-card--transition': hasTransition }">
    <div class="entry-order">
      <span class="order-num">{{ entry.order }}</span>
    </div>

    <router-link
      :to="`/songs/${entry.songId}`"
      class="entry-body"
    >
      <div class="entry-main">
        <h4 class="entry-title">{{ song?.title ?? 'Unknown Song' }}</h4>
        <p class="entry-artist">{{ song?.artist ?? '' }}</p>
      </div>
      <div class="entry-tags">
        <span class="entry-tag entry-tag--key">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M12 1v4m0 14v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M1 12h4m14 0h4M4.22 19.78l2.83-2.83m9.9-9.9l2.83-2.83" />
          </svg>
          {{ entry.key }}
        </span>
        <span class="entry-tag entry-tag--bpm">
          {{ entry.bpm }} BPM
        </span>
        <span v-if="entry.isMashup" class="entry-tag entry-tag--mashup">
          Mashup
        </span>
      </div>
    </router-link>

    <div v-if="entry.notes" class="entry-notes-badge" :title="entry.notes">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
      </svg>
    </div>

    <div v-if="entry.transitionNotes" class="entry-transition-badge" :title="entry.transitionNotes">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="17,1 21,5 17,9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7,23 3,19 7,15" /><path d="M21 13v2a4 4 0 01-4 4H3" />
      </svg>
    </div>

    <div v-if="isLeader" class="entry-actions">
      <IconButton
        icon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'
        size="sm"
        title="Edit entry"
        @click="$emit('edit')"
      />
      <IconButton
        icon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>'
        size="sm"
        title="Remove entry"
        @click="$emit('remove')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LineupEntry } from '@/types/entities/lineupEntry'
import type { Song } from '@/types/entities/song'
import { useRole } from '@/composables/useRole'
import IconButton from '@/components/common/IconButton.vue'

const props = defineProps<{
  entry: LineupEntry
  song?: Song | null
}>()

defineEmits<{
  edit: []
  remove: []
}>()

const { isLeader } = useRole()

const hasTransition = computed(() => !!props.entry.transitionNotes)
</script>

<style scoped>
.entry-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  transition: all var(--transition-base);
  position: relative;
}

.entry-card:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-sm);
}

.entry-card--transition {
  border-left: 3px solid var(--color-secondary);
}

/* ── Order ── */

.entry-order {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: var(--color-surface-sunken);
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.order-num {
  font-family: var(--font-display);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-secondary);
}

/* ── Body ── */

.entry-body {
  flex: 1;
  min-width: 0;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.entry-main {
  min-width: 0;
}

.entry-title {
  font-family: var(--font-display);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.entry-artist {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.entry-tags {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.entry-tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--font-size-2xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface-sunken);
  color: var(--color-text-secondary);
}

.entry-tag--key {
  color: var(--color-primary);
  background-color: var(--color-primary-subtle);
}

.entry-tag--bpm {
  color: var(--color-secondary);
  background-color: var(--color-secondary-subtle);
}

.entry-tag--mashup {
  color: var(--color-accent);
  background-color: var(--color-accent-light);
}

/* ── Badges ── */

.entry-notes-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background-color: var(--color-info-light);
  color: var(--color-info);
  flex-shrink: 0;
  cursor: help;
}

.entry-transition-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background-color: var(--color-warning-light);
  color: var(--color-warning);
  flex-shrink: 0;
  cursor: help;
}

/* ── Actions ── */

.entry-actions {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  flex-shrink: 0;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.entry-card:hover .entry-actions {
  opacity: 1;
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .entry-card {
    padding: var(--space-3) var(--space-4);
    gap: var(--space-3);
  }

  .entry-actions {
    opacity: 1;
  }
}
</style>
