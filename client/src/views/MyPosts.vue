<template>
  <h1>My Posts</h1>
  <h3 v-if="!loading && isError">You need to sign in!</h3>
  <div class="my-post" :key="renderKey">
    <div v-if="loading && !isError">
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
import Image from "../components/BackgroundImg.vue";
export default {
  components: {
    Post,
    Image,
  },
  data() {
    return {
      myPost: [],
      loading: true,
      isError: false,
      renderKey: 0,
    };
  },

  async mounted() {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      this.loading = false;
      this.isError = true;
    } else {
      await Api.get("users/" + userId)
        .then((response) => {
          this.renderKey++;
          this.myPost = response.data.post;
          this.loading = false;
          this.isError = false;
        })
        .catch((error) => {
          console.log(error.code);
          if (error.response.status == 403) {
            this.loading = false;
            this.isError = true;
          }
          this.myPost = [];
          console.log(error);
        });
    }
  },
};
</script>

<style>
.my-post {
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
