<template>
  <v-sheet class="h-100 bg-surface rounded-md pa-10">
    <!-- Table Header -->
    <v-row class="justify-space-between mb-6">
      <v-responsive max-width="260">
        <v-text-field
          v-model="tableSearch"
          variant="outlined"
          append-inner-icon="mdi-magnify"
          @click:append-inner="searchOnTable"
          @keypress.enter="searchOnTable"
          placeholder="Faça uma busca"
          density="compact"
          hide-details
        ></v-text-field>
      </v-responsive>

      <DashboardButton @click.prevent="$emit('createItem')">
        Criar Produto
      </DashboardButton>
    </v-row>

    <!-- Table List -->
    <v-table class="w-100">
      <thead>
        <tr class="bg-background">
          <th
            style="border: none"
            class="text-secondary font-weight-bold"
            :key="index"
            v-for="(item, index) in headers"
          >
            <p class="w-100">
              {{ item.title }}
            </p>
          </th>
          <th
            style="border: none"
            class="d-flex justify-center align-center text-secondary font-weight-bold"
          >
            <p class="w-100 text-center">Opções</p>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr :key="index" v-for="(item, index) in items">
          <td
            :class="[index == 0 ? 'font-weight-normal' : 'font-weight-light']"
            class="text-secondary-text"
            style="border: none"
            :key="index"
            v-for="(header, index) in headers"
          >
            {{ item[header.key] }}
          </td>
          <td style="border: none" class="d-flex align-center">
            <v-row class="justify-center align-center">
              <v-icon
                class="mr-1"
                size="small"
                color="secondary-text"
                style="cursor: pointer"
                icon="mdi-pencil-outline"
              ></v-icon>
              <v-icon
                size="small"
                color="secondary-text"
                style="cursor: pointer"
                icon="mdi-delete-outline"
              ></v-icon>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Table Pagination -->
    <v-sheet
      class="w-100 my-3 d-flex align-center text-secondary-text justify-end"
    >
      <span class="pr-1">1-10 de 100 items</span>

      <v-responsive max-width="272">
        <div class="d-flex justify-space-between">
          <TableNaviButton :background="false">
            {{ "<" }}
          </TableNaviButton>
          <TableNaviButton :active="true">1</TableNaviButton>
          <TableNaviButton :active="false">2</TableNaviButton>
          <TableNaviButton :active="false">3</TableNaviButton>
          <TableNaviButton :active="false">4</TableNaviButton>
          <TableNaviButton :active="false">5</TableNaviButton>
          <TableNaviButton :background="false">
            {{ ">" }}
          </TableNaviButton>
        </div>
      </v-responsive>
    </v-sheet>
  </v-sheet>
</template>

<script setup>
import { defineProps, ref } from "vue";
import TableNaviButton from "@/components/general/buttons/TableNaviButton";
import DashboardButton from "@/components/general/buttons/DashboardButton.vue";

defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const tableSearch = ref("");

function searchOnTable() {
  console.log("search on table", tableSearch.value);
}
</script>

<style scoped>
p {
  border-right: 1px solid rgba(1, 1, 1, 0.2) !important;
}
</style>
