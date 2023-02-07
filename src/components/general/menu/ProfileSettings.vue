<template>
  <div class="text-center">
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props }">
        <v-icon
          class="mx-4"
          color="secondary"
          icon="mdi-cog-outline"
          style="cursor: pointer"
          v-bind="props"
        >
        </v-icon>
      </template>

      <v-list>
        <v-list-item
          :key="index"
          style="cursor: pointer"
          @click.prevent="handleAction(item.key)"
          v-for="(item, index) in settingOptions"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import openProjectRepo from "@/utils/openProjectRepo";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const settingOptions = ref([
  { key: "edit-account", title: "Editar conta" },
  { key: "open-project-repo", title: "Visualizar repositório" },
  { key: "sign-out", title: "Sair" },
]);

function handleAction(key) {
  console.log("handleAction", key);
  switch (key) {
    case "edit-account":
      console.log("edit-account");
      break;
    case "open-project-repo":
      openProjectRepo();
      break;
    case "sign-out":
      store.dispatch("authSystem/signOut");
      router.push("home");
      break;
  }
}
</script>

<style></style>
