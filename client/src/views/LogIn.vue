<template>
  <img id="Login" src="../../assets/mainpicture.jpeg" />
  <div class="main">
    <form v-if="isLoggedIn == false" class="form">
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
      <div class="space"></div>
      <div class="form-group row">
        <div class="col-sm-10 margin-left">
          <input
            type="password"
            class="form-control"
            id="inputPassword3"
            placeholder="Password"
            v-model="user.password"
          />
        </div>
      </div>
      <div class="space"></div>
      <div class="form-group row">
        <div class="col-sm-10 text-center">
          <button
            type="submit"
            class="btn btn-dark"
            @click="loginButtonPressed"
          >
            Log In
          </button>
        </div>
        <div class="col-sm-10 text-center">
          <router-link :to="{ path: '/register' }" class="link-color"
            >Create an account</router-link
          >
        </div>
      </div>
    </form>
  </div>
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

<style>
#Login {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.form {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 55%;
  left: 50%;
}

.main {
  position: fixed;
  width: 100%;
  height: 100%;
}

.link-color {
  color: black;
}


.space {
  padding-bottom: 1em;
}
</style>
