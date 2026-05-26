import { db } from "../auth.js";
import { 
  collection, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let logsCache = [];

export function loadPage(main) {
  main.innerHTML = `
    <h2>ログ閲覧</h2>

    <div style="margin-bottom: 10px;">
      <input id="logSearch" placeholder="検索ワード" style="padding: 6px; width: 200px;">
    </div>

    <div id="logs"></div>
  `;

  document.getElementById("logSearch").addEventListener("input", renderLogs);

  startRealtimeListener();
}

function startRealtimeListener() {
  const ref = collection(db, "logs");

  // ★ timestamp が無いので query() は使わない
  onSnapshot(ref, (snap) => {
    logsCache = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    renderLogs();
  });
}

function renderLogs() {
  const el = document.getElementById("logs");
  const keyword = document.getElementById("logSearch").value.toLowerCase();

  const filtered = logsCache.filter(log =>
    JSON.stringify(log).toLowerCase().includes(keyword)
  );

  el.innerHTML = filtered
    .map(log => `
      <div style="
        padding: 8px;
        margin-bottom: 6px;
        background: #fff;
        border-radius: 6px;
        border-left: 4px solid #4da3ff;
        font-size: 14px;
      ">
        <b>ID:</b> ${log.id}<br>
        <b>内容:</b> ${escapeHtml(JSON.stringify(log))}
      </div>
    `)
    .join("");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
