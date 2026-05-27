export const html = `
  <h2>メンテナンス</h2>

  <div style="
    background:white; padding:20px; border-radius:12px;
    box-shadow:0 4px 12px rgba(0,0,0,0.1); width:400px;">

    <p>メンテナンスモードの切り替えを行います。</p>

    <button id="startMaintenance" style="
      padding:10px 20px; background:#ff9800; color:white;
      border:none; border-radius:8px; cursor:pointer; margin-right:10px;">
      メンテ開始
    </button>

    <button id="stopMaintenance" style="
      padding:10px 20px; background:#4caf50; color:white;
      border:none; border-radius:8px; cursor:pointer;">
      メンテ終了
    </button>

    <p id="maintenanceStatus" style="margin-top:10px; color:#555;"></p>
  </div>
`;

export function loadPage(main) {
  main.innerHTML = html;

  document.getElementById("startMaintenance").addEventListener("click", () => {
    document.getElementById("maintenanceStatus").innerText =
      "※ メンテ開始機能は未実装（Firestore Console で管理）";
  });

  document.getElementById("stopMaintenance").addEventListener("click", () => {
    document.getElementById("maintenanceStatus").innerText =
      "※ メンテ終了機能は未実装（Firestore Console で管理）";
  });
}
