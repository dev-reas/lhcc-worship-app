export type ChordProTokenKind =
  | 'metadata'
  | 'section_start'
  | 'section_end'
  | 'chord'
  | 'lyrics'
  | 'newline'

export interface ChordProToken {
  type: ChordProTokenKind
  value: string
  label?: string
}

const SECTION_START_DIRECTIVES: Record<string, string> = {
  start_of_verse: 'verse',
  start_of_chorus: 'chorus',
  start_of_bridge: 'bridge',
  start_of_intro: 'intro',
  start_of_outro: 'outro',
  start_of_tag: 'tag',
  start_of_instrumental: 'instrumental',
  sov: 'verse',
  soc: 'chorus',
  sob: 'bridge',
  soi: 'intro',
  soo: 'outro',
  sot: 'tag',
  soig: 'instrumental',
}

const SECTION_END_DIRECTIVES: Record<string, string> = {
  end_of_verse: 'verse',
  end_of_chorus: 'chorus',
  end_of_bridge: 'bridge',
  end_of_intro: 'intro',
  end_of_outro: 'outro',
  end_of_tag: 'tag',
  end_of_instrumental: 'instrumental',
  eov: 'verse',
  eoc: 'chorus',
  eob: 'bridge',
  eoi: 'intro',
  eoo: 'outro',
  eot: 'tag',
  eoig: 'instrumental',
}

const METADATA_KEYS = new Set([
  'title', 't',
  'artist', 'st', 'subtitle',
  'key',
  'tempo',
])

export function tokenizeChordPro(chordPro: string): ChordProToken[] {
  const input = chordPro.replace(/^\uFEFF/, '')
  const tokens: ChordProToken[] = []
  let i = 0
  let lyricsBuf = ''

  function flushLyrics(): void {
    if (lyricsBuf.length > 0) {
      tokens.push({ type: 'lyrics', value: lyricsBuf })
      lyricsBuf = ''
    }
  }

  while (i < input.length) {
    const ch = input[i]

    if (ch === '{') {
      const end = input.indexOf('}', i + 1)
      if (end === -1) {
        lyricsBuf += ch
        i++
        continue
      }

      const content = input.slice(i + 1, end).trim()
      i = end + 1

      const colonIdx = content.indexOf(':')
      const rawName = (colonIdx >= 0 ? content.slice(0, colonIdx) : content).trim().toLowerCase()
      const rawValue = colonIdx >= 0 ? content.slice(colonIdx + 1).trim() : ''

      if (rawName in SECTION_START_DIRECTIVES) {
        flushLyrics()
        tokens.push({
          type: 'section_start',
          value: SECTION_START_DIRECTIVES[rawName],
          label: rawValue || undefined,
        })
      } else if (rawName in SECTION_END_DIRECTIVES) {
        flushLyrics()
        tokens.push({
          type: 'section_end',
          value: SECTION_END_DIRECTIVES[rawName],
        })
      } else if (METADATA_KEYS.has(rawName)) {
        flushLyrics()
        tokens.push({ type: 'metadata', value: content })
      } else {
        lyricsBuf += `{${content}}`
      }
    } else if (ch === '[') {
      const end = input.indexOf(']', i + 1)
      if (end === -1) {
        lyricsBuf += ch
        i++
        continue
      }

      const chordContent = input.slice(i + 1, end).trim()
      i = end + 1
      flushLyrics()
      tokens.push({ type: 'chord', value: chordContent })
    } else if (ch === '\r') {
      flushLyrics()
      if (i + 1 < input.length && input[i + 1] === '\n') {
        i += 2
      } else {
        i++
      }
      tokens.push({ type: 'newline', value: '\n' })
    } else if (ch === '\n') {
      flushLyrics()
      tokens.push({ type: 'newline', value: '\n' })
      i++
    } else {
      lyricsBuf += ch
      i++
    }
  }

  flushLyrics()
  return tokens
}
