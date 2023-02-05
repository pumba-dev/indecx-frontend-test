<template>
  <v-btn
    block
    type="submit"
    :loading="loading"
    :class="`bg-${color} fill-height rounded h-10 pa-4 my-4 font-weight-light text-capitalize`"
    ><slot></slot
  ></v-btn>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  color: {
    type: String,
    default: "primary",
  },
});
</script>

<style></style>
