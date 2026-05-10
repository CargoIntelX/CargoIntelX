import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

export async function getCurrentUserData(
  uid: string
) {
  const docRef = doc(
    db,
    "users",
    uid
  );

  const snapshot =
    await getDoc(docRef);

  return snapshot.data();
}