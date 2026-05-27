import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzA2CXQQTR4cV0if4ahfOJx98y5k6Rhp4",
  authDomain: "eternal-fantasy.firebaseapp.com",
  projectId: "eternal-fantasy",
  storageBucket: "eternal-fantasy.appspot.com",
  messagingSenderId: "547745935105",
  appId: "1:547745935105:web:69cc7119b9d5470e9c7500"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
