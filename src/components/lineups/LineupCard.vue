<template>
  <router-link :to="`/lineups/${lineup.id}`" class="lineup-card paper-surface">
    <div class="card-date-badge">
      <span class="card-day">{{ dayNum }}</span>
      <span class="card-month">{{ monthShort }}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ lineup.name }}</h3>
      <p class="card-date-full">{{ dayOfWeek }}, {{ monthFull }} {{ dayNum }}, {{ year }}</p>
      <div class="card-meta">
        <span class="card-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
          </svg>
          {{ entryCount }} {{ entryCount === 1 ? 'song' : 'songs' }}
        </span>
      </div>
    </div>
    <span class="card-arrow">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9,18 15,12 9,6" />
      </svg>
    </span>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Lineup } from '@/types/entities/lineup'

const props = defineProps<{
  lineup: Lineup
  entryCount?: number
}>()

const dateObj = computed(() => new Date(props.lineup.date + 'T00:00:00'))
const dayNum = computed(() => dateObj.value.getDate())
const monthShort = computed(() => dateObj.value.toLocaleDateString('en-US', { month: 'short' }))
const monthFull = computed(() => dateObj.value.toLocaleDateString('en-US', { month: 'long' }))
const dayOfWeek = computed(() => dateObj.value.toLocaleDateString('en-US', { weekday: 'long' }))
const year = computed(() => dateObj.value.getFullYear())
</script>

<style scoped>
.lineup-card {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  padding: var(--space-5) var(--space-6);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
  text-decoration: none;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.lineup-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(184, 146, 74, 0.02) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.lineup-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md), var(--shadow-glow);
  transform: translateY(-2px);
}

.lineup-card:active {
  transform: translateY(0);
}

/* ── Date Badge ── */

.card-date-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 68px;
  background: linear-gradient(145deg, var(--color-primary), var(--color-primary-light));
  color: var(--color-text-inverse);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 4px 12px rgba(45, 74, 62, 0.2);
}

.card-day {
  font-family: var(--font-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: 1;
}

.card-month {
  font-family: var(--font-body);
  font-size: var(--font-size-2xs);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  line-height: 1;
  margin-top: 3px;
  opacity: 0.85;
}

/* ── Body ── */

.card-body {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-1);
  letter-spacing: var(--letter-spacing-tight);
}

.card-date-full {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: var(--space-2);
}

.card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.card-meta-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-secondary);
  font-weight: var(--font-weight-medium);
}

/* ── Arrow ── */

.card-arrow {
  color: var(--color-text-muted);
  transition: all var(--transition-base);
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(-4px);
}

.lineup-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--color-primary);
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .lineup-card {
    padding: var(--space-4);
    gap: var(--space-4);
  }

  .card-date-badge {
    width: 50px;
    height: 58px;
  }

  .card-day {
    font-size: var(--font-size-xl);
  }
}
</style>
