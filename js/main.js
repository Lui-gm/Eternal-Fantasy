import { auth } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const screen = document.getElementById("screen");
const nav = document.getElementById("nav");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // ログイン済み → game.html へ
    location.href = "./game/game.html";
  } else {
    // ログイン前 → タイトル画面
    nav.style.display = "none"; // 元のナビは隠す

    screen.innerHTML = `
      <h1 class="game-title">ETERNAL FANTASY</h1>
      <button class="start-btn" onclick="location.href='./auth/login.html'">
        GAME START
      </button>
    `;
  }
});
