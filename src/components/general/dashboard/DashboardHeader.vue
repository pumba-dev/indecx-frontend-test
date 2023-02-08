<template>
  <v-app-bar
    style="position: static"
    class="elevation-1 d-flex flex-row align-center justify-space-between"
    height="70"
  >
    <v-img
      class="pointer ma-6"
      style="cursor: pointer"
      max-width="158"
      :src="require('@/assets/general/indecx-logomarca.svg')"
      alt="IndeCX Logo"
      cover
      @click="openIndeCXWebPage()"
    />

    <v-spacer></v-spacer>

    <UserProfile
      @openEditProfileModal="$emit('openEditProfileModal')"
    ></UserProfile>
  </v-app-bar>
</template>

<script setup>
import openIndeCXWebPage from "@/utils/openIndeCXWebPage";
import UserProfile from "@/components/general/profile/UserProfile.vue";
</script>

<style></style>
