<template>
  <MainCard>
    <CardHeader
      title="Cadastre-se"
      subtitle="Insira seus dados para realizar cadastro no sistema."
    ></CardHeader>

    <CardForm>
      <InputLabel>Email</InputLabel>
      <EmailInput
        :error="v$.$error"
        v-model.trim="loginFieldsData.email"
        placeholder="Digite um e-mail"
      ></EmailInput>

      <InputLabel>Senha</InputLabel>
      <PasswordInput
        :error="v$.$error"
        placeholder="Insira uma senha"
        v-model="loginFieldsData.password"
      ></PasswordInput>

      <BlockButton
        :loading="registerIsLoading"
        @click.prevent="submitAccountRegister"
        >Cadastrar</BlockButton
      >
      <TextButton @click.prevent="$router.push('login')">Voltar ></TextButton>
    </CardForm>
  </MainCard>
</template>

<script setup>
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { reactive, ref, computed } from "vue";
import { required, email } from "@vuelidate/validators";
import authService from "@/services/authentication";

import MainCard from "@/components/general/main-card/MainCard.vue";
import CardForm from "@/components/general/main-card/CardForm.vue";
import CardHeader from "@/components/general/main-card/CardHeader.vue";
import BlockButton from "@/components/general/buttons/BlockButton.vue";
import TextButton from "@/components/general/buttons/TextButton.vue";
import EmailInput from "@/components/general/forms/EmailInput.vue";
import PasswordInput from "@/components/general/forms/PasswordInput.vue";
import InputLabel from "@/components/general/forms/InputLabel.vue";

const loginFieldsData = reactive({
  email: "",
  password: "",
});

const store = useStore();
const registerIsLoading = ref(false);

const loginRules = computed(() => ({
  email: {
    required,
    email,
  },
  password: {
    required,
  },
}));

const v$ = useVuelidate(loginRules, loginFieldsData);

async function submitAccountRegister() {
  registerIsLoading.value = true;

  const formIsValid = await v$.value.$validate();

  if (formIsValid) {
    console.log(loginFieldsData);
    authService
      .create(loginFieldsData.email, loginFieldsData.password)
      .then((response) => {
        console.log("Succes Create User: ", response);
      })
      .catch((error) => {
        console.log("Failed Create User: ", error);
        store.dispatch("notifySystem/create", {
          text: "Erro interno ao registrar novo usuário no sistema.",
          iconSrc: "error-icon",
        });
      });
  } else {
    store.dispatch("notifySystem/create", {
      text: "Verifique os seus dados e tente novamente.",
      iconSrc: "error-icon",
    });
  }

  registerIsLoading.value = false;
}
</script>

<style></style>
