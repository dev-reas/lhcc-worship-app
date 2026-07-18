<template>
  <div v-if="loading" class="song-detail-loading">
    <LoadingSpinner size="lg" />
  </div>

  <div v-else-if="!song" class="song-detail-not-found">
    <EmptyState
      icon="🎵"
      message="Song not found. It may have been removed."
      action-text="Back to Library"
      @action="$router.push('/songs')"
    />
  </div>

  <div v-else class="song-detail-view">
    <nav class="song-detail-nav">
      <router-link to="/songs" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
        </svg>
        Song Library
      </router-link>
    </nav>

    <header class="song-detail-header">
      <div class="song-detail-header__main">
        <h1 class="heading-2 song-detail-title">{{ song.title }}</h1>
        <p class="song-detail-artist">{{ song.artist }}</p>
      </div>

      <div class="song-detail-meta">
        <div class="meta-card meta-card--key">
          <span class="meta-card__label label-sm">Key</span>
          <span class="meta-card__value">{{ displayKey }}</span>
        </div>
        <div class="meta-card meta-card--bpm">
          <span class="meta-card__label label-sm">BPM</span>
          <span class="meta-card__value">{{ song.bpm }}</span>
        </div>
      </div>
    </header>

    <div class="song-detail-controls">
      <NashvilleToggle v-model="showNashville" />

      <div class="song-detail-controls__right">
        <KeySelector v-model="transposeKey" />

        <router-link
          :to="`/practice/${song.id}`"
          class="control-btn control-btn--practice"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          Practice
        </router-link>

        <template v-if="isLeader">
          <router-link
            :to="`/songs/${song.id}/edit`"
            class="control-btn control-btn--edit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </router-link>

          <button
            class="control-btn control-btn--delete"
            @click="showDeleteConfirm = true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3,6 5,6 21,6" />
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
            Delete
          </button>
        </template>
      </div>
    </div>

    <div class="song-detail-chart paper-surface">
      <ChordDisplay
        v-if="song.chordChart"
        :chord-pro="song.chordChart"
        :original-key="song.key"
        :transpose-key="transposeKey"
        :show-nashville="showNashville"
      />
      <div v-else class="song-detail-no-chart">
        <p class="body-sm">No chord chart available for this song.</p>
      </div>
    </div>

    <ConfirmDialog
      title="Delete Song"
      :message="`Are you sure you want to delete \u201C${song.title}\u201D? This action cannot be undone.`"
      confirm-text="Delete"
      variant="danger"
      :visible="showDeleteConfirm"
      @confirm="handleDelete"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSongStore } from '@/stores/songStore'
import { useRole } from '@/composables/useRole'
import type { Song } from '@/types/entities/song'
import ChordDisplay from '@/components/songs/ChordDisplay.vue'
import NashvilleToggle from '@/components/songs/NashvilleToggle.vue'
import KeySelector from '@/components/songs/KeySelector.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const songStore = useSongStore()
const { isLeader } = useRole()

const song = ref<Song | null>(null)
const loading = ref(true)
const showNashville = ref(false)
const transposeKey = ref('')
const showDeleteConfirm = ref(false)

const displayKey = computed(() => {
  if (transposeKey.value && transposeKey.value !== song.value?.key) {
    return `${transposeKey.value} (transposed)`
  }
  return song.value?.key ?? ''
})

async function loadSong() {
  loading.value = true
  const id = route.params.id as string
  try {
    song.value = await songStore.getById(id)
    if (song.value) {
      transposeKey.value = song.value.key
    }
  } finally {
    loading.value = false
  }
}

async function handleDelete() {
  if (!song.value) return
  await songStore.deleteSong(song.value.id)
  showDeleteConfirm.value = false
  router.push('/songs')
}

onMounted(loadSong)

watch(() => route.params.id, (newId) => {
  if (newId) loadSong()
})
</script>

<style scoped>
.song-detail-view {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-6) var(--space-6) var(--space-12);
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

.song-detail-loading,
.song-detail-not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-6);
}

/* ── Nav ── */

.song-detail-nav {
  margin-bottom: var(--space-6);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-primary);
}

/* ── Header ── */

.song-detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.song-detail-title {
  margin-bottom: var(--space-1);
}

.song-detail-artist {
  font-family: var(--font-body);
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
}

.song-detail-meta {
  display: flex;
  gap: var(--space-3);
  flex-shrink: 0;
}

.meta-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-3) var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  min-width: 72px;
}

.meta-card__label {
  margin-bottom: var(--space-1);
}

.meta-card__value {
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.meta-card--key .meta-card__value {
  color: var(--color-primary);
}

.meta-card--bpm .meta-card__value {
  color: var(--color-secondary);
}

/* ── Controls ── */

.song-detail-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface-sunken);
  border-radius: var(--radius-xl);
}

.song-detail-controls__right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.control-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
}

.control-btn--practice {
  color: var(--color-text-inverse);
  background-color: var(--color-secondary);
  border-color: var(--color-secondary);
}

.control-btn--practice:hover {
  background-color: var(--color-secondary-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.control-btn--edit {
  color: var(--color-primary);
  background-color: var(--color-primary-subtle);
  border-color: var(--color-border);
}

.control-btn--edit:hover {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.control-btn--delete {
  color: var(--color-error);
  background-color: var(--color-error-light);
  border-color: transparent;
}

.control-btn--delete:hover {
  color: white;
  background-color: var(--color-error);
  box-shadow: var(--shadow-md);
}

/* ── Chart ── */

.song-detail-chart {
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
}

.song-detail-no-chart {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-6);
  color: var(--color-text-muted);
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .song-detail-view {
    padding: var(--space-4) var(--space-4) var(--space-10);
  }

  .song-detail-header {
    flex-direction: column;
    gap: var(--space-4);
  }

  .song-detail-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .song-detail-controls__right {
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .song-detail-chart {
    padding: var(--space-5);
  }
}
</style>
