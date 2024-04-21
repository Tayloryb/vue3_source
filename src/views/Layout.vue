<template>
  <div class="flex-container">
    <div class="left-column" :style="{ width: `${leftWidth}px` }"></div>
    <div class="list-column" :style="{ width: `${listWidth}px` }">
      <button @click="toggleFilter">打开筛选框</button>
    </div>
    <div class="right-column" :style="{ width: `${rightWidth}px` }">
      <div v-if="filterOpen" class="filter-container">筛选框内容</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const filterOpen = ref(false);
const listMinWidth = 711;
const listMaxWidth = 1252;
const filterMinWidth = 200;

const leftWidth = ref('auto');
const listWidth = ref(window.innerWidth);
const rightWidth = ref('auto'); // 右侧容器宽度

const toggleFilter = () => {
  filterOpen.value = !filterOpen.value;
};

const calcContainerWidth = () => {
  const width = window.innerWidth;
  if (width < listMaxWidth + filterMinWidth) {
    const minWidth = listMinWidth - filterMinWidth;
    rightWidth.value = filterMinWidth;
    listWidth.value = Math.max(minWidth, Math.min(width - rightWidth.value, listMaxWidth));
    leftWidth.value = width - listWidth.value - rightWidth.value;
  } else {
    const maxWidth = Math.min(listMaxWidth, width);
    listWidth.value = Math.max(listMinWidth, maxWidth);
    const temp = Math.floor((width - listWidth.value) / 2);
    leftWidth.value = temp;
    rightWidth.value = temp;
  }
}

// 监听窗口大小变化，更新列表列和右侧容器宽度
onMounted(() => {
  window.addEventListener('resize', () => {
    calcContainerWidth();
  });
  calcContainerWidth();
});
</script>

<style>
.flex-container {
  height: 100vh;
  display: flex;
}

.left-column,
.right-column {
  height: 100%;
  background-color: red;
  overflow: hidden; /* 控制溢出内容的隐藏 */
}

.right-column {
  flex-shrink: 0;
}

.list-column {
  height: 100%;
  flex-shrink: 0;
}

.filter-container {
  min-width: 200px;
  background-color: lightgray;
  padding: 10px;
}
</style>
