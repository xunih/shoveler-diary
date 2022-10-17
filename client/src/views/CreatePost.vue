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
      <div
        class="previewBlock"
        :style="{ 'background-image': `url(${filePreview})` }"
      ></div>
      <div>
        <label for="image">Upload Image</label>
        <input
          type="file"
          ref="fileInput"
          id="image"
          name="image"
          value=""
          @change="uploadImage"
        />
      </div>
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
    let isPosted = ref(false);
    let post = reactive({
      title: "",
      description: "",
      images: [],
      userId: "",
      postId: "",
    });
    let filePreview = ref("");
    let fileInput = ref(null);
    const createPost = () => {
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
            isPosted.value = true;
            post.userId = localStorage.userId;
            post.postId = response.data.post._id;
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const uploadImage = (e) => {
      let imgFile = fileInput.value.files;
      if (imgFile && imgFile[0]) {
        console.log("hey");
        let reader = new FileReader();
        reader.onload = (e) => {
          filePreview.value = e.target.result;
        };
        reader.readAsDataURL(imgFile[0]);
      }
    };
    /*const data = new FormData();
      data.append("name", "my-picture");
      data.append("file", event.target.files[0]);
      const config = {
        header: {
          "Content-Type": "image/png",
        },
      };*/

    return { isPosted, post, createPost, uploadImage, fileInput, filePreview };
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
</style>
