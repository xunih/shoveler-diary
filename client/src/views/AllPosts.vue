<template>
  <div class="posts">
    <h1>All Posts</h1>
    <div class="posts" v-for="post in posts" :key="post._id">
      Title: {{ post.title }} Description: {{ post.description }} Post date:
      {{ post.postDate }}
      <div
        class="previewBlock"
        :style="{ 'background-image': `url(${post.image})` }"
      ></div>
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
      })
      .catch((error) => {
        this.posts = [];
        console.log(error);
      });
  },
};
</script>

<style>
.previewBlock {
  display: block;
  cursor: pointer;
  width: 300px;
  height: 280px;
  margin: 0 auto 20px;
  background-position: center center;
  background-size: cover;
}

.posts {
  text-align: center;
  display: block;
  height: auto;
  width: 20%;
  padding: 1%;
  margin: 1%;
  font-size: 90%;
}
</style>
