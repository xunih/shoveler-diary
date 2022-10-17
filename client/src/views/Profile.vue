<template>
  <div>
    <h1>Username:</h1>
    <span v-if="editIsClicked == false">{{ profile.username }}</span>
    <input
      v-if="editIsClicked == true"
      v-model="username"
      @change="getNewUsername"
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
  props: ["profileId"],
  setup(props) {
    let profile = reactive({
      username: "",
      profilePicture: "",
    });

    let editIsClicked = ref(false);

    let username = ref("");

    onMounted(() => {
      Api.get(`/profiles/${props.profileId}`)
        .then((response) => {
          profile.username = response.data.username;
          localStorage.username = profile.username;
        })
        .catch((error) => {
          profile = "";
          console.log(error);
        });
    });

    const changeUsername = () => {
      editIsClicked.value = true;
    };

    const getNewUsername = (e) => {
      profile.username = e.target.value;
    };

    const updateUsername = () => {
      var newProfile = {
        username: profile.username,
      };
      Api.patch("/profiles/" + props.profileId, newProfile)
        .then((response) => {
          profile.username = response.data.username;
          editIsClicked.value = false;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      profile,
      changeUsername,
      editIsClicked,
      username,
      getNewUsername,
      updateUsername,
    };
  },
};
</script>
