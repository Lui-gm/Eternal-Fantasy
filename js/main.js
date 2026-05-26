// js/main.js
import { auth } from "./firebase.js";
import { 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const screen = document.getElementById("screen");

// ログイン状態を監視
onAuthStateChanged(auth, (user) => {
  if (user) {
    screen.innerHTML = `
      <p>ログイン中: ${user.email}</p>
      <a href="./game/game.html">ゲームを開始</a>
    `;
  } else {
    screen.innerHTML = `
      <p>ログインしていません</p>
      <a href="./auth/login.html">ログイン</a>
    `;
  }
});
