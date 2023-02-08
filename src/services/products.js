import {
  doc,
  query,
  where,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  writeBatch,
  collection,
} from "firebase/firestore";
import { db } from "@/plugins/firebase";
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
  createMultiple: (productsArray) => {
    const batch = writeBatch(db);
    const userUID = localStorage.get("userUID");
    productsArray.forEach((product) => {
      const productRef = doc(db, "products", product.id);
      batch.set(productRef, {
        key: userUID,
        ...product,
      });
    });
    return batch.commit();
  },
  edit: async (newProductData) => {
    const productsRef = doc(db, "products", newProductData.id);
    return updateDoc(productsRef, newProductData);
  },
  delete: async (productID) => {
    const productsRef = doc(db, "products", productID);
    return await deleteDoc(productsRef);
  },
};
