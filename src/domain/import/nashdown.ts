import { NOTE_TO_SEMITONE, SEMITONE_TO_NOTE } from '@/domain/nashville/scaleMap'
import { tokenizeChord } from '@/domain/nashville/chordTokenizer'

interface NashdownMetadata {
  title?: string
  artist?: string
  key?: string
  bpm?: number
  style?: string
  time?: string
}

const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11]

function parseKeyHeader(header: string): { root: string; isMinor: boolean } {
  const chord = tokenizeChord(header.trim())
  if (!chord.root) return { root: header, isMinor: false }
  const q = chord.quality.toLowerCase()
  return { root: chord.root, isMinor: /^m(?!aj)/.test(q) }
}

function degreeToNote(degree: number, key: string, isMinor: boolean): string {
  const keySemitone = NOTE_TO_SEMITONE[key]
  if (keySemitone === undefined) return '?'

  const normalizedDegree = ((degree - 1) % 7 + 7) % 7

  let semitoneOffset: number
  if (isMinor) {
    const minorScale = [0, 2, 3, 5, 7, 8, 10]
    semitoneOffset = minorScale[normalizedDegree]
  } else {
    semitoneOffset = MAJOR_SCALE[normalizedDegree]
  }

  const semitone = (keySemitone + semitoneOffset) % 12
  return SEMITONE_TO_NOTE[semitone] ?? '?'
}

function parseChordToken(token: string, key: string, isMinor: boolean): string {
  if (token === 'x' || token === 'X') return '[N.C.]'
  if (token === '•' || token === '·') return ''

  let sharp = false
  let flat = false
  let degreeStr = ''
  let quality = ''

  let i = 0
  if (token[i] === 'b') {
    flat = true
    i++
  } else if (token[i] === '#') {
    sharp = true
    i++
  }

  while (i < token.length && /[0-9]/.test(token[i])) {
    degreeStr += token[i]
    i++
  }

  if (!degreeStr) return `[${token}]`

  let degree = parseInt(degreeStr, 10)
  if (degree < 1 || degree > 7) return `[${token}]`

  if (flat) degree--
  if (sharp) degree++
  degree = ((degree - 1) % 7 + 7) % 7 + 1

  const note = degreeToNote(degree, key, isMinor)
  if (note === '?') return `[${token}]`

  let result = note

  while (i < token.length) {
    const ch = token[i]
    if (ch === '-') {
      quality += 'm'
      i++
    } else if (ch === 'd' && i + 1 < token.length && token[i + 1] === '7') {
      quality += '7'
      i += 2
    } else if (ch === 'M' && i + 1 < token.length && token[i + 1] === '7') {
      quality += 'maj7'
      i += 2
    } else if (ch === 'm' && i + 1 < token.length && token[i + 1] === '7') {
      quality += 'm7'
      i += 2
    } else if (ch === 'o') {
      quality += 'dim'
      i++
    } else if (ch === '+') {
      quality += 'aug'
      i++
    } else if (ch === 's' && i + 2 < token.length && token[i + 1] === 'u' && token[i + 2] === 's') {
      quality += 'sus'
      i += 3
      if (i < token.length && /[2-9]/.test(token[i])) {
        quality += token[i]
        i++
      }
    } else if (ch === 'a' && i + 3 < token.length && token.slice(i, i + 4) === 'add9') {
      quality += 'add9'
      i += 4
    } else {
      quality += ch
      i++
    }
  }

  if (quality === 'm') quality = 'm'
  else if (quality === '') quality = ''

  return `[${result}${quality}]`
}

function isBarLine(line: string): boolean {
  const trimmed = line.trim()
  return /^\|[:\|]?$/.test(trimmed) || /^:\|$/.test(trimmed)
}

function isRepeatStart(line: string): boolean {
  return line.trim().startsWith('||:')
}

function isRepeatEnd(line: string): boolean {
  return line.trim().includes(':||')
}

function isNoteOrMetadataLine(line: string): boolean {
  const trimmed = line.trim()
  return /^[A-Za-z]+:/.test(trimmed) || /^\$/.test(trimmed)
}

function isDynamicMark(line: string): boolean {
  const trimmed = line.trim().toLowerCase()
  return /^(mp|mf|f|ff|pp|ppp|ffp|sfz|rfz)$/.test(trimmed)
}

function isCommentLine(line: string): boolean {
  return line.trim().startsWith('--')
}

function mapSectionType(name: string): string {
  const lower = name.toLowerCase().replace(/[^a-z]/g, '')

  if (lower === 'verse' || lower === 'v') return 'verse'
  if (lower === 'chorus' || lower === 'ch') return 'chorus'
  if (lower === 'prechorus' || lower === 'pre-chorus' || lower === 'pc') return 'verse'
  if (lower === 'bridge' || lower === 'br') return 'bridge'
  if (lower === 'intro' || lower === 'in') return 'intro'
  if (lower === 'outro' || lower === 'out') return 'outro'
  if (lower === 'tag') return 'tag'
  if (lower === 'instrumental' || lower === 'interlude' || lower === 'solo') return 'instrumental'
  if (lower === 'ending') return 'outro'

  return 'verse'
}

