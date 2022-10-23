<template>
  <div class="header">
    <router-link :to="{ path: '/post' }"
      ><button type="button" class="btn btn-dark mr-2 rounded-0">
        Create a post
      </button></router-link
    >
    <router-link :to="{ path: '/my-profile' }"
      ><button type="button" class="btn btn-dark mr-2y rounded-0">
        My Profile
      </button></router-link
    >
    <router-link :to="{ path: '/my-post' }"
      ><button type="button" class="btn btn-dark mr-2y rounded-0">
        My posts
      </button></router-link
    >
    <router-link :to="{ path: '/calendar' }"
      ><button type="button" class="btn btn-dark mr-2y rounded-0">
        Calendar
      </button></router-link
    >
    <router-link :to="{ path: '/discussion' }"
      ><button type="button" class="btn btn-dark mr-2y rounded-0">
        Create a dicussion
      </button></router-link
    >
    <router-link :to="{ path: '/posts' }"
      ><button type="button" class="btn btn-dark mr-2y rounded-0">
        Posts
      </button></router-link
    >
    <router-link :to="{ path: '/discussions' }"
      ><button type="button" class="btn btn-dark mr-2 rounded-0">
        Discussions
      </button></router-link
    >
    <button type="button" class="btn btn-dark mr-2 rounded-0" @click="signOut">
      Sign out
    </button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
export default {
  setup() {
    let accessToken = ref("");
    onMounted(() => {
      accessToken.value = localStorage.getItem("accessToken");
      console.log(accessToken.value);
    });
    const router = useRouter();
    const signOut = () => {
      router.push("/");
      localStorage.clear();
      accessToken.value = localStorage.getItem("accessToken");
    };

    return {
      signOut,
      accessToken,
    };
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  background-color: #212529;
  border-radius: 0 !important;
}
</style>
