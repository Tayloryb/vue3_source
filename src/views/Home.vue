<template>
  <div class="container">
    <div
      class="drag-box"
      draggable="true"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
    >
      <img :src="imgInfo" alt="Draggable Image" />
    </div>
    <div class="drop-area" @dragover.prevent="handleDragOver" @drop="handleDrop">
      Drop here
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import imgInfo from '@a/imgs/right_distinct.png'

export default defineComponent({
  setup() {
    const handleDragStart = (event: DragEvent) => {
      console.log('Drag started');
      // 可以通过setData设置拖拽数据，这里以文本形式示例
      event.dataTransfer?.setData('text/plain', '图片拖拽');
    };

    const handleDragOver = (event: DragEvent) => {
      // 必须阻止默认处理才能使得drop事件能被触发
      event.preventDefault();
    };

    const handleDrop = (event: DragEvent) => {
      console.log('Dropped');
      // 在这里触发相应的事件处理逻辑
      event.preventDefault(); // 防止默认处理（比如打开链接）
      // 获取拖拽数据，执行需要的操作
      const data = event.dataTransfer?.getData('text/plain');
      console.log(data); // 打印拖拽数据，实际应用中替换为具体逻辑
    };

    const handleDragEnd = (event: DragEvent) => {
      console.log('Drag ended', event);
      // 拖拽结束后的处理逻辑，例如清理、重置状态等
    };

    return { handleDragStart, handleDragOver, handleDrop, handleDragEnd, imgInfo };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.drag-box, .drop-area {
  width: 200px;
  height: 200px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.drag-box {
  cursor: move;
}
</style>
