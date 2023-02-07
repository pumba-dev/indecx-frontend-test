import { db, auth } from "@/plugins/firebase";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

export default {
  create: (productData) => {
    const userUID = auth.currentUser.uid;
    return addDoc(collection(db, "products"), { key: userUID, ...productData });
  },
  getAll: () => {
    const userUID = auth.currentUser.uid;
    const productsRef = collection(db, "products");
    const queryByKey = query(productsRef, where("key", "==", userUID));
    return getDocs(queryByKey);
  },
};
