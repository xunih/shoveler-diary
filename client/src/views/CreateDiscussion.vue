<template>
  <div>
    <h1 class="h1--create-discussion">Create a new discussion</h1>
  </div>
  <div>
    <form class="form--create-discussion">
      <div class="form-group">
        <input
          type="title"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Title"
          v-model="discussion.title"
        />
        <div class="spacer--create-discussion"></div>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Description"
          v-model="discussion.description"
        />
      </div>
      <div class="spacer--create-discussion"></div>
      <div class="text-center">
        <button type="button" class="btn btn-dark" @click="createDiscussion">
          Save
        </button>
      </div>
    </form>
    <div class="success-message--discussion" v-if="isPosted == true">
      <p>Discussion posted!</p>
    </div>
    <Image />
  </div>
</template>

<script>
import { Api } from "../Api";
import { reactive, ref } from "vue";
import Image from "../components/BackgroundImg.vue";
export default {
  components: {
    Image,
  },

  setup() {
    let discussion = reactive({
      title: "",
      description: "",
      userId: "",
      discussionId: null,
    });

    let isPosted = ref(false);

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
          isPosted.value = true;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return { discussion, createDiscussion, isPosted };
  },
};
</script>

<style>
.form--create-discussion {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 35%;
  left: 50%;
  width: 50em;
}

.spacer--create-discussion {
  padding-bottom: 1em;
}

.success-message--discussion {
  padding-top: 16em;
  text-align: center;
}

.h1--create-discussion {
  padding-bottom: 0.1em;
}
</style>
