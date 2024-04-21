<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { throttle } from 'lodash-es';

const colorArr = ref<string[]>(["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"])

const scrollContainer = ref<HTMLElement | null>(null);
interface ImageItem {
  index: number
  actived: boolean;
}

const props = defineProps<{
  index: number
  data: any[]
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:index', idx: number): void
}>()

const translateX = ref<number>(0);
const contentTranslateX = ref<number>(0)
const prevIndex = ref<number>(-1)
const ACTIVE_SIZE = 128
const NORMAL_SIZE = 100
const GAP_SIZE = 16
const CACHE_NUMS = 3
const maxShowCount = ref<number>(0)

const imageList = ref<ImageItem[]>([])
  

const visibleImages = ref<ImageItem[]>([]);


onMounted(() => {
  updateVisibleImages();
  if (!scrollContainer.value) {
    return
  }
  const root = scrollContainer.value;
  root.style.setProperty('--active-size', `${ACTIVE_SIZE}px`);
  root.style.setProperty('--normal-size', `${NORMAL_SIZE}px`);
  root.style.setProperty('--gap-size', `${GAP_SIZE}px`);
  prevIndex.value = props.index
  const width = scrollContainer.value.clientWidth
  maxShowCount.value = Math.ceil(width / (NORMAL_SIZE + GAP_SIZE))
  scrollToSelectedImage()
});

const updateVisibleImages = () => {
  const container = scrollContainer.value;
  if (container) {
    let startIndex = Math.floor(Math.abs(translateX.value) / (NORMAL_SIZE + GAP_SIZE)) - CACHE_NUMS;
    let endIndex = startIndex + maxShowCount.value + CACHE_NUMS;
    startIndex = startIndex < 0 ? 0 : startIndex
    endIndex = endIndex >= imageList.value.length ? imageList.value.length : endIndex
    // endIndex = endIndex > imageList.value.length - 1 ? imageList.value.length - 1 : endIndex
    // console.log('startIndex, endIndex :>> ', startIndex, endIndex);
    console.log('startIndex, endIndex :>> ', startIndex, endIndex);
    visibleImages.value = imageList.value.slice(startIndex, endIndex);
    contentTranslateX.value = startIndex * (NORMAL_SIZE + GAP_SIZE)
  }
}

const debouncedHandleWheel = throttle((event: WheelEvent) => {
  const distance = event.deltaY;
      translateX.value -= distance * 10;
  verifyTranslate()
}, 16);

const verifyTranslate = () => {
  const container = scrollContainer.value;
  if (container) {
    const containerWidth = container.clientWidth;
    const maxWidth = 0 - ((imageList.value.length - 1) * NORMAL_SIZE + ACTIVE_SIZE + (imageList.value.length - 1) * GAP_SIZE + 20);
    if (translateX.value > 0) {
      translateX.value = 0;
    } else if (translateX.value <= maxWidth + containerWidth) {
      translateX.value = maxWidth + containerWidth;
    }
  }
}

const handleWheel = (event: WheelEvent) => {
  debouncedHandleWheel(event)
}

watch(() => translateX.value, () => {
  updateVisibleImages()
})

const handleClickItem = (idx: number) => {
  imageList.value[idx].actived = true
  if (prevIndex.value >= 0) {
    imageList.value[prevIndex.value].actived = false
  }
  emit('update:index', idx)
}

const scrollToSelectedImage = () => {
  const container = scrollContainer.value;
  if (container) {
    const containerWidth = container.clientWidth;
    const moveX = props.index * (NORMAL_SIZE + GAP_SIZE)
    const x = moveX - (containerWidth - ACTIVE_SIZE) / 2
    translateX.value = 0 - x
    verifyTranslate()
  }
}

watch(() => props.index, () => {
  scrollToSelectedImage()
})

watch(() => props.data.length, () => {
  imageList.value = props.data.map((item, idx) => ({
    image: item,
    index: idx,
    actived: false
  }))
}, {
  immediate: true
})

watch(() => props.visible, () => {
  if (props.visible) {
    nextTick(scrollToSelectedImage)
  }
})


</script>

<template>
  <div ref="scrollContainer" class="horizontal-scroll" @wheel.prevent="handleWheel">
    <div class="image-list-wrapper" :style="{transform: `translateX(${translateX}px)`}">
      <!-- <div class="content flex justify-cetner align-center" :style="{transform: `translateX(${contentTranslateX}px)`,}"> -->
        <div
          v-for="(item, idx) in visibleImages" :key="idx" class="thumb-item"
          :style="{backgroundColor: `${colorArr[item.index % colorArr.length]}`, transform: `translateX(${contentTranslateX}px)`}"
          :class="{actived: item.index === index }"
          @click="handleClickItem(item.index)"
        >
          <div class="cover">
            {{ item.index }} {{ index }}
          </div>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<style lang="less" scoped>
.horizontal-scroll {
  --active-size: 120px;
  --normal-size: 100px;
  --gap-size: 16px;
  width: 100%;
  position: relative;
  .image-list-wrapper {
    
    display: flex;
    align-items: center;
    height: var(--active-size);
  }
  .thumb-item {
    width: var(--normal-size);
    height: var(--normal-size);
    margin-right: var(--gap-size);
    flex-shrink: 0;
    border-radius: 4px;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
    .cover {
      width: 100%;
      height: 100%;
    }
    &.actived {
      width: var(--active-size);
      height: var(--active-size);
      border: 4px solid var(--warning-60);
    }
  }
}
</style>
