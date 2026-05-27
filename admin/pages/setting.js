export const html = `
  <h2>設定</h2>
  <p>管理画面の設定を行います。</p>

  <label>テーマ</label><br>
  <select id="themeSelect">
    <option value="light">ライト</option>
    <option value="dark">ダーク</option>
  </select>

  <p id="settingsStatus"></p>
`;

export function loadPage(main) {
  main.innerHTML = html;

  document.getElementById("themeSelect").addEventListener("change", () => {
    document.getElementById("settingsStatus").innerText = "（テーマ変更は未実装）";
  });
}
