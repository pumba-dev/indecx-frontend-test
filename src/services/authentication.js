import { auth } from "@/plugins/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";

export default {
  create: (email, password) => {
    console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  },
  singIn: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  sendPasswordResetEmail: (email) => {
    return sendPasswordResetEmail(auth, email);
  },
  resetPassword: (submitCode, newPassword) => {
    return confirmPasswordReset(auth, submitCode, newPassword);
  },
};
