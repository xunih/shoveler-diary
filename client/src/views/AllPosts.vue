<template>
  <h1>Posts</h1>
  <div class="posts">
    <div v-if="loading">
      <img
        src="../../assets/51a6e132b11664f7f2085bb6a35fc628.gif"
        allowFullScreen
      />
    </div>
    <div v-for="post in posts" v-bind:key="post._id">
      <Post :post="post" @delete-post="deletePost" />
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
      loading: true,
    };
  },
  mounted() {
    Api.get("posts")
      .then((response) => {
        this.posts = response.data.posts;
        this.loading = false;
      })
      .catch((error) => {
        this.posts = [];
        console.log(error);
      });
  },
  methods: {
    deletePost(key) {
      console.log("GOODBYE BUNNY");
      Api.delete(`/posts/${key}`)
        .then((response) => {
          var index = this.posts.findIndex((post) => post._id === key);
          this.posts.splice(index, 1);
          console.log(this.posts);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.posts {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  width: 100%;
}

h1 {
  text-align: center;
  padding-top: 1em;
}
</style>
