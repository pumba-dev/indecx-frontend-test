<template>
  <v-overlay contained v-model="showModal" class="align-center justify-center">
    <component
      v-if="showModal"
      :is="currentModal"
      @closeModal="modals.closeModal"
    ></component>
  </v-overlay>

  <DashboardHeader></DashboardHeader>

  <v-main class="bg-background pa-6 d-flex flex-column">
    <h1 class="text-h5 font-weight-bold mb-6">Lista de Produtos</h1>
    <ProductTable
      @createItem="modals.openCreateModal"
      :headers="tableHeaders"
      :items="tableItems"
    ></ProductTable>
  </v-main>
</template>

<script setup>
import { ref, shallowRef, onMounted } from "vue";
import DashboardHeader from "../general/dashboard/DashboardHeader.vue";
import ProductTable from "../general/tables/ProductTable.vue";
import CreateProductModal from "@/components/general/modal/CreateProductModal.vue";
// import productsMock from "@/utils/productsMock";
import productService from "@/services/products";

onMounted(() => {
  // tableItems.value = productsMock;
  getProductsFromAPI();
});

const tableHeaders = ref([
  {
    key: "id",
    title: "ID",
    align: "start",
  },
  { title: "Nome do Produto", align: "start", key: "name" },
  { title: "Tipo do Produto", align: "start", key: "type" },
  { title: "Valor do Produto", align: "start", key: "price" },
]);

const tableItems = ref([]);

const currentModal = shallowRef(null);
const showModal = ref(false);

const modals = {
  openCreateModal: () => {
    console.log("Open Create Modal");
    currentModal.value = CreateProductModal;
    showModal.value = true;
  },
  closeModal: () => {
    console.log("Close All Modals");
    currentModal.value = null;
    showModal.value = false;
    getProductsFromAPI();
  },
};

function getProductsFromAPI() {
  productService
    .getAll()
    .then((response) => {
      tableItems.value = [];
      response.forEach((doc) => {
        tableItems.value.push(doc.data());
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<style></style>
