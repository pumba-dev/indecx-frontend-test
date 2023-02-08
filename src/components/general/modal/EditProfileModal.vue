<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center my-2">
      <span class="text-subtitle-1 font-weight-bold">Editar conta</span>

      <v-icon
        size="x-small"
        icon="mdi-close"
        style="cursor: pointer"
        @click="$emit('closeModal')"
      ></v-icon>
    </v-card-title>

    <v-divider></v-divider>

    <v-sheet class="pa-5">
      <!-- Profile Avatar -->
      <v-row class="mb-12 mt-4 align-center justify-center">
        <v-avatar colo="transparent" size="125">
          <v-img
            cover
            @error="applyDefaultDisplayPhoto"
            :src="displayedProfilePhoto"
            alt="Imagem de Perfil do Usuário"
          ></v-img>
        </v-avatar>
      </v-row>

      <!-- Form Fields -->
      <v-row>
        <v-col>
          <InputLabel>Nome</InputLabel>
          <v-responsive width="270">
            <TextInput
              v-model="profileFieldsData.name"
              :error="v$.name.$error"
              placeholder="Digite seu nome e sobrenome"
            ></TextInput>
          </v-responsive>
        </v-col>

        <v-col>
          <InputLabel>Email</InputLabel>
          <v-responsive width="270">
            <TextInput
              disabled
              v-model="profileFieldsData.email"
              placeholder="Digite um endereço de email"
            ></TextInput>
          </v-responsive>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <InputLabel>Telefone</InputLabel>
          <v-responsive width="270">
            <TextInput
              type="tel"
              v-mask="['(##) ####-####', '(##) #####-####']"
              v-model="profileFieldsData.phone"
              placeholder="Digite seu número de telefone"
            ></TextInput>
          </v-responsive>
        </v-col>

        <v-col>
          <InputLabel>Imagem do perfil</InputLabel>
          <v-responsive width="270">
            <TextInput
              v-model="profileFieldsData.photoURL"
              placeholder="Insira o link de uma imagem"
              @blur="applyNewDisplayedPhoto(profileFieldsData.photoURL)"
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
        :loading="editProfileIsLoading"
        :disabled="editProfileIsLoading"
        @click.prevent="saveNewProfileData"
      >
        Salvar
      </DashboardButton>
    </v-sheet>
  </v-card>
</template>

<script setup>
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import onlyNumbers from "@/utils/onlyNumbers";
import authService from "@/services/authentication";
import { required, minLength } from "@vuelidate/validators";
import TextInput from "@/components/general/forms/TextInput.vue";
import InputLabel from "@/components/general/forms/InputLabel.vue";
import { reactive, onMounted, defineEmits, computed, ref } from "vue";
import DashboardButton from "@/components/general/buttons/DashboardButton.vue";

onMounted(() => {
  setInitialValueForFields();
});

const editProfileIsLoading = ref(false);
const displayedProfilePhoto = ref("");
const store = useStore();
const emit = defineEmits(["closeModal", "openModal"]);

const profileFieldsData = reactive({
  name: "",
  email: "",
  phone: "",
  photoURL: "",
});

const user = computed(() => {
  return authService.getCurrentUser();
});

const editProfileRules = reactive({
  name: {
    required,
    minLength: minLength(3),
  },
});

const v$ = useVuelidate(editProfileRules, profileFieldsData);

async function saveNewProfileData() {
  editProfileIsLoading.value = true;

  const formIsValid = await v$.value.$validate();

  if (formIsValid) {
    const parsedAPIData = parseDataToAPI();
    console.log("Save New Profile Data: ", parsedAPIData);
    if (phoneHasChanged()) {
      emit("openModal", {
        key: "confirm-phone",
        data: parsedAPIData,
      });
    } else {
      await authService
        .updateUserProfile(parsedAPIData)
        .then((response) => {
          console.log("Sucess Edit Profile Data: ", response);
          store.dispatch("notifySystem/create", {
            text: "Dados do perfil alterados com sucesso!",
            iconSrc: "sucess-icon",
          });
        })
        .catch((error) => {
          console.log("Error Edit Profile Data: ", error);
          store.dispatch("notifySystem/create", {
            text: "Erro interno no servidor ao alterar dados do perfil.",
            iconSrc: "error-icon",
          });
        });
      emit("closeModal");
    }
  } else {
    store.dispatch("notifySystem/create", {
      text: "Verifique os dados inseridos e tente novamente.",
      iconSrc: "error-icon",
    });
    editProfileIsLoading.value = false;
  }
}

function setInitialValueForFields() {
  console.log("Edit Profile Data", user.value);
  profileFieldsData.name = user.value.displayName;
  profileFieldsData.email = user.value.email;
  profileFieldsData.phone = user.value.phoneNumber;
  profileFieldsData.photoURL = user.value.photoURL;
  displayedProfilePhoto.value = user.value.photoURL;
  if (user.value.photoURL == null || user.value.photoURL == "")
    applyDefaultDisplayPhoto();
}

function applyDefaultDisplayPhoto() {
  displayedProfilePhoto.value = require("@/assets/general/no-user-image.png");
}

function applyNewDisplayedPhoto(newPhotoUrl) {
  console.log("newPhotoUrl", newPhotoUrl);
  displayedProfilePhoto.value = newPhotoUrl;
}

function parseDataToAPI() {
  return {
    displayName: profileFieldsData.name,
    photoURL: profileFieldsData.photoURL,
    phoneNumber: onlyNumbers(profileFieldsData.phone),
  };
}

function phoneHasChanged() {
  console.log(user.value.phoneNumber);
  console.log(profileFieldsData.phone);
  return profileFieldsData.phone != user.value.phoneNumber;
}
</script>

<style></style>
