<script setup></script>

<template>
  <div>
    <img id="Home" src="../../assets/mainpicture.jpeg" />
    <div v-if="status == false" class="btn--home-page">
      <router-link :to="{ path: '/login' }">
        <button type="button" class="btn btn-dark mr-2">Log In</button>
      </router-link>
      <div class="divider"></div>
      <router-link :to="{ path: '/register' }">
        <button type="button" class="btn btn-dark mr-2">Sign Up</button>
      </router-link>
    </div>
    <div v-if="status == true" class="btn--home-page">
      <button type="button" class="btn btn-dark mr-2" @click="signOut">
        Sign out
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    let status = ref(false);
    onMounted(() => {
      if (localStorage.getItem("userId")) {
        status.value = true;
      } else {
        status.value = false;
      }
    });

    const router = useRouter();
    const signOut = () => {
      router.push("/");
      status.value = false;
      localStorage.setItem("accessToken", "");
      localStorage.setItem("userId", "");
      localStorage.setItem("isAdmin", false);
    };
    return { status, signOut };
  },
};
</script>

<style>
#Home {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.btn--home-page {
  position: absolute;
  transform: translate(-50%, -50%);
  margin-right: -50%;
  top: 55%;
  left: 50%;
}

.divider {
  width: 5px;
  height: auto;
  display: inline-block;
}
</style>
