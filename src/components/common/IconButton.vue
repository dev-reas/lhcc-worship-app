<template>
  <button
    class="icon-btn"
    :class="[
      `icon-btn--${size}`,
      { 'icon-btn--disabled': disabled },
    ]"
    :disabled="disabled"
    :title="title"
    :aria-label="title"
    @click="$emit('click', $event)"
  >
    <span class="icon-btn__icon" v-html="icon"></span>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    title: string
  }>(),
  {
    size: 'md',
    disabled: false,
  },
)

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.icon-btn:hover:not(.icon-btn--disabled) {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.icon-btn:active:not(.icon-btn--disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-xs);
}

.icon-btn--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.icon-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.icon-btn--sm {
  width: 32px;
  height: 32px;
}

.icon-btn--sm :deep(svg) {
  width: 14px;
  height: 14px;
}

.icon-btn--md {
  width: 40px;
  height: 40px;
}

.icon-btn--md :deep(svg) {
  width: 18px;
  height: 18px;
}

.icon-btn--lg {
  width: 48px;
  height: 48px;
}

.icon-btn--lg :deep(svg) {
  width: 22px;
  height: 22px;
}

.icon-btn__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}
</style>
