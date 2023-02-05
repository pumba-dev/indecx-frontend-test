import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

export default {
  create: (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },
  singIn: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
};
