// ===============================
// 管理画面：ページ切替（Firestore 対応版）
// ===============================

// Firebase 初期化（Auth + Firestore）
import { db } from "../js/firebase.js";

// ページモジュール読み込み
import * as dashboard from "./pages/dashboard.js";
import * as logs from "./pages/logs.js";
import * as users from "./pages/users.js";
import * as weapons from "./pages/weapons.js";
import * as skills from "./pages/skills.js";

const main = document.getElementById("main");

// ページ一覧
const pages = {
  dashboard,
  logs,
  users,
  weapons,
  skills
};

// -------------------------------
// ページ切替（navigate）
// -------------------------------
export function navigate(pageName) {
  const page = pages[pageName];

  if (!page) {
    console.error("ページが存在しません:", pageName);
    return;
  }

  // HTML差し替え
  main.innerHTML = page.html;

  // ページ固有の初期化（db を渡す）
  if (typeof page.init === "function") {
    page.init(db);
  }
}

// -------------------------------
// サイドバーのクリックイベント
// -------------------------------
document.querySelectorAll("[data-page]").forEach(btn => {
  btn.addEventListener("click", () => {
    navigate(btn.dataset.page);
  });
});

// -------------------------------
// 初期ページ
// -------------------------------
navigate("dashboard");
