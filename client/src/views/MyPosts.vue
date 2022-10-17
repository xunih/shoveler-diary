<template>
  <div>
    <h1>My Posts</h1>
    <div v-for="post in myPost" v-bind:key="post._id">
      <h2>Title</h2>
      <p>{{ post.title }}</p>
      <h2>Description</h2>
      <p>{{ post.description }}</p>
      <h2>Post Date</h2>
      <p>{{ post.postDate }}</p>
      <span
        class="previewBlock"
        :style="{ 'background-image': `url(${post.image})` }"
      ></span>
    </div>
  </div>
</template>

<script>
import { Api } from "../Api";
import { reactive, ref } from "vue";
import { onMounted } from "@vue/runtime-core";
export default {
  data() {
    return {
      myPost: [],
    };
  },

  mounted() {
    Api.get("users/" + localStorage.userId)
      .then((response) => {
        this.myPost = response.data.post;
      })
      .catch((error) => {
        this.myPost = [];
        console.log(error);
      });
  },
};
</script>
