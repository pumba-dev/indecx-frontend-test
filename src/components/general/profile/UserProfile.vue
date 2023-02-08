<template>
  <div class="d-flex flex-row align-center">
    <UserSettings
      @openEditProfileModal="$emit('openEditProfileModal')"
    ></UserSettings>

    <v-divider vertical class="mx-2"></v-divider>

    <ProfileDataCard
      :avatar="user.photoURL"
      :title="user.displayName"
      :subtitle="user.email"
    />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";
import UserSettings from "@/components/general/profile/UserSettings.vue";
import ProfileDataCard from "@/components/general/profile/ProfileDataCard.vue";

const store = useStore();

onBeforeMount(() => {
  store.dispatch("authSystem/authCurrentUser");
});

const user = computed(() => {
  return store.getters["authSystem/getProfileData"];
});
</script>

<style></style>
