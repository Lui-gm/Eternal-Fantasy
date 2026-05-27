export const html = `
  <h2>ダッシュボード</h2>

  <div style="display:flex; gap:20px; flex-wrap:wrap;">

    <div style="
      width:260px; padding:20px; background:white; border-radius:12px;
      box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      <h3>オンライン状況</h3>
      <p>現在のオンラインユーザー数：<b>---</b></p>
    </div>

    <div style="
      width:260px; padding:20px; background:white; border-radius:12px;
      box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      <h3>サーバーステータス</h3>
      <p>稼働中：<span style="color:green;">●</span></p>
    </div>

    <div style="
      width:260px; padding:20px; background:white; border-radius:12px;
      box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      <h3>最新ログ</h3>
      <p>（ログ機能は無効化中）</p>
    </div>

  </div>
`;

export function loadPage(main) {
  main.innerHTML = html;
}
