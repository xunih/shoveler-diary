<template>
  <section class="signup-view">
    <form v-if="isRegistered == false" class="ui form">
      <EmailField v-model="user.email" /><PasswordField
        v-model="user.password"
      />
      <button @click="createUser">Sign Up</button>
    </form>
    <p v-if="isError == true && isRegistered == false">
      That email is already registered. Try again with a new email or login
      here.
    </p>
    <div v-if="isRegistered == true">
      <p>{{ message }}</p>
    </div>
  </section>
</template>
<script>
import { Api } from "../Api";
import EmailField from "../components/EmailField.vue";
import PasswordField from "../components/PasswordField.vue";
import { reactive, ref } from "vue";
export default {
  setup() {
    let isRegistered = ref(false);
    let isError = ref(false);
    let message = ref("");
    let user = reactive({
      email: "",
      password: "",
      username: "",
      userId: "",
      profileId: null,
      post: [],
      discussion: [],
    });
    const createUser = () => {
      if (user.email !== "" && user.password !== "") {
        var newUser = {
          email: user.email,
          password: user.password,
          post: user.post,
          discussion: user.discussion,
        };

        Api.post("/users/signup", newUser)
          .then((response) => {
            user.userId = response.data._id;
            isRegistered.value = true;
            console.log(response.data);
            console.log(response.data.message);
            message = response.data.message;
          })
          .catch((error) => {
            console.log("Error message " + error);
            isError.value = true;
          });
      }
    };
    return { user, createUser, isError, isRegistered, message };
  },
  components: {
    EmailField,
    PasswordField,
  },
};
</script>
<style scoped>
.signup-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.form {
  width: 450px;
}
</style>
