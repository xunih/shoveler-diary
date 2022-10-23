<template>
  <div id="app">
    <div>
      <Header />
    </div>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import { ref } from "vue";
export default {
  setup() {
    let location = ref(window.location.href);
    return {
      location,
    };
  },
  components: {
    Header,
  },
};
</script>
