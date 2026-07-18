<template>
  <div class="song-form-view">
    <nav class="form-nav">
      <button class="back-link" @click="navigateBack">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
        </svg>
        {{ isEdit ? 'Back to Song' : 'Song Library' }}
      </button>
    </nav>

    <header class="form-header">
      <h1 class="heading-3">{{ isEdit ? 'Edit Song' : 'Add New Song' }}</h1>
    </header>

    <form class="song-form paper-surface" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="form-title" class="form-label label-sm">Title</label>
        <input
          id="form-title"
          v-model="form.title"
          type="text"
          class="form-input"
          placeholder="e.g. Amazing Grace"
          required
        />
      </div>

      <div class="form-group">
        <label for="form-artist" class="form-label label-sm">Artist</label>
        <input
          id="form-artist"
          v-model="form.artist"
          type="text"
          class="form-input"
          placeholder="e.g. John Newton"
          required
        />
      </div>

      <div class="form-row">
        <div class="form-group form-group--key">
          <KeySelector v-model="form.key" />
        </div>

        <div class="form-group form-group--bpm">
          <label for="form-bpm" class="form-label label-sm">BPM</label>
          <input
            id="form-bpm"
            v-model.number="form.bpm"
            type="number"
            class="form-input"
            min="40"
            max="300"
            placeholder="120"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <div class="form-chart-header">
          <label for="form-chart" class="form-label label-sm">Chord Chart</label>
          <div class="format-selector">
            <label class="format-option" :class="{ 'format-option--active': importFormat === 'auto' }">
              <input type="radio" v-model="importFormat" value="auto" class="format-radio" />
              <span class="format-label">Auto-detect</span>
            </label>
            <label class="format-option" :class="{ 'format-option--active': importFormat === 'chordpro' }">
              <input type="radio" v-model="importFormat" value="chordpro" class="format-radio" />
              <span class="format-label">ChordPro</span>
            </label>
            <label class="format-option" :class="{ 'format-option--active': importFormat === 'chordsAboveLyrics' }">
              <input type="radio" v-model="importFormat" value="chordsAboveLyrics" class="format-radio" />
              <span class="format-label">Chords + Lyrics</span>
            </label>
            <label class="format-option" :class="{ 'format-option--active': importFormat === 'tabdown' }">
              <input type="radio" v-model="importFormat" value="tabdown" class="format-radio" />
              <span class="format-label">Tabdown</span>
            </label>
            <label class="format-option" :class="{ 'format-option--active': importFormat === 'nashdown' }">
              <input type="radio" v-model="importFormat" value="nashdown" class="format-radio" />
              <span class="format-label">Nashdown</span>
            </label>
          </div>
        </div>
        <p class="form-hint body-xs">
          Paste chord chart in any format. We'll convert to ChordPro automatically.
        </p>
        <textarea
          id="form-chart"
          v-model="form.chordChart"
          class="form-textarea"
          rows="16"
          :placeholder="chartPlaceholder"
          required
        ></textarea>
        <div v-if="detectedFormat" class="detected-format">
          <span class="detected-badge">Detected: {{ formatLabel }}</span>
        </div>
      </div>

      <div class="form-actions">
        <button
          type="button"
          class="form-btn form-btn--cancel"
          @click="navigateBack"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="form-btn form-btn--submit"
          :disabled="!isFormValid || submitting"
        >
          {{ submitting ? 'Saving...' : (isEdit ? 'Save Changes' : 'Add Song') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSongStore } from '@/stores/songStore'
import { detectFormat, importChart, type ImportFormat } from '@/domain/import'
import KeySelector from '@/components/songs/KeySelector.vue'

const route = useRoute()
const router = useRouter()
const songStore = useSongStore()

const isEdit = computed(() => !!route.params.id)
const submitting = ref(false)
const importFormat = ref<ImportFormat | 'auto'>('auto')
const detectedFormat = ref<ImportFormat | null>(null)

const form = reactive({
  title: '',
  artist: '',
  key: 'C',
  bpm: 120,
  chordChart: '',
})

const FORMAT_LABELS: Record<ImportFormat, string> = {
  chordpro: 'ChordPro',
  chordsAboveLyrics: 'Chords + Lyrics',
  tabdown: 'Tabdown',
  nashdown: 'Nashdown',
}

const formatLabel = computed(() => {
  if (!detectedFormat.value) return ''
  return FORMAT_LABELS[detectedFormat.value]
})

const chartPlaceholder = computed(() => {
  if (importFormat.value === 'nashdown') {
    return `"Song Title"
G, Pop, 4/4, 120bpm

# Verse
1 1 4 4
1 1 5 5

# Chorus
1 5 4 4
1 5 1 1`
  }
  if (importFormat.value === 'tabdown') {
    return `% title: Amazing Grace
% artist: John Newton
% key: G
% tempo: 80

# Verse
[G]Amazing [C]grace how [D]sweet the [G]sound`
  }
  if (importFormat.value === 'chordsAboveLyrics') {
    return `G               C              D              G
Amazing grace how sweet the sound
G               C              D
Was lost but now am found`
  }
  return `{start_of_verse}
[G]Amazing [C]grace how [D]sweet the [G]sound
{end_of_verse}

{start_of_chorus}
[G]Was lost but [C]now am [D]found
{end_of_chorus}`
})

watch(() => form.chordChart, (value) => {
  if (importFormat.value === 'auto' && value.trim()) {
    detectedFormat.value = detectFormat(value)
  } else {
    detectedFormat.value = null
  }
})

const isFormValid = computed(() => {
  return (
    form.title.trim() !== '' &&
    form.artist.trim() !== '' &&
    form.key !== '' &&
    form.bpm >= 40 &&
    form.bpm <= 300 &&
    form.chordChart.trim() !== ''
  )
})

function navigateBack() {
  if (isEdit.value) {
    router.push(`/songs/${route.params.id}`)
  } else {
    router.push('/songs')
  }
}

function processChart(chart: string): string {
  const format = importFormat.value === 'auto' ? undefined : importFormat.value
  return importChart(chart, format)
}

async function handleSubmit() {
  if (!isFormValid.value || submitting.value) return
  submitting.value = true

  try {
    const processedChart = processChart(form.chordChart)

    if (isEdit.value) {
      const id = route.params.id as string
      await songStore.updateSong(id, {
        title: form.title.trim(),
        artist: form.artist.trim(),
        key: form.key,
        bpm: form.bpm,
        chordChart: processedChart,
      })
      router.push(`/songs/${id}`)
    } else {
      const song = await songStore.createSong({
        title: form.title.trim(),
        artist: form.artist.trim(),
        key: form.key,
        bpm: form.bpm,
        lyrics: '',
        chordChart: processedChart,
      })
      router.push(`/songs/${song.id}`)
    }
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  if (isEdit.value) {
    const id = route.params.id as string
    const song = await songStore.getById(id)
    if (song) {
      form.title = song.title
      form.artist = song.artist
      form.key = song.key
      form.bpm = song.bpm
      form.chordChart = song.chordChart
    } else {
      router.push('/songs')
    }
  }
})
</script>

<style scoped>
.song-form-view {
  max-width: var(--chord-content-max-width);
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

/* ── Nav ── */

.form-nav {
  margin-bottom: var(--space-6);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
  background: none;
  border: none;
  cursor: pointer;
}

.back-link:hover {
  color: var(--color-primary);
}

/* ── Header ── */

.form-header {
  margin-bottom: var(--space-6);
}

/* ── Form ── */

.song-form {
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  color: var(--color-text-muted);
}

.form-hint {
  color: var(--color-text-muted);
}

.form-chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-2);
}

