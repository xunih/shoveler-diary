<template>
  <img id="Registration" src="../../assets/mainpicture.jpeg" />
  <div class="main--register">
    <form v-if="isRegistered == false" class="form--register">
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
      <div class="spacer--register"></div>
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
      <div class="spacer--register"></div>
      <div class="form-group row">
        <div class="col-sm-10 text-center">
          <button type="submit" class="btn btn-dark" @click="createUser">
            Sign Up
          </button>
        </div>
        <div class="col-sm-10 text-center">
          <router-link :to="{ path: '/login' }" class="link__color--register"
            >I have an account</router-link
          >
        </div>
      </div>
    </form>
    <div class="col-sm-10" v-if="isError == true && isRegistered == false">
      That email is already registered. Try again with a new email or login.
    </div>
    <div v-if="isRegistered == true">
      <p>{{ message }}</p>
    </div>
  </div>
</template>
<script>
import { Api } from "../Api";
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
            console.log(message);
          })
          .catch((error) => {
            console.log("Error message " + error);
            isError.value = true;
          });
      }
    };
    return { user, createUser, isError, isRegistered, message };
  },
};
</script>
<style>
#Registration {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.spacer--register {
  padding-bottom: 1em;
}

.form--register {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 55%;
  left: 50%;
}

.main--register {
  position: fixed;
  width: 100%;
  height: 100%;
}

.link__color--register {
  color: black;
}
</style>
