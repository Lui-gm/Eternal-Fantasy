// game/game.js
import { auth } from "../js/firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

// 画面要素
const screen = document.getElementById("screen");

// ログイン状態の監視
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // 未ログイン → ログイン画面へ
    location.href = "../auth/login.html";
    return;
  }

  // ログイン済み → ゲーム画面を表示
  screen.innerHTML = `
    <p>ようこそ、${user.email} さん</p>
    <p>（ここに Eternal Fantasy のゲーム画面を実装していく）</p>

    <div style="margin-top:20px;">
      <button id="logout">ログアウト</button>
    </div>
  `;

  // ログアウト処理
  document.getElementById("logout").onclick = () => {
    signOut(auth);
  };
});
