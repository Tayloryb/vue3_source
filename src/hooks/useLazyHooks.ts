
import { ref, watch } from 'vue'

type QueueListItem = {
  data: any
}

enum TASK_LOADING_STATUS {
  PARUSE = 'pause',
  STOP = 'stop',
  PROCESSING = 'processing'
}
export const useLazyHooks = (startCallFunc: (data: any) => void, option?: {
  fieldKey: string
}) => {
  const MAX_LOADING_NUM = 5;
  const queue = ref<QueueListItem[]>([]);
  const processingList = ref<QueueListItem[]>([])
  const fieldKey = option && option.fieldKey ? option.fieldKey : 'id'

  const taskStatus = ref<TASK_LOADING_STATUS>(TASK_LOADING_STATUS.PROCESSING)

  const getTask = () => {
    return queue.value.shift()
  }

  const addProcessing = () => {
    if (taskStatus.value !== TASK_LOADING_STATUS.PROCESSING) {
      return
    }
    if (processingList.value.length >= MAX_LOADING_NUM) {
      console.log('111 :>> ', 111, processingList.value.length);
      return
    }
    const task = getTask()
    if (!task) {
      return
    }
    processingList.value.push(task)
    startCallFunc(task.data)
  }

  const addQueue = (data: any) => {
    queue.value.push({
      data,
    });
    addProcessing()
  }

  const prevAddQueue = (data: any) => {
    queue.value.unshift({
      data
    })
  }

  const finishedTask = (data: any) => {
    const index = processingList.value.findIndex((item) => item.data[fieldKey] === data[fieldKey])
    if (index > -1) {
      processingList.value.splice(index, 1)
    }
    if (queue.value.length) {
      addProcessing()
    }
  }

  const pause = () => {
    taskStatus.value = TASK_LOADING_STATUS.PARUSE
  }
  const start = () => {
    taskStatus.value = TASK_LOADING_STATUS.PROCESSING
  }
  const stop = () => {
    taskStatus.value = TASK_LOADING_STATUS.STOP
  }

  watch(() => taskStatus.value, () => {
    if (taskStatus.value = TASK_LOADING_STATUS.PROCESSING) {
      addProcessing()
    }
  })



  return {
    addQueue,
    finishedTask,
    pause,
    start,
    stop,
    prevAddQueue
  };
}