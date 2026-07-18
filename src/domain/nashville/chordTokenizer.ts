import type { ChordToken } from '@/types'

const CHORD_REGEX = /^([A-G][#b]?)([^/]*)(?:\/([A-G][#b]?))?$/

export function tokenizeChord(chord: string): ChordToken {
  const trimmed = chord.trim()
  const match = trimmed.match(CHORD_REGEX)

  if (!match) {
    return { root: '', quality: '', bass: null, raw: chord }
  }

  return {
    root: match[1],
    quality: match[2] ?? '',
    bass: match[3] ?? null,
    raw: chord,
  }
}
