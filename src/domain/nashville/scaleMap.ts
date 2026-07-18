export const SCALE_NOTES = [
  'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F',
  'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B',
] as const

export const NOTE_TO_SEMITONE: Record<string, number> = {
  'C': 0,
  'C#': 1, 'Db': 1,
  'D': 2,
  'D#': 3, 'Eb': 3,
  'E': 4,
  'F': 5,
  'F#': 6, 'Gb': 6,
  'G': 7,
  'G#': 8, 'Ab': 8,
  'A': 9,
  'A#': 10, 'Bb': 10,
  'B': 11,
  'Cb': 11,
  'E#': 5,
  'Fb': 4,
}

export const SEMITONE_TO_NOTE: Record<number, string> = {
  0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F',
  6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#', 11: 'B',
}

const MAJOR_SCALE_SEMITONES = [0, 2, 4, 5, 7, 9, 11]

const SEMITONE_TO_DEGREE: Record<number, number> = {}
for (let i = 0; i < MAJOR_SCALE_SEMITONES.length; i++) {
  SEMITONE_TO_DEGREE[MAJOR_SCALE_SEMITONES[i]] = i + 1
}

export function getScaleDegree(note: string, key: string): number | null {
  const noteSemitone = NOTE_TO_SEMITONE[note]
  const keySemitone = NOTE_TO_SEMITONE[key]
  if (noteSemitone === undefined || keySemitone === undefined) return null

  const interval = ((noteSemitone - keySemitone) + 12) % 12
  return SEMITONE_TO_DEGREE[interval] ?? null
}

export function getNoteFromSemitone(semitone: number): string {
  const normalized = ((semitone % 12) + 12) % 12
  return SEMITONE_TO_NOTE[normalized]
}
