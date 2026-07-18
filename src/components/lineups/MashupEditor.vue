<template>
  <div class="mashup-editor">
    <div class="editor-header">
      <h4 class="editor-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2" /><line x1="8" y1="2" x2="8" y2="22" /><line x1="16" y1="2" x2="16" y2="22" />
        </svg>
        Mashup Arrangement
      </h4>
    </div>

    <div class="editor-body">
      <label class="editor-label">Arrangement Notes</label>
      <textarea
        v-model="arrangement"
        class="editor-textarea"
        placeholder="Describe the mashup arrangement, e.g. 'Verse from Song A into Chorus of Song B...'"
        rows="3"
        @input="emitUpdate"
      ></textarea>

      <label class="editor-label">Song Order (comma-separated titles)</label>
      <input
        v-model="songOrder"
        class="editor-input"
        type="text"
        placeholder="e.g. Amazing Grace, How Great Thou Art"
        @input="emitUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { MashupData } from '@/types/entities/lineupEntry'

const props = defineProps<{
  mashupData: MashupData | null
}>()

const emit = defineEmits<{
  update: [data: MashupData]
}>()

const arrangement = ref(props.mashupData?.arrangement ?? '')
const songOrder = ref(props.mashupData?.songIds.join(', ') ?? '')

watch(
  () => props.mashupData,
  (newData) => {
    arrangement.value = newData?.arrangement ?? ''
    songOrder.value = newData?.songIds.join(', ') ?? ''
  },
)

function emitUpdate() {
  const songIds = songOrder.value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  emit('update', {
    songIds,
    arrangement: arrangement.value,
    order: songIds.map((_, i) => i),
  })
}
</script>

<style scoped>
.mashup-editor {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.editor-header {
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface-sunken);
  border-bottom: 1px solid var(--color-border-light);
}

.editor-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.editor-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
}

.editor-label {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  letter-spacing: var(--letter-spacing-wide);
}

.editor-textarea,
.editor-input {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast);
}

.editor-textarea {
  resize: vertical;
  line-height: var(--line-height-normal);
}

.editor-textarea:focus,
.editor-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

.editor-input::placeholder,
.editor-textarea::placeholder {
  color: var(--color-text-muted);
}
</style>
