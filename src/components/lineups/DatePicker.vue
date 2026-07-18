<template>
  <div class="date-picker">
    <div class="date-display" v-if="dayOfWeek">
      <span class="day-of-week">{{ dayOfWeek }}</span>
    </div>
    <input
      :value="modelValue"
      type="date"
      class="date-input"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

const dayOfWeek = computed(() => {
  if (!props.modelValue) return ''
  const date = new Date(props.modelValue + 'T00:00:00')
  return date.toLocaleDateString('en-US', { weekday: 'long' })
})
</script>

<style scoped>
.date-picker {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.date-display {
  padding-left: var(--space-1);
}

.day-of-week {
  font-family: var(--font-display);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-secondary);
  letter-spacing: var(--letter-spacing-wide);
}

.date-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.date-input:hover {
  border-color: var(--color-border-strong);
}

.date-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle), var(--shadow-sm);
}

.date-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  transition: opacity var(--transition-fast);
}

.date-input::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>
