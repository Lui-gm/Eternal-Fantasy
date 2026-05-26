// /admin/utils/firestore.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const app = initializeApp({
  apiKey: "AIzaSyDzA2CXQQTR4cV0if4ahfOJx98y5k6Rhp4",
  authDomain: "eternal-fantasy.firebaseapp.com",
  projectId: "eternal-fantasy"
});

// Firestore インスタンスを作成して export
export const db = getFirestore(app);