function parseMetadata(lines: string[]): NashdownMetadata {
  const meta: NashdownMetadata = {}

  for (const line of lines) {
    const trimmed = line.trim()

    const titleMatch = trimmed.match(/^"(.+)"$/)
    if (titleMatch) {
      meta.title = titleMatch[1]
      continue
    }

    const headerMatch = trimmed.match(/^([A-Za-z#][\w#-]*)\)?$/)
    if (headerMatch && !trimmed.includes(' ')) {
      continue
    }

    const infoMatch = trimmed.match(/^([A-Za-z/#]+),?\s+([A-Za-z/]+),?\s+([\d/]+),?\s*(\d+)?bpm$/i)
    if (infoMatch) {
      meta.key = infoMatch[1]
      meta.style = infoMatch[2]
      meta.time = infoMatch[3]
      if (infoMatch[4]) meta.bpm = parseInt(infoMatch[4], 10)
      continue
    }

    if (isNoteOrMetadataLine(trimmed)) {
      const kvMatch = trimmed.match(/^([A-Za-z]+):\s*(.+)$/)
      if (kvMatch) {
        const key = kvMatch[1].toLowerCase()
        const value = kvMatch[2].trim()
        if (key === 'title') meta.title = value
        else if (key === 'artist') meta.artist = value
        else if (key === 'key') meta.key = value
        else if (key === 'tempo') {
          const num = parseInt(value, 10)
          if (!isNaN(num)) meta.bpm = num
        }
      }
      continue
    }

    break
  }

  return meta
}

function processChordLine(line: string, key: string, isMinor: boolean): string {
  let result = line.trim()

  result = result.replace(/\s*\|\s*/g, ' | ')

  result = result.replace(/\s*_\s*/g, ' ')

  result = result.replace(/\s*'\s*/g, ' ')

  result = result.replace(/<([^>]+)>/g, '$1')

  result = result.replace(/\^(\d)/g, '$1')

  result = result.replace(/(\d)\|/g, '$1 |')
  result = result.replace(/\|(\d)/g, '| $1')

  const tokens = result.split(/\s+/)
  const processed = tokens.map(token => {
    if (token === '|' || token === '||:' || token === ':||' || token === '||' || token === '|:' || token === ':|') {
      return token
    }

    const cleaned = token.replace(/[|]/g, '')
    if (!cleaned) return ''

    return parseChordToken(cleaned, key, isMinor)
  }).filter(t => t !== '')

  return processed.join(' ')
}

export function convertNashdown(input: string): string {
  const lines = input.replace(/\r\n/g, '\n').replace(/^\uFEFF/, '').split('\n')

  const metadata = parseMetadata(lines)

  let startIdx = 0
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (trimmed === '') {
      startIdx = i + 1
      continue
    }

    const titleMatch = trimmed.match(/^"(.+)"$/)
    if (titleMatch) {
      startIdx = i + 1
      continue
    }

    const infoMatch = trimmed.match(/^([A-Za-z/#]+),?\s+([A-Za-z/]+),?\s+([\d/]+),?\s*(\d+)?bpm$/i)
    if (infoMatch) {
      startIdx = i + 1
      continue
    }

    const kvMatch = trimmed.match(/^([A-Za-z]+):\s*(.+)$/)
    if (kvMatch && !trimmed.includes(' ')) {
      startIdx = i + 1
      continue
    }

    break
  }

  const key = metadata.key ?? 'C'
  const parsed = parseKeyHeader(key)
  const isMinor = parsed.isMinor
  const rootKey = parsed.root

  const output: string[] = []

  if (metadata.title) output.push(`{title: ${metadata.title}}`)
  if (metadata.artist) output.push(`{artist: ${metadata.artist}}`)
  if (metadata.key) output.push(`{key: ${metadata.key}}`)
  if (metadata.bpm) output.push(`{tempo: ${metadata.bpm}}`)

  let openSection: string | null = null

  function closeSection(): void {
    if (openSection) {
      output.push(`{end_of_${openSection}}`)
      openSection = null
    }
  }

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed === '') {
      closeSection()
      output.push('')
      continue
    }

    if (isDynamicMark(trimmed)) {
      output.push(`{comment: ${trimmed}}`)
      continue
    }

    if (isCommentLine(trimmed)) {
      const comment = trimmed.replace(/^--/, '').replace(/--$/, '').trim()
      if (comment) {
        output.push(`{comment: ${comment}}`)
      }
      continue
    }

    const sectionMatch = trimmed.match(/^#\s+(.+)$/)
    if (sectionMatch) {
      closeSection()
      const sectionName = sectionMatch[1].trim()
      const sectionType = mapSectionType(sectionName)
      openSection = sectionType
      output.push(`{start_of_${sectionType}: ${sectionName}}`)
      continue
    }

    const parenMatch = trimmed.match(/^(.+)\)$/)
    if (parenMatch && !trimmed.includes(' ')) {
      const sectionName = parenMatch[1].trim()
      if (sectionName.length > 0 && sectionName.length < 20) {
        closeSection()
        const sectionType = mapSectionType(sectionName)
        openSection = sectionType
        output.push(`{start_of_${sectionType}: ${sectionName}}`)
        continue
      }
    }

    if (isBarLine(trimmed)) {
      if (isRepeatStart(trimmed)) {
        output.push('{comment: |:}')
      } else if (isRepeatEnd(trimmed)) {
        output.push('{comment: :|}')
      }
      continue
    }

    const hasRepeat = trimmed.includes(':||')
    let chordPart = trimmed
    let repeatSuffix = ''

    if (hasRepeat) {
      const repeatIdx = trimmed.indexOf(':||')
      chordPart = trimmed.slice(0, repeatIdx).trim()
      repeatSuffix = ' :||'
    }

    if (chordPart) {
      const processed = processChordLine(chordPart, rootKey, isMinor)
      if (processed) {
        output.push(processed + repeatSuffix)
      }
    }
  }

  closeSection()

  return output.join('\n')
}
