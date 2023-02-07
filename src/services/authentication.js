import { auth } from "@/plugins/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  onAuthStateChanged,
} from "firebase/auth";
import localStorage from "@/utils/localStorage";

export default {
  create: (email, password) => {
    console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  },
  singIn: async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  sendPasswordResetEmail: (email) => {
    return sendPasswordResetEmail(auth, email);
  },
  resetPassword: (submitCode, newPassword) => {
    return confirmPasswordReset(auth, submitCode, newPassword);
  },
  hasAuthenticatedUser: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.push("userUID", user.uid);
      } else {
        localStorage.push("userUID", null);
      }
    });
  },
};
