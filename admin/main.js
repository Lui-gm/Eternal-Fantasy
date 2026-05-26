// /admin/main.js

import * as logsPage from "./pages/logs.js";   // ← これを追加（静的 import）

const main = document.getElementById("main");

// メニュークリックでページ切り替え
document.querySelectorAll("li[data-page]").forEach(item => {
  item.onclick = async () => {
    const page = item.dataset.page;

    if (page === "logs") {
      logsPage.loadPage(main);   // ← 動的 import を使わない
      return;
    }

    const module = await import(`./pages/${page}.js`);
    module.loadPage(main);
  };
});

// 初期表示（ダッシュボード）
(async () => {
  const module = await import("./pages/dashboard.js");
  module.loadPage(main);
})();
