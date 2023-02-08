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
    @addRandomProducts="addRandomProducts"
    @deleteAllProducts="deleteAllProducts"
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
import { useStore } from "vuex";
import { ref, shallowRef, onMounted } from "vue";
import DashboardHeader from "../general/dashboard/DashboardHeader.vue";
import ProductTable from "../general/tables/ProductTable.vue";
import CreateProductModal from "@/components/general/modal/CreateProductModal.vue";
import EditProductModal from "@/components/general/modal/EditProductModal.vue";
import DeleteProductModal from "@/components/general/modal/DeleteProductModal.vue";
import EditProfileModal from "@/components/general/modal/EditProfileModal.vue";
import ConfirmPhoneModal from "@/components/general/modal/ConfirmPhoneModal.vue";
import productService from "@/services/products";
import randomNumber from "@/utils/randomNumber";
import randomString from "@/utils/randomString";
import productTypesOptions from "@/utils/productTypesOptions";

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

const store = useStore();
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

async function addRandomProducts() {
  const productsQuantity = 10;

  let productsArray = [];
  for (let i = 0; i < productsQuantity; i++) {
    const randomProduct = genRandomProduct();
    productsArray.push(randomProduct);
  }

  await productService
    .createMultiple(productsArray)
    .then((response) => {
      console.log("Tabela Povoada: ", response);
      store.dispatch("notifySystem/create", {
        text: "Produtos adicionado à tabela com sucesso!",
        iconSrc: "sucess-icon",
      });
      getProductsFromAPI();
    })
    .catch((error) => {
      console.log("ERROR: ao povoar tabela: ", error);
      store.dispatch("notifySystem/create", {
        text: "Erro interno no servidor ao povoar tabela.",
        iconSrc: "error-icon",
      });
    });
}

async function deleteAllProducts() {
  await productService
    .deleteAll()
    .then((response) => {
      console.log("Tabela Reiniciada com Sucesso: ", response);
      store.dispatch("notifySystem/create", {
        text: "Tabela reiniciada com sucesso!",
        iconSrc: "sucess-icon",
      });
      getProductsFromAPI();
    })
    .catch((error) => {
      console.log("ERROR: ao povoar tabela: ", error);
      store.dispatch("notifySystem/create", {
        text: "Erro interno no servidor ao reiniciar tabela.",
        iconSrc: "error-icon",
      });
    });
}

function genRandomProduct() {
  const randomID = randomString(6);
  const randomPrice = randomNumber(100, 10000).toFixed(2);
  const randomType = productTypesOptions[parseInt(randomNumber(0, 3))];
  return {
    id: randomID,
    name: "Produto Aleatório",
    price: randomPrice,
    type: randomType,
  };
}
</script>

<style></style>
