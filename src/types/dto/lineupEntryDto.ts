import type { MashupData } from '../entities/lineupEntry'

export interface CreateLineupEntryDto {
  lineupId: string
  songId: string
  order: number
  key: string
  bpm: number
  notes?: string
  isMashup?: boolean
  mashupData?: MashupData | null
  transitionNotes?: string | null
}

export interface UpdateLineupEntryDto {
  order?: number
  key?: string
  bpm?: number
  notes?: string
  isMashup?: boolean
  mashupData?: MashupData | null
  transitionNotes?: string | null
}
