<script setup lang="ts">
import testImage from '@a/imgs/right_distinct.png';

import { utcToLocal } from '@/utils/date'
import { reactive } from 'vue';

// 你的 UTC 时间戳（秒级）
const gmtTimestampInSeconds = 1713460069;

// 转换为毫秒级
const gmtTimestampInMilliseconds = gmtTimestampInSeconds * 1000;

// 使用 moment 对象转换为本地时间
const date = utcToLocal(gmtTimestampInMilliseconds);

// 设置时区
const localDate = date.format('YYYY-MM-DD hh:mm:ss');

console.log(localDate); // 输出本地时间


const handleCopy = () => {
  const testImg = document.querySelector("#testImg") as HTMLImageElement;

  if (!testImg) {
    console.error("Image not found");
    return;
  }
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return
  }

  const image = document.createElement("img");
  image.src = testImg.src;
  image.crossOrigin = "Anonymous";
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(image, 0, 0);
    // 将canvas转为blob
    canvas.toBlob(async blob => {
      console.log(blob);
      if (!blob) {
        return
      }
      const data = [
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ];
      // https://w3c.github.io/clipboard-apis/#dom-clipboard-write
      await navigator.clipboard.write(data)
      .then(() => {
        console.log("Copied to clipboard successfully!");
      },
        () => {
          console.error("Unable to write to clipboard.");
        }
        );
      });
  }
};

const downloadPicture = (url: string, name: string) => {
  const image = document.createElement("img");
  image.src = url;
  image.crossOrigin = "Anonymous";
  image.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const a = document.createElement("a");
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}

const handleDownload = () => {
  const testImg = document.querySelector("#testImg") as HTMLImageElement;

  if (!testImg) {
    console.error("Image not found");
    return;
  }
  downloadPicture(testImg.src, "test.png");
};

const data = reactive<{
  prompt: string;
  referencePicturesThumbnail: string[]
  tags: string[]
}>({
  prompt: "this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.this is a test string.",
  referencePicturesThumbnail: ['', '', '', '', ''],
  tags: []
})

for (let i = 0; i < 30; i++) {
  data.tags.push(`tag${i}`);
}

</script>
<template>
  <!-- <div>
    <img id="testImg" :src="testImage" alt="img" class="test-image">
    <button id="btn" @click="handleCopy">copy</button>
    <button @click="handleDownload">download</button>
  </div> -->
  <div class="wrapper" :style="{height: '240px'}">
    <div class="info-wrapper">
      <div class="task-info">
        <div class="task-prompt-info">
          <span>tagname</span>
          <span>{{ data.prompt }}</span>
        </div>
        <div class="reference-picture-wrapper">
          <a-tooltip>
            <template #title>
              <span>参考图</span>
            </template>
            <div class="pictrues-wrapper">
              <div
                v-for="(referenceItem) in data.referencePicturesThumbnail.slice(0, 5)"
                :key="referenceItem"
                class="reference-picture-item"
              >
              </div>
            </div>
          </a-tooltip>
        </div>
        <div class="options-wrapper">
          <div class="options-content">
            <div v-if="data.tags.length" class="tags-wrapper">
              <a-button v-for="tag in data.tags" :key="tag" size="small" class="tag-item">
                {{ tag }}
              </a-button>
            </div>
            <div class="task-opt-btns">
              <div class="btn-item">              
                <span>使用提示词</span>
              </div>
              <div class="btn-item">
                <span>重新生成</span>
              </div>
              <div class="btn-item">
                <span>跳转父任务</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.test-image {
  width: 120px;
  height: 60px;
  object-fit: cover;
}
.wrapper {
  &:hover {
    .task-opt-btns {
      visibility: visible;
      height: 24px;
    }
  }
}

.info-wrapper {
    flex-shrink: 0;
    width: 304px;
    padding-left: 16px;
    height: 100%;
    &.is-verticle {
      padding-left: 0;
      width: 100%;
      margin-bottom: 8px;
      .task-opt-btns {
        margin-top: 0;
        width: 300px;
        right: 0;
        left: unset
      }
      .description-task-info {
        .task-opt-btns {
          margin-top: 10px;
        }
      }
      .options-wrapper {
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
.options-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  max-height: calc(100% - 92px);
}
.options-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
} 
.task-info {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  
  .reference-picture-wrapper {
    display: inline-flex;
    margin-top: 16px;
    .pictrues-wrapper {
      cursor: pointer;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
    }
    .reference-picture-item {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      background-color: #EEEEF0;
      margin-left: 4px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      &:first-child {
        margin-left: 0;
      }
      .more-confirm {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        .flexbox();
        background-color: rgba(0, 0, 0, 0.7);
        color: #FFFFFF;
        font-size: 14px;
      }
    }
  }
  .task-prompt-info {
    min-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    .task-type {
      margin-right: 4px;
      padding: 0 8px;
      border-radius: 8px;
      background-color: #3D7EFF;
      color: #FFFFFF;
      user-select: none;
      &.tag-second {
        color: #3D7EFF;
        border: 1px solid #3D7EFF;
        background-color: #FFFFFF;
      }
    }
  }
  .tags-wrapper {
    // flex-shrink: 0;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    overflow-y: auto;
    .tag-item {
      padding: 0 4px;
      border: 1px solid rgb(215, 215, 215);
      font-size: 10px;
      line-height: 20px;
      color: rgb(145, 145, 145);
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        border-color: var(--info-60);
        color: var(--info-60)
      }
    }
  }
  .task-opt-btns {
    visibility: hidden;
    height: 0;
    margin-top: 8px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    background-color: transparent;
    .btn-item {
      flex: 1;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      cursor: pointer;
      padding: 4px 8px;
      font-size: 12px;
      border-radius: 4px;
      background-color: #EFEFEF;
      margin-right: 8px;
      white-space: nowrap;
      .btn-icon {
        margin-right: 4px;
      }
      &:hover {
        background-color: #D9D8D8;
      }
      &:active {
        background-color: #B5B5B5;
      }
    }
  }
}
</style>