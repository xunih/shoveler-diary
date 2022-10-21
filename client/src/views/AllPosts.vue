<template>
  <h1>Posts</h1>
  <div class="posts">
    <div v-for="post in posts" :key="post._id">
      <Post :post="post" />
    </div>
  </div>
</template>

<script>
import { Api } from "../Api";
import Post from "../components/Post.vue";
export default {
  components: {
    Post,
  },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    Api.get("posts")
      .then((response) => {
        this.posts = response.data.posts;
      })
      .catch((error) => {
        this.posts = [];
        console.log(error);
      });
  },
};
</script>

<style>

.posts {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  height: 100em;
  width: 100%;
}

h1 {
  text-align: center;
}
</style>
