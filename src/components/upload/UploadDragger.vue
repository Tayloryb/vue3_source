  
<script setup lang="ts">
// import { message } from 'ant-design-vue';
import { ref } from 'vue'
// import i18n from '@/config/locale/index'

interface Props {
  accept?: string
  multiple?: boolean
  modelValue?: File[]
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  accept: '',
  multiple: false,
  modelValue: () => [],
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', files: File[]): void
  (e: 'change', files: File[]): void,
  (e: 'cancel'): void,
}>()

// const { t } = i18n.global

const fileList = ref<File[]>([])
const uploadFiles = ref<any[]>([])
const inputFiles = ref<File[]>([])
const changeFiles = ref<File[]>([])
let currentFileInput: HTMLInputElement | null = null;
// const aiBaseUploadInputRef = ref<HTMLInputElement | null>()

const openSelect = () => {
  // const inputFileDom = document.createElement('input')
  // aiBaseUploadInputRef.value?.click()
  if (currentFileInput) {
    cleanupFileInput(currentFileInput)
  }
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = props.accept
  fileInput.multiple = props.multiple
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  fileInput.addEventListener('change', handleInputChange);
  fileInput.addEventListener('cancel', () => {
    emit('cancel')
  });
  currentFileInput = fileInput

  fileInput.click(); // 触发点击事件
}

const handleInputChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  
  if (fileInput.files) {
    // 处理文件数据，可以在这里进行上传等操作
    const files = [...fileInput.files]
    files.forEach((file) => {
      if (judgeFile(file)) {
        fileList.value.push(file)
        changeFiles.value.push(file)
      }
    })
    if (changeFiles.value.length) {
      fileChange()
    }
  }
  cleanupFileInput(fileInput)
};

const cleanupFileInput = (fileInput: HTMLInputElement) => {
  fileInput.removeEventListener('change', handleInputChange);
  fileInput.parentElement?.removeChild(fileInput);
};


const judgeFile = (file: File): boolean => {
  if (!props.accept) return true
  const exts: string[] = []
  props.accept.replace(/\./g, '').split(',').forEach((item) => {
    if (item) {
      exts.push(item)
      exts.push(item.toUpperCase())
    }
  })
  
  const fileName = file.name.split('.')
  const ext = fileName[fileName.length - 1]
  return exts.includes(ext)
}
const handleDrop = () => {
  uploadFiles.value.forEach((file: any) => {
    if (judgeFile(file)) {
      fileList.value.push(file.originFileObj)
      changeFiles.value.push(file.originFileObj)
    }
  })
  uploadFiles.value = []
  if (changeFiles.value.length) {
    fileChange()
  }
  // const bool = judgeFile(fileList.value)
  // if (bool) {
  //   uploadFiles.value = []
  //   fileChange()
  // } else {
  //   message.error(t('common.comp.file_ext_error'))
  // }
}
// const handleInputChange = (event: Event) => {
//   // console.log('aiBaseUploadInputRef.value :>> ', aiBaseUploadInputRef.value, event.target , event.target?.files);
//   const inputEvent = event as Event & { target: HTMLInputElement }
//   const files = inputEvent.target?.files || []
//   fileList.value.push(...files)
//   changeFiles.value.push(...files)
//   fileChange()
// }
const clearAll = () => {
  uploadFiles.value = []
  inputFiles.value = []
  fileList.value = []
  emit('update:modelValue', fileList.value)
}

const fileChange = () => {
  emit('update:modelValue', fileList.value)
  emit('change', changeFiles.value)
  changeFiles.value = []
}
</script>

<template>
  <div>
    <a-upload-dragger
      ref="uploadRef"
      v-model:fileList="uploadFiles"
      :show-upload-list="false"
      :accept="props.accept"
      name="file"
      :multiple="props.multiple"
      :custom-request="() => {}"
      :open-file-dialog-on-click="false"
      :disabled="props.disabled"
      @drop="handleDrop"
    >
      <slot
        v-bind="{
          openSelect,
          clearAll
        }"
      >
        <div class="upload-wrapper" @click.stop>
          <a-button type="primary" size="large" class="row" @click="openSelect">选择</a-button>
        </div>
      </slot>
    </a-upload-dragger>
  </div>
</template>

<style lang="less" scoped>
.upload-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 440px;
  padding: 0;
  border: 1px dashed var(--black-30);
  cursor: default;
}

:deep(.ant-upload.ant-upload-drag) {
  border: none;
  background-color: #fff;
  cursor: unset;
  .ant-upload {
    padding: 0;
  }
}
.main-text {
  font-size: 16px;
  color: var(--black-100);
}
.mark-text {
  font-size: 14px;
  color: var(--black-60);
}
.row {
  margin-bottom: 10px;
}
</style>

