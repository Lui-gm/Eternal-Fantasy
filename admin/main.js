// /admin/main.js

const main = document.getElementById("main");

// メニュークリックでページ切り替え
document.querySelectorAll("li[data-page]").forEach(item => {
  item.onclick = async () => {
    const page = item.dataset.page;
    const module = await import(`./pages/${page}.js`);
    module.loadPage(main);
  };
});

// 初期表示（ダッシュボード）
(async () => {
  const module = await import("./pages/dashboard.js");
  module.loadPage(main);
})();
