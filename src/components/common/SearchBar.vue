<template>
  <div class="search-bar">
    <span class="search-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </span>
    <input
      ref="inputRef"
      :value="modelValue"
      type="text"
      class="search-input"
      :placeholder="placeholder"
      @input="onInput"
      @keydown.escape="clear"
    />
    <button
      v-if="modelValue"
      class="search-clear"
      type="button"
      aria-label="Clear search"
      @click="clear"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
  }>(),
  {
    placeholder: 'Search...',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('update:modelValue', value)
  }, 250)
}

function clear() {
  if (debounceTimer) clearTimeout(debounceTimer)
  emit('update:modelValue', '')
  inputRef.value?.focus()
}

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

function focus() {
  inputRef.value?.focus()
}

defineExpose({ focus })
</script>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  transition: all var(--transition-base);
}

.search-bar:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle), var(--shadow-sm);
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: var(--space-4);
  color: var(--color-text-muted);
  pointer-events: none;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  padding: var(--space-3) var(--space-3);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  background: none;
  border: none;
  outline: none;
  min-width: 0;
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.search-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: var(--space-2);
  padding: 0;
  color: var(--color-text-muted);
  background: none;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.search-clear:hover {
  color: var(--color-text);
  background-color: var(--color-surface-sunken);
}
</style>
