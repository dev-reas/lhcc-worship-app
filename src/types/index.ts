export interface ChordToken {
  root: string
  quality: string
  bass: string | null
  raw: string
}

export interface ChordProLine {
  lyrics: string
  chords: (ChordToken | null)[]
  raw: string
}

export interface ChordProSection {
  type: string
  label: string
  lines: ChordProLine[]
}

export interface ChordProDocument {
  metadata: {
    title: string
    artist: string
    key: string
    tempo: number | null
  }
  sections: ChordProSection[]
  raw: string
}

export interface AutoScrollController {
  play(): void
  pause(): void
  rewind(): void
  forward(): void
  setBpm(bpm: number): void
  destroy(): void
}
