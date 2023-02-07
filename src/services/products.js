import { db } from "@/plugins/firebase";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import localStorage from "@/utils/localStorage";

export default {
  create: async (productData) => {
    const userUID = localStorage.get("userUID");
    return addDoc(collection(db, "products"), {
      key: userUID,
      ...productData,
    });
  },
  getAll: () => {
    const userUID = localStorage.get("userUID");
    const productsRef = collection(db, "products");
    const queryByKey = query(productsRef, where("key", "==", userUID));
    return getDocs(queryByKey);
  },
};
