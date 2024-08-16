<template>
  <div class="container">
    <div>
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
    <div>
      <a-button @click="handleAddItem">add item</a-button>
      <a-button @click="pause">pause</a-button>
      <a-button @click="start">start</a-button>
    </div>

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useListLoop } from '@/hooks/useListLoop';
import imgInfo from '@a/imgs/right_distinct.png'

const testGetData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('testGetData')
    }, 3000);
  })

}

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

    const tags = ref([ { "tag": "--v 6", "isShow": false }, { "tag": "--stylize 100", "isShow": false }, { "tag": "--seed 7048517867", "isShow": false } ])

    const handleClickTag = (tag: any, event: PointerEvent) => {
      console.log('tag :>> ', tag, event);
      tag.isShow = !tag.isShow
    }
    const autoClose = (tag: any) => {
      setTimeout(() => {
        tag.isShow = false
      }, 1000);
    }

    const { list, addItem, removeItem, pause, start }  = useListLoop<number>(async() => {
      await testGetData()
      console.log('list.value :>> ', list.value, 'this is handler');
      const temp: number[] = []
        for (let i = 0; i < list.value.length; i++) {
          if (Math.random() > 0.5) {
            temp.push(i)
            removeItem(i)
            i--
          }
        }
    }, {
      timeout: 5000
    })

    const handleAddItem = () => {
      const num = Math.floor(Math.random() * 100)
      addItem(num)
    }

    return { handleDragStart, handleDragOver, handleDrop, handleDragEnd, imgInfo, tags, handleClickTag, autoClose, handleAddItem, pause, start };
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
