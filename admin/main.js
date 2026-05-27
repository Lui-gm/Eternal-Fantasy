// ===============================
// 管理画面：ページ切替（認証なし）
// ===============================

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

  // ページ固有の初期化
  if (typeof page.init === "function") {
    page.init();
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