.format-selector {
  display: flex;
  gap: var(--space-1);
  background: var(--color-surface-sunken);
  padding: var(--space-1);
  border-radius: var(--radius-lg);
}

.format-option {
  cursor: pointer;
}

.format-radio {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.format-label {
  display: block;
  padding: var(--space-1) var(--space-3);
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.format-option:hover .format-label {
  color: var(--color-text);
}

.format-option--active .format-label {
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-xs);
}

.detected-format {
  margin-top: var(--space-2);
}

.detected-badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  border-radius: var(--radius-full);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  outline: none;
}

.form-input:hover {
  border-color: var(--color-border-strong);
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

.form-input::placeholder {
  color: var(--color-text-muted);
}

.form-textarea {
  width: 100%;
  padding: var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  outline: none;
  resize: vertical;
  min-height: 240px;
  tab-size: 2;
}

.form-textarea:hover {
  border-color: var(--color-border-strong);
}

.form-textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

.form-textarea::placeholder {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.form-group--key {
  justify-content: flex-end;
}

/* ── Actions ── */

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-light);
}

.form-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-base);
  min-width: 120px;
}

.form-btn--cancel {
  color: var(--color-text-secondary);
  background: none;
  border-color: var(--color-border);
}

.form-btn--cancel:hover {
  background-color: var(--color-surface-sunken);
  color: var(--color-text);
}

.form-btn--submit {
  color: var(--color-text-inverse);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  box-shadow: var(--shadow-sm);
}

.form-btn--submit:hover:not(:disabled) {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
  filter: brightness(1.08);
}

.form-btn--submit:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-xs);
}

.form-btn--submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .song-form-view {
    padding: var(--space-6) var(--space-4);
  }

  .song-form {
    padding: var(--space-5);
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .form-actions {
    flex-direction: column;
  }

  .form-btn {
    width: 100%;
  }

  .form-chart-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .format-selector {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .format-label {
    padding: var(--space-1) var(--space-2);
    font-size: 10px;
  }
}
</style>
