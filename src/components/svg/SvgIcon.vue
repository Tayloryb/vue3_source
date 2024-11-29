<script setup lang='ts'>
import { computed } from 'vue'
interface Props {
  name: string
  className?: string
  size?: number | string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  name:'',
  className: '',
  size: 16,
})

const iconName = computed(() => {
  if (props.name.startsWith('icon-')) {
    return `#${props.name}`
  } else {
    return `#icon-${props.name}`
  }
})
const svgClass = computed(() => {
  return props.className ? 'svg-icon ' + props.className : 'svg-icon';
})

</script>

<template>
  <svg :class="svgClass" aria-hidden="true" :width="size" :height="size" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  fill: currentColor;
}
</style>
