import type { AutoScrollController } from '../../types'

const TARGET_FPS = 60
const FRAME_INTERVAL = 1000 / TARGET_FPS
const SCROLL_DEBOUNCE_MS = 300
const BASE_PX_PER_LINE = 24

export function createAutoScrollEngine(
  container: HTMLElement,
  bpm: number,
): AutoScrollController {
  let animFrameId: number | null = null
  let lastTimestamp: number | null = null
  let currentBpm = bpm
  let isPlaying = false
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null
  let destroyed = false

  function getScrollSpeed(): number {
    const linesPerSecond = currentBpm / 60
    return linesPerSecond * BASE_PX_PER_LINE
  }

  function tick(timestamp: number): void {
    if (destroyed || !isPlaying) return

    if (lastTimestamp === null) {
      lastTimestamp = timestamp
    }

    const delta = timestamp - lastTimestamp
    lastTimestamp = timestamp

    if (delta > 0 && delta < FRAME_INTERVAL * 3) {
      const pixelsPerMs = getScrollSpeed() / 1000
      const scrollAmount = pixelsPerMs * delta
      container.scrollTop += scrollAmount

      if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
        isPlaying = false
        lastTimestamp = null
        return
      }
    }

    animFrameId = requestAnimationFrame(tick)
  }

  function play(): void {
    if (destroyed || isPlaying) return
    isPlaying = true
    lastTimestamp = null
    animFrameId = requestAnimationFrame(tick)
  }

  function pause(): void {
    isPlaying = false
    if (animFrameId !== null) {
      cancelAnimationFrame(animFrameId)
      animFrameId = null
    }
    lastTimestamp = null
  }

  function rewind(): void {
    const wasPlaying = isPlaying
    pause()
    container.scrollTop = 0
    if (wasPlaying) play()
  }

  function forward(): void {
    const wasPlaying = isPlaying
    pause()
    container.scrollTop += container.clientHeight
    if (wasPlaying) play()
  }

  function setBpm(bpm: number): void {
    currentBpm = Math.max(1, bpm)
  }

  function destroy(): void {
    destroyed = true
    pause()
    if (scrollTimeout !== null) {
      clearTimeout(scrollTimeout)
      scrollTimeout = null
    }
    container.removeEventListener('scroll', handleManualScroll)
  }

  function handleManualScroll(): void {
    if (!isPlaying) return

    if (scrollTimeout !== null) {
      clearTimeout(scrollTimeout)
    }

    pause()

    scrollTimeout = setTimeout(() => {
      scrollTimeout = null
    }, SCROLL_DEBOUNCE_MS)
  }

  container.addEventListener('scroll', handleManualScroll)

  return {
    play,
    pause,
    rewind,
    forward,
    setBpm,
    destroy,
  }
}
