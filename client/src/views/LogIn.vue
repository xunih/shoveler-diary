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
          path: '/my-post',
        }"
        ><button>My Posts</button></router-link
      >
    </div>
    <div v-else-if="loginFailed == true">
      <p>Email and password not macthed!</p>
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
    let loginFailed = ref(false);
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
        var loginUser = {
          email: user.email,
          password: user.password,
        };
        Api.post("/users/login", loginUser)
          .then((response) => {
            user.userId = response.data.data.user._id;
            localStorage.accessToken = response.data.accessToken;
            console.log("Received access token si");
            console.log(response);
            isLoggedIn.value = true;
            localStorage.userId = user.userId;
            var newProfile = {
              username: "heyhey",
            };
            Api.post("/users/" + user.userId + "/profile", newProfile).then(
              (response) => {
                user.profileId = response.data.profile._id;
                localStorage.userId = user.userId;
              }
            );
          })
          .then()
          .catch((error) => {
            console.log("Error message " + error);
            loginFailed.value = true;
          });
      }
    };

    return {
      user,
      loginButtonPressed,
      isLoggedIn,
      loginFailed,
    };
  },
};
</script>
