<template>
  <section class="signup-view">
    <form class="ui form">
      <EmailField></EmailField><PasswordField></PasswordField>
      <button class="ui button red fluid big" @click="signUpButtonPressed">
        Sign Up
      </button>
    </form>
  </section>
</template>
<script>
import EmailField from "../components/EmailField.vue";
import PasswordField from "../components/PasswordField.vue";
export default {
  setup() {

    const signUpButtonPressed = () => {
      console.log(user);
    };
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
