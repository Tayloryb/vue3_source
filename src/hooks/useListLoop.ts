import { ref, computed, watch } from 'vue'
import { isFunction } from 'lodash-es'

// This is a custom hook that can be used in any component
// to loop over a list of items and execute a function
export const useListLoop = <T>(fn: (data: T[]) => void, options?: {
  timeout: number,
  immediate?: boolean
}) => {
  const list = ref<T[]>([])

  if (!fn || !isFunction(fn)) {
    throw new Error('callback is required and must be a function')
  }

  const config = {
    timeout: options?.timeout || 10000,
    immediate: options?.immediate || false
  }
  let timer: NodeJS.Timeout | null = null // timer for loop

  const hasItems = computed(() => !!list.value.length) // check if list has items, used to start/stop loop

  const runing = ref<boolean>(true) // loop status

  // pause loop
  const pause = () => {
    runing.value = false
    clearTimer()
  }

  // start loop
  const start = (immediate = true) => {
    runing.value = true
    handleLoop(immediate)
  }

  // add item to list
  const addItem = (item: T) => {
    list.value.push(item as any)
  }

  // remove item from list
  const removeItem = (index: number) => {
    list.value.splice(index, 1)
  }

  // clear timer
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  /**
   * loop callback until list is empty
   * @param bool 
   * @returns 
   */
  const handleLoop = async (bool: boolean) => {
    if (bool) {
      await fn(list.value as any)
    }
    // if not runing or list is empty, clear timer
    if (!runing.value || !list.value.length) {
      clearTimer()
      return
    }
    // set timer for next loop
    timer = setTimeout(() => {
      handleLoop(true)
    }, config.timeout);
  }

  watch(() => hasItems.value, (value) => {
    if (value) {
      handleLoop(config.immediate)
    } else {
      clearTimer()
    }
  })


  return { list, addItem, removeItem, pause, start }
}

