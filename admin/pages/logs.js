import { db } from "../utils/firebase.js";
import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function loadPage(main) {
  main.innerHTML = `
    <h1>ログ閲覧（リアルタイム）</h1>

    <table border="1" cellpadding="8" style="width:100%;">
      <thead>
        <tr>
          <th>タイプ</th>
          <th>ユーザー</th>
          <th>アクション</th>
          <th>詳細</th>
        </tr>
      </thead>
      <tbody id="logsTable"></tbody>
    </table>
  `;

  startRealtimeListener();
}

let logsCache = [];

function startRealtimeListener() {
  const ref = collection(db, "logs");   // ← query() を使わない

  onSnapshot(ref, (snap) => {
    logsCache = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderLogs();
  });
}

function renderLogs() {
  const table = document.getElementById("logsTable");

  table.innerHTML = logsCache
    .map(d => `
      <tr>
        <td>${d.type ?? ""}</td>
        <td>${d.userId ?? ""}</td>
        <td>${d.action ?? ""}</td>
        <td>${d.detail ?? ""}</td>
      </tr>
    `)
    .join("");
}
