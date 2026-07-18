<template>
  <div class="role-selector">
    <div class="role-bg">
      <div class="role-bg-orb role-bg-orb-1"></div>
      <div class="role-bg-orb role-bg-orb-2"></div>
      <div class="role-bg-orb role-bg-orb-3"></div>
    </div>

    <div class="role-content">
      <div class="role-brand">
        <div class="role-icon">
          <span>✦</span>
        </div>
        <h1 class="role-title">LHCC Worship</h1>
        <p class="role-subtitle">Lord of the Harvest Community Church</p>
      </div>

      <div class="divider-ornate"></div>

      <div class="role-prompt">
        <h2 class="role-heading">Welcome, worshipper</h2>
        <p class="role-description">
          Choose your role to begin. This helps us show you the right tools for your ministry.
        </p>
      </div>

      <div class="role-cards">
        <button
          class="role-card role-card-leader"
          @click="selectRole(Role.LEADER)"
        >
          <div class="role-card-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4l3.09 6.26L26 11.27l-5 4.87 1.18 6.88L16 19.77l-6.18 3.25L11 16.14l-5-4.87 6.91-1.01L16 4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="role-card-content">
            <h3 class="role-card-title">Worship Leader</h3>
            <p class="role-card-desc">
              Manage songs, create lineups, transpose keys, and guide the team
            </p>
          </div>
          <div class="role-card-arrow">→</div>
        </button>

        <button
          class="role-card role-card-member"
          @click="selectRole(Role.MEMBER)"
        >
          <div class="role-card-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M22 28v-2a4 4 0 00-4-4h-4a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="16" cy="11" r="4" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="role-card-content">
            <h3 class="role-card-title">Band Member</h3>
            <p class="role-card-desc">
              Browse songs, view lineups, practice with auto-scroll, and transpose on your device
            </p>
          </div>
          <div class="role-card-arrow">→</div>
        </button>
      </div>

      <p class="role-footer">
        You can change your role at any time from the header.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useRole } from '@/composables/useRole'
import { Role } from '@/types/enums/role'

const router = useRouter()
const { setRole } = useRole()

function selectRole(role: Role) {
  setRole(role)
  router.push('/home')
}
</script>

<style scoped>
.role-selector {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: var(--color-bg);
  overflow: hidden;
  padding: var(--space-6);
}

/* ── Background orbs ── */

.role-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.role-bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.12;
}

.role-bg-orb-1 {
  width: 500px;
  height: 500px;
  background: var(--color-primary);
  top: -10%;
  right: -10%;
  animation: float-1 20s ease-in-out infinite;
}

.role-bg-orb-2 {
  width: 400px;
  height: 400px;
  background: var(--color-secondary);
  bottom: -15%;
  left: -10%;
  animation: float-2 25s ease-in-out infinite;
}

.role-bg-orb-3 {
  width: 300px;
  height: 300px;
  background: var(--color-accent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float-3 18s ease-in-out infinite;
}

@keyframes float-1 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-30px, 20px); }
  66% { transform: translate(20px, -30px); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(20px, -30px); }
  66% { transform: translate(-20px, 10px); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.1); }
}

/* ── Content ── */

.role-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
  animation: fade-up 0.6s ease-out;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Brand ── */

.role-brand {
  text-align: center;
  margin-bottom: var(--space-4);
}

.role-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: white;
  border-radius: var(--radius-xl);
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-4);
  box-shadow: 0 8px 24px rgba(45, 74, 62, 0.25);
}

.role-title {
  font-family: var(--font-display);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
  line-height: 1;
  margin-bottom: var(--space-2);
}

.role-subtitle {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  letter-spacing: var(--letter-spacing-wide);
}

/* ── Prompt ── */

.role-prompt {
  text-align: center;
  margin-bottom: var(--space-8);
}

.role-heading {
  font-family: var(--font-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.role-description {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
  max-width: 340px;
  margin: 0 auto;
}

/* ── Role Cards ── */

.role-cards {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.role-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  text-align: left;
  transition: all var(--transition-base);
  cursor: pointer;
}

.role-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md), var(--shadow-glow);
  transform: translateY(-2px);
}

.role-card:active {
  transform: translateY(0);
}

.role-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-lg);
  flex-shrink: 0;
  transition: all var(--transition-base);
}

.role-card-leader .role-card-icon {
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
}

.role-card-member .role-card-icon {
  background-color: var(--color-secondary-subtle);
  color: var(--color-secondary);
}

.role-card-leader:hover .role-card-icon {
  background-color: var(--color-primary);
  color: white;
}

.role-card-member:hover .role-card-icon {
  background-color: var(--color-secondary);
  color: white;
}

.role-card-content {
  flex: 1;
  min-width: 0;
}

.role-card-title {
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-1);
}

.role-card-desc {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  line-height: var(--line-height-normal);
}

.role-card-arrow {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.role-card:hover .role-card-arrow {
  color: var(--color-primary);
  transform: translateX(4px);
}

/* ── Footer ── */

.role-footer {
  text-align: center;
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
</style>
