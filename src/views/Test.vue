<script setup lang="ts">
import { computed, ref } from 'vue'
import { useElementBounding } from '@vueuse/core';

const optArea = ref<HTMLElement | null>()

const { left, top, height, width } = useElementBounding(optArea)

const maskStyle = computed(() => {
  if (optArea.value === null) return {}
  return {
    clipPath: `polygon(0 0, 100% 0, 100% ${top.value}px, ${left.value + width.value}px ${top.value}px, ${left.value + width.value}px ${top.value + height.value}px, ${left.value}px ${top.value + height.value}px, ${left}px ${top}px, 0 ${top}px, 0 100%, 100% 100%, 100% 0)`
  }
})

</script>

<template>
  <div class="test-page">
    <div class="mask" :style="maskStyle"></div>
    <h1>Test</h1>
    <p>Here is a test page.</p>
    <div id="test_01">test1</div>
    <div class="container">
      <span id="test_02">test2</span>
      <span id="test_03">test3</span>
      <span id="test_04">test4</span>
    </div>
    <div ref="optArea">
      112313
      <a-input ref=""></a-input>
      111
      <a-button>111</a-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.test-page {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }
}
</style>