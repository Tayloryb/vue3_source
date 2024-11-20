import { ref } from 'vue'

export function useTeleport() {
  const teleportElement = ref<HTMLElement | null>(null)

  function show() {
    if (teleportElement.value) {
      teleportElement.value.style.display = 'block'
    }
  }

  function hide() {
    if (teleportElement.value) {
      teleportElement.value.style.display = 'none'
    }
  }

  return { show, hide }
}
