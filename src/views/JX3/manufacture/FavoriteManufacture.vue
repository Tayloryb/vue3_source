<script setup lang="ts">
import { useManufactureStore } from '@/store/jx3/manufacture';
import { ManufactureResponse } from '@/define/jx3/manufacture';

const manufactureStore = useManufactureStore()

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
  <div class="my-favorite-manufacture-page">
    <div class="favorite-manufacture-list">
      <div class="favorite-manufacture-item" v-for="item in manufactureStore.favoriteManufactures" :key="item.id">
        <div class="favorite-manufacture-item-content">
          <div class="favorite-manufacture-item-title">{{ item.name }}</div>
        </div>
        <div class="favorite-manufacture-item-action">
          <a-button type="primary" @click="handleFavorite('remove', item)">移除</a-button>
        </div>
      </div>
    </div>
  </div>
</template>