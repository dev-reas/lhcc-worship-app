export interface MashupData {
  songIds: string[]
  arrangement: string
  order: number[]
}

export interface LineupEntry {
  id: string
  lineupId: string
  songId: string
  order: number
  key: string
  bpm: number
  notes: string
  isMashup: boolean
  mashupData: MashupData | null
  transitionNotes: string | null
}
