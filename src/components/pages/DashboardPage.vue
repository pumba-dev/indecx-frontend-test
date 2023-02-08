<template>
  <v-overlay contained v-model="showModal" class="align-center justify-center">
    <component
      v-if="showModal"
      :is="currentModal"
      :item="currentModalItem"
      @closeModal="modals.closeModal"
      @openModal="modals.openModal"
    ></component>
  </v-overlay>

  <DashboardHeader
    @openEditProfileModal="modals.openEditProfileModal"
  ></DashboardHeader>

  <v-main class="bg-background pa-6 d-flex flex-column">
    <h1 class="text-h5 font-weight-bold mb-6">Lista de Produtos</h1>
    <ProductTable
      @createItem="modals.openCreateProductModal"
      @editItem="modals.openEditProductModal"
      @deleteItem="modals.openDeleteProductModal"
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
import EditProductModal from "@/components/general/modal/EditProductModal.vue";
import DeleteProductModal from "@/components/general/modal/DeleteProductModal.vue";
import EditProfileModal from "@/components/general/modal/EditProfileModal.vue";
import ConfirmPhoneModal from "@/components/general/modal/ConfirmPhoneModal.vue";
import productService from "@/services/products";

onMounted(() => {
  // tableItems.value = productsMock;
  getProductsFromAPI();
});

const tableHeaders = ref([
  { key: "id", title: "ID" },
  { title: "Nome do Produto", key: "name" },
  { title: "Tipo do Produto", key: "type" },
  { title: "Valor do Produto", key: "price", mask: "money" },
]);

const tableItems = ref([]);

const currentModal = shallowRef(null);
const currentModalItem = ref(null);
const showModal = ref(false);

const modals = {
  openCreateProductModal: () => {
    console.log("Open Create Modal");
    currentModal.value = CreateProductModal;
    showModal.value = true;
  },
  openEditProductModal: (item) => {
    console.log("Open Edit Modal");
    currentModalItem.value = item;
    currentModal.value = EditProductModal;
    showModal.value = true;
  },
  openEditProfileModal: () => {
    console.log("Open Edit Profile Modal");
    currentModal.value = EditProfileModal;
    showModal.value = true;
  },
  openConfirmPhoneModal: (item) => {
    currentModalItem.value = item;
    console.log("Open Edit Profile Modal");
    currentModal.value = ConfirmPhoneModal;
    showModal.value = true;
  },
  openDeleteProductModal: (item) => {
    console.log("Open Delete Modal");
    currentModalItem.value = item;
    currentModal.value = DeleteProductModal;
    showModal.value = true;
  },
  closeModal: () => {
    console.log("Close All Modals");
    currentModal.value = null;
    currentModalItem.value = null;
    showModal.value = false;
    getProductsFromAPI();
  },
  openModal: (modal) => {
    switch (modal.key) {
      case "confirm-phone":
        modals.openConfirmPhoneModal(modal.data);
        break;
    }
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
