export const html = `
  <h2>メンテナンス</h2>
  <p>メンテナンスモードの切り替えを行います。</p>

  <button id="startMaintenance">メンテナンス開始</button>
  <button id="stopMaintenance">メンテナンス終了</button>

  <p id="maintenanceStatus"></p>
`;

export function loadPage(main) {
  main.innerHTML = html;

  document.getElementById("startMaintenance").addEventListener("click", () => {
    document.getElementById("maintenanceStatus").innerText = "（メンテ開始機能は未実装）";
  });

  document.getElementById("stopMaintenance").addEventListener("click", () => {
    document.getElementById("maintenanceStatus").innerText = "（メンテ終了機能は未実装）";
  });
}
