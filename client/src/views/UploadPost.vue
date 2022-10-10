<template>
  <div>
    <router-link :to="{ path: '/' }"><button>Home</button></router-link>

    <div>
      <h1>Create a new post</h1>
    </div>
    <div>
      <p>Title</p>
      <input v-model="post.title" placeholder="title" />
      <br />
      <p>Description</p>
      <input v-model="post.description" placeholder="description" />
      <!-- <p>Sign your post</p>
      <input v-model="signature" placeholder="your email" /> -->

      <div>
        <button @click="createPost">Post</button>
        Post
      </div>
      <div v-if="isPosted == true">
        <p>Post uploaded!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from "../Api";
import { reactive, ref } from "vue";
export default {
  setup() {
    let ifPosted = false;
    let post = reactive({
      title: "",
      description: "",
      userId: "",
      postId: "",
    });
    const createPost = () => {
      console.log(post.title);
      console.log(post.description);
      if (post.title !== "" && post.description !== "") {
        console.log("inside create post");
        // creates a new post object
        var newPost = {
          title: post.title,
          description: post.description,
        };
        // creates a new post
        Api.post(`/users/${localStorage.userId}/posts/`, newPost)
          .then((response) => {
            post.userId = localStorage.userId;
            post.postId = response.data._id;
            console.log(response.data._id);
            console.log(response.data.title);
            isPosted = true;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    return { post, createPost };
  },
};
</script>
