<script setup>
// Define reactive data and props
import { ref } from '@vue/reactivity';

const greeting = ref('Hello, Vue 3!' + 1);
let counter = ref(0);
let _doubled = computed(() => counter.value * 2);

// Define a function
const incrementCounter = () => {
  counter.value++;
};
</script>

<template>
  <div>
    <h1>
      {{ greeting }}
    </h1>
    <button
      type="button"
      @click="incrementCounter"
    >
      Click me!
    </button>
    <p>Counter: {{ counter }}</p>
  </div>
</template>
