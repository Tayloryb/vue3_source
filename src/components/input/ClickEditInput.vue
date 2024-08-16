<script setup lang="ts">
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core';
const props = withDefaults(defineProps<{
  value: string
  defaultVal?: string
  focusSelectAll?: boolean
}>(), {
  defaultVal: '',
  focusSelectAll: false
})
const inputWrapRef = ref<HTMLElement | null>(null)

const emit = defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'click'): void
  (e: 'dblclick'): void
  (e: 'change', value: string): void
}>()

const inputVal = ref<string>('')
const isActive = ref<boolean>(false)

onClickOutside(inputWrapRef, () => {
  isActive.value = false
})

watch(() => props.defaultVal, (val) => {
  inputVal.value = val
}, {
  immediate: true
})

let clickTimeout: number | null = null
const handleClick = () => {
  if (clickTimeout) clearTimeout(clickTimeout)
  clickTimeout = setTimeout(() => {
    emit('click')
  }, 300) as unknown as number
}

/** input events */
const inputRef = ref<HTMLInputElement | null>(null)

const handleDoubleClick = () => {
  if (clickTimeout) {
    clearTimeout(clickTimeout)
    clickTimeout = null
  }
  isActive.value = true
  emit('dblclick')
  setTimeout(() => {
    inputRef.value?.focus()
  }, 0);
}

const handleFocus = () => {
  if (props.focusSelectAll) {
    inputRef.value?.select()
  }  
}

const handleBlur = () => {
  isActive.value = false
  if (!inputVal.value) {
    inputVal.value = props.defaultVal
  }
  if (inputVal.value !== props.value) {
    emit('update:value', inputVal.value)
    // emit('change', inputVal.value)
  }
}

const useInputBlur = () => {
  inputRef.value?.blur()
  isActive.value = false
}

</script>

<template>
  <div class="input-wrapper" :class="{ 'is-editing': isActive }" ref="inputWrapRef" @click="handleClick" @dblclick="handleDoubleClick">
    <div v-if="isActive" class="static-text">{{ inputVal }}</div>
    <a-input ref="inputRef" v-if="!isActive" v-model:value="inputVal" @blur="handleBlur" @focus="handleFocus" @keyup.enter="useInputBlur"/>
  </div>
</template>

<style lang="less" scoped>
.input-wrapper {
  width: 200px;
  height: 40px;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  padding: 0 8px;
  text-align: center;
  .is-editing {
    background-color: #E8F4FF;
  }
  .static-text {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
  }
  .ant-input {
    caret-color: #3D7EFF;
    border: none;
    padding: 0;
    height: 32px;
    font-size: 14px;
    background-color: #E8F4FF;
    color: #3D7EFF;
  }
  .ant-input:focus, .ant-input-focused {
    box-shadow: none;
  }
}
</style>
