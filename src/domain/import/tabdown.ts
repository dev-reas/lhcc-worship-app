import { tokenizeChord } from '@/domain/nashville/chordTokenizer'

interface TabdownMetadata {
  title?: string
  artist?: string
  key?: string
  bpm?: number
  [key: string]: string | number | undefined
}

const METADATA_MAP: Record<string, string> = {
  'tuning': 'tuning',
  'capo': 'capo',
  'description': 'description',
  'instrument': 'instrument',
  'type': 'type',
  'song-part': 'section',
  'title': 'title',
  'artist': 'artist',
  'key': 'key',
  'tempo': 'bpm',
}

function parseMetadataLine(line: string): { key: string; value: string } | null {
  const match = line.match(/^%\s+([a-zA-Z-]+):\s*(.*)$/)
  if (!match) return null

  const rawKey = match[1].toLowerCase().trim()
  const value = match[2].trim()

  const mappedKey = METADATA_MAP[rawKey]
  if (!mappedKey) return null

  return { key: mappedKey, value }
}

function parseMetadata(lines: string[]): TabdownMetadata {
  const meta: TabdownMetadata = {}

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('%')) break

    const parsed = parseMetadataLine(trimmed)
    if (parsed) {
      if (parsed.key === 'bpm') {
        const num = parseInt(parsed.value, 10)
        if (!isNaN(num)) meta.bpm = num
      } else {
        meta[parsed.key] = parsed.value
      }
    }
  }

  return meta
}

function isSectionHeader(line: string): string | null {
  const trimmed = line.trim()

  const hashMatch = trimmed.match(/^#\s+(.+)$/)
  if (hashMatch) return hashMatch[1].trim()

  const titleMatch = trimmed.match(/^\*\*(.+)\*\*$/)
  if (titleMatch) return titleMatch[1].trim()

  return null
}

function mapSectionType(name: string): string {
  const lower = name.toLowerCase().replace(/[^a-z]/g, '')

  if (lower === 'verse' || lower.startsWith('verse')) return 'verse'
  if (lower === 'chorus' || lower.startsWith('chorus')) return 'chorus'
  if (lower === 'prechorus' || lower === 'pre-chorus') return 'verse'
  if (lower === 'bridge' || lower.startsWith('bridge')) return 'bridge'
  if (lower === 'intro' || lower.startsWith('intro')) return 'intro'
  if (lower === 'outro' || lower === 'ending' || lower.startsWith('outro')) return 'outro'
  if (lower === 'tag' || lower.startsWith('tag')) return 'tag'
  if (lower === 'instrumental' || lower === 'interlude' || lower === 'solo') return 'instrumental'

  return 'verse'
}

function isCommentLine(line: string): boolean {
  return line.trim().startsWith('//')
}

function isFingeringDefinition(line: string): boolean {
  return /^\[[^\]]+\]:\s*[x\dh-]+$/i.test(line.trim())
}

function isReferenceDefinition(line: string): boolean {
  return /^\[\d+\]:\s*[x\dh-]+$/i.test(line.trim())
}

function processLine(line: string): string {
  let result = line

  result = result.replace(/\\([[\]])/g, '$1')

  result = result.replace(/\[([^\]]+)\]\([^)]*\)/g, '[$1]')

  result = result.replace(/\[([^\]]+)\]\[\d+\]/g, '[$1]')

  const tokens = result.split(/(\[[^\]]+\])/g)
  result = tokens.map(token => {
    if (token.startsWith('[') && token.endsWith(']')) {
      const inner = token.slice(1, -1)
      const chord = tokenizeChord(inner)
      if (chord.root.length > 0) {
        return `[${inner}]`
      }
      return token
    }
    return token
  }).join('')

  return result
}

export function convertTabdown(input: string): string {
  const lines = input.replace(/\r\n/g, '\n').replace(/^\uFEFF/, '').split('\n')

  const metadata = parseMetadata(lines)

  let startIdx = 0
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trim().startsWith('%')) {
      startIdx = i
      break
    }
    if (i === lines.length - 1) startIdx = lines.length
  }

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

    if (isFingeringDefinition(trimmed) || isReferenceDefinition(trimmed)) {
      continue
    }

    if (isCommentLine(trimmed)) {
      const comment = trimmed.slice(2).trim()
      if (comment) {
        output.push(`{comment: ${comment}}`)
      }
      continue
    }

    const sectionName = isSectionHeader(trimmed)
    if (sectionName) {
      closeSection()
      const sectionType = mapSectionType(sectionName)
      openSection = sectionType
      output.push(`{start_of_${sectionType}: ${sectionName}}`)
      continue
    }

    output.push(processLine(line))
  }

  closeSection()

  return output.join('\n')
}
