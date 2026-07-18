<template>
  <div class="template-list-view">
    <header class="view-header">
      <div class="header-text">
        <h1 class="view-title">Templates</h1>
        <p class="view-subtitle">Reusable lineup templates for your worship services</p>
      </div>
      <router-link
        v-if="isLeader"
        to="/lineups/new"
        class="create-btn"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        New Template
      </router-link>
    </header>

    <LoadingSpinner v-if="loading" size="lg" />

    <template v-else>
      <div v-if="templates.length" class="template-grid">
        <router-link
          v-for="template in templates"
          :key="template.id"
          :to="`/templates/${template.id}`"
          class="template-card paper-surface"
        >
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ template.name }}</h3>
            <p class="card-meta">
              {{ getEntryCount(template.id) }} {{ getEntryCount(template.id) === 1 ? 'song' : 'songs' }}
              · Created {{ formatDate(template.createdAt) }}
            </p>
          </div>
          <span class="card-arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </span>
        </router-link>
      </div>

      <EmptyState
        v-else
        icon="📄"
        message="No templates yet. Save a lineup as a template to reuse your setlist arrangements."
        :action-text="isLeader ? 'Create Lineup' : ''"
        @action="$router.push('/lineups/new')"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useLineupStore } from '@/stores/lineupStore'
import { useRole } from '@/composables/useRole'
import EmptyState from '@/components/common/EmptyState.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const lineupStore = useLineupStore()
const { isLeader } = useRole()
const loading = ref(true)

onMounted(async () => {
  await lineupStore.fetchLineups()
  loading.value = false
})

const templates = computed(() => lineupStore.templates)

function getEntryCount(lineupId: string): number {
  return lineupStore.getEntriesForLineup(lineupId).length
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.template-list-view {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
  animation: fade-up 0.5s ease-out;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Header ── */

.view-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-8);
}

.view-title {
  font-family: var(--font-display);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-1);
}

.view-subtitle {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.create-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-inverse);
  background: linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light));
  border: none;
  border-radius: var(--radius-lg);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 2px 8px rgba(184, 146, 74, 0.25);
}

.create-btn:hover {
  box-shadow: 0 4px 16px rgba(184, 146, 74, 0.35);
  transform: translateY(-1px);
}

/* ── Grid ── */

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-4);
}

.template-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
  text-decoration: none;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.template-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    145deg,
    rgba(184, 146, 74, 0.03) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.template-card:hover {
  border-color: var(--color-secondary);
  box-shadow: var(--shadow-md), 0 0 20px rgba(184, 146, 74, 0.08);
  transform: translateY(-2px);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-secondary-subtle), var(--color-secondary-light));
  color: var(--color-secondary);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
  transition: all var(--transition-base);
}

.template-card:hover .card-icon {
  background: linear-gradient(135deg, var(--color-secondary), var(--color-secondary-hover));
  color: white;
  box-shadow: 0 4px 12px rgba(184, 146, 74, 0.3);
}

.card-body {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-meta {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.card-arrow {
  color: var(--color-text-muted);
  transition: all var(--transition-base);
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(-4px);
}

.template-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--color-secondary);
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .template-list-view {
    padding: var(--space-6) var(--space-4);
  }

  .view-header {
    flex-direction: column;
    gap: var(--space-4);
  }

  .view-title {
    font-size: var(--font-size-3xl);
  }

  .create-btn {
    width: 100%;
    justify-content: center;
  }

  .template-grid {
    grid-template-columns: 1fr;
  }
}
</style>
