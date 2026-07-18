import { tokenizeChord } from '@/domain/nashville/chordTokenizer'

const CHORD_LINE_THRESHOLD = 0.8

const SECTION_MAP: Record<string, string> = {
  verse: 'verse',
  v: 'verse',
  chorus: 'chorus',
  ch: 'chorus',
  prechorus: 'verse',
  'pre-chorus': 'verse',
  bridge: 'bridge',
  br: 'bridge',
  intro: 'intro',
  outro: 'outro',
  ending: 'outro',
  tag: 'tag',
  instrumental: 'instrumental',
  interlude: 'instrumental',
  solo: 'instrumental',
}

function mapSectionType(name: string): string {
  const key = name.toLowerCase().replace(/[^a-z]/g, '')
  if (key in SECTION_MAP) return SECTION_MAP[key]
  if (key.startsWith('verse')) return 'verse'
  if (key.startsWith('chorus')) return 'chorus'
  if (key.startsWith('bridge')) return 'bridge'
  if (key.startsWith('intro')) return 'intro'
  if (key.startsWith('outro') || key.startsWith('ending')) return 'outro'
  if (key.startsWith('tag')) return 'tag'
  return 'verse'
}

function isChordToken(word: string): boolean {
  const chord = tokenizeChord(word)
  return chord.root.length > 0
}

function isChordLine(line: string): boolean {
  const tokens = line.trim().split(/\s+/).filter(t => t.length > 0)
  if (tokens.length === 0) return false

  let chordCount = 0
  for (const token of tokens) {
    if (isChordToken(token)) chordCount++
  }

  return chordCount / tokens.length >= CHORD_LINE_THRESHOLD
}

function isSectionHeader(line: string): string | null {
  const trimmed = line.trim()

  const bracketMatch = trimmed.match(/^\[([^\]]+)\]$/)
  if (bracketMatch) return bracketMatch[1].trim()

  const hashMatch = trimmed.match(/^#{1,3}\s+(.+)$/)
  if (hashMatch) return hashMatch[1].trim()

  const capsMatch = trimmed.match(/^([A-Z][A-Z0-9 _-]+)$/)
  if (capsMatch && !isChordLine(trimmed)) return capsMatch[1].trim()

  return null
}

function extractChordsWithPositions(line: string): Array<{ chord: string; col: number }> {
  const chords: Array<{ chord: string; col: number }> = []
  const regex = /\S+/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(line)) !== null) {
    const token = match[0]
    if (isChordToken(token)) {
      chords.push({ chord: token, col: match.index })
    }
  }

  return chords
}

function mergeChordAndLyric(chordLine: string, lyricLine: string): string {
  const chords = extractChordsWithPositions(chordLine)
  if (chords.length === 0) return lyricLine

  let result = ''
  let pos = 0

  for (const { chord, col } of chords) {
    let insertAt = col
    while (insertAt < lyricLine.length && lyricLine[insertAt] === ' ') {
      insertAt++
    }
    if (insertAt >= lyricLine.length) {
      insertAt = lyricLine.length
    }

    result += lyricLine.slice(pos, insertAt)
    result += `[${chord}]`
    pos = insertAt
  }

  result += lyricLine.slice(pos)
  return result
}

function chordOnlyLine(chordLine: string): string {
  const chords = extractChordsWithPositions(chordLine)
  if (chords.length === 0) return chordLine

  let result = ''
  let pos = 0

  for (const { chord, col } of chords) {
    if (col > pos) result += ' '.repeat(col - pos)
    result += `[${chord}]`
    pos = col + chord.length
  }

  return result
}

interface ClassifiedLine {
  type: 'section' | 'chord' | 'lyric' | 'blank'
  content: string
  sectionName?: string
}

function classifyLines(lines: string[]): ClassifiedLine[] {
  const result: ClassifiedLine[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed === '') {
      result.push({ type: 'blank', content: '' })
      continue
    }

    const sectionName = isSectionHeader(trimmed)
    if (sectionName) {
      result.push({ type: 'section', content: trimmed, sectionName })
      continue
    }

    if (isChordLine(trimmed)) {
      result.push({ type: 'chord', content: line })
      continue
    }

    result.push({ type: 'lyric', content: line })
  }

  return result
}

export function convertChordsAboveLyrics(input: string): string {
  const lines = input.replace(/\r\n/g, '\n').replace(/^\uFEFF/, '').split('\n')
  const classified = classifyLines(lines)

  const output: string[] = []
  let openSection: string | null = null

  function closeSection(): void {
    if (openSection) {
      output.push(`{end_of_${openSection}}`)
      openSection = null
    }
  }

  let i = 0
  while (i < classified.length) {
    const entry = classified[i]

    if (entry.type === 'blank') {
      closeSection()
      output.push('')
      i++
      continue
    }

    if (entry.type === 'section') {
      closeSection()
      const sectionType = mapSectionType(entry.sectionName!)
      openSection = sectionType
      output.push(`{start_of_${sectionType}: ${entry.sectionName}}`)
      i++
      continue
    }

    if (entry.type === 'chord') {
      const nextEntry = classified[i + 1]

      if (nextEntry && nextEntry.type === 'lyric') {
        output.push(mergeChordAndLyric(entry.content, nextEntry.content))
        i += 2
      } else {
        output.push(chordOnlyLine(entry.content))
        i++
      }
      continue
    }

    if (entry.type === 'lyric') {
      output.push(entry.content)
      i++
      continue
    }

    i++
  }

  closeSection()

  return output.join('\n')
}
