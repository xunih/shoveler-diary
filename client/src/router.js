import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/Home.vue";
import Register from "./views/Registration.vue";
import LogIn from "./views/Login.vue";
import CreatePost from "./views/CreatePost.vue";
import Calendar from "./views/Calendar.vue";
import CreateDiscussion from "./views/CreateDiscussion.vue";
import Posts from "./views/AllPosts.vue";
import Profile from "./views/Profile.vue";
import Discussions from "./views/AllDiscussions.vue";
import Discussion from "./views/Discussion.vue";
import MyPost from "./views/MyPosts.vue";
import Confirmation from "./views/Confirmation.vue"

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
    component: CreatePost,
    name: "CreatePost",
  },
  {
    path: "/calendar",
    component: Calendar,
    name: "Calendar",
  },
  {
    path: "/discussion",
    component: CreateDiscussion,
    name: "CreateDiscussion",
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
  {
    path: "/discussions",
    component: Discussions,
    name: "AllDiscussions",
  },
  {
    path: "/discussion/:discussionId",
    component: Discussion,
    name: "Discussion",
    props: true,
  },
  {
    path: "/my-post",
    component: MyPost,
    name: "MyPost",
  },
  {
    path: "/verify/:confirmationCode",
    component: Confirmation,
    name: "Confirmation",
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
