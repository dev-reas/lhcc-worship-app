<template>
  <div class="chord-display" v-if="document">
    <div
      v-for="(section, si) in document.sections"
      :key="si"
      class="chord-section"
    >
      <div class="chord-section__label label-sm">{{ section.label }}</div>
      <div class="chord-section__body">
        <div
          v-for="(line, li) in section.lines"
          :key="li"
          class="chord-line"
        >
          <div
            v-if="hasChords(line)"
            class="chord-line__chords"
          >
            <span
              v-for="(chord, ci) in line.chords"
              :key="ci"
              class="chord-line__chord"
              :class="{ 'chord-line__chord--empty': !chord }"
            >
              {{ chord ? getChordDisplay(chord.raw) : '\u00A0' }}
            </span>
          </div>
          <div class="chord-line__lyrics">{{ line.lyrics }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="chordPro.trim()" class="chord-display chord-display--raw">
    <pre class="chord-display__fallback">{{ chordPro }}</pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ChordProLine } from '@/types'
import { parseChordPro } from '@/domain/chord-pro'
import { transposeChordPro } from '@/domain/transpose'
import { convertToNashville } from '@/domain/nashville'

const props = withDefaults(
  defineProps<{
    chordPro: string
    transposeKey?: string
    originalKey?: string
    showNashville?: boolean
  }>(),
  {
    transposeKey: '',
    originalKey: '',
    showNashville: false,
  },
)

const effectiveChart = computed(() => {
  let chart = props.chordPro

  if (props.transposeKey && props.originalKey && props.transposeKey !== props.originalKey) {
    chart = transposeChordPro(chart, props.originalKey, props.transposeKey)
  }

  if (props.showNashville) {
    const keyForNashville = props.transposeKey || props.originalKey || 'C'
    chart = convertToNashville(chart, keyForNashville)
  }

  return chart
})

const document = computed(() => {
  if (!effectiveChart.value.trim()) return null
  try {
    return parseChordPro(effectiveChart.value)
  } catch {
    return null
  }
})

function hasChords(line: ChordProLine): boolean {
  return line.chords.some((c) => c !== null)
}

function getChordDisplay(raw: string): string {
  return raw
}
</script>

<style scoped>
.chord-display {
  max-width: var(--chord-content-max-width);
}

.chord-section {
  margin-bottom: var(--space-6);
}

.chord-section__label {
  color: var(--color-secondary);
  margin-bottom: var(--space-2);
  padding-bottom: var(--space-1);
  border-bottom: 1px solid var(--color-border-light);
  letter-spacing: var(--letter-spacing-wider);
}

.chord-section__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.chord-line {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.chord-line__chords {
  display: flex;
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  color: var(--color-primary);
}

.chord-line__chord {
  display: inline-block;
  min-width: 1ch;
  white-space: pre;
}

.chord-line__lyrics {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text);
}

.chord-display--raw {
  background-color: var(--color-surface-sunken);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.chord-display__fallback {
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
