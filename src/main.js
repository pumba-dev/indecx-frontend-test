import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./css/reset.css";
import "./css/global.css";

createApp(App).use(vuetify).mount("#app");
