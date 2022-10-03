<script setup>
import { ref, onMounted } from "vue";

// reactive state
const count = ref(0);

// functions that mutate state and trigger updates
function increment() {}

// lifecycle hooks
onMounted(() => {
  console.log(`Inside mounted`);
});
</script>

<template>
  <div>
    <button>Sign Up</button>
    <button>Sign In</button>
  </div>
</template>

