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
export default {
  setup() {},
  components: {
    Header,
  },
};
</script>
