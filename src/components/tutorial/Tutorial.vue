<script setup lang="ts">
import { watch, ref } from 'vue';
import { Tutorial } from './define';
import { isHTMLElement } from '@/utils';

const props = defineProps<{
  current: Tutorial | undefined;
}>()

const pageRef = ref<HTMLElement | null>(null);
const currentAreaRef = ref<{
  width: number;
  height: number;
  left: number;
  top: number;
}>({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
});

watch(() => [props.current, pageRef.value], () => {
  if (props.current) {
    let target: HTMLElement | null = null;
    if (isHTMLElement(props.current.target)) {
      target = props.current.target;
    } else {
      target = document.querySelector(props.current.target);
    }
    if (target && pageRef.value) {
      const rect = target.getBoundingClientRect();
      currentAreaRef.value.left = rect.left + window.scrollX;
      currentAreaRef.value.top = rect.top + window.scrollY;
      currentAreaRef.value.width = rect.width;
      currentAreaRef.value.height = rect.height;
    }
  }
}, {
  immediate: true
})
</script>

<template>
  <div v-if="props.current" class="tutorial-page" ref="pageRef">
    <svg class="svg-mask">
      <defs>
        <mask id="tutorialMask" x="0" y="0" width="100%" height="100%">
          <rect x="0" y="0" width="100%" height="100%" fill="white"/>
          <rect
            :x="currentAreaRef.left"
            :y="currentAreaRef.top"
            :width="currentAreaRef.width"
            :height="currentAreaRef.height"
            fill="black"
          />
        </mask>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="rgba(0, 0, 0, 0.7)" mask="url(#tutorialMask)"/>
    </svg>
    <slot v-bind="{ position: currentAreaRef }"></slot>
  </div>
</template>

<style lang="less" scoped>
.tutorial-page {

  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;


  .svg-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
