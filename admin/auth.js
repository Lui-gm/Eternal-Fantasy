import { signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "../js/firebase.js";

export async function login(email, password) {
  try {
    // Firebase Auth ログイン
    await signInWithEmailAndPassword(auth, email, password);

    // ★ ログインできた時点で管理者とみなす
    localStorage.setItem("isAdmin", "true");

    // 管理画面へ
    location.href = "./admin.html";

  } catch (err) {
    console.error(err);
    alert("ログインに失敗しました");
  }
}

export function logout() {
  localStorage.removeItem("isAdmin");
  location.href = "./login.html";
}
