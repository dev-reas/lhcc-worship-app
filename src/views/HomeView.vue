<template>
  <div class="home-view">
    <section class="greeting-section">
      <p class="greeting-date">{{ formattedDate }}</p>
      <h1 class="greeting-title">{{ greeting }}</h1>
      <p class="greeting-subtitle">Here's what's happening in your worship ministry.</p>
    </section>

    <div class="divider-ornate"></div>

    <section class="upcoming-section">
      <div class="section-header">
        <h2 class="section-title">Upcoming Lineups</h2>
        <router-link to="/lineups" class="section-link">View all →</router-link>
      </div>
      <div v-if="upcomingLineups.length" class="lineup-cards">
        <router-link
          v-for="lineup in upcomingLineups"
          :key="lineup.id"
          :to="`/lineups/${lineup.id}`"
          class="lineup-card paper-surface"
        >
          <div class="lineup-date-badge">
            <span class="lineup-day">{{ formatDay(lineup.date) }}</span>
            <span class="lineup-month">{{ formatMonth(lineup.date) }}</span>
          </div>
          <div class="lineup-info">
            <h3 class="lineup-name">{{ lineup.name }}</h3>
            <p class="lineup-full-date">{{ formatFullDate(lineup.date) }}</p>
          </div>
          <span class="lineup-arrow">→</span>
        </router-link>
      </div>
      <EmptyState
        v-else
        icon="🎵"
        message="No upcoming lineups yet. Create one to get started."
        action-text="Create Lineup"
        @action="$router.push('/lineups/new')"
      />
    </section>

    <section class="actions-section">
      <h2 class="section-title">Quick Actions</h2>
      <div class="action-grid">
        <router-link to="/songs" class="action-card">
          <div class="action-icon action-icon-songs">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <h3 class="action-title">Browse Songs</h3>
          <p class="action-desc">View and manage the song library</p>
        </router-link>
        <router-link to="/lineups/new" class="action-card">
          <div class="action-icon action-icon-lineup">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
          </div>
          <h3 class="action-title">Create Lineup</h3>
          <p class="action-desc">Build a new worship setlist</p>
        </router-link>
        <router-link to="/templates" class="action-card">
          <div class="action-icon action-icon-templates">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10,9 9,9 8,9" />
            </svg>
          </div>
          <h3 class="action-title">Templates</h3>
          <p class="action-desc">Reusable lineup templates</p>
        </router-link>
      </div>
    </section>

    <section class="recent-section">
      <div class="section-header">
        <h2 class="section-title">Recently Updated</h2>
        <router-link to="/songs" class="section-link">View all →</router-link>
      </div>
      <div v-if="recentSongs.length" class="recent-list">
        <router-link
          v-for="song in recentSongs"
          :key="song.id"
          :to="`/songs/${song.id}`"
          class="recent-item paper-surface"
        >
          <div class="recent-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <div class="recent-info">
            <h4 class="recent-title">{{ song.title }}</h4>
            <p class="recent-meta">{{ song.artist }} · {{ song.key }}</p>
          </div>
          <span class="recent-date">{{ formatRelativeDate(song.updatedAt) }}</span>
        </router-link>
      </div>
      <EmptyState
        v-else
        icon="📖"
        message="No songs yet. Add your first song to begin building your library."
        action-text="Add Song"
        @action="$router.push('/songs/new')"
      />
    </section>

    <div v-if="isLeader" class="leader-section">
      <div class="divider"></div>
      <h2 class="section-title">Leader Tools</h2>
      <div class="leader-actions">
        <button class="leader-btn" @click="exportData">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export Data
        </button>
        <button class="leader-btn" @click="triggerImport">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17,8 12,3 7,8" /><line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Import Data
        </button>
        <input
          ref="fileInput"
          type="file"
          accept=".json"
          class="sr-only"
          @change="importData"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useSongStore } from '@/stores/songStore'
import { useLineupStore } from '@/stores/lineupStore'
import { useRole } from '@/composables/useRole'
import EmptyState from '@/components/common/EmptyState.vue'

const songStore = useSongStore()
const lineupStore = useLineupStore()
const { isLeader } = useRole()

const fileInput = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  await Promise.all([songStore.fetchSongs(), lineupStore.fetchLineups()])
})

const today = new Date()

