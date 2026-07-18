import type { SongStructureType } from '../enums/songStructure'

export interface SongStructure {
  type: SongStructureType
  label: string
  startLine: number
  endLine: number
}

export interface Song {
  id: string
  title: string
  artist: string
  key: string
  bpm: number
  lyrics: string
  chordChart: string
  nashvilleChart: string
  structure: SongStructure[]
  createdAt: string
  updatedAt: string
}
