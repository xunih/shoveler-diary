<template>
  <div>
    <h1>Username: {{ profile.username }}</h1>
  </div>
</template>

<script>
import { Api } from "../Api";
import { reactive } from "vue";
import { onMounted } from "@vue/runtime-core";
export default {
  props: ["profileId"],
  setup(props) {
    let profile = reactive({
      username: "",
      profilePicture: "",
    });

    onMounted(() => {
      Api.get(`/profiles/${props.profileId}`)
        .then((response) => {
          profile.username = response.data.username;
          console.log(rofile);
          localStorage.username = profile.username;
        })
        .catch((error) => {
          profile = "";
          console.log(error);
        })
    });

    return {
      profile,
    };
  },
};
</script>
