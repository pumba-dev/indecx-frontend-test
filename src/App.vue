<template>
  <v-app>
    <router-view></router-view>

    <NotifySystem></NotifySystem>

    <div id="recaptcha-container"></div>
  </v-app>
</template>

<script setup>
import NotifySystem from "@/components/general/notify-system/NotifySystem.vue";
</script>

<style></style>
