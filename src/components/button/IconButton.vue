<script setup lang="ts">

withDefaults(defineProps<{
  type?: 'primary' | 'danger'
  size?: 'small' | 'medium' | 'large' |'large_x'
  disabled?: boolean,
  styleType?: 'undertint' | 'border' | 'noborder'
}>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  styleType: undefined
})


</script>

<template>
  <div class="btn-icon-wrapper" :class="[`btn-${size}`, `btn-${type}`, styleType ? `btn-${styleType}` : undefined]" :disabled="disabled">
    <slot />
  </div>
</template>

<style lang="less" scoped>
.btn-icon-wrapper {
  display: inline-block;
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

    &.btn-undertint {
      background-color: var(--white_boder_color_5);
      color: var(--white_color_60);
      &:hover {
        background-color: var(--white_boder_color_10);
        color: var(--white_color_95);
      }
      &:active {
        background-color: var(--black_boder_color_10);
        color: var(--white_color_95);
      }
      &:focus {
        outline: 1px solid var(--brand_800);
        background-color: var(--nature_950);
        color: var(--brand_600);
      }
      &.disabled {
        background-color: var(--white_boder_color_5);
        color: var(--white_color_16);
      }
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
    padding: 8px;
    line-height: 12px;
    border-radius: 4px;
  }
  &.btn-medium {
    padding: 9px;
    line-height: 14px;
    border-radius: 4px;
  }
  &.btn-large {
    padding: 12px;
    font-size: 16px;
    line-height: 16px;
    border-radius: 6px;
  }
  &.btn-large_x {
    padding: 14px;
    line-height: 20px;
    border-radius: 8px;
  }
}
</style>
