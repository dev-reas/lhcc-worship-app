<template>
  <div class="practice-view">
    <header class="practice-view__topbar">
      <button
        class="practice-view__back"
        title="Exit practice mode"
        @click="exit"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12,19 5,12 12,5" />
        </svg>
      </button>

      <div class="practice-view__song-info">
        <h1 class="practice-view__title">{{ song?.title ?? 'Practice' }}</h1>
        <p v-if="song" class="practice-view__artist">{{ song.artist }}</p>
      </div>

      <div class="practice-view__topbar-spacer" />
    </header>

    <div v-if="loading" class="practice-view__loading">
      <div class="practice-view__loader" />
    </div>

    <div v-else-if="!song" class="practice-view__empty">
      <p>Song not found.</p>
      <button class="practice-view__exit-btn" @click="exit">Go Back</button>
    </div>

    <template v-else>
      <div class="practice-view__body">
        <div class="practice-view__markers">
          <SectionMarker
            v-for="(section, index) in sections"
            :key="index"
            :section="section.label"
            :is-active="activeSectionIndex === index"
            @click="scrollToSection(index)"
          />
        </div>

        <ScrollContainer ref="scrollContainerRef">
          <div
            ref="chartEl"
            class="practice-view__chart"
            v-html="renderedChart"
          />
        </ScrollContainer>
      </div>

      <TempoIndicator
        :bpm="practiceStore.bpm"
        :is-playing="practiceStore.isPlaying"
      />

      <PracticeControls
        :is-playing="practiceStore.isPlaying"
        :bpm="practiceStore.bpm"
        @play="handlePlay"
        @pause="handlePause"
        @rewind="handleRewind"
        @forward="handleForward"
        @bpm-change="handleBpmChange"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePracticeStore } from '@/stores/practiceStore'
import { useSongStore } from '@/stores/songStore'
import { parseChordPro } from '@/domain/chord-pro'
import { renderChordPro } from '@/domain/chord-pro/renderer'
import { createAutoScrollEngine } from '@/domain/auto-scroll/engine'
import type { AutoScrollController, ChordProDocument, ChordProSection } from '@/types'
import type { Song } from '@/types/entities/song'
import ScrollContainer from '@/components/practice/ScrollContainer.vue'
import PracticeControls from '@/components/practice/PracticeControls.vue'
import TempoIndicator from '@/components/practice/TempoIndicator.vue'
import SectionMarker from '@/components/practice/SectionMarker.vue'

const route = useRoute()
const router = useRouter()
const practiceStore = usePracticeStore()
const songStore = useSongStore()

const song = ref<Song | null>(null)
const loading = ref(true)
const document = ref<ChordProDocument | null>(null)
const scrollContainerRef = ref<InstanceType<typeof ScrollContainer> | null>(null)
const chartEl = ref<HTMLDivElement | null>(null)
let engine: AutoScrollController | null = null

const sections = computed<ChordProSection[]>(() => document.value?.sections ?? [])

const renderedChart = computed(() => {
  if (!document.value) return ''
  return renderChordPro(document.value)
})

const activeSectionIndex = ref(0)

function exit() {
  practiceStore.reset()
  router.back()
}

function handlePlay() {
  practiceStore.play()
  engine?.play()
}

function handlePause() {
  practiceStore.pause()
  engine?.pause()
}

function handleRewind() {
  engine?.rewind()
  practiceStore.setScrollPosition(0)
  activeSectionIndex.value = 0
}

function handleForward() {
  engine?.forward()
}

function handleBpmChange(value: number) {
  practiceStore.setBpm(value)
  engine?.setBpm(value)
}

function scrollToSection(index: number) {
  const container = scrollContainerRef.value?.getContainer()
  if (!container) return

  const sectionEls = container.querySelectorAll('.cp-section')
  const target = sectionEls[index] as HTMLElement | undefined
  if (!target) return

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  activeSectionIndex.value = index
}

function updateActiveSection() {
  const container = scrollContainerRef.value?.getContainer()
  if (!container || sections.value.length === 0) return

  const sectionEls = container.querySelectorAll('.cp-section')
  const containerTop = container.scrollTop
  const offset = container.clientHeight * 0.25

  let closest = 0
  let closestDist = Infinity

  sectionEls.forEach((el, i) => {
    const htmlEl = el as HTMLElement
    const dist = Math.abs(htmlEl.offsetTop - containerTop - offset)
    if (dist < closestDist) {
      closestDist = dist
      closest = i
    }
  })

  activeSectionIndex.value = closest
  practiceStore.setSection(sections.value[closest]?.label ?? null)
}

let scrollRAF: number | null = null

function onScroll() {
  if (scrollRAF !== null) return
  scrollRAF = requestAnimationFrame(() => {
    scrollRAF = null
    updateActiveSection()
  })
}

function initEngine() {
  const container = scrollContainerRef.value?.getContainer()
  if (!container) return

  engine = createAutoScrollEngine(container, practiceStore.bpm)
  container.addEventListener('scroll', onScroll, { passive: true })

  if (practiceStore.isPlaying) {
    engine.play()
  }
}

