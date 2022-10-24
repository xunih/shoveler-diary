<template>
  <div class="post">
    <div class="spacer--post"></div>
    <div
      class="image--post"
      :style="{ 'background-image': `url(${this.post.image})` }"
    ></div>
    <div v-if="this.isAdmin==='true'">
      <button 
        type="button"
        class="btn btn-dark mr-2y rounded-0"
        @click="$emit('delete-post', this.post._id)"
      >
        &times;
      </button>
    </div>
  </div>
  <div class="description-box">
    {{ this.post.description }}
  </div>
</template>

<script>
import { Api } from "../Api";
export default {
  emits: ["delete-post"],
  props: ["post"],
  data() {
    return {
      isAdmin: false,
    };
  },
  mounted() {
    this.isAdmin = localStorage.getItem("isAdmin");
    console.log(this.isAdmin);
  },
};
</script>

<style>
.post {
  background-color: transparent;
  width: 30%;
  height: 100%;
  border-radius: 10% 10% 0 0;
  display: flex;
  justify-content: center;
  min-width: 30em;
  text-align: center;
}

.image--post {
  margin-top: 2em;
  background-position: center center;
  background-size: cover;
  display: block;
  width: 25em;
  height: 90%;
  border-radius: 10% 10% 10% 10%;
  border: 1px solid rgb(101, 99, 99);
}

.spacer--post {
  padding-top: 0.5em;
  position: absolute;
}

.description-box {
  text-align: center;
  width: 30em;
  position: absolute;
  word-break: break-all;
}
</style>
