import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/Home.vue";
import Register from "./views/Registration.vue";
import LogIn from "./views/Login.vue";
import UploadPost from "./views/UploadPost.vue";
import Calendar from "./views/Calendar.vue";
import DiscussionBoard from "./views/DiscussionBoard.vue";
import Posts from "./views/AllPosts.vue";
import Profile from "./views/Profile.vue";

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
  {
    path: "/discussion",
    component: DiscussionBoard,
    name: "DiscussionBoard",
  },
  {
    path: "/posts",
    component: Posts,
    name: "AllPosts",
  },
  {
    path: "/profile/:profileId",
    component: Profile,
    name: "Profile",
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
