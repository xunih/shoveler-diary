<template>
  <section class="signup-view">
    <form @submit.prevent novalidate class="ui form">
      <div>
        <EmailField v-model="user.email" />
        <PasswordField v-model="user.password" />
        <button @click="loginButtonPressed">LOG IN</button>
      </div>
    </form>
  </section>
</template>

<script>
import { Api } from "../Api";
import { reactive } from "vue";
import EmailField from "../components/EmailField.vue";
import PasswordField from "../components/PasswordField.vue";

export default {
  components: {
    EmailField,
    PasswordField,
  },
  setup() {
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
              user.profileId = response.data.users[i].profile;
              user.post = response.data.users[i].post
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
    };
    return {
      user,
      loginButtonPressed,
      login,
    };
  },
};
</script>
