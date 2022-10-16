<template>
  <div>
    <h1>Dicussions</h1>

    <div>
      <p>Title</p>
      <input v-model="discussion.title" placeholder="title" />
      <br />
      <p>Description</p>
      <input v-model="discussion.description" placeholder="description" />
    </div>
    <button @click="createDiscussion">Save</button>
  </div>
</template>

<script>
import { Api } from "../Api";
import { reactive } from "vue";
export default {
  setup() {
    let discussion = reactive({
      title: "",
      description: "",
      userId: "",
      discussionId: null,
    });

    const createDiscussion = () => {
      var newDiscussion = {
        title: discussion.title,
        description: discussion.description,
      };
      Api.post(`/users/${localStorage.userId}/discussions/`, newDiscussion)
        .then((response) => {
          discussion.userId = localStorage.userId;
          discussion.discussionId = response.data.discussion._id;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return { discussion, createDiscussion };
  },
};
</script>
