<template>
  <div class="lineup-detail-view">
    <LoadingSpinner v-if="loading" size="lg" />

    <template v-else-if="lineup">
      <header class="detail-header">
        <div class="header-top">
          <router-link to="/lineups" class="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15,18 9,12 15,6" />
            </svg>
            Lineups
          </router-link>
          <div v-if="isLeader" class="header-actions">
            <router-link :to="`/lineups/${lineup.id}/edit`" class="action-btn action-btn--edit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </router-link>
            <button class="action-btn action-btn--template" @click="showTemplateDialog = true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
              </svg>
              Save as Template
            </button>
            <button class="action-btn action-btn--delete" @click="confirmDelete = true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3,6 5,6 21,6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
              Delete
            </button>
          </div>
        </div>

        <div class="header-content">
          <div class="header-date-badge">
            <span class="badge-day">{{ dayNum }}</span>
            <span class="badge-month">{{ monthShort }}</span>
          </div>
          <div class="header-text">
            <h1 class="detail-title">{{ lineup.name }}</h1>
            <p class="detail-date">{{ dayOfWeek }}, {{ monthFull }} {{ dayNum }}, {{ year }}</p>
            <p class="detail-count">
              {{ lineupEntries.length }} {{ lineupEntries.length === 1 ? 'song' : 'songs' }} in this setlist
            </p>
          </div>
        </div>
      </header>

      <div class="divider-ornate"></div>

      <section class="entries-section" v-if="lineupEntries.length">
        <TransitionGroup name="entry-list" tag="div" class="entries-list">
          <div v-for="(entry, idx) in lineupEntries" :key="entry.id" class="entry-wrapper">
            <div v-if="isLeader && idx > 0" class="reorder-controls">
              <button
                class="reorder-btn"
                title="Move up"
                :disabled="idx === 0"
                @click="moveEntry(idx, -1)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18,15 12,9 6,15" />
                </svg>
              </button>
              <button
                class="reorder-btn"
                title="Move down"
                :disabled="idx === lineupEntries.length - 1"
                @click="moveEntry(idx, 1)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </button>
            </div>

            <LineupEntryCard
              :entry="entry"
              :song="getSong(entry.songId)"
              @edit="editEntry(entry)"
              @remove="removeEntry(entry)"
            />

            <TransitionNotesInput
              v-if="isLeader && entryIdxHasKey(idx)"
              :model-value="entry.transitionNotes ?? ''"
              @update:model-value="(val: string) => updateTransitionNotes(entry.id, val)"
            />
          </div>
        </TransitionGroup>
      </section>

      <EmptyState
        v-else
        icon="🎵"
        message="No songs in this lineup yet. Edit this lineup to add songs."
        :action-text="isLeader ? 'Edit Lineup' : ''"
        @action="$router.push(`/lineups/${lineup.id}/edit`)"
      />

      <!-- Edit Entry Modal -->
      <Teleport to="body">
        <Transition name="confirm-overlay">
          <div v-if="editingEntry" class="edit-overlay" @click.self="editingEntry = null">
            <Transition name="confirm-slide" appear>
              <div v-if="editingEntry" class="edit-modal">
                <h3 class="edit-modal-title">Edit Entry</h3>
                <div class="edit-fields">
                  <label class="edit-label">Key</label>
                  <input v-model="editForm.key" class="edit-input" type="text" />
                  <label class="edit-label">BPM</label>
                  <input v-model.number="editForm.bpm" class="edit-input" type="number" min="1" max="300" />
                  <label class="edit-label">Notes</label>
                  <textarea v-model="editForm.notes" class="edit-textarea" rows="2"></textarea>
                  <label class="edit-label">Transition Notes</label>
                  <textarea v-model="editForm.transitionNotes" class="edit-textarea" rows="2" placeholder="Add transition notes..."></textarea>
                </div>
                <div class="edit-actions">
                  <button class="btn btn--ghost" @click="editingEntry = null">Cancel</button>
                  <button class="btn btn--primary" @click="saveEntryEdit">Save</button>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </Teleport>

      <!-- Save as Template Dialog -->
      <Teleport to="body">
        <Transition name="confirm-overlay">
          <div v-if="showTemplateDialog" class="edit-overlay" @click.self="showTemplateDialog = false">
            <Transition name="confirm-slide" appear>
              <div v-if="showTemplateDialog" class="edit-modal">
                <h3 class="edit-modal-title">Save as Template</h3>
                <div class="edit-fields">
                  <label class="edit-label">Template Name</label>
                  <input
                    v-model="templateName"
                    class="edit-input"
                    type="text"
                    placeholder="e.g. Standard Sunday Set"
                  />
                </div>
                <div class="edit-actions">
                  <button class="btn btn--ghost" @click="showTemplateDialog = false">Cancel</button>
                  <button class="btn btn--primary" :disabled="!templateName.trim()" @click="saveAsTemplate">Save Template</button>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </Teleport>

      <ConfirmDialog
        title="Delete Lineup"
        message="Are you sure you want to delete this lineup? This action cannot be undone."
        confirm-text="Delete"
        :visible="confirmDelete"
        variant="danger"
        @confirm="handleDelete"
        @cancel="confirmDelete = false"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLineupStore } from '@/stores/lineupStore'
