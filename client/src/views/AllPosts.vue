<template>
  <div class="posts">
    <h1>All Posts</h1>
    <div v-for="post in posts" :key="post._id">
      Title: {{ post.title }} Description: {{ post.description }} Post date:
      {{ post.postDate }}
    </div>
  </div>
</template>

<script>
import { Api } from "../Api";
export default {
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    Api.get("posts")
      .then((response) => {
        this.posts = response.data.posts;
        for (let i = 0; i < this.posts.length - 1; i++) {
          console.log(this.posts[i].title);
        }
      })
      .catch((error) => {
        posts = [];
        console.log(error);
      });
  },
};
</script>
