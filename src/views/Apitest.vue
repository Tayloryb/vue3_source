<script setup lang="ts">
import { login, getUserInfo } from '@/api/user'
import { useGlobalStore } from '@/store/index'

const globalStore = useGlobalStore()
const handleTestUserLogin = async() => {
  const res = await login({
    account: 'test@qq.com',
    password: 'test12345'
  })
  if (res.success) {
    globalStore.setUserToken(res.data.token)
  }
}

const handleGetUserInfo = async() => {
  const res = await getUserInfo()
  console.log('res :>> ', res);
}

</script>

<template>
  <div class="test-btns">
    <div class="user-test-button">
      <a-button @click="handleTestUserLogin">login</a-button>
      <a-button @click="handleGetUserInfo">get user info</a-button>
    </div>
  </div>
</template>
