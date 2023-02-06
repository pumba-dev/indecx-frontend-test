import { createStore } from "vuex";
import notifySystem from "@/store/notify-system";
import authSystem from "@/store/auth-system";

export default createStore({
  // state: {},
  // getters: {},
  // mutations: {},
  // actions: {},
  modules: { notifySystem, authSystem },
});
