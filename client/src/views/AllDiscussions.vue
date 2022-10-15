<template>
  <div>
    <h1>All Discussions</h1>
    <div v-for="discussion in discussions" :key="discussion._id">
      Title: {{ discussion.title }} Description:
      {{ discussion.description }} Post date:
      {{ discussion.postDate }}
    </div>
  </div>
</template>

<script>
import { Api } from "../Api";
export default {
  data() {
    return {
      discussions: [],
    };
  },
  mounted() {
    Api.get("discussions")
      .then((response) => {
        this.discussions = response.data.discussions;
        if (!this.discussions) {
          for (let i = 0; i < this.disucssions.length - 1; i++) {
            console.log(this.discussions[i].title);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
