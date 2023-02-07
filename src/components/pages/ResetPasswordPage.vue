<template>
  <MainCard>
    <CardHeader
      title="Redefina a sua senha"
      subtitle="Insira uma senha para ser usado no próximo login."
    ></CardHeader>

    <CardForm>
      <InputLabel>Nova senha</InputLabel>
      <PasswordInput
        :error="v$.password.$error"
        placeholder="Insira a nova senha"
        v-model="resetPasswordFieldsData.password"
      ></PasswordInput>

      <InputLabel>Confirme sua nova senha</InputLabel>
      <PasswordInput
        :error="v$.confirmPassword.$error"
        placeholder="Confirme sua nova senha"
        v-model="resetPasswordFieldsData.confirmPassword"
      ></PasswordInput>

      <BlockButton
        :loading="resetPasswordIsLoading"
        :disabled="resetPasswordIsLoading"
        @click.prevent="submitResetPassword"
        >Enviar</BlockButton
      >
    </CardForm>
  </MainCard>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { reactive, ref, computed, defineProps } from "vue";
import { required, sameAs } from "@vuelidate/validators";
import authService from "@/services/authentication";

import MainCard from "@/components/general/main-card/MainCard.vue";
import CardForm from "@/components/general/main-card/CardForm.vue";
import CardHeader from "@/components/general/main-card/CardHeader.vue";
import BlockButton from "@/components/general/buttons/BlockButton.vue";
import PasswordInput from "@/components/general/forms/PasswordInput.vue";
import InputLabel from "@/components/general/forms/InputLabel.vue";

const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
  oobCode: {
    type: String,
    required: true,
  },
});

const resetPasswordFieldsData = reactive({
  password: "",
  confirmPassword: "",
});

const store = useStore();
const router = useRouter();
const resetPasswordIsLoading = ref(false);

const resetPasswordRules = computed(() => ({
  confirmPassword: {
    required,
    sameAs: sameAs(resetPasswordFieldsData.password),
  },
  password: {
    required,
    sameAs: sameAs(resetPasswordFieldsData.confirmPassword),
  },
}));

const v$ = useVuelidate(resetPasswordRules, resetPasswordFieldsData);

async function submitResetPassword() {
  resetPasswordIsLoading.value = true;

  const formIsValid = await v$.value.$validate();

  if (formIsValid) {
    console.log(resetPasswordFieldsData);
    authService
      .resetPassword(props.oobCode, resetPasswordFieldsData.password)
      .then((response) => {
        console.log(response);
        store.dispatch("notifySystem/create", {
          type: "left",
          text: "Sua senha foi alterada com sucesso!",
          iconSrc: "sucess-icon",
        });
        router.push("login");
      })
      .catch((error) => {
        console.log(error);
        let errorMsg;
        switch (error.code) {
          case "auth/expired-action-code":
            errorMsg = "O prazo para alteração de senha foi expirado.";
            break;
          case "auth/weak-password":
            errorMsg = "Senha inserida muito fraca, insira uma mais forte.";
            break;
          default:
            errorMsg = "Link de alteração de senha inválido, reenvie o email.";
            break;
        }
        store.dispatch("notifySystem/create", {
          type: "left",
          text: errorMsg,
          iconSrc: "error-icon",
        });
        resetPasswordIsLoading.value = false;
      });
  } else {
    store.dispatch("notifySystem/create", {
      type: "left",
      text: "Verifique os dados inseridos e tente novamente.",
      iconSrc: "error-icon",
    });
    resetPasswordIsLoading.value = false;
  }
}
</script>

<style></style>
