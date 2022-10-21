<template>
  <div class="post">
    <div class="spacer"></div>
    <div
      class="image"
      :style="{ 'background-image': `url(${this.post.image})` }"
    ></div>
  </div>
  <div class="description-box">
    {{ this.post.description }}
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {};
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

.image {
  margin-top: 2em;
  background-position: center center;
  background-size: cover;
  display: block;
  width: 25em;
  height: 90%;
  border-radius: 10% 10% 10% 10%;
  border: 1px solid rgb(101, 99, 99);
}

.spacer {
  padding-top: 0.5em;
  position: absolute;
}

.description-box {
  text-align: center;
  width: 30em;
  background-color: transparent;
  position: absolute;
  word-break: break-all;
}
</style>
