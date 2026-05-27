export const html = `
  <h2>デバッグ</h2>
  <p>開発用のデバッグツールです。</p>

  <button id="testBtn">テスト実行</button>

  <pre id="debugOutput"></pre>
`;

export function loadPage(main) {
  main.innerHTML = html;

  document.getElementById("testBtn").addEventListener("click", () => {
    document.getElementById("debugOutput").innerText = "（デバッグ機能は未実装）";
  });
}
