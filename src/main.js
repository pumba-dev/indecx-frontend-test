import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "@/store";
import router from "@/router";
import firebase from "@/plugins/firebase";
import "./css/reset.css";
import "./css/global.css";

firebase();

createApp(App).use(store).use(router).use(vuetify).mount("#app");
