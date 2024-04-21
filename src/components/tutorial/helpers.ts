import { ref, computed } from "vue"
import { Tutorial } from "./define"

export const useTutorial = (tutorials?: Tutorial[]) => {
  const tutorialsRef = ref<Tutorial[]>([])
  const indexRef = ref(0)
  const disabledRef = ref(false)
  if (tutorials && tutorials.length > 0) {
    tutorialsRef.value = tutorials
  }
  const currentTutorial = computed(() => {
    return tutorialsRef.value[indexRef.value]
  })

  const next = () => {
    indexRef.value++
  }

  const hasNext = () => {
    return indexRef.value < tutorialsRef.value.length - 1
  }

  const finished = computed(() => {
    return indexRef.value === tutorialsRef.value.length
  })

  const disabled = computed(() => {
    return disabledRef.value || tutorialsRef.value.length === 0
  })
  const getTutorial = (index: number) => {
    return tutorialsRef.value[index]
  }

  const setTutorial = (index: number) => {
    indexRef.value = index
  }

  const addTutorial = (tutorial: Tutorial) => {
    tutorialsRef.value.push(tutorial)
  }

  const setDisabled = (value: boolean) => {
    disabledRef.value = value
  }

  return {
    tutorials: tutorialsRef,
    index: indexRef,
    finished,
    current: currentTutorial,
    disabled,
    next,
    hasNext,
    getTutorial,
    setTutorial,
    addTutorial,
    setDisabled,
  }
}