<script lang="ts" setup>
import { ref, watch } from 'vue'
import { OptionsItem } from '@/define/common'
import { buildUUID } from '@/utils/uuid';
import { useRouter } from 'vue-router'

const router = useRouter()

const currentTab = ref<string>('')

type TabItem = OptionsItem<{
  path: string
}>
const tabList = ref<TabItem[]>([
  {
    id: buildUUID(),
    label: '配方',
    path: '/JX3/manufacture/list'
  },
  {
    id: buildUUID(),
    label: '我的关注',
    path: '/JX3/manufacture/favorite'
  }
])

watch(() => router.currentRoute.value.path, (newVal) => {
  const tab = tabList.value.find(tab => tab.path === newVal)
  if (tab) {
    currentTab.value = tab.id
  }
}, {
  immediate: true
})

const handleClick = (tab: TabItem) => {
  router.push(tab.path)
}



</script>

<template>
  <div class="manufacture-page-header">
    <div class="tab-list flex flex-column">
      <div class="tab-item" :class="{ 'active': currentTab === tab.id }" v-for="tab in tabList" :key="tab.id" @click="handleClick(tab)">
        {{ tab.label }}
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.manufacture-page-header {
  border: 1px solid var(--white_boder_color_20);
  .tab-list {
    // padding: 0 40px;
    .tab-item {
      position: relative;
      padding: 8px 10px;
      cursor: pointer;
      line-height: 32px;
      margin-bottom: 8px;
      min-width: 120px;
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        color: var(--white_color_95);
      }
      &.active {
        color: var(--white_color_95);
        // &::after {
        //   position: absolute;
        //   content: '';
        //   width: 100%;
        //   height: 2px;
        //   left: 0;
        //   bottom: 0;
        //   background-color: var(--white_color_95);
        // }
      }
    }
  }
}
</style>