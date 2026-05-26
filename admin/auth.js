import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzA2CXQQTR4cV0if4ahfOJx98y5k6Rhp4",
  authDomain: "eternal-fantasy.firebaseapp.com",
  projectId: "eternal-fantasy"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 未ログインなら /auth/login.html に飛ばす
onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "login.html";
  }
});

// ログアウト
window.logout = () => {
  signOut(auth);
};
