// ===============================
// Firebase Auth ログイン処理
// 管理者判定 → localStorage に保存
// ===============================

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./firebase.js";

// 管理者メール一覧（必要なら複数登録可能）
const ADMIN_EMAILS = [
  "admin@example.com",
  "owner@example.com"
];

// -------------------------------
// ログイン処理
// -------------------------------
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 管理者判定
    const isAdmin = ADMIN_EMAILS.includes(user.email);

    if (isAdmin) {
      localStorage.setItem("isAdmin", "true");
    } else {
      localStorage.removeItem("isAdmin");
      alert("管理者権限がありません");
      return;
    }

    // 管理画面へ
    location.href = "/admin/admin.html";

  } catch (err) {
    console.error(err);
    alert("ログインに失敗しました");
  }
}
