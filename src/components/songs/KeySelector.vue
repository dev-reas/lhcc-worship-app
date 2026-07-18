<template>
  <div class="key-selector" :class="{ 'key-selector--open': isOpen }">
    <label :for="selectId" class="key-selector__label label-sm">Key</label>
    <div class="key-selector__field">
      <select
        :id="selectId"
        :value="modelValue"
        class="key-selector__select"
        @change="onChange"
        @blur="isOpen = false"
        @focus="isOpen = true"
      >
        <option v-for="key in KEYS" :key="key" :value="key">
          {{ key }}
        </option>
      </select>
      <span class="key-selector__current">{{ modelValue }}</span>
      <svg class="key-selector__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6,9 12,15 18,9" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useId } from 'vue'

const KEYS = [
  'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F',
  'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B',
]

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectId = `key-selector-${useId()}`
const isOpen = ref(false)

function onChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value)
  isOpen.value = false
}
</script>

<style scoped>
.key-selector {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.key-selector__label {
  color: var(--color-text-muted);
}

.key-selector__field {
  position: relative;
  display: flex;
  align-items: center;
}

.key-selector__select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  padding: var(--space-3) var(--space-10) var(--space-3) var(--space-4);
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  outline: none;
}

.key-selector__select:hover {
  border-color: var(--color-primary-light);
}

.key-selector__select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

.key-selector__current {
  display: none;
}

.key-selector__chevron {
  position: absolute;
  right: var(--space-3);
  color: var(--color-text-muted);
  pointer-events: none;
  transition: transform var(--transition-base);
}

.key-selector--open .key-selector__chevron {
  transform: rotate(180deg);
}

@media (min-width: 640px) {
  .key-selector__current {
    display: none;
  }
}
</style>
