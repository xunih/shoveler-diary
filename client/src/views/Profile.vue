<template>
  <div>
    <h2 class="h2--profile">Your username is:</h2>
    <span v-if="editIsClicked == false">{{ user.username }}</span>
    <input
      v-if="editIsClicked == true"
      v-model="user.username"
      @change="getNewUsername"
      :placeholder="user.username"
    />
    <button @click="changeUsername">Edit</button>
    <button v-if="editIsClicked == true" @click="updateUsername">Save</button>
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
    });

    let editIsClicked = ref(false);

    let username = ref("");

    onMounted(() => {
      Api.get(`/users/${localStorage.userId}`)
        .then((response) => {
          user.username = response.data.username;
          //localStorage.username = user.username;
          console.log(user)
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
.h2--profile {
  text-align: left;
  padding-top: 1em;
  padding-left: 1em;
}
</style>
