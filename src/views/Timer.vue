<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'

// 定义一个响应式的时间变量
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'))

// 定义一个更新时间的函数
const updateTime = () => {
  time.value = dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
}

let intervalId: number | undefined

// 在组件挂载时启动计时器
onMounted(() => {
  intervalId = setInterval(updateTime, 16)
})

// 在组件卸载时清除计时器
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const rememberList = ref<string[]>([])

const handleRemember = () => {
  const clickTIme = dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
  rememberList.value.push(clickTIme)
}

const hanldeClear = () => {
  rememberList.value = []
}
</script>

<template>
  <div class="timer-wrapper">
    <div>
      <span>当前时间:</span><span>{{ time }}</span>
    </div>
    <div class="btns-wrapper">
      <a-button type="primary" @click="handleRemember">记录</a-button>
      <a-button @click="hanldeClear">清空</a-button>
    </div>
    <div class="remember-list">
      <div v-for="item in rememberList" :key="item">{{ item }}</div>
    </div>
  </div>
</template>