<template>
  <h1>My Posts</h1>
  <div class="my-post">
    <div v-if="loading">
      <img
        src="../../assets/51a6e132b11664f7f2085bb6a35fc628.gif"
        allowFullScreen
      />
    </div>
    <div v-for="post in myPost" v-bind:key="post._id">
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
      myPost: [],
      loading: true,
    };
  },

  mounted() {
    Api.get("users/" + localStorage.userId)
      .then((response) => {
        this.myPost = response.data.post;
        this.loading = false;
      })
      .catch((error) => {
        this.myPost = [];
        console.log(error);
      });
  },
};
</script>

<style>
.my-post {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  height: 50em;
  width: 100%;
}

h1 {
  text-align: center;
  padding-top: 1em;
}
</style>
