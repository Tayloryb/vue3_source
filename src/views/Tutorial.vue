<script setup lang="ts">
import TutorialComp from '@/components/tutorial/Tutorial.vue';
import { useTutorial } from '@/components/tutorial/helpers';
import { ref, onMounted } from 'vue';

const { addTutorial, current, prev, next, setTutorial } = useTutorial();

onMounted(() => {
  addTutorial({
    target: '#tutorial_01',
  });
  addTutorial({
    target: '#tutorial_02',
  });
  addTutorial({
    target: '#tutorial_03',
  });
  addTutorial({
    target: '#tutorial_04',
  });
});

const inputRef = ref<number | undefined>()
const handleChangeTutorial = () => {
  console.log('inputRef.value :>> ', inputRef.value);
  if (inputRef.value) {
    setTutorial(inputRef.value - 1)
  }
}

</script>

<template>
  <div>
    <h1>Tutorial</h1>
    <p>Here is a tutorial on how to use this app.</p>
    <div id="tutorial_01">test1</div>
    <div class="container">
      <span id="tutorial_02">test2</span>
      <span id="tutorial_03">test3</span>
      <span id="tutorial_04">test4</span>
    </div>
    <TutorialComp :current>
      <template #default="{ position }">
        <div>
          <span>{{ position.left }}</span>
          <a-button @click="prev">prev</a-button>
          <a-button @click="next">next</a-button>
          <a-input-number v-model:value="inputRef" ></a-input-number>
          <a-button @click="handleChangeTutorial">submit</a-button>
        </div>
      </template>
    </TutorialComp>
  </div>
</template>

<style scoped>

</style>
