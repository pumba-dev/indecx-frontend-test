<template>
  <div class="d-flex flex-row align-center">
    <UserSettings
      @openEditProfileModal="$emit('openEditProfileModal')"
    ></UserSettings>

    <v-divider vertical class="mx-2"></v-divider>

    <ProfileDataCard :profileData="userProfile" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserSettings from "@/components/general/profile/UserSettings.vue";
import ProfileDataCard from "@/components/general/profile/ProfileDataCard.vue";
import authService from "@/services/authentication";

onMounted(async () => {
  authService.hasAuthenticatedUser((key, user) => {
    userProfile.value = user;
  });
});
const userProfile = ref({});
</script>

<style></style>
