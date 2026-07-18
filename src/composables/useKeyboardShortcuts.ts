import { onMounted, onUnmounted } from 'vue'

interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  handler: (event: KeyboardEvent) => void
}

const shortcuts = new Map<string, KeyboardShortcut>()

function getShortcutKey(shortcut: Omit<KeyboardShortcut, 'handler'>): string {
  return [
    shortcut.ctrl ? 'ctrl' : '',
    shortcut.shift ? 'shift' : '',
    shortcut.alt ? 'alt' : '',
    shortcut.key.toLowerCase(),
  ]
    .filter(Boolean)
    .join('+')
}

function handleKeydown(event: KeyboardEvent) {
  for (const shortcut of shortcuts.values()) {
    const key = getShortcutKey(shortcut)
    const eventKey = [
      event.ctrlKey ? 'ctrl' : '',
      event.shiftKey ? 'shift' : '',
      event.altKey ? 'alt' : '',
      event.key.toLowerCase(),
    ]
      .filter(Boolean)
      .join('+')

    if (key === eventKey) {
      event.preventDefault()
      shortcut.handler(event)
    }
  }
}

export function useKeyboardShortcuts() {
  function registerShortcut(
    key: string,
    handler: (event: KeyboardEvent) => void,
    options: { ctrl?: boolean; shift?: boolean; alt?: boolean } = {},
  ) {
    const shortcut: KeyboardShortcut = { key, ...options, handler }
    const id = getShortcutKey(shortcut)
    shortcuts.set(id, shortcut)
  }

  function unregisterShortcut(
    key: string,
    options: { ctrl?: boolean; shift?: boolean; alt?: boolean } = {},
  ) {
    const shortcut = { key, ...options }
    const id = getShortcutKey(shortcut)
    shortcuts.delete(id)
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  return {
    registerShortcut,
    unregisterShortcut,
  }
}
