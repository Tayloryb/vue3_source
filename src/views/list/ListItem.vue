<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { MockListItem } from '@/mock/listmock'

const props = defineProps<{
  data: MockListItem
  contentWidth: number
}>()

const emit = defineEmits<{
  (e: 'rendered'): void
  (e: 'pictureLoaded'): void
  (e: 'loadPicture'): void
}
>()

const MARGIN_BETWEEN_ITEMS = 10
const observer = ref<IntersectionObserver | null>(null);
const elementRef = ref<HTMLElement | null>(null);

const itemWidth = computed(() => {
  return Math.floor((props.contentWidth - MARGIN_BETWEEN_ITEMS * 3) / 4)
})

onMounted(() => {
  emit('rendered')
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        emit('loadPicture');
      }
    });
  });
  if (elementRef.value) {
    observer.value.observe(elementRef.value);
  }
})

const loadNums = ref<number>(0)

const pictureNums = computed(() => {
  return props.data.pictures.length
})

const isPicturePending = computed(() => {
  return props.data.pictureStatus === 'pending'
})

const handleOnload = () => {
  loadNums.value += 1
  if (pictureNums.value === loadNums.value) {
    observer.value?.disconnect()
    emit('pictureLoaded')
  }
}


</script>

<template>
  <div ref="elementRef" class="list-item">
    <div v-for="(picture, pictureIdx) in data.pictures" :key="`${data.id}_${pictureIdx}`" class="list-item-content" :style="{ width: `${itemWidth}px`, height: `${itemWidth}px` }">
      <img :src="isPicturePending ? '': picture" alt="" @load="handleOnload"/>
      <p>{{ picture }}</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-item {
  margin-bottom: 20px;
  .list-item-content {
    display: inline-block;
    margin-right: 10px;
    background-color: #313131;
    border-radius: 8px;
    overflow: hidden;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>