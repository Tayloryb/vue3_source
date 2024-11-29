<script setup lang="ts">
import { computed } from 'vue';
import Button from './Button.vue';
import IconButton from './IconButton.vue';

const props = withDefaults(defineProps<{
  buttonType?: 'button' | 'icon'
}>(), {
  buttonType: 'button',
})

const buttonComp = computed(() => {
  switch (props.buttonType) {
  case 'icon':
    return IconButton
  default:
    return Button
  }
})


</script>

<template>
  <component :is="buttonComp" v-bind="$attrs" class="ai-button">
    <template #prefix>
      <slot name="prefix" />
    </template>
    <slot />
    <template #suffix>
      <slot name="suffix" />
    </template>
  </component>
</template>

<style lang="less" scoped>
.ai-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
