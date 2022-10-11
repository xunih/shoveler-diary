import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/Home.vue";
import Register from "./views/Registration.vue";
import LogIn from "./views/Login.vue";
import UploadPost from "./views/UploadPost.vue";
import Calendar from "./views/Calendar.vue";

const routes = [
  { path: "/", component: Home, name: "Home" },
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
  {
    path: "/post",
    component: UploadPost,
    name: "UploadPost",
  },
  {
    path: "/calendar",
    component: Calendar,
    name: "Calendar",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
