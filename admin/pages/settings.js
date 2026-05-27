export const html = `
  <h2>設定</h2>

  <div style="
    background:white; padding:20px; border-radius:12px;
    box-shadow:0 4px 12px rgba(0,0,0,0.1); width:400px;">

    <label>テーマ選択</label><br>
    <select id="themeSelect" style="
      width:100%; padding:10px; border-radius:8px; border:1px solid #ccc;">
      <option value="light">ライト</option>
      <option value="dark">ダーク</option>
    </select>

    <p id="settingsStatus" style="margin-top:10px; color:#555;"></p>
  </div>
`;

export function loadPage(main) {
  main.innerHTML = html;

  document.getElementById("themeSelect").addEventListener("change", () => {
    document.getElementById("settingsStatus").innerText =
      "※ テーマ変更は未実装（必要なら後で追加可能）";
  });
}
