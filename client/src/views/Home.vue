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
    <router-link :to="{ path: '/register' }"
      ><button>Sign Up</button></router-link
    >
    <router-link :to="{ path: '/login' }"><button>Sign In</button></router-link>
  </div>
</template>
