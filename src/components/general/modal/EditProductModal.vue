<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center my-2">
      <span class="text-subtitle-1 font-weight-bold">Editar Produto</span>

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
        :loading="editIsLoading"
        :disabled="editIsLoading"
        @click.prevent="editProduct"
      >
        Salvar
      </DashboardButton>
    </v-sheet>
  </v-card>
</template>

<script setup>
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { reactive, defineEmits, ref, defineProps, onMounted } from "vue";
import { required } from "@vuelidate/validators";

import InputLabel from "@/components/general/forms/InputLabel.vue";
import TextInput from "@/components/general/forms/TextInput.vue";
import DashboardButton from "@/components/general/buttons/DashboardButton.vue";
import DefaultSelect from "../forms/DefaultSelect.vue";
import productTypesOptions from "@/utils/productTypesOptions";
import productService from "@/services/products";

onMounted(() => {
  setInitialValueForFields();
});

const emit = defineEmits(["closeModal"]);
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const editIsLoading = ref(false);
const store = useStore();

const productFieldsData = reactive({
  name: "",
  price: "",
  type: undefined,
});

const editProductRules = reactive({
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

const v$ = useVuelidate(editProductRules, productFieldsData);

function setInitialValueForFields() {
  productFieldsData.name = props.item.name;
  productFieldsData.price = props.item.price;
  productFieldsData.type = props.item.type;
}

async function editProduct() {
  editIsLoading.value = true;

  const formIsValid = await v$.value.$validate();

  if (formIsValid) {
    const parsedAPIData = parseDataToAPI();
    console.log("Edit Product Data: ", parsedAPIData);

    productService
      .edit(parsedAPIData)
      .then((response) => {
        console.log("Document overwritten with ID: ", response);
        store.dispatch("notifySystem/create", {
          text: "Produto editado com sucesso!",
          iconSrc: "sucess-icon",
        });
        emit("closeModal");
      })
      .catch((error) => {
        console.log("ERROR: Document written error: ", error);
        store.dispatch("notifySystem/create", {
          text: "Erro interno do sistema ao editar o produto!",
          iconSrc: "error-icon",
        });
        editIsLoading.value = false;
      });
  } else {
    store.dispatch("notifySystem/create", {
      text: "Verifique os dados inseridos e tente novamente.",
      iconSrc: "error-icon",
    });
    editIsLoading.value = false;
  }
}

function parseDataToAPI() {
  return {
    id: props.item.id,
    name: productFieldsData.name,
    price: productFieldsData.price,
    type: productFieldsData.type,
  };
}
</script>

<style></style>
