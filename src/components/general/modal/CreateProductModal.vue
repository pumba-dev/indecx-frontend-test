<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center my-2">
      <span class="text-subtitle-1 font-weight-bold">Criar Produto</span>

      <v-icon
        size="x-small"
        icon="mdi-close"
        style="cursor: pointer"
        @click="$emit('closeModal')"
      ></v-icon>
    </v-card-title>

    <v-divider></v-divider>

    <v-sheet class="pa-5">
      <v-row>
        <v-col>
          <InputLabel>Nome do produto</InputLabel>
          <v-responsive width="270">
            <TextInput
              v-model="productFieldsData.name"
              :error="v$.name.$error"
              placeholder="Digite o nome do produto"
            ></TextInput>
          </v-responsive>
        </v-col>

        <v-col>
          <InputLabel>Tipo de produto</InputLabel>
          <v-responsive width="270">
            <DefaultSelect
              v-model="productFieldsData.type"
              :error="v$.type.$error"
              placeholder="Digite o nome do produto"
              :items="productTypesOptions"
            ></DefaultSelect>
          </v-responsive>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <InputLabel>Valor do produto</InputLabel>
          <v-responsive width="270">
            <TextInput
              v-model="productFieldsData.price"
              :error="v$.price.$error"
              placeholder="R$"
            ></TextInput>
          </v-responsive>
        </v-col>
      </v-row>
    </v-sheet>

    <v-divider></v-divider>

    <v-sheet class="d-flex justify-end py-4 px-6">
      <DashboardButton
        class="mr-4"
        variant="outlined"
        @click.prevent="$emit('closeModal')"
      >
        Fechar
      </DashboardButton>
      <DashboardButton
        :loading="createIsLoading"
        :disabled="createIsLoading"
        @click.prevent="createProduct"
      >
        Salvar
      </DashboardButton>
    </v-sheet>
  </v-card>
</template>

<script setup>
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { reactive, defineEmits, ref } from "vue";
import { required } from "@vuelidate/validators";

import InputLabel from "@/components/general/forms/InputLabel.vue";
import TextInput from "@/components/general/forms/TextInput.vue";
import DashboardButton from "@/components/general/buttons/DashboardButton.vue";
import DefaultSelect from "../forms/DefaultSelect.vue";
import productTypesOptions from "@/utils/productTypesOptions";
import randomString from "@/utils/randomString";
import productService from "@/services/products";

const createIsLoading = ref(false);
const store = useStore();

const emit = defineEmits(["closeModal"]);

const productFieldsData = reactive({
  name: "",
  price: "",
  type: undefined,
});

const createProductRules = reactive({
  name: {
    required,
  },
  price: {
    required,
  },
  type: {
    required,
  },
});

const v$ = useVuelidate(createProductRules, productFieldsData);

async function createProduct() {
  createIsLoading.value = true;

  const formIsValid = await v$.value.$validate();

  if (formIsValid) {
    const parsedAPIData = parseDataToAPI();
    console.log("Create New Product Data: ", parsedAPIData);

    productService
      .create(parsedAPIData)
      .then((response) => {
        console.log("Document written with ID: ", response);

        store.dispatch("notifySystem/create", {
          text: "Produto criado com sucesso!",
          iconSrc: "sucess-icon",
        });
        emit("closeModal");
      })
      .catch((error) => {
        console.log("ERROR: Document written error: ", error);
        createIsLoading.value = false;
      });
  } else {
    store.dispatch("notifySystem/create", {
      text: "Verifique os dados inseridos e tente novamente.",
      iconSrc: "error-icon",
    });
    createIsLoading.value = false;
  }
}

function parseDataToAPI() {
  const randomID = randomString(6);
  return {
    id: randomID,
    name: productFieldsData.name,
    price: productFieldsData.price,
    type: productFieldsData.type,
  };
}
</script>

<style></style>