async function loadSong() {
  loading.value = true
  try {
    const id = route.params.songId as string
    const found = await songStore.getById(id)
    song.value = found

    if (found) {
      practiceStore.setCurrentSong(found.id)
      if (found.bpm) {
        practiceStore.setBpm(found.bpm)
      }

      if (found.chordChart?.trim()) {
        document.value = parseChordPro(found.chordChart)
      }
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadSong()
  await nextTick()
  initEngine()
})

onUnmounted(() => {
  engine?.destroy()
  engine = null
  if (scrollRAF !== null) {
    cancelAnimationFrame(scrollRAF)
  }
})

watch(
  () => route.params.songId,
  async (newId) => {
    engine?.destroy()
    engine = null
    practiceStore.reset()
    if (newId) {
      await loadSong()
      await nextTick()
      initEngine()
    }
  },
)
</script>

<style scoped>
.practice-view {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: #0E1014;
  color: #E8E4DE;
  font-family: var(--font-body);
  z-index: var(--z-modal);
  overflow: hidden;
}

/* ── Top Bar ── */

.practice-view__topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  padding-top: calc(0.75rem + env(safe-area-inset-top, 0px));
  background: rgba(14, 16, 20, 0.85);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border-bottom: 1px solid rgba(62, 66, 74, 0.25);
}

@media (min-width: 768px) {
  .practice-view__topbar {
    padding: 0.85rem 2rem;
    padding-top: calc(0.85rem + env(safe-area-inset-top, 0px));
  }
}

.practice-view__back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(62, 66, 74, 0.3);
  border-radius: 50%;
  color: #A8A098;
  cursor: pointer;
  transition: all 180ms ease;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}

.practice-view__back:hover {
  background: rgba(62, 66, 74, 0.5);
  color: #E8E4DE;
}

.practice-view__back:active {
  transform: scale(0.92);
}

.practice-view__song-info {
  flex: 1;
  min-width: 0;
  text-align: center;
}

.practice-view__title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: #E8E4DE;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

@media (min-width: 768px) {
  .practice-view__title {
    font-size: 1.35rem;
  }
}

.practice-view__artist {
  font-size: 0.7rem;
  font-weight: 400;
  color: #6B6560;
  margin: 0.1rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.practice-view__topbar-spacer {
  width: 40px;
  flex-shrink: 0;
}

/* ── Loading ── */

.practice-view__loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.practice-view__loader {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(62, 66, 74, 0.3);
  border-top-color: #7BA672;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Empty ── */

.practice-view__empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  color: #6B6560;
  font-size: 1rem;
}

.practice-view__exit-btn {
  padding: 0.6rem 1.5rem;
  background: rgba(62, 66, 74, 0.3);
  border: 1px solid rgba(62, 66, 74, 0.4);
  border-radius: 9999px;
  color: #A8A098;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 180ms ease;
}

.practice-view__exit-btn:hover {
  background: rgba(62, 66, 74, 0.5);
  color: #E8E4DE;
}

/* ── Body ── */

.practice-view__body {
  position: relative;
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* ── Section Markers ── */

.practice-view__markers {
  position: fixed;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 200;
  display: none;
  flex-direction: column;
  gap: 0.35rem;
  max-height: 50vh;
  overflow-y: auto;
  scrollbar-width: none;
}

.practice-view__markers::-webkit-scrollbar {
  display: none;
}

@media (min-width: 1024px) {
  .practice-view__markers {
    display: flex;
  }
}

/* ── Chart Content (dark overrides for ChordPro render) ── */

.practice-view :deep(.cp-document) {
  max-width: 800px;
  margin: 0 auto;
}

.practice-view :deep(.cp-meta) {
  display: none;
}

.practice-view :deep(.cp-section) {
  margin-bottom: 2.5rem;
  scroll-margin-top: 5rem;
}

@media (min-width: 768px) {
  .practice-view :deep(.cp-section) {
    margin-bottom: 3rem;
  }
}

.practice-view :deep(.cp-section-label) {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(212, 176, 106, 0.6);
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid rgba(62, 66, 74, 0.3);
}

.practice-view :deep(.cp-line) {
  margin-bottom: 0.6rem;
}

@media (min-width: 768px) {
  .practice-view :deep(.cp-line) {
    margin-bottom: 0.75rem;
  }
}

.practice-view :deep(.cp-chords) {
  font-family: var(--font-mono);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.3;
  color: #8FB886;
}

@media (min-width: 768px) {
  .practice-view :deep(.cp-chords) {
    font-size: 1.15rem;
  }
}

.practice-view :deep(.cp-chord) {
  display: inline;
  white-space: pre;
}

.practice-view :deep(.cp-lyrics) {
  font-family: var(--font-body);
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.45;
  color: #E8E4DE;
}

@media (min-width: 768px) {
  .practice-view :deep(.cp-lyrics) {
    font-size: 1.35rem;
    line-height: 1.5;
  }
}

@media (min-width: 1024px) {
  .practice-view :deep(.cp-lyrics) {
    font-size: 1.45rem;
  }
}

/* ── Scrollbar ── */

.practice-view :deep(.practice-scroll-container)::-webkit-scrollbar {
  width: 4px;
}

.practice-view :deep(.practice-scroll-container)::-webkit-scrollbar-track {
  background: transparent;
}

.practice-view :deep(.practice-scroll-container)::-webkit-scrollbar-thumb {
  background: rgba(62, 66, 74, 0.4);
  border-radius: 9999px;
}
</style>
