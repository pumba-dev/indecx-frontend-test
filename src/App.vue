<template>
  <v-app style="position: relative">
    <router-view></router-view>

    <NotifySystem></NotifySystem>
  </v-app>
</template>

<script setup>
import NotifySystem from "@/components/general/notify-system/NotifySystem.vue";
</script>

<style></style>
