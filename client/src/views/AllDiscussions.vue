<template>
  <div class="discussions">
    <h1>Discussions</h1>
    <div class="discussion">
      <div v-if="loading">
        <img
          src="../../assets/51a6e132b11664f7f2085bb6a35fc628.gif"
          allowFullScreen
        />
      </div>
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
            <h3>{{ discussion.title }}</h3>
            Post date:
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
      loading: true,
    };
  },
  mounted() {
    Api.get("discussions")
      .then((response) => {
        this.discussions = response.data.discussions;
        this.loading = false;
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
  position: absolute;
  width: 50em;
  height: 200px;
  z-index: 30;
  top: 35%;
  left: 35%;
  margin: -100px 0 0 -150px;
}

.discussions {
  min-height: 100vh;
  width: 100%;
}
</style>
