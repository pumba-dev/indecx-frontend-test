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

    <div class="d-flex flex-row align-center">
      <!-- <v-icon
        style="cursor: pointer"
        class="mx-4"
        icon="mdi-cog-outline"
        @click="$emit('open-profile-settings')"
      ></v-icon> -->

      <ProfileSettings></ProfileSettings>

      <v-divider vertical class="mx-2"></v-divider>

      <ProfileDataCard title="Nome Sobrenome" subtitle="Cargo do Usuário" />
    </div>
  </v-app-bar>
</template>

<script setup>
import openIndeCXWebPage from "@/utils/openIndeCXWebPage";
import ProfileSettings from "@/components/general/menu/ProfileSettings.vue";
import ProfileDataCard from "@/components/general/dashboard/ProfileDataCard.vue";
</script>

<style></style>
