<script setup lang="ts">
// import { Popover } from 'ant-design-vue';
import EditInput from '@/components/input/ClickEditInput.vue'
import Popover from '@/components/tips/Popover.vue';
import { ref } from 'vue'
const inputVal = ref<string>('')

const handleChange = () => {
  console.log('1111 :>> ', 1111);
}

</script>

<template>
  <div class="component-test-page">
    <div class="section">
      <div class="header">输入框静态、动态</div>
      <div class="component-wrapper">
        <edit-input v-model:value="inputVal" default-val="test" @change="handleChange"/>
      </div>
    </div>
    <div class="section">
      <a-row>
        <!-- <a-col :xxl=""></a-col> -->
      </a-row>
    </div>
    <div class="section">
      <div class="header">弹出框</div>
      <div class="component-wrapper flex justify-center">
        <Popover trigger="click">
          <!-- 触发 Popover 的元素 -->
          <button>点击显示 Popover</button>

          <!-- Popover 的内容 -->
          <template #content>
            <div>这是 Popover 的内容</div>
          </template>
        </Popover>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.component-test-page {
  padding: 24px;
}
.section {
  margin-bottom: 40px;
  padding: 16px;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  .header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
