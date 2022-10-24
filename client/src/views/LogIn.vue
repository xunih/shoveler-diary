<template>
  <img id="Login" src="../../assets/AdobeStock_239531805.jpeg" />
  <div class="main--login-page">
    <form v-if="isLoggedIn == false" class="form--login">
      <div class="form-group row">
        <div class="col-sm-10">
          <input
            type="email"
            class="form-control"
            id="inputEmail3"
            placeholder="Email"
            v-model="user.email"
          />
        </div>
      </div>
      <div class="spacer--login"></div>
      <div class="form-group row">
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            id="inputPassword3"
            placeholder="Password"
            v-model="user.password"
          />
        </div>
      </div>
      <div class="spacer--login"></div>
      <div class="form-group row">
        <div class="col-sm-10 text-center">
          <button
            type="button"
            class="btn btn-dark"
            @click="loginButtonPressed"
          >
            Sign In
          </button>
        </div>
        <div class="col-sm-10 text-center">
          <router-link :to="{ path: '/register' }" class="link__color--login"
            >Create an account</router-link
          >
        </div>
      </div>
    </form>
    <div
      class="error__message--not-matched"
      v-if="loginFailed == true && isLoggedIn == false"
    >
      <p>Incorrect combination of user name and password.</p>
    </div>
  </div>
  <div v-if="isLoggedIn == true" class="form--login">
    <p>Welcome Back!</p>
  </div>
</template>

<script>
import { Api } from "../Api";
import { reactive, ref } from "vue";

export default {
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
      if (user.email !== "" && user.password !== "") {
        var loginUser = {
          email: user.email,
          password: user.password,
        };
        Api.post("/users/login", loginUser)
          .then((response) => {
            isLoggedIn.value = true;
            user.userId = response.data.data.user._id;
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("userId", user.userId);
            localStorage.setItem("isAdmin", response.data.data.user.admin);
          })
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

<style>
#Login {
  position: fixed;
  width: 100%;
  top: 38%;
  height: 70%;
  left: 0%;
  z-index: -1;
}

.form--login {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 20%;
  left: 50%;
}

.login--success {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 55%;
  left: 50%;
}

.main--login-page {
  position: fixed;
  width: 100%;
  height: 100%;
}

.link__color--login {
  color: black;
}

.spacer--login {
  padding-bottom: 1em;
}

.error__message--not-matched {
  text-align: center;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 35%;
  left: 49%;
}
</style>
