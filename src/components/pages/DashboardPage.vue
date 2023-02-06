<template>
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
import { ref } from "vue";
import DashboardHeader from "../general/dashboard/DashboardHeader.vue";
import ProductTable from "../general/tables/ProductTable.vue";

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

const tableItems = ref([
  {
    id: "FAEAFEE",
    name: "Nome do Produto",
    type: "Tipo 1",
    price: 5000,
  },
  {
    id: "AW2DWS",
    name: "Nome do Produto",
    type: "Tipo 3",
    price: 5000,
  },
  {
    id: "VASD2F",
    name: "Nome do Produto",
    type: "Tipo 3",
    price: 5000,
  },
  {
    id: "VDZVEG",
    name: "Nome do Produto",
    type: "Tipo 1",
    price: 5000,
  },
  {
    id: "KJKDS2",
    name: "Nome do Produto",
    type: "Tipo 2",
    price: 5000,
  },
  {
    id: "KJKDS2",
    name: "Nome do Produto",
    type: "Tipo 2",
    price: 5000,
  },
  {
    id: "KJKDS2",
    name: "Nome do Produto",
    type: "Tipo 2",
    price: 5000,
  },
  {
    id: "KJKDS2",
    name: "Nome do Produto",
    type: "Tipo 2",
    price: 5000,
  },
  {
    id: "KJKDS2",
    name: "Nome do Produto",
    type: "Tipo 2",
    price: 5000,
  },
  {
    id: "KJKDS2",
    name: "Nome do Produto",
    type: "Tipo 2",
    price: 5000,
  },
]);

const modals = {
  openCreateModal: () => {
    console.log("Open Create Modal");
  },
};
</script>

<style></style>
