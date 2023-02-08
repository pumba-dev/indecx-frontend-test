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
    const productCollectionRef = collection(db, "products");
    const queryByKey = query(productCollectionRef, where("key", "==", userUID));
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
    const productCollectionRef = doc(db, "products", newProductData.id);
    return updateDoc(productCollectionRef, newProductData);
  },
  delete: async (productID) => {
    const productCollectionRef = doc(db, "products", productID);
    return await deleteDoc(productCollectionRef);
  },
  deleteAll: async () => {
    const batch = writeBatch(db);
    const userUID = localStorage.get("userUID");
    const productCollectionRef = collection(db, "products");
    const queryByKey = query(productCollectionRef, where("key", "==", userUID));
    const userProductsDocs = await getDocs(queryByKey);
    userProductsDocs.forEach((productDoc) => {
      batch.delete(productDoc.ref);
    });
    return batch.commit();
  },
};
