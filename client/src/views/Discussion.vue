<template>
  <div>
    <h1>Title:</h1>
    <p>{{ discussion.title }}</p>
    <h1>Description</h1>
    <p>{{ discussion.description }}</p>
    <h1>Comments</h1>
    <p v-for="comment in discussion.comment" v-bind:key="comment">
      Comment: {{ comment.body }} Post date: {{ comment.date }}
    </p>
    <textarea v-model="comment.body" placeholder="Add a comment" />
    <button @click="addComment">Add</button>
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
      comment: [{ body: "" }],
    });

    let comment = ref({ body: "" });

    onMounted(() => {
      Api.get(`/discussions/${props.discussionId}`)
        .then((response) => {
          discussion.title = response.data.title;
          discussion.description = response.data.description;
          discussion.comment = response.data.comment;
        })
        .catch((error) => {
          discussion = "";
          console.log(error);
        });
    });

    const addComment = () => {
      var newDiscussion = {
        comment: comment.value,
      };
      Api.patch("/discussions/" + props.discussionId, newDiscussion)
        .then((response) => {
          console.log(response.data.comment.slice(-1)[0]);
          discussion.comment = [
            ...discussion.comment,
            response.data.comment.slice(-1)[0],
          ];
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      discussion,
      comment,
      addComment,
    };
  },
};
</script>
