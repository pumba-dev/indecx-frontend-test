<template>
  <v-card class="px-10 py-5">
    <v-sheet class="pa-2">
      <v-row class="justify-center align-start">
        <v-icon
          class="ma-1 mt-4"
          size="45"
          color="error"
          icon="mdi-alert-circle-outline"
        ></v-icon>

        <v-col>
          <h1 class="text-h6 font-weight-bold text-start">
            Tem certeza que deseja excluir este produto?
          </h1>
          <span class="text-subtitle-1"
            >Ao excluir este produto, ele não poderá ser recuperado
            novamente.</span
          >
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet class="d-flex justify-end py-4">
      <DashboardButton
        class="mr-4"
        variant="outlined"
        @click.prevent="$emit('closeModal')"
      >
        Não
      </DashboardButton>
      <DashboardButton
        :loading="deleteIsLoading"
        :disabled="deleteIsLoading"
        @click.prevent="deleteProduct"
      >
        Sim
      </DashboardButton>
    </v-sheet>
  </v-card>
</template>

<script setup>
import { useStore } from "vuex";

import { defineEmits, ref, defineProps } from "vue";

import DashboardButton from "@/components/general/buttons/DashboardButton.vue";
import productService from "@/services/products";

const deleteIsLoading = ref(false);
const store = useStore();

const emit = defineEmits(["closeModal"]);
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

async function deleteProduct() {
  console.log("Delete Product Data: ", props.item);
  deleteIsLoading.value = true;
  const itemID = props.item.id;

  productService
    .delete(itemID)
    .then((response) => {
      console.log("Document deleted: ", response);

      store.dispatch("notifySystem/create", {
        text: "Produto removido com sucesso!",
        iconSrc: "sucess-icon",
      });
      emit("closeModal");
    })
    .catch((error) => {
      console.log("ERROR: Document delete error: ", error);
      store.dispatch("notifySystem/create", {
        text: "Erro interno do sistema ao remover o produto!",
        iconSrc: "error-icon",
      });
      deleteIsLoading.value = false;
    });
}
</script>

<style></style>
