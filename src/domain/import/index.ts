import { convertChordsAboveLyrics } from './chordsAboveLyrics'
import { convertTabdown } from './tabdown'
import { convertNashdown } from './nashdown'

export type ImportFormat = 'chordpro' | 'chordsAboveLyrics' | 'nashdown' | 'tabdown'

function hasChordProDirectives(input: string): boolean {
  return /\{(?:start_of_|end_of_|title|artist|key|tempo|capo)/.test(input)
}

function hasTabdownMetadata(input: string): boolean {
  return /^%\s+(?:tuning|capo|description|instrument|type|song-part):/m.test(input)
}

function hasNashdownSyntax(input: string): boolean {
  const lines = input.split('\n')
  let numericLines = 0
  let totalContentLines = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed === '' || trimmed.startsWith('#') || trimmed.startsWith('"')) continue
    if (/^[A-Za-z]+:/.test(trimmed) || /^\$/.test(trimmed)) continue
    totalContentLines++
    if (/^[\db][\d\-_ '/#<>+]+/.test(trimmed)) numericLines++
  }

  return totalContentLines > 0 && numericLines / totalContentLines > 0.5
}

function hasChordAboveLyrics(input: string): boolean {
  const lines = input.split('\n')
  let chordLines = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed === '') continue
    if (/^\[.+\]$/.test(trimmed)) continue
    if (/^#{1,3}\s/.test(trimmed)) continue
    if (/^[A-Z][A-Z0-9 _-]+$/.test(trimmed)) continue

    const tokens = trimmed.split(/\s+/).filter(t => t.length > 0)
    if (tokens.length === 0) continue

    let chordCount = 0
    for (const token of tokens) {
      if (/^[A-G][#b]?(?:m|min|dim|aug|sus[24]?|[0-9]|maj[0-9]?(?:\/[A-G][#b]?)?|[+]|(?:\/[A-G][#b]?))$/i.test(token)) {
        chordCount++
      }
    }

    if (chordCount / tokens.length > 0.7) chordLines++
  }

  return chordLines >= 2
}

export function detectFormat(input: string): ImportFormat {
  if (hasChordProDirectives(input)) return 'chordpro'
  if (hasTabdownMetadata(input)) return 'tabdown'
  if (hasNashdownSyntax(input)) return 'nashdown'
  if (hasChordAboveLyrics(input)) return 'chordsAboveLyrics'
  return 'chordsAboveLyrics'
}

export function importChart(input: string, format?: ImportFormat): string {
  const resolved = format ?? detectFormat(input)

  switch (resolved) {
    case 'chordpro':
      return input
    case 'chordsAboveLyrics':
      return convertChordsAboveLyrics(input)
    case 'tabdown':
      return convertTabdown(input)
    case 'nashdown':
      return convertNashdown(input)
    default:
      return input
  }
}

export { convertChordsAboveLyrics } from './chordsAboveLyrics'
export { convertTabdown } from './tabdown'
export { convertNashdown } from './nashdown'
