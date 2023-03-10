import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoVVNoRczxDgZGGxw_NVb2KFRak-1fTqY",
  authDomain: "indecx-frontend-test.firebaseapp.com",
  projectId: "indecx-frontend-test",
  storageBucket: "indecx-frontend-test.appspot.com",
  messagingSenderId: "944333282869",
  appId: "1:944333282869:web:ef5fcfecff3d4cc22fdb7c",
  measurementId: "G-LKEL1TMFHB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence);

export { app, auth, db };
