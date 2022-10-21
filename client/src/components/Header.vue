<template>
  <div class="header-class">
    <router-link :to="{ path: '/post' }"
      ><button type="button" class="btn btn-dark mr-2 rounded-0">
        Create a post
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
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style>
.header-class {
  display: flex;
  justify-content: space-between;
  background-color: #212529;
  border-radius: 0 !important;
}
.header-class:first-child {
  text-align: left;
}
.header-class:last-child {
  text-align: right;
}
</style>
