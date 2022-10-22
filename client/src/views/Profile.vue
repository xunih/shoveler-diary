<template>
  <h1 class="h1--profile">My Profile</h1>
  <div class="profile-page">
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
</template>

<script>
import { Api } from "../Api";
import { reactive, ref } from "vue";
import { onMounted } from "@vue/runtime-core";
export default {
  props: ["userId"],
  setup(props) {
    let user = reactive({
      username: "",
      email: "",
    });

    let editIsClicked = ref(false);

    let username = ref("");

    onMounted(() => {
      Api.get(`/users/${localStorage.userId}`)
        .then((response) => {
          user.username = response.data.username;
          user.email = response.data.email;
        })
        .catch((error) => {
          user = "";
          console.log(error);
        });
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
    };
  },
};
</script>

<style>
.profile-page {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 40%;
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
</style>
