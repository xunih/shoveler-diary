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
    <router-link :to="{ path: '/' }"
      ><button type="button" class="btn btn-dark mr-2 rounded-0">
        Home
      </button></router-link
    >
  </div>
</template>

<script>
export default {
  setup() {},
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
