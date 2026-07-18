<template>
  <div class="empty-state">
    <span class="empty-icon" aria-hidden="true">{{ icon }}</span>
    <p class="empty-message">{{ message }}</p>
    <button
      v-if="actionText"
      class="empty-action"
      @click="$emit('action')"
    >
      {{ actionText }}
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string
    message: string
    actionText?: string
  }>(),
  {
    icon: '✦',
    actionText: '',
  },
)

defineEmits<{
  action: []
}>()
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-6);
  text-align: center;
}

.empty-icon {
  font-size: var(--font-size-4xl);
  line-height: 1;
  margin-bottom: var(--space-4);
  opacity: 0.5;
  filter: grayscale(0.3);
}

.empty-message {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: var(--line-height-normal);
  max-width: 300px;
  margin-bottom: var(--space-6);
}

.empty-action {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-5);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  background-color: var(--color-primary-subtle);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.empty-action:hover {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}
</style>
