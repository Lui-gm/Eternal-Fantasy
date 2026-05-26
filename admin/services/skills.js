// /admin/services/skills.js

import { db } from "../utils/firestore.js";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// skills コレクション参照
const skillsRef = collection(db, "skills");

// 全取得
export async function getAllSkills() {
  const snap = await getDocs(skillsRef);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// 追加
export async function addSkill(data) {
  await addDoc(skillsRef, data);
}

// 更新
export async function updateSkill(id, data) {
  await updateDoc(doc(db, "skills", id), data);
}

// 削除
export async function deleteSkill(id) {
  await deleteDoc(doc(db, "skills", id));
}