import { useSongStore } from '@/stores/songStore'
import { useRole } from '@/composables/useRole'
import LineupEntryCard from '@/components/lineups/LineupEntryCard.vue'
import TransitionNotesInput from '@/components/lineups/TransitionNotesInput.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import type { LineupEntry } from '@/types/entities/lineupEntry'

const route = useRoute()
const router = useRouter()
const lineupStore = useLineupStore()
const songStore = useSongStore()
const { isLeader } = useRole()

const loading = ref(true)
const confirmDelete = ref(false)
const showTemplateDialog = ref(false)
const templateName = ref('')
const editingEntry = ref<LineupEntry | null>(null)
const editForm = reactive({ key: '', bpm: 120, notes: '', transitionNotes: '' })

const lineup = computed(() => {
  return lineupStore.lineups.find((l) => l.id === route.params.id) ?? null
})

const lineupEntries = computed(() => {
  if (!lineup.value) return []
  return lineupStore.getEntriesForLineup(lineup.value.id)
})

const dateObj = computed(() => {
  if (!lineup.value) return new Date()
  return new Date(lineup.value.date + 'T00:00:00')
})

const dayNum = computed(() => dateObj.value.getDate())
const monthShort = computed(() => dateObj.value.toLocaleDateString('en-US', { month: 'short' }))
const monthFull = computed(() => dateObj.value.toLocaleDateString('en-US', { month: 'long' }))
const dayOfWeek = computed(() => dateObj.value.toLocaleDateString('en-US', { weekday: 'long' }))
const year = computed(() => dateObj.value.getFullYear())

onMounted(async () => {
  await Promise.all([lineupStore.fetchLineups(), songStore.fetchSongs()])
  loading.value = false
})

function getSong(songId: string) {
  return songStore.songs.find((s) => s.id === songId) ?? null
}

function entryIdxHasKey(idx: number): boolean {
  return idx < lineupEntries.value.length - 1
}

function editEntry(entry: LineupEntry) {
  editingEntry.value = entry
  editForm.key = entry.key
  editForm.bpm = entry.bpm
  editForm.notes = entry.notes
  editForm.transitionNotes = entry.transitionNotes ?? ''
}

async function saveEntryEdit() {
  if (!editingEntry.value) return
  await lineupStore.updateEntry(editingEntry.value.id, {
    key: editForm.key,
    bpm: editForm.bpm,
    notes: editForm.notes,
    transitionNotes: editForm.transitionNotes || null,
  })
  editingEntry.value = null
}

async function removeEntry(entry: LineupEntry) {
  await lineupStore.deleteEntry(entry.id)
}

