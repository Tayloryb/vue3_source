<script setup lang="ts">
import { useManufactureStore } from '@/store/jx3/manufacture'; 
import ManufacturePageAsside from '../components/ManufacturePageAsside.vue'

const manufactureStore = useManufactureStore()
manufactureStore.init()
</script>
<template>
  <div v-if="manufactureStore.isInit" class="manufacture-page flex">
    <div class="asside-layout">
      <manufacture-page-asside />
    </div>
    <div class="manufacture-content flex-1">
      <router-view></router-view>
    </div>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<style lang="less" scoped>
.manufactrue-page {
  height: 100%;
}
</style>