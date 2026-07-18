<template>
  <button
    class="nashville-toggle"
    :class="{ 'nashville-toggle--active': modelValue }"
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :aria-label="modelValue ? 'Switch to chord view' : 'Switch to Nashville number view'"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span class="toggle-track">
      <span class="toggle-thumb"></span>
    </span>
    <span class="toggle-label">{{ modelValue ? 'Nashville' : 'Chords' }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<style scoped>
.nashville-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-1) 0;
  background: none;
  border: none;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.toggle-track {
  position: relative;
  width: 44px;
  height: 24px;
  background-color: var(--color-surface-sunken);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.nashville-toggle--active .toggle-track {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-spring);
}

.nashville-toggle--active .toggle-thumb {
  transform: translateX(20px);
  background-color: white;
}

.nashville-toggle:hover .toggle-track {
  border-color: var(--color-primary);
}

.nashville-toggle:focus-visible .toggle-track {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.toggle-label {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  transition: color var(--transition-base);
}

.nashville-toggle--active .toggle-label {
  color: var(--color-primary);
}
</style>
