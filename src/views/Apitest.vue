<script setup lang="ts">
import { login, getUserInfo, register } from '@/api/user'
import { getCaptcha } from '@/api/public'
import { useGlobalStore } from '@/store/index'

const globalStore = useGlobalStore()
const handleTestUserLogin = async() => {
  const res = await login({
    account: 'elijah2',
    password: '123456',
    login_method: 'password'
  })
  if (res.success) {
    globalStore.setUserToken(res.data.token)
  }
}

const handleGetUserInfo = async() => {
  const res = await getUserInfo()
  console.log('res :>> ', res);
}

const handleRegister = async() => {
  const params = {
    account: 'elijah12',
    password: '123456'
  }
  const res = await register(params)
  console.log('res :>> ', res);
}

const handleSendEmail = async() => {
  console.log('send email');
  const res = await getCaptcha({
    type: 'login',
    email: '499857539@qq.com'
  })
  console.log('res :>> ', res);

}

</script>

<template>
  <div class="test-btns">
    <div class="user-test-button">
      <a-button @click="handleTestUserLogin">login</a-button>
      <a-button @click="handleGetUserInfo">get user info</a-button>
      <a-button @click="handleRegister">register</a-button>
      <a-button @click="handleSendEmail">send email</a-button>
    </div>
  </div>
</template>
