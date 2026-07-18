import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Song } from '@/types/entities/song'
import type { CreateSongDto, UpdateSongDto } from '@/types/dto/songDto'
import { generateId } from '@/utils/id'
import { sanitizeText } from '@/utils/sanitize'

const STORAGE_KEY = 'lhcc-songs'

function loadSongs(): Song[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveSongs(songs: Song[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs))
}

export const useSongStore = defineStore('song', () => {
  const songs = ref<Song[]>(loadSongs())
  const searchQuery = ref('')
  const selectedSong = ref<Song | null>(null)
  const loading = ref(false)

  const filteredSongs = computed(() => {
    if (!searchQuery.value.trim()) return songs.value
    const q = searchQuery.value.toLowerCase()
    return songs.value.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q),
    )
  })

  const sortedSongs = computed(() => {
    return [...filteredSongs.value].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
  })

  async function fetchSongs() {
    loading.value = true
    try {
      songs.value = loadSongs()
    } finally {
      loading.value = false
    }
  }

  async function createSong(dto: CreateSongDto): Promise<Song> {
    const now = new Date().toISOString()
    const song: Song = {
      id: generateId(),
      title: sanitizeText(dto.title),
      artist: sanitizeText(dto.artist),
      key: dto.key,
      bpm: dto.bpm,
      lyrics: dto.lyrics,
      chordChart: dto.chordChart,
      nashvilleChart: '',
      structure: dto.structure ?? [],
      createdAt: now,
      updatedAt: now,
    }
    songs.value.push(song)
    saveSongs(songs.value)
    return song
  }

  async function updateSong(id: string, dto: UpdateSongDto): Promise<Song> {
    const idx = songs.value.findIndex((s) => s.id === id)
    if (idx === -1) throw new Error('Song not found')

    const existing = songs.value[idx]
    const updated: Song = {
      ...existing,
      ...(dto.title !== undefined && { title: sanitizeText(dto.title) }),
      ...(dto.artist !== undefined && { artist: sanitizeText(dto.artist) }),
      ...(dto.key !== undefined && { key: dto.key }),
      ...(dto.bpm !== undefined && { bpm: dto.bpm }),
      ...(dto.lyrics !== undefined && { lyrics: dto.lyrics }),
      ...(dto.chordChart !== undefined && { chordChart: dto.chordChart }),
      ...(dto.structure !== undefined && { structure: dto.structure }),
      updatedAt: new Date().toISOString(),
    }
    songs.value[idx] = updated
    saveSongs(songs.value)
    return updated
  }

  async function deleteSong(id: string): Promise<void> {
    songs.value = songs.value.filter((s) => s.id !== id)
    saveSongs(songs.value)
  }

  async function getById(id: string): Promise<Song | null> {
    return songs.value.find((s) => s.id === id) ?? null
  }

  async function count(): Promise<number> {
    return songs.value.length
  }

  function searchSongs(query: string) {
    searchQuery.value = query
  }

  function selectSong(song: Song | null) {
    selectedSong.value = song
  }

  function seedSongs(seedData: Song[]) {
    if (songs.value.length === 0) {
      songs.value = seedData
      saveSongs(songs.value)
    }
  }

  return {
    songs,
    searchQuery,
    selectedSong,
    loading,
    filteredSongs,
    sortedSongs,
    fetchSongs,
    createSong,
    updateSong,
    deleteSong,
    getById,
    count,
    searchSongs,
    selectSong,
    seedSongs,
  }
})
