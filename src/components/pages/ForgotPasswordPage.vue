<template>
  <MainCard>
    <CardHeader
      title="Redefina a sua senha"
      subtitle="Enviaremos um código em seu email para recuperação da senha."
    ></CardHeader>

    <CardForm>
      <p class="font-weight-bold text-secondary mb-2">
        Informe o email cadastrado
      </p>
      <v-text-field
        required
        variant="outlined"
        :error="v$.$error"
        v-model.trim="loginFieldsData.email"
        placeholder="Digite o seu e-mail"
      ></v-text-field>

      <v-btn
        type="submit"
        :loading="loginIsLoading"
        block
        class="bg-primary fill-height rounded h-10 pa-4 font-weight-light text-capitalize"
        @click.prevent="submitForgotPassword"
        >Enviar código</v-btn
      >
    </CardForm>
  </MainCard>
</template>

<script setup>
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { reactive, ref, computed } from "vue";
import { required, email } from "@vuelidate/validators";
import MainCard from "@/components/general/main-card/MainCard.vue";
import CardHeader from "../general/main-card/CardHeader.vue";
import CardForm from "../general/main-card/CardForm.vue";

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
    const parsedFieldsData = parseLoginFieldsDataToAPI();

    console.log(parsedFieldsData);
  } else {
    store.dispatch("notifySystem/create", {
      text: "Verifique os seus dados e tente novamente.",
      iconSrc: "error-icon",
    });
  }

  loginIsLoading.value = false;
}

function parseLoginFieldsDataToAPI() {
  return {
    login: loginFieldsData.email,
  };
}
</script>

<style></style>
