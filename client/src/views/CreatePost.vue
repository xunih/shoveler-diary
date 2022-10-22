<template>
  <div>
    <div>
      <h1>Create a new post</h1>
    </div>
    <div>
      <form class="form--create-post">
        <div class="form-group">
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Description"
            v-model="post.description"
          />
        </div>
        <div class="spacer--create-post"></div>
        <div class="upload-image">
          <div class="upload-image__upload-area">
            <label
              for="formGroupExampleInput"
              class="space--image-upload-button"
              >Upload an image</label
            >
            <input
              type="file"
              ref="fileInput"
              id="image"
              name="image"
              value=""
              @change="uploadImage"
            />
          </div>
          <div class="upload-image__post-button">
            <button type="button" class="btn btn-dark" @click="createPost">
              Post
            </button>
          </div>
        </div>
        <div
          class="previewBlock"
          :style="{ 'background-image': `url(${filePreview})` }"
        ></div>
        <div v-if="isPosted == true">
          <p>Post uploaded!</p>
        </div>
      </form>
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
      description: "",
      imageUrl: "",
      userId: "",
      postId: "",
    });
    let filePreview = ref("");
    let fileInput = ref(null);
    const createPost = () => {
      if (post.description !== "") {
        console.log("inside create post");
        // creates a new post object
        var newPost = {
          description: post.description,
          image: post.imageUrl,
        };
        // creates a new post
        console.log(localStorage.userId);
        Api.post(`/users/${localStorage.userId}/posts/`, newPost)
          .then((response) => {
            isPosted.value = true;
            post.userId = localStorage.userId;
            post.postId = response.data.post._id;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const uploadImage = (e) => {
      let imgFile = fileInput.value.files;
      console.log(imgFile);
      console.log(imgFile[0]);

      if (imgFile && imgFile[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          filePreview.value = e.target.result;
          post.imageUrl = filePreview.value;
        };
        reader.readAsDataURL(imgFile[0]);
      }
    };

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
  margin: 0 auto 40px;
  background-position: center center;
  background-size: cover;
  margin-top: 5em;
}

h1 {
  text-align: center;
  padding-top: 1em;
}

.form--create-post {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 55%;
  left: 50%;
  width: 50em;
}

.upload-image {
  width: 50em;
}

.upload-image__upload-area {
  float: left;
}

.upload-image__post-button {
  float: right;
}

.spacer--create-post {
  padding-bottom: 1em;
}

.space--image-upload-button {
  padding-right: 0.2em;
}
</style>
