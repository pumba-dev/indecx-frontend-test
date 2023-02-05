<template>
  <MainCard>
    <v-img
      width="220"
      class="mb-15"
      src="@/assets/general/indecx-logomarca.svg"
    />

    <h1 class="text-h5 font-weight-bold align-self-start mb-2">Login</h1>
    <span class="text-subtitle-2 align-self-start mb-9">
      Bem-vindo de volta! Por favor insira seus dados.
    </span>

    <v-form
      @submit.prevent
      class="w-100 d-flex flex-column"
      @keydown.enter="submitLogin"
    >
      <p class="font-weight-bold text-secondary mb-2">Email</p>
      <v-text-field
        required
        variant="outlined"
        :error="v$.$error"
        @blur="v$.email.$touch"
        v-model.trim="loginFieldsData.email"
        placeholder="Digite o seu e-mail"
      ></v-text-field>

      <p class="font-weight-bold text-secondary mb-2">Senha</p>
      <v-text-field
        required
        variant="outlined"
        :error="v$.$error"
        @blur="v$.password.$touch"
        placeholder="Insira a sua senha"
        v-model="loginFieldsData.password"
        :type="showPasswordField ? 'text' : 'password'"
        @click:append-inner="showPasswordField = !showPasswordField"
        :append-inner-icon="
          showPasswordField ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
        "
      ></v-text-field>

      <v-btn
        type="submit"
        variant="text"
        class="align-self-end text-primary text-subtitle-1 mb-5"
        >Esqueci minha senha ></v-btn
      >

      <v-btn
        type="submit"
        :loading="loginIsLoading"
        block
        class="bg-primary fill-height rounded h-10 pa-4 font-weight-light text-capitalize"
        @click.prevent="submitLogin"
        >Entrar</v-btn
      >
    </v-form>
  </MainCard>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import MainCard from "@/components/general/MainCard.vue";

const loginFieldsData = reactive({
  email: "",
  password: "",
});

const showPasswordField = ref(false);
const loginIsLoading = ref(false);

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

async function submitLogin() {
  loginIsLoading.value = true;

  const formIsValid = await v$.value.$validate();

  if (formIsValid) {
    const parsedFieldsData = parseLoginFieldsDataToAPI();

    console.log(parsedFieldsData);
  }

  loginIsLoading.value = false;
}

function parseLoginFieldsDataToAPI() {
  return {
    login: loginFieldsData.email,
    password: loginFieldsData.password,
  };
}
</script>

<style></style>
