import authService from "@/services/authentication";
import localStorage from "@/utils/localStorage";
import parseUserProfileDataByAPI from "@/utils/parseUserProfileDataByAPI";

export default {
  namespaced: true,
  state: {
    token: "",
    profileData: {},
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getProfileData(state) {
      return state.profileData;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setProfileData(state, newData) {
      console.log("setProfileData", newData);
      state.profileData = newData;
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
          console.log("Passou por Aqui");

          commit(
            "setProfileData",
            parseUserProfileDataByAPI(userCredential.user)
          );
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
      commit("setProfileData", {});
      await authService.signOut();
      return true;
    },
    async authCurrentUser({ commit }) {
      authService.hasAuthenticatedUser(commit);
    },
  },
};
