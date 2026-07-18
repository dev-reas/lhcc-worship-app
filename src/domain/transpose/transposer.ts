const NOTE_SEMITONES: Record<string, number> = {
  'C': 0, 'C#': 1, 'Db': 1,
  'D': 2, 'D#': 3, 'Eb': 3,
  'E': 4,
  'F': 5, 'F#': 6, 'Gb': 6,
  'G': 7, 'G#': 8, 'Ab': 8,
  'A': 9, 'A#': 10, 'Bb': 10,
  'B': 11,
}

const SHARP_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const FLAT_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

const QUALITY_PATTERN = '(?:maj|min|m|dim|aug|sus|add)?(?:[0-9])?(?:[\/]?[A-Ga-g][#b]?)?'
const CHORD_PATTERN = new RegExp(
  `\\[([A-Ga-g][#b]?${QUALITY_PATTERN})\\]`,
  'g',
)

const CHORD_CAPTURE = new RegExp(
  `^([A-Ga-g][#b]?)(.*)$`,
)

function parseNote(note: string): { name: string; isFlat: boolean } {
  const first = note[0].toUpperCase()
  const accidental = note.slice(1)
  const isFlat = accidental === 'b'
  return { name: first, isFlat }
}

function noteToSemitone(note: string): number {
  const key = note[0].toUpperCase() + note.slice(1)
  if (key in NOTE_SEMITONES) {
    return NOTE_SEMITONES[key]
  }
  return NOTE_SEMITONES[note[0].toUpperCase()] ?? 0
}

function semitoneToNote(semi: number, preferFlat: boolean): string {
  const normalized = ((semi % 12) + 12) % 12
  return preferFlat ? FLAT_NOTES[normalized] : SHARP_NOTES[normalized]
}

function shiftNote(note: string, interval: number, preferFlat: boolean): string {
  const { name, isFlat } = parseNote(note)
  const sourceKey = isFlat ? name.toLowerCase() + 'b' : name
  const semitone = noteToSemitone(sourceKey)
  const targetSemitone = (semitone + interval) % 12
  return semitoneToNote(targetSemitone, preferFlat)
}

function transposeChordString(chord: string, interval: number, preferFlat: boolean): string {
  const match = chord.match(CHORD_CAPTURE)
  if (!match) return chord

  const root = match[1]
  const rest = match[2]

  const slashIdx = rest.indexOf('/')
  if (slashIdx !== -1) {
    const quality = rest.slice(0, slashIdx)
    const bass = rest.slice(slashIdx + 1)
    const newRoot = shiftNote(root, interval, preferFlat)
    const newBass = shiftNote(bass, interval, preferFlat)
    return `${newRoot}${quality}/${newBass}`
  }

  const newRoot = shiftNote(root, interval, preferFlat)
  return `${newRoot}${rest}`
}

export function transposeChord(chord: string, fromKey: string, toKey: string): string {
  const fromSemitone = noteToSemitone(fromKey)
  const toSemitone = noteToSemitone(toKey)
  const interval = (toSemitone - fromSemitone + 12) % 12
  if (interval === 0) return chord

  const preferFlat = fromKey.includes('b') || toKey.includes('b')
  return transposeChordString(chord, interval, preferFlat)
}

export function transposeChordPro(chordPro: string, fromKey: string, toKey: string): string {
  const fromSemitone = noteToSemitone(fromKey)
  const toSemitone = noteToSemitone(toKey)
  const interval = (toSemitone - fromSemitone + 12) % 12
  if (interval === 0) return chordPro

  const preferFlat = fromKey.includes('b') || toKey.includes('b')

  const lines = chordPro.split('\n')
  return lines.map((line) => {
    const trimmed = line.trim()

    if (trimmed.startsWith('#')) return line
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) return line
    if (trimmed.startsWith('[') && trimmed.endsWith(']') && !trimmed.match(/^\[.*\].*\[/)) {
      if (!trimmed.match(/^\[[A-Ga-g]/)) return line
    }

    return line.replace(CHORD_PATTERN, (_match, chordBody: string) => {
      const transposed = transposeChordString(chordBody, interval, preferFlat)
      return `[${transposed}]`
    })
  }).join('\n')
}
