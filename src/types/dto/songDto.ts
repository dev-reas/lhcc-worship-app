import type { SongStructure } from '../entities/song'

export interface CreateSongDto {
  title: string
  artist: string
  key: string
  bpm: number
  lyrics: string
  chordChart: string
  structure?: SongStructure[]
}

export interface UpdateSongDto {
  title?: string
  artist?: string
  key?: string
  bpm?: number
  lyrics?: string
  chordChart?: string
  structure?: SongStructure[]
}
