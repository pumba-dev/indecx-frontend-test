<template>
  <v-card
    class="d-flex flex-row align-center text-secondary mx-2"
    color="surface"
    variant="text"
  >
    <v-avatar>
      <v-img
        cover
        @error="photoError = true"
        alt="Profile Avatar"
        :src="profilePhoto"
      ></v-img>
    </v-avatar>

    <div class="d-flex flex-column justify-center">
      <v-card-title
        style="line-height: normal"
        class="text-subtitle-1 font-weight-bold py-0"
        >{{
          profileData.displayName ? profileData.displayName : "Nome Sobrenome"
        }}</v-card-title
      >
      <v-card-subtitle class="text-caption py-0">{{
        profileData.email
      }}</v-card-subtitle>
    </div>
  </v-card>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
const props = defineProps({
  profileData: { type: Object, required: true },
});

const photoError = ref(false);
const profilePhoto = computed(() => {
  if (!photoError.value && props.profileData.photoURL) {
    return props.profileData.photoURL;
  }
  return defaultPhoto;
});
const defaultPhoto = require("@/assets/general/no-user-image.png");
</script>

<style></style>
