<template>
  <MainCard>
    <CardHeader
      title="Redefina a sua senha"
      subtitle="Enviaremos um código em seu email para recuperação da senha."
    ></CardHeader>

    <CardForm>
      <InputLabel>Informe o email cadastrado</InputLabel>
      <EmailInput
        :error="v$.$error"
        v-model.trim="resetPasswordFieldsData.email"
        placeholder="Digite o seu e-mail"
      ></EmailInput>

      <BlockButton
        :loading="resetPasswordIsLoading"
        :disabled="resetPasswordIsLoading"
        @click.prevent="submitForgotPassword"
        >Enviar código</BlockButton
      >

      <TextButton @click.prevent="$router.push('login')">{{
        "Voltar <"
      }}</TextButton>
    </CardForm>
  </MainCard>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { reactive, ref, computed } from "vue";
import authService from "@/services/authentication";
import { required, email } from "@vuelidate/validators";
import MainCard from "@/components/general/main-card/MainCard.vue";
import CardForm from "@/components/general/main-card/CardForm.vue";
import InputLabel from "@/components/general/forms/InputLabel.vue";
import EmailInput from "@/components/general/forms/EmailInput.vue";
import TextButton from "@/components/general/buttons/TextButton.vue";
import BlockButton from "@/components/general/buttons/BlockButton.vue";
import CardHeader from "@/components/general/main-card/CardHeader.vue";

const resetPasswordFieldsData = reactive({
  email: "",
});

const store = useStore();
const router = useRouter();
const resetPasswordIsLoading = ref(false);

const resetPasswordRules = computed(() => ({
  email: {
    required,
    email,
  },
}));

const v$ = useVuelidate(resetPasswordRules, resetPasswordFieldsData);

async function submitForgotPassword() {
  resetPasswordIsLoading.value = true;

  const formIsValid = await v$.value.$validate();

  if (formIsValid) {
    authService
      .sendPasswordResetEmail(resetPasswordFieldsData.email)
      .then((response) => {
        store.dispatch("notifySystem/create", {
          type: "left",
          text: "Um link de recuperação foi enviado para seu email.",
          iconSrc: "sucess-icon",
        });
        console.log(response);
        router.push("login");
      })
      .catch((error) => {
        console.log(error);
        let errorMsg;
        switch (error.code) {
          case "auth/user-not-found":
            errorMsg = "O e-mail não pertence a um usuário do sistema.";
            break;
          default:
            errorMsg = "O endereço de e-mail inserido não é válido.";
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
