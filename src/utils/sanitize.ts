const TAG_REPLACEMENTS: Record<string, string> = {
  script: '',
  iframe: '',
  object: '',
  embed: '',
  form: '',
  input: '',
  textarea: '',
  button: '',
  select: '',
  style: '',
  link: '',
  meta: '',
  base: '',
  applet: '',
}

export function sanitizeHtml(input: string): string {
  let result = input

  // Remove potentially dangerous tags with their content
  for (const tag of Object.keys(TAG_REPLACEMENTS)) {
    const openTagRegex = new RegExp(`<${tag}[\\s>][^]*?</${tag}>`, 'gi')
    result = result.replace(openTagRegex, '')
    const selfClosingRegex = new RegExp(`<${tag}[\\s/>]*/?>`, 'gi')
    result = result.replace(selfClosingRegex, '')
  }

  // Remove on* event handlers
  result = result.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')

  // Remove javascript: protocol
  result = result.replace(/javascript\s*:/gi, '')

  return result.trim()
}

export function sanitizeText(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}
