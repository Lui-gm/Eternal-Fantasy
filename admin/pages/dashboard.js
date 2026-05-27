export const html = `
  <h2>ダッシュボード</h2>
  <p>ようこそ、Admin。</p>
  <p>ここでは管理画面の概要を確認できます。</p>
`;

export function loadPage(main) {
  main.innerHTML = html;
}
