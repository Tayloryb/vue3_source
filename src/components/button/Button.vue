<script setup lang="ts">

withDefaults(defineProps<{
  type?: 'primary' | 'danger'
size?: 'small' | 'medium' | 'large' |'large_x'
  disabled?: boolean
}>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
})


</script>

<template>
  <div class="button-wrapper" :class="[`btn-${size}`, `btn-${type}`]" :disabled="disabled">
    <span class="prefix-wrapper">
      <slot name="prefix" />
    </span>
    <span><slot /></span>
    <span class="suffix-wrapper">
      <slot name="suffix" />
    </span>
  </div>
</template>

<style lang="less" scoped>
.button-wrapper {
  display: inline-flex;
  align-items: center;
  
  /** 颜色 */
  &.btn-primary {
    background-color: var(--brand_600);
    color: var(--white_color_95);
    &:hover {
      background-color: var(--brand_500);
    }
    &:active {
      background-color: var(--brand_700);
    }
    &:focus {
      outline: 1px solid var(--brand_800);
      background-color: var(--brand_600);
    }
    &.disabled {
      background-color: var(--brand_900);
      color: var(--white_color_16);
    }
  }
  
  &.btn-danger {
    background-color: var(--error_default);
    color: var(--white_color_95);
    &:hover {
      background-color: var(--error_hover);
    }
    &:active {
      background-color: var(--error_active);
    }
    &:focus {
      outline: 1px solid var(--error_focus_outline);
      background-color: var(--error_default);
    }
    &.disabled {
      background-color: var(--error_disabled);
      color: var(--white_color_16);
    }
  }
  
  /** 大小 */
  &.btn-small {
    padding: 4px 8px;
    font-size: 12px;
    line-height: 16px;
    border-radius: 4px;
  }
  &.btn-medium {
    padding: 6px 12px;
    font-size: 14px;
    line-height: 20px;
    border-radius: 4px;
  }
  &.btn-large {
    padding: 9px 16px;
    font-size: 16px;
    line-height: 22px;
    border-radius: 6px;
  }
  &.btn-large_x {
    padding: 12px 20px;
    font-size: 18px;
    line-height: 24px;
    border-radius: 8px;
  }
}
</style>
