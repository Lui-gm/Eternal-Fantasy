import { signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "../js/firebase.js";

export async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem("isAdmin", "true");
    location.href = "./admin.html";

  } catch (err) {
    console.error("Firebase Auth Error:", err);

    // ★ エラー内容をそのまま表示（原因が一発で分かる）
    alert("ログイン失敗: " + err.code + "\n" + err.message);
  }
}

export function logout() {
  localStorage.removeItem("isAdmin");
  location.href = "./login.html";
}
