export const html = `
  <h2>デバッグツール</h2>

  <div style="
    background:white; padding:20px; border-radius:12px;
    box-shadow:0 4px 12px rgba(0,0,0,0.1); width:500px;">

    <button id="testBtn" style="
      padding:10px 20px; background:#9c27b0; color:white;
      border:none; border-radius:8px; cursor:pointer;">
      テスト実行
    </button>

    <pre id="debugOutput" style="
      margin-top:20px; background:#f0f0f0; padding:15px;
      border-radius:8px; height:150px; overflow:auto;"></pre>
  </div>
`;

export function loadPage(main) {
  main.innerHTML = html;

  document.getElementById("testBtn").addEventListener("click", () => {
    document.getElementById("debugOutput").innerText =
      "※ デバッグ機能は未実装（必要なら後で追加可能）";
  });
}
