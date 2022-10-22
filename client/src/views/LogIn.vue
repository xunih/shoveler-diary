<template>
  <img id="Login" src="../../assets/mainpicture.jpeg" />
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
            type="submit"
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
    <div v-else-if="isLoggedIn == true" class="login-sucess">
      <p>Welcome Back!</p>
      <router-link :to="{ path: '/my-profile' }"
        ><button type="button" class="btn btn-dark" @click="loginButtonPressed">
          My Profile
        </button></router-link
      >
    </div>
    <div v-else-if="loginFailed == true" class="form-login">
      <p>Email and password not macthed!</p>
    </div>
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
  height: 100%;
  z-index: -1;
}

.form--login {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 55%;
  left: 50%;
}

.login--sucess {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 30%;
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
</style>
