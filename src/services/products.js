import { db } from "@/plugins/firebase";
import {
  collection,
  query,
  where,
  setDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import localStorage from "@/utils/localStorage";

export default {
  getAll: () => {
    const userUID = localStorage.get("userUID");
    const productsRef = collection(db, "products");
    const queryByKey = query(productsRef, where("key", "==", userUID));
    return getDocs(queryByKey);
  },
  create: async (productData) => {
    const userUID = localStorage.get("userUID");
    return setDoc(doc(db, "products", productData.id), {
      key: userUID,
      ...productData,
    });
  },
  edit: async (newProductData) => {
    const productsRef = doc(db, "products", newProductData.id);
    return updateDoc(productsRef, newProductData);
  },
};
