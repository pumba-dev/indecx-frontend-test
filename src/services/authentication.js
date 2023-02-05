import { auth } from "@/plugins/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  create: (email, password) => {
    console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  },
  singIn: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
};
