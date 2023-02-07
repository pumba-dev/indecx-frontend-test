import authService from "@/services/authentication";
import localStorage from "@/utils/localStorage";

export default {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    deleteToken(state) {
      state.token = null;
    },
  },
  actions: {
    async signIn({ commit }, payload) {
      console.log("signIn User", payload);
      return authService
        .signIn(payload.email, payload.password)
        .then((userCredential) => {
          const token = userCredential.user.accessToken;
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
    async signOut({ commit }) {
      localStorage.delete("token");
      commit("setToken", "");
      await authService.signOut();
      return true;
    },
  },
};
