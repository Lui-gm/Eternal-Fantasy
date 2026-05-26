// Firebase 初期化は firebase.js が行う
import { auth, db } from "../js/firebase.js";
import { 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 未ログインなら admin/login.html に飛ばす
onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "login.html";
  }
});

// ログアウト
window.logout = () => {
  signOut(auth);
};
