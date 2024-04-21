<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Storage, Session } from '@/utils/store';

const visible = ref<boolean>(true)

const data = ref<number[]>([])
const inputeNumber = ref<number>(1);
const index = ref<number>(1);

(() => {
  for (let i = 0; i < 100; i++) {
    data.value.push(i)
  }
})()

const handleJump = () => {
  console.log('index :>> ', index);
  // visible.value = !visible.value
  index.value = inputeNumber.value
}

onMounted(() => {
  Session.set('data', JSON.stringify(data.value))
  Storage.set('data', data.value)
})

const handleTest = () => {
  console.log(Session.get('data'), 'Session.get("data")')
  console.log('Storage.get(data) :>> ', Storage.get('data'));
}


</script>

<template>
  <div class="test-demo-page">
    <div class="demo-item">
      <div class="flex">
        共{{ data.length }}张
        <a-input-number v-model:value="inputeNumber" style="width: 100px;"/>
        <a-button @click="handleJump">图片跳转</a-button>
        <a-button @click="handleTest">test</a-button>
      </div>
      <div class="content flex justify-center">
        <Carousel :visible="visible" :data="data" v-model:index="index" class="test-item"></Carousel>
      </div>
      
    </div>
  </div>
</template>

<style lang="less" scoped>
.test-demo-page {
  // background-color: #000;
  .test-item {
    width: 1108px;
    overflow: hidden;
  }
}
</style>
