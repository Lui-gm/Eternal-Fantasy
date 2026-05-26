import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzA2CXQQTR4cV0if4ahfOJx98y5k6Rhp4",
  authDomain: "eternal-fantasy.firebaseapp.com",
  projectId: "eternal-fantasy"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 未ログインなら login.html に飛ばす
onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "login.html";
  }
});

// ログアウト
window.logout = () => {
  signOut(auth);
};