const formattedDate = computed(() => {
  return today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const greeting = computed(() => {
  const hour = today.getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
})

const upcomingLineups = computed(() => {
  const todayStr = today.toISOString().split('T')[0]
  return lineupStore.sortedLineups
    .filter((l) => l.date >= todayStr)
    .slice(0, 3)
})

const recentSongs = computed(() => {
  return songStore.sortedSongs.slice(0, 4)
})

function formatDay(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { day: 'numeric' })
}

function formatMonth(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short' })
}

function formatFullDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatRelativeDate(isoStr: string): string {
  const date = new Date(isoStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function exportData() {
  const data = {
    songs: songStore.songs,
    lineups: lineupStore.lineups,
    exportedAt: new Date().toISOString(),
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `lhcc-worship-backup-${today.toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function triggerImport() {
  fileInput.value?.click()
}

function importData(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = async () => {
    try {
      const data = JSON.parse(reader.result as string)
      if (data.songs?.length) {
        songStore.seedSongs(data.songs)
      }
      if (data.lineups?.length) {
        for (const lineup of data.lineups) {
          await lineupStore.createLineup(lineup)
        }
      }
    } catch {
      // silent fail on bad JSON
    }
  }
  reader.readAsText(file)
  input.value = ''
}
</script>

<style scoped>
.home-view {
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

/* ── Greeting ── */

.greeting-section {
  margin-bottom: var(--space-2);
}

.greeting-date {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-secondary);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.greeting-title {
  font-family: var(--font-display);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-2);
}

.greeting-subtitle {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

/* ── Section Headers ── */

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.section-title {
  font-family: var(--font-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.section-link {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.section-link:hover {
  color: var(--color-secondary-hover);
}

/* ── Upcoming Lineups ── */

.upcoming-section {
  margin-bottom: var(--space-10);
}

.lineup-cards {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.lineup-card {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  padding: var(--space-5);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
  text-decoration: none;
  transition: all var(--transition-base);
}

.lineup-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md), var(--shadow-glow);
  transform: translateY(-1px);
}

.lineup-date-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: var(--color-text-inverse);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.lineup-day {
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: 1;
}

.lineup-month {
  font-family: var(--font-body);
  font-size: var(--font-size-2xs);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  line-height: 1;
  margin-top: 2px;
}

.lineup-info {
  flex: 1;
  min-width: 0;
}

.lineup-name {
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-1);
}

.lineup-full-date {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.lineup-arrow {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.lineup-card:hover .lineup-arrow {
  color: var(--color-primary);
  transform: translateX(4px);
}

/* ── Quick Actions ── */

.actions-section {
  margin-bottom: var(--space-10);
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all var(--transition-base);
}

.action-card:hover {
  border-color: var(--color-secondary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}

.action-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-4);
  transition: all var(--transition-base);
}

.action-icon-songs {
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
}

.action-icon-lineup {
  background-color: var(--color-secondary-subtle);
  color: var(--color-secondary);
}

.action-icon-templates {
  background-color: var(--color-accent-light);
  color: var(--color-primary);
}

.action-card:hover .action-icon-songs {
  background-color: var(--color-primary);
  color: white;
}

.action-card:hover .action-icon-lineup {
  background-color: var(--color-secondary);
  color: white;
}

.action-card:hover .action-icon-templates {
  background-color: var(--color-primary);
  color: white;
}

.action-title {
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-1);
}

.action-desc {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: var(--line-height-normal);
}

/* ── Recent Songs ── */

.recent-section {
  margin-bottom: var(--space-10);
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.recent-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  text-decoration: none;
  transition: all var(--transition-base);
}

.recent-item:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.recent-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: var(--color-surface-sunken);
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.recent-info {
  flex: 1;
  min-width: 0;
}

.recent-title {
  font-family: var(--font-display);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-meta {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.recent-date {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  flex-shrink: 0;
}

/* ── Leader Tools ── */

.leader-section {
  animation: fade-up 0.5s ease-out;
}

.leader-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.leader-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
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

.leader-btn:hover {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .home-view {
    padding: var(--space-6) var(--space-4);
  }

  .greeting-title {
    font-size: var(--font-size-3xl);
  }

  .action-grid {
    grid-template-columns: 1fr;
  }

  .leader-actions {
    flex-direction: column;
  }

  .leader-btn {
    justify-content: center;
  }
}
</style>
