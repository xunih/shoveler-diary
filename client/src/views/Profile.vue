<template>
  <h1 class="h1--profile">My Profile</h1>
  <h3 class="h3--profile" v-if="isError == true">You need to sign in!</h3>
  <div v-if="isError == false" class="profile-page">
    Email: <span>{{ user.email }}</span>
    <div class="spacer--profile"></div>
    Username:
    <span v-if="editIsClicked == false">{{ user.username }}</span>
    <input
      v-if="editIsClicked == true"
      v-model="user.username"
      @change="getNewUsername"
      :placeholder="user.username"
    />
    <div class="spacer--profile"></div>
    <button
      v-if="editIsClicked == false"
      type="button"
      class="btn btn-dark"
      @click="changeUsername"
    >
      Edit Username
    </button>
    <button
      type="button"
      class="btn btn-dark"
      v-else-if="editIsClicked == true"
      @click="updateUsername"
    >
      Save
    </button>
  </div>
  <Image />
</template>

<script>
import { Api } from "../Api";
import { reactive, ref } from "vue";
import { onMounted } from "@vue/runtime-core";
import Image from "../components/BackgroundImg.vue";
export default {
  components: {
    Image,
  },
  setup(props) {
    let user = reactive({
      username: "",
      email: "",
    });

    let editIsClicked = ref(false);

    let username = ref("");

    let isError = ref(false);

    onMounted(async () => {
      let userId = localStorage.getItem("userId");
      console.log("userId");
      console.log(userId);
      if (!userId) {
        isError.value = true;
      } else {
        await Api.get("/users/" + userId)
          .then((response) => {
            isError.value = false;
            user.username = response.data.username;
            user.email = response.data.email;
          })
          .catch((error) => {
            console.log(localStorage.getItem("userId"));
            console.log(localStorage.getItem("accessToken"));
            if (error.response.status == 403) {
              isError.value = true;
            }
            user = "";
            console.log(error);
          });
      }
    });

    const changeUsername = () => {
      editIsClicked.value = true;
    };

    const getNewUsername = (e) => {
      user.username = e.target.value;
    };

    const updateUsername = () => {
      var newUsername = {
        username: user.username,
      };
      Api.patch("/users/" + localStorage.userId, newUsername)
        .then((response) => {
          username = response.data.username;
          editIsClicked.value = false;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      user,
      changeUsername,
      editIsClicked,
      username,
      getNewUsername,
      updateUsername,
      isError,
    };
  },
};
</script>

<style>
.profile-page {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 35%;
  left: 50%;
  text-align: center;
}

.spacer--profile {
  padding-bottom: 2em;
}

.h1--profile {
  text-align: center;
  padding-top: 1em;
}

.h3--profile {
  text-align: center;
}
</style>
