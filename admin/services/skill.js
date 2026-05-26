// /admin/services/skills.js
import {
  getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "../utils/firestore.js";

const db = getFirestore(app);
const skillsRef = collection(db, "skills");

export async function getAllSkills() {
  const snap = await getDocs(skillsRef);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addSkill(data) {
  await addDoc(skillsRef, data);
}

export async function updateSkill(id, data) {
  await updateDoc(doc(db, "skills", id), data);
}

export async function deleteSkill(id) {
  await deleteDoc(doc(db, "skills", id));
}
