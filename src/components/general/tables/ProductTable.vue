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
        <tr :key="index" v-for="(item, index) in paginatedItemList">
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
      <span class="pr-5">{{ navigationText }}</span>

      <div class="d-flex justify-space-between">
        <TableNaviButton v-if="totalOfPages > 1" :background="false">
          {{ "<" }}
        </TableNaviButton>
        <TableNaviButton
          v-if="totalOfPages >= 1"
          :active="currentPage == navNumbers.first"
          @click.prevent="navigation.goPage(navNumbers.first)"
          >{{ navNumbers.first }}</TableNaviButton
        >
        <TableNaviButton
          v-if="totalOfPages >= 2"
          :active="currentPage == navNumbers.second"
          @click.prevent="navigation.goPage(navNumbers.second)"
          >{{ navNumbers.second }}</TableNaviButton
        >
        <TableNaviButton
          v-if="totalOfPages >= 3"
          :active="currentPage == navNumbers.third"
          @click.prevent="navigation.goPage(navNumbers.third)"
          >{{ navNumbers.third }}</TableNaviButton
        >
        <TableNaviButton
          v-if="totalOfPages >= 4"
          :active="currentPage == navNumbers.fourth"
          @click.prevent="navigation.goPage(navNumbers.fourth)"
          >{{ navNumbers.fourth }}</TableNaviButton
        >
        <TableNaviButton
          v-if="totalOfPages >= 5"
          :active="currentPage == navNumbers.fifth"
          @click.prevent="navigation.goPage(navNumbers.fifth)"
          >{{ navNumbers.fifth }}</TableNaviButton
        >
        <TableNaviButton v-if="totalOfPages > 1" :background="false">
          {{ ">" }}
        </TableNaviButton>
      </div>
    </v-sheet>
  </v-sheet>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import TableNaviButton from "@/components/general/buttons/TableNaviButton";
import DashboardButton from "@/components/general/buttons/DashboardButton.vue";

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
});

const tableSearch = ref("");
const currentPage = ref(1);

const totalOfPages = computed(() => {
  return Math.ceil(props.items.length / props.itemsPerPage);
});

const firstItemPageIndex = computed(() => {
  return (currentPage.value - 1) * props.itemsPerPage;
});

const lastItemPageIndex = computed(() => {
  return (currentPage.value - 1) * props.itemsPerPage + props.itemsPerPage;
});

const navigationText = computed(() => {
  const firstItem = firstItemPageIndex.value + 1;
  const isLastPage = firstItem + props.itemsPerPage < props.items.length;
  const lastItem = isLastPage
    ? firstItem + props.itemsPerPage - 1
    : props.items.length;

  return `${firstItem}-${lastItem} de ${props.items.length} items`;
});

const navigation = {
  nextPage: () => {
    if (currentPage.value < totalOfPages.value) {
      currentPage.value++;
    }
  },
  pravPage: () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  },
  goPage: (newPage) => {
    console.log(totalOfPages.value);

    if (newPage > 0 && newPage <= totalOfPages.value) {
      currentPage.value = newPage;
    }
  },
};

const navNumbers = computed(() => {
  // Unless 5 Pages or First Page
  if (totalOfPages.value < 5 || currentPage.value == 1) {
    return {
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
      fifth: 5,
    };
  }

  // Second Page
  if (currentPage.value == 2) {
    return {
      first: 2,
      second: 3,
      third: 4,
      fourth: 5,
      fifth: 6,
    };
  }

  // Last Page
  if (currentPage.value == totalOfPages.value) {
    return {
      first: currentPage.value - 4,
      second: currentPage.value - 3,
      third: currentPage.value - 2,
      fourth: currentPage.value - 1,
      fifth: currentPage.value,
    };
  }

  // Second Last Page
  if (currentPage.value == totalOfPages.value) {
    return {
      first: currentPage.value - 3,
      second: currentPage.value - 2,
      third: currentPage.value - 1,
      fourth: currentPage.value,
      fifth: currentPage.value + 1,
    };
  }

  // Default
  return {
    first: currentPage.value - 2,
    second: currentPage.value - 1,
    third: currentPage.value,
    fourth: currentPage.value + 1,
    fifth: currentPage.value + 2,
  };
});

const paginatedItemList = computed(() => {
  return props.items.slice(firstItemPageIndex.value, lastItemPageIndex.value);
});
function searchOnTable() {
  console.log("search on table", tableSearch.value);
}
</script>

<style scoped>
p {
  border-right: 1px solid rgba(1, 1, 1, 0.2) !important;
}
</style>
