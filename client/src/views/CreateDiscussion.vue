<template>
  <div>
    <h1 class="h1--create-discussion">Create a new discussion</h1>
    <div class="fail-message--discussion" v-if="isError == true">
      <h3>You need to sign in!</h3>
    </div>
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
      username: "",
    });

    let isPosted = ref(false);
    let isError = ref(false);

    const createDiscussion = () => {
      let userId = localStorage.getItem("userId");
      console.log("userId");
      console.log(userId);
      if (!userId) {
        isPosted.value = false;
        isError.value = true;
      } else {
        Api.get("/users/" + userId)
          .then((response) => {
            console.log("I am Pelle!");
            console.log(response.data.username);
            discussion.username = response.data.username;
            console.log(discussion.username);
            var newDiscussion = {
              title: discussion.title,
              description: discussion.description,
              username: discussion.username,
            };
            const config = {
              headers: {
                authorization: localStorage.getItem("accessToken"),
              },
            };
            console.log(newDiscussion);
            Api.post(`/users/${userId}/discussions/`, newDiscussion, config)
              .then((response) => {
                discussion.userId = localStorage.userId;
                discussion.discussionId = response.data.discussion._id;
                isPosted.value = true;
                isError.value = false;
              })
              .catch((error) => {
                if (error.response.status == 403) {
                  isError.value = true;
                }
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    return { discussion, createDiscussion, isPosted, isError };
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

.spacer--create-discussion {
  padding-bottom: 1em;
}

.success-message--discussion {
  text-align: center;
}

.fail-message--discussion {
  text-align: center;
}

.h1--create-discussion {
  padding-bottom: 0.1em;
}
</style>
