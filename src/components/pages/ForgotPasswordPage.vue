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
        v-model.trim="loginFieldsData.email"
        placeholder="Digite o seu e-mail"
      ></EmailInput>

      <BlockButton
        :loading="loginIsLoading"
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
import useVuelidate from "@vuelidate/core";
import { reactive, ref, computed } from "vue";
import { required, email } from "@vuelidate/validators";
import MainCard from "@/components/general/main-card/MainCard.vue";
import CardHeader from "@/components/general/main-card/CardHeader.vue";
import CardForm from "@/components/general/main-card/CardForm.vue";
import InputLabel from "@/components/general/forms/InputLabel.vue";
import EmailInput from "@/components/general/forms/EmailInput.vue";
import BlockButton from "@/components/general/buttons/BlockButton.vue";
import TextButton from "@/components/general/buttons/TextButton.vue";

const loginFieldsData = reactive({
  email: "",
});

const store = useStore();
const loginIsLoading = ref(false);

const loginRules = computed(() => ({
  email: {
    required,
    email,
  },
}));

const v$ = useVuelidate(loginRules, loginFieldsData);

async function submitForgotPassword() {
  loginIsLoading.value = true;

  const formIsValid = await v$.value.$validate();

  if (formIsValid) {
    const parsedFieldsData = parseFieldsDataToAPI();

    console.log(parsedFieldsData);
  } else {
    store.dispatch("notifySystem/create", {
      text: "Verifique os seus dados e tente novamente.",
      iconSrc: "error-icon",
    });
  }

  loginIsLoading.value = false;
}

function parseFieldsDataToAPI() {
  return {
    login: loginFieldsData.email,
  };
}
</script>

<style></style>
