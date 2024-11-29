<script lang="ts" setup>
import { ref, watch } from 'vue'
import { getManufactureList } from '@/api/jx3/manufacture'
import { MANUFACTURE_TYPES, MANUFACTURE_LIST, ManufactureResponse } from '@/define/jx3/manufacture';
import ManufactureItemDrawer from '../components/ManufactureItemDrawer.vue'
import { useManufactureStore } from '@/store/jx3/manufacture'; 

const manufactureStore = useManufactureStore()

const currentType = ref(MANUFACTURE_TYPES.COOKING)
const manufactureList = ref<ManufactureResponse[]>([])

const getCurrentManufactureList = async () => {
  const res = await getManufactureList(currentType.value) as any
  if (res.code === 0) {
    manufactureList.value = res.data
  }
}


getCurrentManufactureList()
const handleTypeChange = (type: MANUFACTURE_TYPES) => {
  currentType.value = type
  getCurrentManufactureList()
}

const currentItem = ref<ManufactureResponse | null>(null)
const open = ref(false)
const handleClickManufacture = (manufacture: ManufactureResponse) => {
  currentItem.value = manufacture
  open.value = true
}
watch(() => open.value, (newVal) => {
  if (!newVal) {
    currentItem.value = null
  }
});

const handleFavorite = (type: 'add' | 'remove', data: ManufactureResponse) => {
  console.log(type, data)
  if (type === 'add') {
    manufactureStore.addFavoriteManufacture(data)
  } else {
    manufactureStore.removeFavoriteManufacture(data)
  }
}


</script>
<template>
  <div class="manufacture-page">
    <div class="header">
      <div class="type-list">
        <div class="type-item"
          v-for="(typeItem) in MANUFACTURE_LIST"
          :key="typeItem.value"
          :class="{'active': currentType === typeItem.value}"
          @click="handleTypeChange(typeItem.value)"
        >
          {{ typeItem.label }}
        </div>
      </div>
    </div>
    <div class="manufacture-content flex flex-wrap">
      <div class="manufacture-item" v-for="item in manufactureList" :key="item.id">
        <div class="manufacture-item-title">{{ item.name }}</div>
        <div class="tool-btns">
          
          <a-button @click="handleFavorite('add', item)" >关注</a-button>
          <!-- <a-button @click="handleClickManufacture(item)">详情</a-button> -->
        </div>
      </div>
    </div>
    <manufacture-item-drawer
      v-model:open="open"
      :item-info="currentItem"
    />
  </div>
</template>

<style lang="less" scoped>
.manufacture-page {
  height: 100%;
  max-width: 1640px;
  padding: 40px;
  margin: 0 auto;
  .header {
    .type-list {
      display: flex;
      .type-item {
        padding: 6px 12px;
        cursor: pointer;
        border: 1px solid var(--white_boder_color_5);
        margin-right: 6px;
        border-radius: 6px;
        font-size: 16px;
        background-color: var(--black_color_100);
        &:hover {
          background-color: var(--white_opcity_10);
          color: var(--white_color_95);
          // background-color: #f0f0f0;
        }
        &.active {
          background-color: var(--white_opcity_20);
          color: var(--white_color_95);
        }
      }
    }
  }
  .manufacture-content {
    margin-top: 24px;
    gap: 8px;
  }
  .manufacture-item {
    flex-shrink: 0;
    width: 200px;
    padding: 12px;
    border: 1px solid var(--white_boder_color_5);
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: var(--white_opcity_5);
    }
  }
}
.manufacture-drawer {
  font-size: 20px;
}
</style>
