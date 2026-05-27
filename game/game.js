// game/game.js
import { auth, db } from "../js/firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const screen = document.getElementById("screen");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "../auth/login.html";
    return;
  }

  // Firestore からユーザー名取得
  let username = user.email;
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      username = snap.data().username || user.email;
    }
  } catch (e) {
    // 読み込み失敗しても致命的ではない
  }

  screen.innerHTML = `
    <p>ようこそ、${username} さん</p>
    <p>（ここに Eternal Fantasy のゲーム画面を実装していく）</p>

    <div style="margin-top:20px;">
      <button id="logout">ログアウト</button>
    </div>
  `;

  document.getElementById("logout").onclick = () => {
    signOut(auth);
  };
});
