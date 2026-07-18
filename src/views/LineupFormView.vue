<template>
  <div class="lineup-form-view">
    <header class="view-header">
      <router-link :to="lineup ? `/lineups/${lineup.id}` : '/lineups'" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15,18 9,12 15,6" />
        </svg>
        {{ lineup ? lineup.name : 'Lineups' }}
      </router-link>
      <h1 class="view-title">{{ isEdit ? 'Edit Lineup' : 'New Lineup' }}</h1>
    </header>

    <div class="form-content">
      <div class="form-section">
        <LineupForm
          :lineup="lineup"
          @submit="handleFormSubmit"
          @cancel="$router.back()"
        />
      </div>

      <template v-if="isEdit && createdLineupId">
        <div class="divider-ornate"></div>

        <section class="entries-section">
          <div class="section-header">
            <h2 class="section-title">Setlist</h2>
            <span class="section-count">
              {{ lineupEntries.length }} {{ lineupEntries.length === 1 ? 'song' : 'songs' }}
            </span>
          </div>

          <div v-if="lineupEntries.length" class="entries-list">
            <TransitionGroup name="entry-list" tag="div">
              <div v-for="entry in lineupEntries" :key="entry.id" class="entry-row">
                <LineupEntryCard
                  :entry="entry"
                  :song="getSong(entry.songId)"
                  @remove="removeEntry(entry.id)"
                />
              </div>
            </TransitionGroup>
          </div>

          <div class="add-song-section">
            <h3 class="add-song-title">Add Songs</h3>
            <SongPicker
              :exclude-ids="existingSongIds"
              @select="addSong"
            />
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLineupStore } from '@/stores/lineupStore'
import { useSongStore } from '@/stores/songStore'
import LineupForm from '@/components/lineups/LineupForm.vue'
import LineupEntryCard from '@/components/lineups/LineupEntryCard.vue'
import SongPicker from '@/components/lineups/SongPicker.vue'
import type { Song } from '@/types/entities/song'

const route = useRoute()
const router = useRouter()
const lineupStore = useLineupStore()
const songStore = useSongStore()

const createdLineupId = ref<string | null>(null)
const loading = ref(true)

const isEdit = computed(() => !!route.params.id)

const lineup = computed(() => {
  if (!route.params.id) return undefined
  return lineupStore.lineups.find((l) => l.id === route.params.id) ?? undefined
})

const lineupEntries = computed(() => {
  if (!createdLineupId.value) return []
  return lineupStore.getEntriesForLineup(createdLineupId.value)
})

const existingSongIds = computed(() => lineupEntries.value.map((e) => e.songId))

onMounted(async () => {
  await Promise.all([lineupStore.fetchLineups(), songStore.fetchSongs()])
  if (isEdit.value && lineup.value) {
    createdLineupId.value = lineup.value.id
  }
  loading.value = false
})

function getSong(songId: string): Song | null {
  return songStore.songs.find((s) => s.id === songId) ?? null
}

async function handleFormSubmit(data: { name: string; date: string }) {
  if (isEdit.value && lineup.value) {
    await lineupStore.updateLineup(lineup.value.id, data)
    router.push(`/lineups/${lineup.value.id}`)
  } else {
    const newLineup = await lineupStore.createLineup(data)
    createdLineupId.value = newLineup.id
    router.replace(`/lineups/${newLineup.id}/edit`)
  }
}

async function addSong(song: Song) {
  if (!createdLineupId.value) return
  const order = lineupEntries.value.length + 1
  await lineupStore.createEntry({
    lineupId: createdLineupId.value,
    songId: song.id,
    order,
    key: song.key,
    bpm: song.bpm,
  })
}

async function removeEntry(entryId: string) {
  await lineupStore.deleteEntry(entryId)
  // Reorder remaining
  const remaining = lineupStore.getEntriesForLineup(createdLineupId.value!)
  const reorderData = remaining.map((e, i) => ({ id: e.id, order: i + 1 }))
  await lineupStore.reorderEntries(reorderData)
}
</script>

<style scoped>
.lineup-form-view {
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
  margin-bottom: var(--space-8);
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
  margin-bottom: var(--space-4);
}

.back-link:hover {
  color: var(--color-primary);
}

.view-title {
  font-family: var(--font-display);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
}

/* ── Form Content ── */

.form-content {
  max-width: 640px;
}

.form-section {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
}

/* ── Entries Section ── */

.entries-section {
  margin-top: var(--space-4);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.section-title {
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.section-count {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.entries-list {
  margin-bottom: var(--space-6);
}

.entry-row {
  margin-bottom: var(--space-2);
}

/* ── Add Song ── */

.add-song-section {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
}

.add-song-title {
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-4);
}

/* ── Transitions ── */

.entry-list-enter-active {
  transition: all var(--transition-base);
}

.entry-list-leave-active {
  transition: all var(--transition-fast);
}

.entry-list-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.entry-list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .lineup-form-view {
    padding: var(--space-6) var(--space-4);
  }

  .form-section {
    padding: var(--space-5);
  }

  .view-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
