<script lang="ts" setup>
import { ManufactureResponse } from '@/define/jx3/manufacture';
const props = defineProps<{
  itemInfo: ManufactureResponse | null
}>()

const afterOpenChange = (bool: boolean) => {
  if (bool && props.itemInfo) {
    console.log(props.itemInfo)
  }
}
</script>

<template>
  <a-drawer
    v-bind="$attrs"
    class="manufacture-drawer"
    placement="right"
    width="780"
    :style="{'background-color': 'var(--bg_850)'}"
    :closable="false"
    @after-open-change="afterOpenChange"
  >
    <div class="drawer-content">

    </div>
  </a-drawer>
</template>

<style lang="less">
.manufacture-drawer {
  background-color: red;
}
</style>