import { signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth, db } from "../js/firebase.js";

// 管理者ログイン
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore 管理者リスト
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

    // 管理者フラグ
    localStorage.setItem("isAdmin", "true");

    // ★ 相対パスで admin.html へ
    location.href = "./admin.html";

  } catch (err) {
    console.error(err);
    alert("ログインに失敗しました");
  }
}

// ログアウト
export function logout() {
  localStorage.removeItem("isAdmin");
  location.href = "./login.html";
}
