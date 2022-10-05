<template>
  <section class="signup-view">
    <form v-if="isRegistered == false" class="ui form">
      <EmailField v-model="user.email" /><PasswordField
        v-model="user.password"
      />
      <button @click="createUser">Sign Up</button>
    </form>
    <p v-if="isError == true">
      That email is already registered. Try again with a new email or login
      here.
    </p>
    <div v-if="isRegistered == true">
      <p>Welcome!</p>
      <router-link :to="{ path: '/' }"><button>Home</button></router-link>
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
    let duplicateEmail = ref(false);

    let user = reactive({
      email: "",
      password: "",
      userId: "",
      profileId: null,
    });
    const createUser = () => {
      if (user.email !== "" && user.password !== "") {
        var newUser = {
          email: user.email,
          password: user.password,
        };

        Api.post("/users", newUser)
          .then((response) => {
            user.userId = response.data._id;
            isError.value = !isError.value;
            duplicateEmail.value = !isRegistered.value;
            isRegistered.value = !isRegistered.value;
            user.userId = response.data._id;
            var newProfile = {
              username: response.data.email,
            };

            Api.post("/users/" + user.userId + "/profiles", newProfile).then(
              (response) => {
                isError.value = !isError.value;
                duplicateEmail.value = !duplicateEmail.value;
                user.profileId = response.data.profile._id;
              }
            );
          })
          .then()
          .catch((error) => {
            console.log("Error message " + error);
            isError.value = !isError.value;
          });
      }
    };
    return { user, createUser, isError, isRegistered, duplicateEmail };
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
