<template>
  <div>
    <b-button
      class="m-1"
      v-for="(s, idx) in this.sounds"
      :key="idx"
      variant="success"
      @click="add(idx)"
      >{{ s.name }}</b-button
    >
  </div>
</template>
<script>
import { eventBus } from "../main.js";
export default {
  name: "sounds",
  props: {
    sounds: Array
  },
  methods: {
    add(idx) {
      eventBus.$emit("addSound", idx);
    }
  }
};
</script>
