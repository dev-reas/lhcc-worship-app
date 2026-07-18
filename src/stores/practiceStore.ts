import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePracticeStore = defineStore('practice', () => {
  const isPlaying = ref(false)
  const bpm = ref(72)
  const currentSection = ref<string | null>(null)
  const scrollPosition = ref(0)
  const currentSongId = ref<string | null>(null)

  function play() {
    isPlaying.value = true
  }

  function pause() {
    isPlaying.value = false
  }

  function togglePlay() {
    isPlaying.value = !isPlaying.value
  }

  function rewind() {
    scrollPosition.value = 0
  }

  function forward() {
    // Will be handled by the auto-scroll engine
  }

  function setBpm(value: number) {
    bpm.value = Math.max(40, Math.min(300, value))
  }

  function setSection(section: string | null) {
    currentSection.value = section
  }

  function setScrollPosition(position: number) {
    scrollPosition.value = position
  }

  function setCurrentSong(songId: string) {
    currentSongId.value = songId
  }

  function reset() {
    isPlaying.value = false
    currentSection.value = null
    scrollPosition.value = 0
  }

  return {
    isPlaying,
    bpm,
    currentSection,
    scrollPosition,
    currentSongId,
    play,
    pause,
    togglePlay,
    rewind,
    forward,
    setBpm,
    setSection,
    setScrollPosition,
    setCurrentSong,
    reset,
  }
})
