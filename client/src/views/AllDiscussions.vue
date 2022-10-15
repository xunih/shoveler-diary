<template>
  <div>
    <h1>All Discussions</h1>
    <div v-for="discussion in discussions" :key="discussion._id">
      Title: {{ discussion.title }} Description:
      {{ discussion.description }} Post date:
      {{ discussion.postDate }}
      <input v-model="comment" placeholder="Add a comment" />
      <button>Add</button>
    </div>
  </div>
</template>

<script>
import { Api } from "../Api";
export default {
  data() {
    return {
      discussions: [],
      comment: "",
    };
  },
  mounted() {
    Api.get("discussions")
      .then((response) => {
        this.discussions = response.data.discussions;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
