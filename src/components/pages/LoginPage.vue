<template>
  <MainCard>
    <CardHeader
      title="Login"
      subtitle="Bem-vindo de volta! Por favor insira seus dados."
    ></CardHeader>

    <CardForm>
      <InputLabel>Email</InputLabel>
      <EmailInput
        :error="v$.$error"
        v-model.trim="loginFieldsData.email"
        placeholder="Digite o seu e-mail"
      ></EmailInput>

      <InputLabel>Senha</InputLabel>
      <PasswordInput
        :error="v$.$error"
        placeholder="Insira a sua senha"
        v-model="loginFieldsData.password"
      ></PasswordInput>

      <TextButton @click.prevent="$router.push('forgot-password')"
        >Esqueci minha senha ></TextButton
      >

      <BlockButton :loading="loginIsLoading" @click.prevent="submitLogin"
        >Entrar</BlockButton
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
import BlockButton from "@/components/general/buttons/BlockButton.vue";
import TextButton from "@/components/general/buttons/TextButton.vue";
import EmailInput from "@/components/general/forms/EmailInput.vue";
import PasswordInput from "@/components/general/forms/PasswordInput.vue";
import InputLabel from "@/components/general/forms/InputLabel.vue";

const loginFieldsData = reactive({
  email: "",
  password: "",
});

const router = useRouter();
const store = useStore();
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
    console.log(loginFieldsData.email, loginFieldsData.password);
    store
      .dispatch("authSystem/singIn", {
        email: loginFieldsData.email,
        password: loginFieldsData.password,
      })
      .then(() => {
        router.push("dashboard");
      })
      .catch((error) => {
        let errorMsg;
        switch (error.code) {
          case "auth/invalid-email":
            errorMsg = "O email inserido não é válido.";
            break;
          case "auth/user-not-found":
            errorMsg = "Nenhuma conta com esse email foi encontrada.";
            break;
          case "auth/wrong-password":
            errorMsg = "A senha inserida está incorreta.";
            break;
          default:
            errorMsg = "O email ou a senha inserida está incorreta.";
            break;
        }
        store.dispatch("notifySystem/create", {
          text: errorMsg,
          iconSrc: "error-icon",
        });
      });
  } else {
    store.dispatch("notifySystem/create", {
      text: "Verifique os seus dados e tente novamente.",
      iconSrc: "error-icon",
    });
  }

  loginIsLoading.value = false;
}
</script>

<style></style>
