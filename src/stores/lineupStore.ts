import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Lineup } from '@/types/entities/lineup'
import type { LineupEntry } from '@/types/entities/lineupEntry'
import type { CreateLineupDto, UpdateLineupDto } from '@/types/dto/lineupDto'
import type { CreateLineupEntryDto, UpdateLineupEntryDto } from '@/types/dto/lineupEntryDto'
import { generateId } from '@/utils/id'
import { sortByDateDesc } from '@/utils/date'

const LINEUPS_KEY = 'lhcc-lineups'
const ENTRIES_KEY = 'lhcc-lineup-entries'

function loadLineups(): Lineup[] {
  try {
    const raw = localStorage.getItem(LINEUPS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadEntries(): LineupEntry[] {
  try {
    const raw = localStorage.getItem(ENTRIES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLineups(lineups: Lineup[]) {
  localStorage.setItem(LINEUPS_KEY, JSON.stringify(lineups))
}

function saveEntries(entries: LineupEntry[]) {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
}

export const useLineupStore = defineStore('lineup', () => {
  const lineups = ref<Lineup[]>(loadLineups())
  const entries = ref<LineupEntry[]>(loadEntries())
  const currentLineup = ref<Lineup | null>(null)
  const loading = ref(false)

  const sortedLineups = computed(() => {
    return [...lineups.value]
      .filter((l) => !l.isTemplate)
      .sort((a, b) => sortByDateDesc(a.date, b.date))
  })

  const templates = computed(() => {
    return [...lineups.value]
      .filter((l) => l.isTemplate)
      .sort((a, b) => a.name.localeCompare(b.name))
  })

  function getEntriesForLineup(lineupId: string): LineupEntry[] {
    return entries.value
      .filter((e) => e.lineupId === lineupId)
      .sort((a, b) => a.order - b.order)
  }

  async function fetchLineups() {
    loading.value = true
    try {
      lineups.value = loadLineups()
      entries.value = loadEntries()
    } finally {
      loading.value = false
    }
  }

  async function createLineup(dto: CreateLineupDto): Promise<Lineup> {
    const now = new Date().toISOString()
    const lineup: Lineup = {
      id: generateId(),
      name: dto.name.trim(),
      date: dto.date,
      isTemplate: dto.isTemplate ?? false,
      templateId: dto.templateId ?? null,
      createdAt: now,
      updatedAt: now,
    }
    lineups.value.push(lineup)
    saveLineups(lineups.value)
    return lineup
  }

  async function updateLineup(id: string, dto: UpdateLineupDto): Promise<Lineup> {
    const idx = lineups.value.findIndex((l) => l.id === id)
    if (idx === -1) throw new Error('Lineup not found')

    const existing = lineups.value[idx]
    const updated: Lineup = {
      ...existing,
      ...(dto.name !== undefined && { name: dto.name.trim() }),
      ...(dto.date !== undefined && { date: dto.date }),
      ...(dto.isTemplate !== undefined && { isTemplate: dto.isTemplate }),
      ...(dto.templateId !== undefined && { templateId: dto.templateId }),
      updatedAt: new Date().toISOString(),
    }
    lineups.value[idx] = updated
    saveLineups(lineups.value)
    return updated
  }

  async function deleteLineup(id: string): Promise<void> {
    // Cascade delete entries
    entries.value = entries.value.filter((e) => e.lineupId !== id)
    saveEntries(entries.value)

    lineups.value = lineups.value.filter((l) => l.id !== id)
    saveLineups(lineups.value)
  }

  async function getByDate(date: string): Promise<Lineup | null> {
    return lineups.value.find((l) => l.date === date && !l.isTemplate) ?? null
  }

  async function createEntry(dto: CreateLineupEntryDto): Promise<LineupEntry> {
    const entry: LineupEntry = {
      id: generateId(),
      lineupId: dto.lineupId,
      songId: dto.songId,
      order: dto.order,
      key: dto.key,
      bpm: dto.bpm,
      notes: dto.notes ?? '',
      isMashup: dto.isMashup ?? false,
      mashupData: dto.mashupData ?? null,
      transitionNotes: dto.transitionNotes ?? null,
    }
    entries.value.push(entry)
    saveEntries(entries.value)
    return entry
  }

  async function updateEntry(id: string, dto: UpdateLineupEntryDto): Promise<LineupEntry> {
    const idx = entries.value.findIndex((e) => e.id === id)
    if (idx === -1) throw new Error('Lineup entry not found')

    const existing = entries.value[idx]
    const updated: LineupEntry = {
      ...existing,
      ...dto,
    }
    entries.value[idx] = updated
    saveEntries(entries.value)
    return updated
  }

  async function deleteEntry(id: string): Promise<void> {
    entries.value = entries.value.filter((e) => e.id !== id)
    saveEntries(entries.value)
  }

  async function reorderEntries(reorderData: { id: string; order: number }[]): Promise<void> {
    for (const { id, order } of reorderData) {
      const idx = entries.value.findIndex((e) => e.id === id)
      if (idx !== -1) {
        entries.value[idx] = { ...entries.value[idx], order }
      }
    }
    saveEntries(entries.value)
  }

  async function deleteEntriesByLineupId(lineupId: string): Promise<void> {
    entries.value = entries.value.filter((e) => e.lineupId !== lineupId)
    saveEntries(entries.value)
  }

  async function saveAsTemplate(lineupId: string, name: string): Promise<Lineup> {
    const original = lineups.value.find((l) => l.id === lineupId)
    if (!original) throw new Error('Lineup not found')

    const now = new Date().toISOString()
    const template: Lineup = {
      id: generateId(),
      name: name.trim(),
      date: original.date,
      isTemplate: true,
      templateId: null,
      createdAt: now,
      updatedAt: now,
    }
    lineups.value.push(template)
    saveLineups(lineups.value)

    // Copy entries
    const originalEntries = getEntriesForLineup(lineupId)
    for (const entry of originalEntries) {
      await createEntry({
        lineupId: template.id,
        songId: entry.songId,
        order: entry.order,
        key: entry.key,
        bpm: entry.bpm,
        notes: entry.notes,
        isMashup: entry.isMashup,
        mashupData: entry.mashupData,
        transitionNotes: entry.transitionNotes,
      })
    }

    return template
  }

  return {
    lineups,
    entries,
    currentLineup,
    loading,
    sortedLineups,
    templates,
    getEntriesForLineup,
    fetchLineups,
    createLineup,
    updateLineup,
    deleteLineup,
    getByDate,
    createEntry,
    updateEntry,
    deleteEntry,
    reorderEntries,
    deleteEntriesByLineupId,
    saveAsTemplate,
  }
})
