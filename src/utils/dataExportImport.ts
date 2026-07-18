import type { ExportDataDto, ImportDataDto } from '@/types/dto/exportDto'
import type { Song } from '@/types/entities/song'
import type { Lineup } from '@/types/entities/lineup'
import type { LineupEntry } from '@/types/entities/lineupEntry'
import type { UserPreference } from '@/types/entities/userPreference'

const SONGS_KEY = 'lhcc-songs'
const LINEUPS_KEY = 'lhcc-lineups'
const ENTRIES_KEY = 'lhcc-lineup-entries'
const PREFS_KEY = 'lhcc-preferences'

function loadFromStorage<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function exportAllData(): ExportDataDto {
  return {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    data: {
      songs: loadFromStorage<Song>(SONGS_KEY),
      lineups: loadFromStorage<Lineup>(LINEUPS_KEY),
      lineupEntries: loadFromStorage<LineupEntry>(ENTRIES_KEY),
      userPreferences: loadFromStorage<UserPreference>(PREFS_KEY),
    },
  }
}

export function downloadExport(): void {
  const data = exportAllData()
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `lhcc-worship-backup-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function validateImportData(json: string): { valid: boolean; error?: string; data?: ImportDataDto } {
  try {
    const data = JSON.parse(json) as ImportDataDto

    if (!data.version || !data.exportedAt || !data.data) {
      return { valid: false, error: 'Invalid backup file format' }
    }

    if (!Array.isArray(data.data.songs)) {
      return { valid: false, error: 'Missing or invalid songs data' }
    }

    if (!Array.isArray(data.data.lineups)) {
      return { valid: false, error: 'Missing or invalid lineups data' }
    }

    return { valid: true, data }
  } catch {
    return { valid: false, error: 'Invalid JSON file' }
  }
}

export function importData(data: ImportDataDto, mode: 'merge' | 'replace' = 'merge'): {
  songsImported: number
  lineupsImported: number
} {
  if (mode === 'replace') {
    localStorage.setItem(SONGS_KEY, JSON.stringify(data.data.songs))
    localStorage.setItem(LINEUPS_KEY, JSON.stringify(data.data.lineups))
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(data.data.lineupEntries))
    localStorage.setItem(PREFS_KEY, JSON.stringify(data.data.userPreferences))
  } else {
    // Merge: append new items
    const existingSongs = loadFromStorage<Song>(SONGS_KEY)
    const existingIds = new Set(existingSongs.map((s) => s.id))
    const newSongs = data.data.songs.filter((s) => !existingIds.has(s.id))
    localStorage.setItem(SONGS_KEY, JSON.stringify([...existingSongs, ...newSongs]))

    const existingLineups = loadFromStorage<Lineup>(LINEUPS_KEY)
    const existingLineupIds = new Set(existingLineups.map((l) => l.id))
    const newLineups = data.data.lineups.filter((l) => !existingLineupIds.has(l.id))
    localStorage.setItem(LINEUPS_KEY, JSON.stringify([...existingLineups, ...newLineups]))

    const existingEntries = loadFromStorage<LineupEntry>(ENTRIES_KEY)
    const existingEntryIds = new Set(existingEntries.map((e) => e.id))
    const newEntries = data.data.lineupEntries.filter((e) => !existingEntryIds.has(e.id))
    localStorage.setItem(ENTRIES_KEY, JSON.stringify([...existingEntries, ...newEntries]))
  }

  return {
    songsImported: data.data.songs.length,
    lineupsImported: data.data.lineups.length,
  }
}

export function triggerImport(): Promise<{ valid: boolean; data?: ImportDataDto; error?: string }> {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) {
        resolve({ valid: false, error: 'No file selected' })
        return
      }
      const text = await file.text()
      resolve(validateImportData(text))
    }
    input.click()
  })
}
