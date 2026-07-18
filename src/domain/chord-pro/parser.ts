import { tokenizeChordPro } from './tokenizer'
import type { ChordProDocument, ChordProSection, ChordProLine, ChordToken } from '@/types'

const CHORD_ROOT = /^([A-G][#b]?)(.*)/

const METADATA_ALIASES: Record<string, keyof ChordProDocument['metadata']> = {
  t: 'title',
  title: 'title',
  st: 'artist',
  subtitle: 'artist',
  artist: 'artist',
  key: 'key',
  tempo: 'tempo',
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function parseChordString(raw: string): ChordToken {
  const trimmed = raw.trim()
  const match = trimmed.match(CHORD_ROOT)

  if (!match) {
    return { root: trimmed, quality: '', bass: null, raw: trimmed }
  }

  const root = match[1]
  let rest = match[2]

  let bass: string | null = null
  const slashIdx = rest.indexOf('/')
  if (slashIdx >= 0) {
    bass = rest.slice(slashIdx + 1).trim() || null
    rest = rest.slice(0, slashIdx)
  }

  return { root, quality: rest, bass, raw: trimmed }
}

interface LineSegment {
  chord: ChordToken | null
  text: string
}

function buildLineFromSegments(segments: LineSegment[]): ChordProLine {
  let lyrics = ''
  const chordMap = new Map<number, ChordToken>()

  for (const seg of segments) {
    if (seg.chord) {
      chordMap.set(lyrics.length, seg.chord)
    }
    lyrics += seg.text
  }

  if (chordMap.size === 0) {
    return { lyrics, chords: [], raw: reconstructRaw(segments) }
  }

  const chords: (ChordToken | null)[] = new Array(lyrics.length).fill(null)
  for (const [pos, chord] of chordMap) {
    if (pos < chords.length) {
      chords[pos] = chord
    }
  }

  return { lyrics, chords, raw: reconstructRaw(segments) }
}

function reconstructRaw(segments: LineSegment[]): string {
  let raw = ''
  for (const seg of segments) {
    if (seg.chord) {
      raw += `[${seg.chord.raw}]`
    }
    raw += seg.text
  }
  return raw
}

export function parseChordPro(chordPro: string): ChordProDocument {
  const tokens = tokenizeChordPro(chordPro)

  const metadata: ChordProDocument['metadata'] = {
    title: '',
    artist: '',
    key: '',
    tempo: null,
  }

  for (const token of tokens) {
    if (token.type !== 'metadata') continue

    const colonIdx = token.value.indexOf(':')
    if (colonIdx < 0) continue

    const name = token.value.slice(0, colonIdx).trim().toLowerCase()
    const value = token.value.slice(colonIdx + 1).trim()
    const field = METADATA_ALIASES[name]
    if (!field) continue

    if (field === 'tempo') {
      const num = parseInt(value, 10)
      metadata.tempo = isNaN(num) ? null : num
    } else {
      metadata[field] = value
    }
  }

  const sections: ChordProSection[] = []
  const sectionCounts = new Map<string, number>()
  let currentSection: ChordProSection | null = null
  let pendingSegments: LineSegment[] = []

  function flushLine(): void {
    if (!currentSection) return
    const line = buildLineFromSegments(pendingSegments)
    currentSection.lines.push(line)
    pendingSegments = []
  }

  function openSection(type: string, label?: string): void {
    const count = (sectionCounts.get(type) ?? 0) + 1
    sectionCounts.set(type, count)
    const sectionLabel = label || `${capitalize(type)} ${count}`
    currentSection = { type, label: sectionLabel, lines: [] }
    sections.push(currentSection)
  }

  function closeSection(): void {
    flushLine()
    currentSection = null
  }

  for (const token of tokens) {
    switch (token.type) {
      case 'section_start':
        closeSection()
        openSection(token.value, token.label)
        break

      case 'section_end':
        closeSection()
        break

      case 'chord': {
        if (!currentSection) openSection('verse')
        pendingSegments.push({ chord: parseChordString(token.value), text: '' })
        break
      }

      case 'lyrics': {
        if (!currentSection) openSection('verse')
        const last = pendingSegments[pendingSegments.length - 1]
        if (last && last.chord && last.text === '') {
          last.text = token.value
        } else {
          pendingSegments.push({ chord: null, text: token.value })
        }
        break
      }

      case 'newline':
        flushLine()
        break

      case 'metadata':
        break
    }
  }

  closeSection()

  if (sections.length === 0) {
    sections.push({ type: 'verse', label: 'Verse 1', lines: [] })
  }

  return { metadata, sections, raw: chordPro }
}
