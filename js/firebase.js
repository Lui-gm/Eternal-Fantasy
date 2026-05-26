// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";

// Firebase 設定（公式コードベース）
const firebaseConfig = {
  apiKey: "AIzaSyDzA2CXQQTR4cV0if4ahfOJx98y5k6Rhp4",
  authDomain: "eternal-fantasy.firebaseapp.com",
  projectId: "eternal-fantasy",
  storageBucket: "eternal-fantasy.appspot.com", // ← ここだけ公式コードのままだと動かない
  messagingSenderId: "547745935105",
  appId: "1:547745935105:web:69cc7119b9d5470e9c7500",
  measurementId: "G-1Q4CBRQFL3"
};

// Firebase 初期化
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
