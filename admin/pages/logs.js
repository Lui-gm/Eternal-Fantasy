// admin/pages/logs.js

// 認証・db は auth.js 経由で取得
import { db } from "../auth.js";

// Firestore の操作関数だけここで import
import {
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let logsCache = [];

/**
 * admin.html から呼ばれるエントリポイント
 * window.loadPage("logs") → import("./pages/logs.js") → loadPage(main)
 */
export function loadPage(main) {
  main.innerHTML = `
    <h2>ログ閲覧</h2>

    <div style="margin-bottom: 10px;">
      <input
        id="logSearch"
        placeholder="検索ワード"
        style="padding: 6px; width: 240px; max-width: 100%;"
      >
    </div>

    <div id="logs"></div>
  `;

  const searchInput = document.getElementById("logSearch");
  searchInput.addEventListener("input", renderLogs);

  startRealtimeListener();
}

/**
 * Firestore の logs コレクションをリアルタイム監視
 * ※ timestamp が無い前提なので、orderBy / where は使わない
 */
function startRealtimeListener() {
  const ref = collection(db, "logs");

  onSnapshot(
    ref,
    (snap) => {
      logsCache = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      renderLogs();
    },
    (error) => {
      console.error("logs onSnapshot error:", error);
      const el = document.getElementById("logs");
      if (el) {
        el.innerHTML = `<div style="color:red;">ログ取得中にエラーが発生しました。</div>`;
      }
    }
  );
}

/**
 * 検索キーワードに応じて logsCache をフィルタして描画
 */
function renderLogs() {
  const el = document.getElementById("logs");
  if (!el) return;

  const searchInput = document.getElementById("logSearch");
  const keyword = (searchInput?.value || "").toLowerCase().trim();

  const filtered = logsCache.filter((log) =>
    JSON.stringify(log).toLowerCase().includes(keyword)
  );

  if (filtered.length === 0) {
    el.innerHTML = `<div>該当するログはありません。</div>`;
    return;
  }

  el.innerHTML = filtered
    .map(
      (log) => `
      <div
        style="
          padding: 8px;
          margin-bottom: 6px;
          background: #fff;
          border-radius: 6px;
          border-left: 4px solid #4da3ff;
          font-size: 13px;
          line-height: 1.4;
          word-break: break-all;
        "
      >
        <div><b>ID:</b> ${escapeHtml(log.id)}</div>
        <div><b>内容:</b></div>
        <pre style="margin: 4px 0 0; white-space: pre-wrap;">${escapeHtml(
          JSON.stringify(log, null, 2)
        )}</pre>
      </div>
    `
    )
    .join("");
}

/**
 * XSS 対策用のエスケープ
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
