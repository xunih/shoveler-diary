<template>
  <div>
    <h1 class="h1--discussion-item">
      {{ discussion.title }} Posted by: {{ discussion.username }}
    </h1>

    <div class="description-box--description-item">
      {{ discussion.description }}
    </div>

    <h1 class="h1--discussion-item">Comments</h1>
    <div
      class="comment__box"
      v-for="comment in discussion.comment"
      v-bind:key="comment"
    >
      {{ comment.content }} <br />Post date: {{ comment.commentDate }} Posted
      by: {{ comment.username }}
    </div>
    <div class="spacer--comment"></div>
    <div class="comment__text">
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        v-model="addedComment"
        placeholder="Add a comment"
      />
    </div>

    <div class="spacer--comment"></div>
    <div class="comment__btn">
      <button type="button" class="btn btn-dark" @click="addComment">
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { Api } from "../Api";
import { reactive, ref } from "vue";
import { onMounted } from "@vue/runtime-core";
export default {
  props: ["discussionId"],
  setup(props) {
    let discussion = reactive({
      title: "",
      description: "",
      username: "",
      comment: [],
    });

    let addedComment = ref("");

    onMounted(() => {
      Api.get(`/discussions/${props.discussionId}`)
        .then((response) => {
          discussion.title = response.data.title;
          discussion.description = response.data.description;
          discussion.username = response.data.username;
          discussion.comment = response.data.comment;
        })
        .catch((error) => {
          discussion = "";
          console.log(error);
        });
    });

    const addComment = () => {
      let userId = localStorage.getItem("userId");
      if (!userId) {
        alert("You need to sign in!");
      } else {
        Api.get("/users/" + userId)
          .then((response) => {
            var newComment = {
              content: addedComment.value,
              username: response.data.username,
            };
            console.log(newComment);
            const config = {
              headers: {
                authorization: localStorage.getItem("accessToken"),
              },
            };
            Api.patch("/discussions/" + props.discussionId, newComment, config)
              .then((response) => {
                console.log(response.data.comment.slice(-1)[0]);
                discussion.comment = [
                  ...discussion.comment,
                  response.data.comment.slice(-1)[0],
                ];
              })
              .catch((error) => {
                if (error.response.status == 403) {
                  alert("You need to sign in!");
                }
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    return {
      discussion,
      addComment,
      addedComment,
    };
  },
};
</script>

<style>
.h1--discussion-item {
  text-align: left;
  padding-left: 1em;
}

.description-box--description-item {
  margin-left: 2em;
  padding-left: 1em;
  text-align: left;
  width: 50em;
  position: absolute;
  word-break: break-all;
  border: 1px solid rgb(101, 99, 99);
  border-radius: 15px;
}

.comment__box {
  margin-left: 2em;
  padding-left: 1em;
  margin-bottom: 1em;
  text-align: left;
  width: 50em;
  word-break: break-all;
  border: 1px solid rgb(101, 99, 99);
  border-radius: 15px;
}

.spacer--comment {
  padding-bottom: 1em;
}

.comment__btn {
  margin-left: 2em;
}

.comment__text {
  margin-left: 2em;
  width: 50em;
}
</style>
