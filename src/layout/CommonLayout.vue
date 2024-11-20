<script lang="ts" setup>
import { ref, onMounted, onUnmounted, h, watch, nextTick } from 'vue';
import { useRem } from '@/hooks/useRem';
import { throttle } from 'lodash-es'
import { usePageLayout, PageLayout } from './helpers'
import type { Dayjs } from 'dayjs';
import type { RangePicker } from 'ant-design-vue'

const pageLayout = ref<PageLayout>({
  contentWidth: 0,
  asideWidth: 0,
  paddingLeft: 0,
  gap: 0
})

const handleResize = throttle(() => {
  const width = document.documentElement.clientWidth
  pageLayout.value =  usePageLayout({
    width,
    MaxContainerWidth: 1640,
    asideWidth: 197,
    gap: 20
  })
  console.log('resize', pageLayout.value)

}, 1000)


onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

useRem();


type RangeValue = [Dayjs, Dayjs];
const customRange = ref<RangeValue>()
const dateSelectorOpen = ref<boolean>(false)
const datePickerRef = ref<RangePicker | null>();
const handleOpenChange = (status: boolean) => {
  dateSelectorOpen.value = status; 
}
const handleDateChange = (dates: [dayjs, dayjs] | [string, string], dateStrings: [string, string], info: { range: start | end }) => {
  console.log('handleDateChange', dates, dateStrings, info)
}
const handleChange = () => {
  console.log('change')
}

watch(() => dateSelectorOpen.value, (val) => {
  nextTick(() => {
    console.log('dateSelectorOpen', val, datePickerRef.value)
  })
})

</script>

<template>
  <div class="common-layout-page">
    <div class="main-container" :style="{ 'padding-left': `${pageLayout.paddingLeft}px` }">
      <div class="left" :style="{ 'width': `${pageLayout.asideWidth}px` }">
        this is left
      </div>
      <div class="right flex-1 flex flex-column">
        <div class="header flex-shrink-0" :style="{ 'width': `${pageLayout.contentWidth}px`, 'margin-right': `${pageLayout.gap}px` }">
          this is header
        </div>
        <div class="content flex-1">
          <!-- <div
            class="list"
            :style="{ 'height': '3000px', 'width': `${pageLayout.contentWidth}px` }"

          ></div> -->
          <a-button @click="dateSelectorOpen = !dateSelectorOpen">click</a-button>
          <a-range-picker
            ref="datePickerRef"
            v-model:value="customRange"
            class="date-range-picker"
            :open="dateSelectorOpen"
            dropdown-class-name="dark-time-range-picker"
            @calendar-change="handleDateChange"
            @change="handleChange"
            @open-change="handleOpenChange"
          />
          
        </div>
        <div class="footer flex-shrink-0">
          this is footer
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.common-layout-page {
  height: 100vh;
  .main-container {
    // max-width: 1560px;
    height: 100%;
    // margin: 0 auto;
    background-color: #f0f0f0;
    display: flex;
    .right {
      height: 100%;
      .header {
        height: 40px;
      }
      .content {
        overflow: auto;
        .list {
          background-color: #f00;
        }
      }
      .footer {
        height: 100px;
      }
    }
  }
}
</style>
