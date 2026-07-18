<template>
  <button
    class="section-marker"
    :class="{ 'section-marker--active': isActive }"
    @click="$emit('click')"
  >
    <span class="section-marker__dot" />
    <span class="section-marker__label">{{ section }}</span>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    section: string
    isActive?: boolean
  }>(),
  {
    isActive: false,
  },
)

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.section-marker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  background: rgba(30, 58, 47, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(123, 166, 114, 0.15);
  border-radius: 9999px;
  cursor: pointer;
  transition: all 200ms ease;
  white-space: nowrap;
  font-family: var(--font-body);
}

.section-marker:hover {
  background: rgba(45, 74, 62, 0.95);
  border-color: rgba(123, 166, 114, 0.3);
  transform: translateX(2px);
}

.section-marker--active {
  background: rgba(123, 166, 114, 0.25);
  border-color: rgba(123, 166, 114, 0.5);
}

.section-marker--active .section-marker__dot {
  background: #7BA672;
  box-shadow: 0 0 6px rgba(123, 166, 114, 0.6);
}

.section-marker--active .section-marker__label {
  color: #E8E4DE;
}

.section-marker__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(168, 160, 152, 0.5);
  flex-shrink: 0;
  transition: all 200ms ease;
}

.section-marker__label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(168, 160, 152, 0.8);
  transition: color 200ms ease;
}
</style>
