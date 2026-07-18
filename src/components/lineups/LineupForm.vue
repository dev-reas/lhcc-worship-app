<template>
  <form class="lineup-form" @submit.prevent="handleSubmit">
    <div class="form-field">
      <label for="lineup-name" class="form-label">Lineup Name</label>
      <input
        id="lineup-name"
        v-model="name"
        type="text"
        class="form-input"
        placeholder="e.g. Sunday Worship, Easter Service"
        required
      />
    </div>

    <div class="form-field">
      <label class="form-label">Date</label>
      <DatePicker v-model="date" />
    </div>

    <div class="form-actions">
      <button type="button" class="btn btn--ghost" @click="$emit('cancel')">
        Cancel
      </button>
      <button type="submit" class="btn btn--primary" :disabled="!isValid">
        {{ lineup ? 'Save Changes' : 'Create Lineup' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Lineup } from '@/types/entities/lineup'
import DatePicker from '@/components/lineups/DatePicker.vue'

const props = defineProps<{
  lineup?: Lineup
}>()

const emit = defineEmits<{
  submit: [data: { name: string; date: string }]
  cancel: []
}>()

const name = ref(props.lineup?.name ?? '')
const date = ref(props.lineup?.date ?? new Date().toISOString().split('T')[0])

watch(
  () => props.lineup,
  (val) => {
    if (val) {
      name.value = val.name
      date.value = val.date
    }
  },
)

const isValid = computed(() => name.value.trim().length > 0 && date.value.length > 0)

function handleSubmit() {
  if (!isValid.value) return
  emit('submit', {
    name: name.value.trim(),
    date: date.value,
  })
}
</script>

<style scoped>
.lineup-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  letter-spacing: var(--letter-spacing-wide);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.form-input:hover {
  border-color: var(--color-border-strong);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle), var(--shadow-sm);
}

.form-input::placeholder {
  color: var(--color-text-muted);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-light);
}

.btn {
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--ghost {
  color: var(--color-text-secondary);
  background: none;
  border-color: var(--color-border);
}

.btn--ghost:hover:not(:disabled) {
  background-color: var(--color-surface-sunken);
  color: var(--color-text);
}

.btn--primary {
  color: var(--color-text-inverse);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  box-shadow: 0 2px 8px rgba(45, 74, 62, 0.2);
}

.btn--primary:hover:not(:disabled) {
  box-shadow: 0 4px 16px rgba(45, 74, 62, 0.3);
  transform: translateY(-1px);
}

.btn--primary:active:not(:disabled) {
  transform: translateY(0);
}
</style>
