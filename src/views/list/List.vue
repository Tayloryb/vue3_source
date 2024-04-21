<script setup lang="ts">
import { ref } from 'vue'
import { getMockList, MockListItem } from '@/mock/listmock'
import ListItem from './ListItem.vue'
import { useLazyHooks } from '@/hooks/useLazyHooks'

const handleStart = (data: MockListItem) => {
  if (data.pictureStatus !== 'pending') {
    finishedTask(data)
  }
  data.pictureStatus = 'processing'
}

const { addQueue, finishedTask, start, pause, prevAddQueue }  = useLazyHooks(handleStart)

const list = ref<MockListItem[]>([])
const getList = async () => {
  const res = await getMockList()
  list.value.push(...res)
}

getList()

const handleRendered = (item: MockListItem) => {
  // console.log(`Item ${item.id} rendered`)
  addQueue(item)
}

const handleFinish = (item: MockListItem) => {
  finishedTask(item)
}




</script>

<template>
  <div class="list-wrapper">
    <div class="buttons">
      <a-button @click="start">start</a-button>
      <a-button @click="pause">pause</a-button>
    </div>
    <ListItem v-for="item in list" :key="item.id" :data="item" :content-width="1200" @rendered="handleRendered(item)" @picture-loaded="handleFinish(item)" @load-picture="prevAddQueue(item)"/>
  </div>
</template>

<style lang="less" scoped>
.list-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
</style>