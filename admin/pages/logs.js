import { db } from "../utils/firebase.js";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function loadPage(main) {
  main.innerHTML = `
    <h1>ログ閲覧</h1>

    <div style="margin-bottom: 20px;">
      <select id="filterType">
        <option value="">すべて</option>
        <option value="admin_action">管理操作</option>
        <option value="login">ログイン</option>
        <option value="error">エラー</option>
        <option value="gacha">ガチャ</option>
      </select>

      <input id="searchBox" placeholder="キーワード検索 (skillId, userId など)" />
      <button id="reloadBtn">再読み込み</button>
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

  document.getElementById("filterType").addEventListener("change", loadLogs);
  document.getElementById("searchBox").addEventListener("input", loadLogs);
  document.getElementById("reloadBtn").addEventListener("click", loadLogs);

  loadLogs();
}

async function loadLogs() {
  const type = document.getElementById("filterType").value;
  const keyword = document.getElementById("searchBox").value;

  const q = query(
    collection(db, "logs"),
    orderBy("timestamp", "desc"),
    limit(200)
  );

  const snap = await getDocs(q);
  const table = document.getElementById("logsTable");

  table.innerHTML = snap.docs
    .map(doc => {
      const d = doc.data();

      // 種類フィルタ
      if (type && d.type !== type) return "";

      // キーワード検索
      const text = JSON.stringify(d);
      if (keyword && !text.includes(keyword)) return "";

      return `
        <tr>
          <td>${d.type}</td>
          <td>${d.userId ?? ""}</td>
          <td>${d.action ?? ""}</td>
          <td>${d.detail ?? ""}</td>
          <td>${d.timestamp?.toDate().toLocaleString() ?? ""}</td>
        </tr>
      `;
    })
    .join("");
}
