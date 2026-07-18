<template>
  <div class="song-picker">
    <SearchBar
      v-model="searchQuery"
      placeholder="Search songs by title or artist..."
    />

    <div class="picker-list" v-if="filteredSongs.length">
      <button
        v-for="song in filteredSongs"
        :key="song.id"
        class="picker-item"
        @click="emit('select', song)"
      >
        <div class="picker-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
          </svg>
        </div>
        <div class="picker-info">
          <span class="picker-title">{{ song.title }}</span>
          <span class="picker-meta">{{ song.artist }} · {{ song.key }} · {{ song.bpm }} BPM</span>
        </div>
        <span class="picker-add">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
    </div>

    <p v-else class="picker-empty">
      {{ searchQuery ? 'No songs match your search.' : 'No songs available to add.' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSongStore } from '@/stores/songStore'
import SearchBar from '@/components/common/SearchBar.vue'
import type { Song } from '@/types/entities/song'

const props = withDefaults(
  defineProps<{
    excludeIds?: string[]
  }>(),
  {
    excludeIds: () => [],
  },
)

const emit = defineEmits<{
  select: [song: Song]
}>()

const songStore = useSongStore()
const searchQuery = ref('')

onMounted(async () => {
  if (!songStore.songs.length) {
    await songStore.fetchSongs()
  }
})

const filteredSongs = computed(() => {
  let list = songStore.songs

  if (props.excludeIds.length) {
    list = list.filter((s) => !props.excludeIds.includes(s.id))
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q),
    )
  }

  return list
})
</script>

<style scoped>
.song-picker {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.picker-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  max-height: 320px;
  overflow-y: auto;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-1);
}

.picker-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
}

.picker-item:hover {
  background-color: var(--color-primary-subtle);
}

.picker-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--color-surface-sunken);
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.picker-item:hover .picker-icon {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.picker-info {
  flex: 1;
  min-width: 0;
}

.picker-title {
  display: block;
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.picker-meta {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--font-size-2xs);
  color: var(--color-text-muted);
}

.picker-add {
  color: var(--color-text-muted);
  flex-shrink: 0;
  opacity: 0;
  transition: all var(--transition-fast);
}

.picker-item:hover .picker-add {
  opacity: 1;
  color: var(--color-primary);
}

.picker-empty {
  text-align: center;
  padding: var(--space-8) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
</style>
