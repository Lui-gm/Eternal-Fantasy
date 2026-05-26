import { db } from "../auth.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const usersRef = collection(db, "users");

// 全ユーザー取得
export async function getAllUsers() {
  const snap = await getDocs(usersRef);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// 新規ユーザー追加
export async function addUser(data) {
  await addDoc(usersRef, data);
}

// 更新
export async function updateUser(id, data) {
  await updateDoc(doc(db, "users", id), data);
}

// 削除
export async function deleteUserById(id) {
  await deleteDoc(doc(db, "users", id));
}
