import { db } from "../utils/firebase.js";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function loadPage(main) {
  main.innerHTML = `
    <h1>ログ閲覧（リアルタイム）</h1>

    <div style="margin-bottom: 20px;">
      <select id="filterType">
        <option value="">すべて</option>
        <option value="admin_action">管理操作</option>
        <option value="login">ログイン</option>
        <option value="error">エラー</option>
        <option value="gacha">ガチャ</option>
      </select>

      <input id="searchBox" placeholder="キーワード検索 (skillId, userId など)" />
    </div>

    <table border="1" cellpadding="8" style="width:100%;">
      <thead>
        <tr>
          <th>タイプ</th>
          <th>ユーザー</th>
          <th>アクション</th>
          <th>詳細</th>
          <th>日時</th>
        </tr>
      </thead>
      <tbody id="logsTable"></tbody>
    </table>
  `;

  document.getElementById("filterType").addEventListener("change", renderLogs);
  document.getElementById("searchBox").addEventListener("input", renderLogs);

  startRealtimeListener();
}

let logsCache = [];

function startRealtimeListener() {
  const q = query(
    collection(db, "logs"),
    where("timestamp", "!=", null),   // ← timestamp が無くてもクエリが成立する
    orderBy("timestamp", "desc"),
    limit(200)
  );

  onSnapshot(q, (snap) => {
    logsCache = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderLogs();
  });
}

function renderLogs() {
  const type = document.getElementById("filterType").value;
  const keyword = document.getElementById("searchBox").value;
  const table = document.getElementById("logsTable");

  table.innerHTML = logsCache
    .filter(d => {
      if (type && d.type !== type) return false;
      if (keyword && !JSON.stringify(d).includes(keyword)) return false;
      return true;
    })
    .map(d => `
      <tr style="background:${getColor(d.type)};">
        <td>${d.type}</td>
        <td>${d.userId ?? ""}</td>
        <td>${d.action ?? ""}</td>
        <td>${d.detail ?? ""}</td>
        <td>${d.timestamp?.toDate().toLocaleString() ?? ""}</td>
      </tr>
    `)
    .join("");
}

function getColor(type) {
  switch (type) {
    case "error": return "#ffcccc";
    case "admin_action": return "#cce0ff";
    case "login": return "#ccffcc";
    case "gacha": return "#f2ccff";
    default: return "white";
  }
}
