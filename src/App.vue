<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { useGlobalStore } from './store';

useGlobalStore().init()

</script>

<template>
  <div>
   <!-- <DemoPage></DemoPage> -->
   <router-view />
  </div>
  
</template>

<style scoped>
</style>
