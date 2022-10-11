<template>
  <div>
    <div class="h-full w-full fixed top-0 left-0 z-20" v-on:click="hide"></div>
    <div
      class="bg-white rounded-lg text-lg pt-6 shadow-lg w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
    >
      <div class="px-6 pb-6 text-center">
        <h3 class="text-xl mb-2 font-semibold">Event details</h3>
      </div>
      <ul class="cursor-pointer border-t border-gray-100 text-center">
        <li
          class="border-b text-blue-500 border-gray-100 w-full px-6 py-3 hover:bg-gray-100"
        >
          Title:
          <input v-model="event.title" placeholder="title" />
        </li>

        <li
          class="border-b text-blue-500 border-gray-100 w-full px-6 py-3 hover:bg-gray-100"
        >
          Start time:
          <input v-model="event.startTime" placeholder="start time" />
        </li>
        <li
          class="w-full text-red-500 px-6 py-3 rounded-b-lg hover:bg-gray-100"
        >
          End time:
          <input v-model="event.endTime" placeholder="end time" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    let event = reactive({
      title: "",
      startTime: "",
      endTime: "",
    });
    return { event };
  },
  watch: {
    title: function (val) {
      this.$emit("update:title", val);
    },
  },
};
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s ease-out both;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse ease-in both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