async function moveEntry(fromIdx: number, direction: -1 | 1) {
  const entries = [...lineupEntries.value]
  const toIdx = fromIdx + direction
  if (toIdx < 0 || toIdx >= entries.length) return

  const fromEntry = entries[fromIdx]
  const toEntry = entries[toIdx]

  await lineupStore.reorderEntries([
    { id: fromEntry.id, order: toEntry.order },
    { id: toEntry.id, order: fromEntry.order },
  ])
}

async function updateTransitionNotes(entryId: string, value: string) {
  await lineupStore.updateEntry(entryId, {
    transitionNotes: value || null,
  })
}

async function saveAsTemplate() {
  if (!lineup.value || !templateName.value.trim()) return
  await lineupStore.saveAsTemplate(lineup.value.id, templateName.value)
  showTemplateDialog.value = false
  templateName.value = ''
}

async function handleDelete() {
  if (!lineup.value) return
  await lineupStore.deleteLineup(lineup.value.id)
  router.push('/lineups')
}
</script>

<style scoped>
.lineup-detail-view {
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

.detail-header {
  margin-bottom: var(--space-2);
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  text-decoration: none;
  transition: all var(--transition-base);
}

.action-btn--edit {
  color: var(--color-primary);
  background-color: var(--color-primary-subtle);
}

.action-btn--edit:hover {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border-color: var(--color-primary);
}

.action-btn--template {
  color: var(--color-secondary);
  background-color: var(--color-secondary-subtle);
}

.action-btn--template:hover {
  background-color: var(--color-secondary);
  color: var(--color-text-inverse);
  border-color: var(--color-secondary);
}

.action-btn--delete {
  color: var(--color-error);
  background-color: var(--color-error-light);
}

.action-btn--delete:hover {
  background-color: var(--color-error);
  color: white;
  border-color: var(--color-error);
}

/* ── Header Content ── */

.header-content {
  display: flex;
  align-items: flex-start;
  gap: var(--space-6);
}

.header-date-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 80px;
  background: linear-gradient(145deg, var(--color-primary), var(--color-primary-light));
  color: var(--color-text-inverse);
  border-radius: var(--radius-xl);
  flex-shrink: 0;
  box-shadow: 0 6px 20px rgba(45, 74, 62, 0.25);
}

.badge-day {
  font-family: var(--font-display);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: 1;
}

.badge-month {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  opacity: 0.85;
  margin-top: 2px;
}

.header-text {
  flex: 1;
  min-width: 0;
}

.detail-title {
  font-family: var(--font-display);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-2);
}

.detail-date {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

.detail-count {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* ── Entries ── */

.entries-section {
  margin-top: var(--space-4);
}

.entries-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.entry-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.reorder-controls {
  display: flex;
  justify-content: center;
  gap: var(--space-1);
}

.reorder-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.reorder-btn:hover:not(:disabled) {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background-color: var(--color-primary-subtle);
}

.reorder-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ── Edit Modal ── */

.edit-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background-color: rgba(44, 36, 23, 0.4);
  backdrop-filter: blur(4px);
}

.edit-modal {
  width: 100%;
  max-width: 440px;
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-xl);
}

.edit-modal-title {
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-6);
}

.edit-fields {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.edit-label {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.edit-input,
.edit-textarea {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast);
}

.edit-textarea {
  resize: vertical;
  line-height: var(--line-height-normal);
}

.edit-input:focus,
.edit-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

.edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}

.btn {
  padding: var(--space-2) var(--space-5);
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

.entry-list-enter-active {
  transition: all var(--transition-base);
}

.entry-list-leave-active {
  transition: all var(--transition-fast);
}

.entry-list-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.entry-list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* ── Responsive ── */

@media (max-width: 640px) {
  .lineup-detail-view {
    padding: var(--space-6) var(--space-4);
  }

  .header-top {
    flex-direction: column;
    gap: var(--space-4);
  }

  .header-actions {
    flex-wrap: wrap;
  }

  .header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-4);
  }

  .detail-title {
    font-size: var(--font-size-3xl);
  }
}
</style>
