<script setup lang="ts">
import { ref } from 'vue'
import { SocketIo } from '@/api/config/websocket'

const inputVal = ref<string>('')



const socketIo = new SocketIo('ws://127.0.0.1:9800')

socketIo.connect()

const sendMessage = (msg: string) => {
  console.log('111 :>> ', 111);
  console.log('socketIo :>> ', socketIo);
  socketIo.emit('sendMessage', msg)
}
socketIo.on('receiveMessage', (msg: string) => {
  console.log('receive msg :>> ', msg);
})
socketIo.on('disconnected', (info) => {
  console.log('info :>> ', info);
})

const handleSend = () => {
  console.log('inputVal.value :>> ', inputVal.value);
  sendMessage(inputVal.value)
}
const handleClose = () => {
  socketIo.disconnect()
}
</script>

<template>
  <div class="input-wrapper">
    <a-input v-model:value="inputVal" @keyup.enter="handleSend"></a-input>
    <a-button @click="handleSend">send</a-button>
    <a-button @click="handleClose">close</a-button>
  </div>
</template>

<style lang="less" scoped>
.input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
@/api/config/websocket