<template>
  <section class="signup-view">
    <form>
      <div>
        <EmailField v-model="user.email" />
        <PasswordField v-model="user.password" />
        <button @click="loginButtonPressed">LOG IN</button>
      </div>
    </form>
    <div v-if="isLoggedIn == true">
      <p>Welcome Back!</p>
      <router-link :to="{ path: '/' }"><button>Home</button></router-link>
      <router-link :to="{ path: '/profile/' + user.profileId }"
        ><button>My Profile</button></router-link
      >
      <router-link
        :to="{
          path: '/my-post/',
          params: user.userId,
        }"
        ><button>My Posts</button></router-link
      >
    </div>
  </section>
</template>

<script>
import { Api } from "../Api";
import { reactive, ref } from "vue";
import EmailField from "../components/EmailField.vue";
import PasswordField from "../components/PasswordField.vue";

export default {
  components: {
    EmailField,
    PasswordField,
  },
  setup() {
    let isLoggedIn = ref(false);
    let user = reactive({
      email: "",
      password: "",
      userId: "",
      profielId: "",
      post: [],
    });

    const loginButtonPressed = () => {
      // checks if the fields are empty
      if (user.email === "" || user.password === "") {
        //user.isEmpty = true
      } else {
        //user.isEmpty = false
        console.log("hello");
        Api.get("/users").then((response) => {
          for (var i = 0; i < response.data.users.length; i++) {
            if (user.email === response.data.users[i].email) {
              user.userId = response.data.users[i]._id;
              console.log(response.data.users[i]);
              user.profileId = response.data.users[i].profile;
              console.log(response.data.users[i]);
              user.post = response.data.users[i].post;
              login();
              break;
            }
          }
        });
      }
    };
    const login = () => {
      localStorage.userId = user.userId;
      localStorage.email = user.email;
      isLoggedIn.value = true;
      console.log(isLoggedIn);
    };
    return {
      user,
      loginButtonPressed,
      login,
      isLoggedIn,
    };
  },
};
</script>
