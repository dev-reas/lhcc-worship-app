<template>
  <Teleport to="body">
    <Transition name="confirm-overlay">
      <div
        v-if="visible"
        class="confirm-overlay"
        @click.self="$emit('cancel')"
      >
        <Transition name="confirm-slide" appear>
          <div
            v-if="visible"
            class="confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            :aria-labelledby="titleId"
            :aria-describedby="msgId"
          >
            <div class="confirm-icon" :class="`confirm-icon--${variant}`">
              <svg v-if="variant === 'danger'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <svg v-else-if="variant === 'warning'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>

            <h2 :id="titleId" class="confirm-title">{{ title }}</h2>
            <p :id="msgId" class="confirm-message">{{ message }}</p>

            <div class="confirm-actions">
              <button
                class="confirm-btn confirm-btn--cancel"
                @click="$emit('cancel')"
              >
                Cancel
              </button>
              <button
                :class="['confirm-btn', `confirm-btn--${variant}`]"
                @click="$emit('confirm')"
              >
                {{ confirmText }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useId } from 'vue'

withDefaults(
  defineProps<{
    title: string
    message: string
    confirmText?: string
    visible: boolean
    variant?: 'danger' | 'warning' | 'info'
  }>(),
  {
    confirmText: 'Confirm',
    variant: 'danger',
  },
)

defineEmits<{
  confirm: []
  cancel: []
}>()

const titleId = `confirm-title-${useId()}`
const msgId = `confirm-msg-${useId()}`
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background-color: rgba(44, 36, 23, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

[data-theme='dark'] .confirm-overlay {
  background-color: rgba(0, 0, 0, 0.6);
}

.confirm-dialog {
  width: 100%;
  max-width: 400px;
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-xl);
  text-align: center;
}

.confirm-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-full);
  margin-bottom: var(--space-5);
}

.confirm-icon--danger {
  background-color: var(--color-error-light);
  color: var(--color-error);
}

.confirm-icon--warning {
  background-color: var(--color-warning-light);
  color: var(--color-warning);
}

.confirm-icon--info {
  background-color: var(--color-info-light);
  color: var(--color-info);
}

.confirm-title {
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.confirm-message {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
  margin-bottom: var(--space-6);
}

.confirm-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
}

.confirm-btn {
  padding: var(--space-2) var(--space-5);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-base);
}

.confirm-btn--cancel {
  color: var(--color-text-secondary);
  background: none;
  border-color: var(--color-border);
}

.confirm-btn--cancel:hover {
  background-color: var(--color-surface-sunken);
  color: var(--color-text);
}

.confirm-btn--danger {
  color: white;
  background-color: var(--color-error);
  border-color: var(--color-error);
}

.confirm-btn--danger:hover {
  background-color: #9A2E2E;
  box-shadow: var(--shadow-md);
}

.confirm-btn--warning {
  color: white;
  background-color: var(--color-warning);
  border-color: var(--color-warning);
}

.confirm-btn--warning:hover {
  background-color: #9E6824;
  box-shadow: var(--shadow-md);
}

.confirm-btn--info {
  color: white;
  background-color: var(--color-info);
  border-color: var(--color-info);
}

.confirm-btn--info:hover {
  background-color: #2E5A78;
  box-shadow: var(--shadow-md);
}

.confirm-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Transitions ── */

.confirm-overlay-enter-active,
.confirm-overlay-leave-active {
  transition: opacity var(--transition-base);
}

.confirm-overlay-enter-from,
.confirm-overlay-leave-to {
  opacity: 0;
}

.confirm-slide-enter-active {
  transition: opacity var(--transition-base), transform var(--transition-spring);
}

.confirm-slide-leave-active {
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.confirm-slide-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.96);
}

.confirm-slide-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>
