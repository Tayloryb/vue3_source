<script lang="ts" setup>
import { ref, watch } from 'vue'
import VideoData from '@a/video/video_02.mp4'
import { useElementHover } from '@vueuse/core'

const wrapperRef = ref<HTMLElement | null>()
const videoRef = ref<HTMLVideoElement | null>()
const isHover = useElementHover(wrapperRef)

const togglePlay = (swtichStatus = true) => {
  if (videoRef.value) {
    if (swtichStatus) {
      videoRef.value.play()
    } else {
      videoRef.value.pause()
    }
  }
}

const handleReset = () => {
  if (videoRef.value) {
    videoRef.value.currentTime = 0
  }
}

watch(() => isHover.value, (val) => {
  if (val) {
    togglePlay()
  } else {
    handleReset()
    togglePlay(false)
  }
})

</script>


<template>
  <div ref="wrapperRef" class="video-wrapper">
    <video ref="videoRef" :src="VideoData" class="video-item" muted loop></video>
    <div v-show="isHover" class="wrapper-info flex justify-center align-center">
      <a-button>test</a-button>
    </div>
  </div>

</template>

<style lang="less" scoped>
.video-wrapper {
  width: 200px;
  height: 200px;
  position: relative;
  .video-item {
    width: 100%;
    height: 100%;
    background-color: #000;
  }
  .wrapper-info {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

  }
}
</style>