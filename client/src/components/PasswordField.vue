<template>
    <div class="field">
      <div class="ui left icon input big">
        <input
          type="password"
          placeholder="Password"
          autocomplete="off"
          v-model="input"
          @input="$emit('update:modelValue', $event.target.value)"
          @keyup="validateInput"
        />
      </div>
      <div class="ui basic label pointing red" v-if="error">
        {{ error }}
      </div>
    </div>
  </template>
  <script>
  import { ref, computed } from "vue";
  export default {
    setup() {
      let input = ref(null);
      const error = computed(() => {
        return input.value === "" ? "The Input field is required" : "";
      });
      return { input, error };
    },
  };
  </script>
  