<template>
  <div v-if="isVerified == true">
    <header>
      <h3>
        <strong>Account confirmed!</strong>
      </h3>
    </header>
    <router-link :to="{ path: '/login' }"><button>Sign In</button></router-link>
  </div>
  <div v-else-if="isVerified == false">
    <header>
      <h3>
        <strong>Verification expired!</strong>
      </h3>
    </header>
  </div>
</template>

<script>
import { Api } from "../Api";
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";
export default {
  setup(props) {
  
    let isVerified = ref(false);
    onMounted(() => {
      console.log("vonfirmation/verify");
      console.log(window.location.href.split("/")[5]);
      Api.get("/users/verify/" + window.location.href.split("/")[5])
        .then((response) => {
          isVerified.value = true;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return {
      isVerified,
    };
  },
};
</script>
