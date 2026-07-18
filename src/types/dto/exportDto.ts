import type { Song } from '../entities/song'
import type { Lineup } from '../entities/lineup'
import type { LineupEntry } from '../entities/lineupEntry'
import type { UserPreference } from '../entities/userPreference'

export interface CreateNotificationDto {
  songId: string
  fromKey: string
  toKey: string
}

export interface ExportDataDto {
  version: string
  exportedAt: string
  data: {
    songs: Song[]
    lineups: Lineup[]
    lineupEntries: LineupEntry[]
    userPreferences: UserPreference[]
  }
}

export type ImportDataDto = ExportDataDto
