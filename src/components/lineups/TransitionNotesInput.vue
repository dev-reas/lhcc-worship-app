<template>
  <div class="transition-input">
    <textarea
      ref="textareaRef"
      :value="modelValue"
      class="transition-textarea"
      placeholder="Add transition notes..."
      rows="2"
      @input="onInput"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  autoResize(target)
}

function autoResize(el: HTMLTextAreaElement) {
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

onMounted(async () => {
  if (textareaRef.value && props.modelValue) {
    await nextTick()
    autoResize(textareaRef.value)
  }
})
</script>

<style scoped>
.transition-input {
  width: 100%;
}

.transition-textarea {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  background-color: var(--color-surface-sunken);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  resize: none;
  overflow: hidden;
  line-height: var(--line-height-normal);
  transition: border-color var(--transition-fast);
}

.transition-textarea:focus {
  outline: none;
  border-color: var(--color-secondary);
  background-color: var(--color-surface);
}

.transition-textarea::placeholder {
  color: var(--color-text-muted);
  font-style: italic;
}
</style>
