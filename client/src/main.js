globalThis.__VUE_OPTIONS_API__ = true;
globalThis.__VUE_PROD_DEVTOOLS__ = false;
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
