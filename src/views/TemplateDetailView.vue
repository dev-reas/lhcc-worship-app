<template>
  <div class="template-detail-view">
    <LoadingSpinner v-if="loading" size="lg" />

    <template v-else-if="template">
      <header class="detail-header">
        <div class="header-top">
          <router-link to="/templates" class="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15,18 9,12 15,6" />
            </svg>
            Templates
          </router-link>
          <div v-if="isLeader" class="header-actions">
            <button class="action-btn action-btn--create" @click="createFromTemplate">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Lineup from Template
            </button>
          </div>
        </div>

        <div class="header-content">
          <div class="header-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div class="header-text">
            <h1 class="detail-title">{{ template.name }}</h1>
            <p class="detail-meta">
              {{ templateEntries.length }} {{ templateEntries.length === 1 ? 'song' : 'songs' }} · Created {{ formatDate(template.createdAt) }}
            </p>
          </div>
        </div>
      </header>

      <div class="divider-ornate"></div>

      <section class="entries-section" v-if="templateEntries.length">
        <div class="entries-list">
          <div v-for="entry in templateEntries" :key="entry.id" class="entry-wrapper">
            <LineupEntryCard
              :entry="entry"
              :song="getSong(entry.songId)"
            />
          </div>
        </div>
      </section>

      <EmptyState
        v-else
        icon="📄"
        message="This template has no songs. Edit the source lineup to add songs, then save as template again."
      />
    </template>

    <EmptyState
      v-else-if="!loading"
      icon="📄"
      message="Template not found."
      action-text="Back to Templates"
      @action="$router.push('/templates')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLineupStore } from '@/stores/lineupStore'
import { useSongStore } from '@/stores/songStore'
import { useRole } from '@/composables/useRole'
import LineupEntryCard from '@/components/lineups/LineupEntryCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const lineupStore = useLineupStore()
const songStore = useSongStore()
const { isLeader } = useRole()

const loading = ref(true)

const template = computed(() => {
  return lineupStore.lineups.find((l) => l.id === route.params.id && l.isTemplate) ?? null
})

const templateEntries = computed(() => {
  if (!template.value) return []
  return lineupStore.getEntriesForLineup(template.value.id)
})

onMounted(async () => {
  await Promise.all([lineupStore.fetchLineups(), songStore.fetchSongs()])
  loading.value = false
})

function getSong(songId: string) {
  return songStore.songs.find((s) => s.id === songId) ?? null
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

async function createFromTemplate() {
  if (!template.value) return

  const today = new Date().toISOString().split('T')[0]
  const newLineup = await lineupStore.createLineup({
    name: template.value.name,
    date: today,
    templateId: template.value.id,
  })

  // Copy entries from template
  for (const entry of templateEntries.value) {
    await lineupStore.createEntry({
      lineupId: newLineup.id,
      songId: entry.songId,
      order: entry.order,
      key: entry.key,
      bpm: entry.bpm,
      notes: entry.notes,
      isMashup: entry.isMashup,
      mashupData: entry.mashupData,
      transitionNotes: entry.transitionNotes,
    })
  }

  router.push(`/lineups/${newLineup.id}/edit`)
}
</script>

<style scoped>
.template-detail-view {
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

.detail-header {
  margin-bottom: var(--space-2);
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.action-btn--create {
  color: var(--color-text-inverse);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  box-shadow: 0 2px 8px rgba(45, 74, 62, 0.2);
}

.action-btn--create:hover {
  box-shadow: 0 4px 16px rgba(45, 74, 62, 0.3);
  transform: translateY(-1px);
}

/* ── Header Content ── */

.header-content {
  display: flex;
  align-items: flex-start;
  gap: var(--space-5);
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--color-secondary-subtle), var(--color-secondary-light));
  color: var(--color-secondary);
  border-radius: var(--radius-xl);
  flex-shrink: 0;
}

.detail-title {
  font-family: var(--font-display);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-2);
}

.detail-meta {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* ── Entries ── */

.entries-section {
  margin-top: var(--space-4);
}

.entries-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.entry-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .template-detail-view {
    padding: var(--space-6) var(--space-4);
  }

  .header-top {
    flex-direction: column;
    gap: var(--space-4);
  }

  .header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-4);
  }

  .detail-title {
    font-size: var(--font-size-3xl);
  }
}
</style>
