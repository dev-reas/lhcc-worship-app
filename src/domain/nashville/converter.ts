import { NOTE_TO_SEMITONE } from './scaleMap'
import { tokenizeChord } from './chordTokenizer'
import type { ChordToken } from '@/types'

const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11]
const MINOR_SCALE_INTERVALS = [0, 2, 3, 5, 7, 8, 10]

const MAJOR_CHROMATIC: Record<number, string> = {
  0: '1', 1: 'b2', 2: '2', 3: 'b3', 4: '3', 5: '4',
  6: '#4', 7: '5', 8: 'b6', 9: '6', 10: 'b7', 11: '7',
}

const MINOR_CHROMATIC: Record<number, string> = {
  0: '1', 1: 'b2', 2: '2', 3: '3', 4: '#3', 5: '4',
  6: '#4', 7: '5', 8: '6', 9: '#6', 10: '7', 11: '#7',
}

function parseKey(key: string): { root: string; isMinor: boolean } {
  const chord = tokenizeChord(key)
  if (!chord.root) return { root: key, isMinor: false }
  const q = chord.quality.toLowerCase()
  return { root: chord.root, isMinor: /^m(?!aj)/.test(q) }
}

function getDegreeOffset(note: string, key: string): number | null {
  const n = NOTE_TO_SEMITONE[note]
  const k = NOTE_TO_SEMITONE[key]
  if (n === undefined || k === undefined) return null
  return ((n - k) + 12) % 12
}

function getDegreeString(note: string, key: string, isMinor: boolean): string {
  const offset = getDegreeOffset(note, key)
  if (offset === null) return '?'

  const intervals = isMinor ? MINOR_SCALE_INTERVALS : MAJOR_SCALE_INTERVALS
  const idx = intervals.indexOf(offset)
  if (idx !== -1) return String(idx + 1)

  const map = isMinor ? MINOR_CHROMATIC : MAJOR_CHROMATIC
  return map[offset] ?? '?'
}

function normalizeQuality(quality: string): string {
  if (quality === 'maj') return ''
  if (quality === 'min') return 'm'
  if (quality.startsWith('min')) return 'm' + quality.slice(3)
  return quality
}

function convertChordToken(chord: ChordToken, key: string): string {
  const { root, isMinor } = parseKey(key)

  const degreeStr = getDegreeString(chord.root, root, isMinor)
  const quality = normalizeQuality(chord.quality)
  let result = degreeStr + quality

  if (chord.bass) {
    const bassDegree = getDegreeString(chord.bass, root, isMinor)
    result += '/' + bassDegree
  }

  return result
}

export function convertToNashville(chordChart: string, key: string): string {
  return chordChart.replace(/\[([^\]]+)\]/g, (fullMatch, inner: string) => {
    const chord = tokenizeChord(inner)
    if (!chord.root) return fullMatch

    const nashville = convertChordToken(chord, key)
    return `[${nashville}]`
  })
}
