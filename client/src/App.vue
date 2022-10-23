<template>
  <div id="app" :class="theme === 'light' ? 'light-theme' : 'dark-theme'">
    <div>
      <Header />
    </div>
    <button @click="chanegTheme">Switch Theme</button>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import { ref } from "vue";
export default {
  setup() {
    let theme = ref("light");
    const chanegTheme = () => {
      theme.value = theme.value === "dark" ? "light" : "dark";
      console.log("hihihaha");
      console.log(theme);
    };
    return { theme, chanegTheme };
  },
  components: {
    Header,
  },
};
</script>

<style>
.dark-theme {
  /* Variables for dark mode */
  background-color: black;
  color: white;
  height: 100vh;
}

.light-theme {
  /* Variables for dark mode */
  background-color: white;
  color: black;
}

html,
body {
  margin: 0;
  padding: 0;
}
</style>
