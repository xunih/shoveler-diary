import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import LogIn from "./views/Login.vue";

const routes = [
  { path: "/", component: Home },
  {
    path: "/register",
    component: Register,
    name: "Register",
  },
  {
    path: "/login",
    component: LogIn,
    name: "Login",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
