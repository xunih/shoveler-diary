<template>
  <section class="signup-view">
    <form v-if="isRegistered == false" class="ui form">
      <EmailField v-model="user.email" /><PasswordField
        v-model="user.password"
      />
      <button @click="createUser">Sign Up</button>
    </form>
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
    let isEmpty = ref(false);
    let isError = ref(false);
    let duplicateEmail = ref(false);

    let user = reactive({
      email: "",
      password: "",
      userId: "",
      profileId: null,
    });
    const createUser = () => {
      if (user.email === "" || user.password === "") {
        isEmpty = true;
        duplicateEmail = false;
      } else {
        isEmpty = false;
        var newUser = {
          email: user.email,
          password: user.password,
        };
        // creates a new user
        console.log(newUser);
        Api.post("/users", newUser)
          .then((response) => {
            user.userID = response.data._id;
            console.log(isRegistered);
            isError.value = !isError.value;
            duplicateEmail.value = !isRegistered.value;
            isRegistered.value = !isRegistered.value;
            console.log(isRegistered);
            user.userId = response.data._id;
            localStorage.userID = user.userID;
            var newProfile = {
              username: response.data.email,
            };
            console.log(newProfile);
            Api.post("/users/" + user.userId + "/profiles", newProfile).then(
              (response) => {
                isError.value = !isError.value;
                duplicateEmail.value = !duplicateEmail.value;
                user.profileId = response.data.profile._id;
                console.log(isRegistered);
              }
            );
          })
          .then()
          .catch((error) => {
            console.log(error);
            // error due to duplicate email address in the database
            duplicateEmail = true;
            isEmpty = false;
          });
      }
    };
    return { user, createUser, isError, isRegistered, isEmpty, duplicateEmail };
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
