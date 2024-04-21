<script setup lang="ts">
import TutorialComp from '@/components/tutorial/Tutorial.vue';
import { useTutorial } from '@/components/tutorial/helpers';
import { onMounted } from 'vue';

const { addTutorial, current } = useTutorial();

onMounted(() => {
  addTutorial({
    target: '#tutorial_01',
  });
  addTutorial({
    target: '#tutorial_02',
  });
});
</script>

<template>
  <div>
    <h1>Tutorial</h1>
    <p>Here is a tutorial on how to use this app.</p>
    <div id="tutorial_01">test1</div>
    <div id="tutorial_02">test2</div>
    <TutorialComp :current />
  </div>
</template>
