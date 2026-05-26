// /admin/services/weapons.js
import {
  getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "../utils/firestore.js";

const db = getFirestore(app);
const weaponsRef = collection(db, "weapons");

export async function getAllWeapons() {
  const snap = await getDocs(weaponsRef);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addWeapon(data) {
  await addDoc(weaponsRef, data);
}

export async function updateWeapon(id, data) {
  await updateDoc(doc(db, "weapons", id), data);
}

export async function deleteWeapon(id) {
  await deleteDoc(doc(db, "weapons", id));
}
