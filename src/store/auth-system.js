import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/plugins/firebase";
import localStorage from "@/utils/localStorage";

export default {
  namespaced: true,
  state: {
    token: "",
    userData: {},
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    userData(state) {
      return state.userData;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    deleteToken(state) {
      state.token = "";
    },
    deleteUserData(state) {
      state.userData = {};
    },
  },
  actions: {
    async singIn({ commit }, payload) {
      console.log("singIn User", payload);
      return signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          const user = userCredential.user.email;
          const token = userCredential.user.accessToken;
          console.log("Logged User Token", token);

          commit("setUserData", user);
          commit("setToken", token);
          localStorage.push("token", token);

          return userCredential;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error Core", errorCode);
          console.log("Login Error", errorMessage);
          throw error;
        });
    },
  },
};
