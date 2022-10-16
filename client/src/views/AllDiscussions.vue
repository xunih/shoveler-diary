<template>
  <div>
    <h1>All Discussions</h1>
    <div v-for="discussion in discussions" :key="discussion._id">
      Title: {{ discussion.title }} Post date:
      {{ discussion.postDate }}
      <!--textarea v-model="discussion.comment" placeholder="Add a comment" />
      <button @click="addComment(discussion._id, discussion.comment)">
        Add
      </button-->
      <router-link :to="{ path: '/discussion/' + discussion._id }"
        ><button>View details</button></router-link
      >
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
      })
      .catch((error) => {
        console.log(error);
      });
  },
  /*
  methods: {
    addComment(discussionId, discussionComment) {
      var newDiscussion = {
        comment: {
          body: discussionComment,
        },
      };
      Api.patch("/discussions/" + discussionId, newDiscussion)
        .then((response) => {
          console.log(response);
          this.getComments();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getComments() {
      Api.get("discussions")
        .then((response) => {
          this.discussions = response.data.discussions;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },*/
};
</script>
