<script setup>
import { reactive, ref } from "vue";

// reactive state
const count = ref(0);
let post = reactive({
  title: "",
  description: "",
  userId: "",
  postId: "",
});
function createPost() {
  if (post.title !== "" && post.description !== "") {
    // creates a new post object
    var newPost = {
      title: this.title,
      tag: this.tag,
    };
    // creates a new post
    Api.post(`/users/${localStorage.userID}/posts/`, newPost)
      .then((response) => {
        post.userId = localStorage.userId;
        post.postId = response.data._id;
        console.log(response.data._id);
        console.log(response.data.title);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>

<template>
  <div>
    <router-link :to="{ path: '/' }"><button>Home</button></router-link>

    <div>
      <h1>Create a new post</h1>
    </div>
    <div>
      <p>Title</p>
      <input v-model="title" placeholder="title" />
      <br />
      <p>Add a tag</p>
      <input v-model="tag" placeholder="tag" />
      <!-- <p>Sign your post</p>
      <input v-model="signature" placeholder="your email" /> -->

      <div>
        <button @click="createPost">Post</button>
        Post
      </div>
      <div>
        <p>Post uploaded!</p>
      </div>
    </div>
  </div>
</template>
