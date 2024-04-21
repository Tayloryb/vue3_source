<script setup lang="ts">
import testImage from '@a/imgs/right_distinct.png';

import { utcToLocal } from '@/utils/date'

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

</script>
<template>
  <div>
    <img id="testImg" :src="testImage" alt="img" class="test-image">
    <button id="btn" @click="handleCopy">copy</button>
    <button @click="handleDownload">download</button>
  </div>
</template>

<style lang="less" scoped>
.test-image {
  width: 120px;
  height: 60px;
  object-fit: cover;
}
</style>