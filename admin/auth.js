// ===============================
// Firebase Auth + Firestore 管理者判定
// ===============================

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth, db } from "../js/firebase.js";

export async function login(email, password) {
  try {
    // Firebase Auth ログイン
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore から管理者リスト取得
    const adminRef = doc(db, "system", "admins");
    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists()) {
      alert("管理者リストが存在しません");
      return;
    }

    const adminList = adminSnap.data().emails || [];
    const isAdmin = adminList.includes(user.email);

    if (!isAdmin) {
      alert("管理者権限がありません");
      return;
    }

    // 管理者フラグを保存
    localStorage.setItem("isAdmin", "true");

    // 管理画面へ
    location.href = "./admin.html";

  } catch (err) {
    console.error(err);
    alert("ログインに失敗しました");
  }
}
