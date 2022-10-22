<template>
  <div>
    <h1>All Discussions</h1>
    <div class="discussion">
      <div
        class="list-group"
        v-for="discussion in discussions"
        :key="discussion._id"
      >
        <router-link
          class="link"
          :to="{ path: '/discussion/' + discussion._id }"
        >
          <button type="button" class="list-group-item list-group-item-action">
            Title: {{ discussion.title }} Post date:
            {{ discussion.postDate }}
          </button></router-link
        >
      </div>
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

<style>
.link {
  text-decoration: none;
}

.discussion {
  width: 50em;
}
</style>
