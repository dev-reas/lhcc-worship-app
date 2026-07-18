<template>
  <div class="lineup-list-view">
    <header class="view-header">
      <div class="header-text">
        <h1 class="view-title">Lineups</h1>
        <p class="view-subtitle">Worship setlists organized by date</p>
      </div>
      <router-link
        v-if="isLeader"
        to="/lineups/new"
        class="create-btn"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        New Lineup
      </router-link>
    </header>

    <LoadingSpinner v-if="loading" size="lg" />

    <template v-else>
      <div v-if="groupedLineups.length" class="lineup-groups">
        <section
          v-for="group in groupedLineups"
          :key="group.label"
          class="lineup-group"
        >
          <h2 class="group-label">{{ group.label }}</h2>
          <div class="group-items">
            <LineupCard
              v-for="lineup in group.lineups"
              :key="lineup.id"
              :lineup="lineup"
              :entry-count="getEntryCount(lineup.id)"
            />
          </div>
        </section>
      </div>

      <EmptyState
        v-else
        icon="📋"
        message="No lineups yet. Create your first lineup to start building setlists for your worship team."
        :action-text="isLeader ? 'Create Lineup' : ''"
        @action="$router.push('/lineups/new')"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useLineupStore } from '@/stores/lineupStore'
import { useRole } from '@/composables/useRole'
import LineupCard from '@/components/lineups/LineupCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import type { Lineup } from '@/types/entities/lineup'

const lineupStore = useLineupStore()
const { isLeader } = useRole()
const loading = ref(true)

onMounted(async () => {
  await lineupStore.fetchLineups()
  loading.value = false
})

function getEntryCount(lineupId: string): number {
  return lineupStore.getEntriesForLineup(lineupId).length
}

interface LineupGroup {
  label: string
  lineups: Lineup[]
}

const groupedLineups = computed<LineupGroup[]>(() => {
  const groups: Record<string, Lineup[]> = {}

  for (const lineup of lineupStore.sortedLineups) {
    const date = new Date(lineup.date + 'T00:00:00')
    const groupKey = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`

    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(lineup)
  }

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([, lineups]) => {
      const date = new Date(lineups[0].date + 'T00:00:00')
      return {
        label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        lineups,
      }
    })
})
</script>

<style scoped>
.lineup-list-view {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
  animation: fade-up 0.5s ease-out;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Header ── */

.view-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-8);
}

.view-title {
  font-family: var(--font-display);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-1);
}

.view-subtitle {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.create-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-inverse);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  border: none;
  border-radius: var(--radius-lg);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 2px 8px rgba(45, 74, 62, 0.2);
}

.create-btn:hover {
  box-shadow: 0 4px 16px rgba(45, 74, 62, 0.3);
  transform: translateY(-1px);
}

.create-btn:active {
  transform: translateY(0);
}

/* ── Groups ── */

.lineup-groups {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.lineup-group {
  animation: fade-up 0.4s ease-out;
}

.group-label {
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-secondary);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--color-border-light);
  letter-spacing: var(--letter-spacing-wide);
}

.group-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .lineup-list-view {
    padding: var(--space-6) var(--space-4);
  }

  .view-header {
    flex-direction: column;
    gap: var(--space-4);
  }

  .view-title {
    font-size: var(--font-size-3xl);
  }

  .create-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
