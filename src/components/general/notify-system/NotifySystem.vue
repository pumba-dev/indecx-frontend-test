<template>
  <v-list
    lines="two"
    class="bg-transparent mx-5 my-15"
    style="position: absolute; bottom: 0; left: 0"
  >
    <NotifyCard
      :key="index"
      v-for="(notify, index) in notifyList"
      :text="notify.text"
      :iconSrc="notify.iconSrc"
      :icon="notify.icon"
      @closeNotify="removeNotify(index)"
    ></NotifyCard>
  </v-list>
</template>

<script setup>
import NotifyCard from "@/components/general/notify-system/NotifyCard.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const notifyList = computed(() => {
  return store.getters["notifySystem/getAll"];
});

function removeNotify(index) {
  store.dispatch("notifySystem/remove", index);
}
</script>

<style></style>
