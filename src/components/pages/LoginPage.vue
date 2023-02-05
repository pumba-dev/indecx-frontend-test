<template>
  <MainCard>
    <CardHeader
      title="Login"
      subtitle="Bem-vindo de volta! Por favor insira seus dados."
    ></CardHeader>

    <CardForm>
      <p class="font-weight-bold text-secondary mb-2">Email</p>
      <v-text-field
        required
        variant="outlined"
        :error="v$.$error"
        v-model.trim="loginFieldsData.email"
        placeholder="Digite o seu e-mail"
      ></v-text-field>

      <p class="font-weight-bold text-secondary mb-2">Senha</p>
      <v-text-field
        required
        variant="outlined"
        :error="v$.$error"
        placeholder="Insira a sua senha"
        v-model="loginFieldsData.password"
        :type="showPasswordField ? 'text' : 'password'"
        @click:append-inner="showPasswordField = !showPasswordField"
        :append-inner-icon="
          showPasswordField ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
        "
      ></v-text-field>

      <v-btn
        variant="text"
        class="align-self-end text-primary text-subtitle-1 mb-5"
        @click.prevent="pushToForgotPasswordRoute"
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
    </CardForm>
  </MainCard>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { reactive, ref, computed } from "vue";
import { required, email } from "@vuelidate/validators";
import MainCard from "@/components/general/main-card/MainCard.vue";
import CardForm from "@/components/general/main-card/CardForm.vue";
import CardHeader from "@/components/general/main-card/CardHeader.vue";

const loginFieldsData = reactive({
  email: "",
  password: "",
});

const router = useRouter();
const store = useStore();
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
    password: loginFieldsData.password,
  };
}

function pushToForgotPasswordRoute() {
  router.push({ name: "forgot-password" });
}
</script>

<style></style>
