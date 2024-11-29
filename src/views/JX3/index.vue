<script lang="ts" setup>
import ManufacturePageHeader from './components/ManufacturePageAsside.vue'
import { useManufactureStore } from '@/store/jx3/manufacture';

const manufactureStore = useManufactureStore()

manufactureStore.init()

</script>
<template>
  <div class="jx3-page">
    <div class="header">
      <manufacture-page-header />
    </div>
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.jx3-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .header {
    flex-shrink: 0;
    max-width: 1640px;
    padding: 0 40px;
    // background-color: var(--bg_850);
    // display: flex;
    // align-items: center;
    // padding: 0 20px;
    // font-size: 20px;
    // font-weight: 600;
    // color: var(--text_100);
  }
  .page-content {
    flex: 1;
  }
}
</style>