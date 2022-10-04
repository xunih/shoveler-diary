<template>
  <section class="signup-view">
    <form class="ui form">
      <EmailField v-model="user.email" /><PasswordField
        v-model="user.password"
      />
      <button @click="createUser">Sign Up</button>
    </form>
  </section>
</template>
<script>
import { Api } from "../Api";
import EmailField from "../components/EmailField.vue";
import PasswordField from "../components/PasswordField.vue";
import { reactive } from "vue";
export default {
  setup() {
    let userStatus = reactive({
      message: "Welcome!",
      isRegistered: false,
      isEmpty: false,
      duplicateEmail: false,
    });

    let user = reactive({
      email: "",
      password: "",
      userId: "",
      profileId: null,
    });
    const createUser = () => {
      if (user.email === "" || user.password === "") {
        userStatus.isEmpty = true;
        userStatus.duplicateEmail = false;
      } else {
        userStatus.isEmpty = false;
        var newUser = {
          email: user.email,
          password: user.password,
        };
        // creates a new user
        console.log(newUser);
        Api.post("/users", newUser)
          .then((response) => {
            user.userID = response.data._id;
            console.log(response.data._id);
            console.log(response.data.email);
            userStatus.isError = false;
            userStatus.duplicateEmail = false;
            userStatus.isRegistered = true;
            user.userId = response.data._id;
            localStorage.userID = user.userID;
            var newProfile = {
              username: response.data.email,
            };
            console.log(newProfile);
            Api.post("users/" + user.userId + "/profiles", newProfile).then(
              (response) => {
                userStatus.isError = false;
                userStatus.duplicateEmail = false;
                userStatus.isRegistered = true;
                user.profileId = response.data.profile._id;
                console.log(user.profileId);
              }
            );
          })
          .then()
          .catch((error) => {
            console.log(error);
            // error due to duplicate email address in the database
            userStatus.duplicateEmail = true;
            userStatus.isEmpty = false;
          });
      }
    };
    return { user, createUser };
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
