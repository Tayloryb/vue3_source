<template>
  <Teleport to="body">
    <div class="popover-content">
      <slot name="content"></slot>
    </div>
  </Teleport>
  <slot @mouseEnter="handleTest"></slot>
  
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue';

const defaultRef = ref<HTMLElement | null>()

const handleTest = () => {
  console.log('33333 :>> ', 33333);
}

onMounted(() => {
  console.log('defaultRef :>> ', defaultRef.value);
})
</script>

<style lang="less" scoped>
.popover {
  display: contents;
}
</style>