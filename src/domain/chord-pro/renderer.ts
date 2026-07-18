import type { ChordProDocument, ChordProSection, ChordProLine, ChordToken } from '@/types'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function lineHasChords(line: ChordProLine): boolean {
  return line.chords.some(c => c !== null)
}

function renderChordSpansHtml(chords: (ChordToken | null)[], width: number): string {
  if (width === 0) return ''
  const parts: string[] = []
  for (let i = 0; i < chords.length && i < width; i++) {
    const c = chords[i]
    if (c) {
      parts.push(
        `<span class="cp-chord" style="grid-column:${i + 1};">${escapeHtml(c.raw)}</span>`,
      )
    }
  }
  return parts.join('')
}

function renderLineHtml(line: ChordProLine): string {
  const width = line.lyrics.length

  if (!lineHasChords(line)) {
    return `<div class="cp-line"><div class="cp-lyrics">${escapeHtml(line.lyrics)}</div></div>`
  }

  const chordSpans = renderChordSpansHtml(line.chords, width)
  const cols = width > 0 ? `grid-template-columns:repeat(${width},1ch);` : ''

  return `<div class="cp-line">
<div class="cp-chords" style="display:grid;${cols}line-height:1.2;">${chordSpans}</div>
<div class="cp-lyrics" style="line-height:1.2;">${escapeHtml(line.lyrics)}</div>
</div>`
}

function renderMetadataHtml(meta: ChordProDocument['metadata']): string {
  const parts: string[] = []

  if (meta.title) {
    parts.push(`<div class="cp-title">${escapeHtml(meta.title)}</div>`)
  }
  if (meta.artist) {
    parts.push(`<div class="cp-artist">${escapeHtml(meta.artist)}</div>`)
  }

  const infoParts: string[] = []
  if (meta.key) infoParts.push(`Key: ${escapeHtml(meta.key)}`)
  if (meta.tempo !== null) infoParts.push(`Tempo: ${meta.tempo} BPM`)
  if (infoParts.length > 0) {
    parts.push(`<div class="cp-info">${infoParts.join(' &middot; ')}</div>`)
  }

  if (parts.length === 0) return ''
  return `<div class="cp-meta">${parts.join('\n')}</div>`
}

function renderSectionHtml(section: ChordProSection): string {
  const lines = section.lines.map(renderLineHtml).join('\n')
  return `<div class="cp-section">
<div class="cp-section-label">${escapeHtml(section.label)}</div>
${lines}
</div>`
}

export function renderChordPro(doc: ChordProDocument): string {
  const meta = renderMetadataHtml(doc.metadata)
  const sectionHtml = doc.sections.map(renderSectionHtml).join('\n')
  return `<div class="cp-document">
${meta}
${sectionHtml}
</div>`
}

function buildTextChordRow(chords: (ChordToken | null)[], width: number): string {
  if (width === 0) return ''
  const row = new Array<string>(width).fill(' ')
  for (let i = 0; i < chords.length && i < width; i++) {
    const c = chords[i]
    if (c) {
      const name = c.raw
      for (let j = 0; j < name.length && i + j < width; j++) {
        row[i + j] = name[j]
      }
    }
  }
  return row.join('').trimEnd()
}

function renderLineText(line: ChordProLine): string {
  const width = line.lyrics.length

  if (!lineHasChords(line)) {
    return line.lyrics
  }

  const chordRow = buildTextChordRow(line.chords, width)
  if (chordRow.length === 0) {
    return line.lyrics
  }

  return `${chordRow}\n${line.lyrics}`
}

function renderMetadataText(meta: ChordProDocument['metadata']): string {
  const parts: string[] = []

  if (meta.title) parts.push(`Title: ${meta.title}`)
  if (meta.artist) parts.push(`Artist: ${meta.artist}`)

  const infoParts: string[] = []
  if (meta.key) infoParts.push(`Key: ${meta.key}`)
  if (meta.tempo !== null) infoParts.push(`Tempo: ${meta.tempo} BPM`)
  if (infoParts.length > 0) parts.push(infoParts.join(' | '))

  return parts.join('\n')
}

function renderSectionText(section: ChordProSection): string {
  const lines = section.lines.map(renderLineText)
  return `${section.label}\n${lines.join('\n')}`
}

export function renderChordProText(doc: ChordProDocument): string {
  const parts: string[] = []

  const meta = renderMetadataText(doc.metadata)
  if (meta) parts.push(meta)

  for (const section of doc.sections) {
    if (section.lines.length === 0) continue
    parts.push(renderSectionText(section))
  }

  return parts.join('\n\n')
}
