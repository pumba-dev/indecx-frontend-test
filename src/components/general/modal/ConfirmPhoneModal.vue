<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center my-2">
      <span class="text-subtitle-1 font-weight-bold">Confirmar telefone</span>

      <v-icon
        size="x-small"
        icon="mdi-close"
        style="cursor: pointer"
        @click="$emit('closeModal')"
      ></v-icon>
    </v-card-title>

    <v-divider></v-divider>

    <v-sheet class="pa-5">
      <!-- Form Fields -->
      <InputLabel>Insira o código</InputLabel>
      <v-responsive width="270">
        <TextInput
          v-model="fieldsData.phoneCode"
          :error="v$.error"
          placeholder="Digite o código enviado por SMS"
        ></TextInput>
      </v-responsive>
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
        :loading="confirmPhoneIsLoading"
        :disabled="confirmPhoneIsLoading"
        @click.prevent="saveNewProfilePhone"
      >
        Enviar
      </DashboardButton>
    </v-sheet>
  </v-card>
</template>

<script setup>
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import authService from "@/services/authentication";
import { defineEmits, defineProps, onMounted, reactive, ref } from "vue";
import InputLabel from "@/components/general/forms/InputLabel.vue";
import TextInput from "@/components/general/forms/TextInput.vue";
import DashboardButton from "@/components/general/buttons/DashboardButton.vue";

onMounted(() => {
  console.log(props.item);
  sendVerificationCode();
});

const fieldsData = reactive({
  phoneCode: "",
});
const confirmPhoneIsLoading = ref(false);
const phoneVerificationId = ref("");
const store = useStore();
const emit = defineEmits(["closeModal"]);
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const phoneRules = reactive({
  phoneCode: {
    required,
  },
});

const v$ = useVuelidate(phoneRules, fieldsData);

async function sendVerificationCode() {
  authService
    .sendUpdatePhoneNumberCode(props.item.phoneNumber)
    .then((response) => {
      phoneVerificationId.value = response;
    })
    .catch((error) => {
      let errorMsg;
      switch (error.code) {
        case "auth/too-many-requests":
          errorMsg =
            "Muitas tentativas de enviar código, tente novamente mais tarde.";
          break;
        default:
          errorMsg =
            "Erro interno do servidor ao enviar código de verificação.";
          break;
      }
      store.dispatch("notifySystem/create", {
        type: "left",
        text: errorMsg,
        iconSrc: "error-icon",
      });
      emit("closeModal");
    });
}

async function saveNewProfilePhone() {
  confirmPhoneIsLoading.value = true;
  console.log("Save New Profile Data and Phone: ", props.item);

  const formIsValid = await v$.value.$validate();
  if (formIsValid) {
    console.log("phoneVerificationId", phoneVerificationId.value);
    console.log("phone Code", fieldsData.phoneCode);

    await authService
      .confirmUpdatePhoneNumberCode(
        phoneVerificationId.value,
        fieldsData.phoneCode
      )
      .then((response) => {
        console.log("Sucess Edit Profile Phone Number: ", response);
        saveNewProfileData();
        emit("closeModal");
      })
      .catch((error) => {
        console.log("Error Edit Profile Phone Number: ", error);
        let errorMsg;
        switch (error.code) {
          case "auth/invalid-verification-code":
            errorMsg = "O código inserido não é válido.";
            break;
          default:
            errorMsg = "Erro interno do servidor ao verificar código.";
            break;
        }
        store.dispatch("notifySystem/create", {
          type: "left",
          text: errorMsg,
          iconSrc: "error-icon",
        });
        confirmPhoneIsLoading.value = false;
      });
  } else {
    store.dispatch("notifySystem/create", {
      text: "Verifique os dados inseridos e tente novamente.",
      iconSrc: "error-icon",
    });
    confirmPhoneIsLoading.value = false;
  }
}

async function saveNewProfileData() {
  await authService
    .updateUserProfile(props.userProfileData)
    .then((response) => {
      console.log("Sucess Edit Profile Data: ", response);
      store.dispatch("notifySystem/create", {
        text: "Dados do perfil alterados com sucesso!",
        iconSrc: "sucess-icon",
      });
      emit("closeModal");
    })
    .catch((error) => {
      console.log("Error Edit Profile Data: ", error);
      store.dispatch("notifySystem/create", {
        text: "Erro interno no servidor ao alterar dados do perfil.",
        iconSrc: "error-icon",
      });
    });
}
</script>

<style></style>
