<template>
  <div class="song-list-view">
    <header class="song-list-header">
      <div class="song-list-header__top">
        <h1 class="heading-3">Song Library</h1>
        <router-link
          v-if="isLeader"
          to="/songs/new"
          class="add-song-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Song
        </router-link>
      </div>
      <SearchBar
        v-model="searchQuery"
        placeholder="Search songs by title or artist..."
      />
    </header>

    <div v-if="loading" class="song-list-loading">
      <LoadingSpinner size="lg" />
    </div>

    <div v-else-if="sortedSongs.length === 0 && !searchQuery" class="song-list-empty">
      <EmptyState
        icon="🎵"
        message="No songs in the library yet. Start building your collection."
        :action-text="isLeader ? 'Add First Song' : ''"
        @action="$router.push('/songs/new')"
      />
    </div>

    <div v-else-if="sortedSongs.length === 0 && searchQuery" class="song-list-empty">
      <EmptyState
        icon="🔍"
        :message="`No songs match \u201C${searchQuery}\u201D. Try a different search.`"
      />
    </div>

    <div v-else class="song-grid">
      <SongCard
        v-for="song in sortedSongs"
        :key="song.id"
        :song="song"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useSongStore } from '@/stores/songStore'
import { useRole } from '@/composables/useRole'
import SearchBar from '@/components/common/SearchBar.vue'
import SongCard from '@/components/songs/SongCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const songStore = useSongStore()
const { isLeader } = useRole()

const searchQuery = ref(songStore.searchQuery)

const sortedSongs = computed(() => songStore.sortedSongs)
const loading = computed(() => songStore.loading)

watch(searchQuery, (value) => {
  songStore.searchSongs(value)
})

onMounted(() => {
  songStore.fetchSongs()
})
</script>

<style scoped>
.song-list-view {
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

.song-list-header {
  margin-bottom: var(--space-8);
}

.song-list-header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-5);
}

.add-song-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-inverse);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.add-song-btn:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
  filter: brightness(1.08);
}

.add-song-btn:active {
  transform: translateY(0);
  box-shadow: var(--shadow-xs);
}

.song-list-loading {
  display: flex;
  justify-content: center;
  padding: var(--space-16) 0;
}

.song-list-empty {
  padding: var(--space-8) 0;
}

.song-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .song-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .song-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .song-list-view {
    padding: var(--space-6) var(--space-4);
  }

  .song-list-header__top {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .add-song-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
