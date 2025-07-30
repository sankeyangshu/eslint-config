<template>
  <div>
    <h1>
      {{ greeting }}
    </h1>
    <button
      @click="incrementCounter"
      type="button"
    >
      Click me!
    </button>
    <p>Counter: {{ counter }}</p>
  </div>
</template>

<script setup>
// Define reactive data and props
import { ref } from 'vue';

const greeting = ref(`Hello, Vue 3!${1}`);
const counter = ref(0);
const _doubled = computed(() => counter.value * 2);

// Define a function
const incrementCounter = () => {
  counter.value++;
};
</script>
