<template>
  <div>
    <h1>Create a new discussion</h1>
  </div>
  <div>
    <form class="form--create-discussion ">
      <div class="form-group">
        <label for="exampleFormControlInput1" class="form-label">Title</label>
        <input
          type="title"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="title"
          v-model="discussion.title"
        />
        <div class="space"></div>
        <label for="exampleFormControlTextarea1" class="form-label"
          >Description</label
        >
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Description"
          v-model="discussion.description"
        />
      </div>
      <div class="space"></div>
      <div class="text-center">
        <button type="button" class="btn btn-dark" @click="createDiscussion">
          Save
        </button>
      </div>
    </form>
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

<style>
.form--create-discussion {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 40%;
  left: 50%;
  width: 50em;
}
</style>
