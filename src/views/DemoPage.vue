<script setup lang="ts">
import { ref } from 'vue'
import CustomVideo from '@/components/video/CustomVideo.vue';

const visible = ref<boolean>(true)

const data = ref<number[]>([])
const inputeNumber = ref<number>(1);
const index = ref<number>(1);

(() => {
  for (let i = 0; i < 100; i++) {
    data.value.push(i)
  }
})()

const handleTest = () => {
  console.log('index :>> ', index);
  // visible.value = !visible.value
  index.value = inputeNumber.value
}

</script>

<template>
  <div class="test-demo-page">
    <div class="demo-item">
      <div class="flex">
        共{{ data.length }}张
        <a-input-number v-model:value="inputeNumber" style="width: 100px;"/>
        <a-button @click="handleTest">图片跳转</a-button>
      </div>
      <div class="content flex justify-center">
        <Carousel :visible="visible" :data="data" v-model:index="index" class="test-item"></Carousel>
      </div>
    </div>
    <div class="demo-item">
      <CustomVideo></CustomVideo>
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
