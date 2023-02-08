<template>
  <v-card
    class="d-flex flex-row align-center text-secondary mx-2"
    color="surface"
    variant="text"
  >
    <v-avatar>
      <v-img
        cover
        @error="
          event.target.src = require('@/assets/general/no-user-image.png')
        "
        alt="Profile Avatar"
        :src="avatar"
      ></v-img>
    </v-avatar>

    <div class="d-flex flex-column justify-center">
      <v-card-title
        style="line-height: normal"
        class="text-subtitle-1 font-weight-bold py-0"
        >{{ title }}</v-card-title
      >
      <v-card-subtitle class="text-caption py-0">{{
        subtitle
      }}</v-card-subtitle>
    </div>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  avatar: {
    type: String,
    default: require("@/assets/general/no-user-image.png"),
  },
  title: {
    type: String,
    require: true,
  },
  subtitle: {
    type: String,
    require: true,
  },
});
</script>

<style></style>
