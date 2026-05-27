export const html = `
  <h2>通知送信</h2>
  <p>ゲーム内ユーザーへ通知を送信します。</p>

  <label>タイトル</label><br>
  <input id="noticeTitle" type="text" style="width:300px;"><br><br>

  <label>本文</label><br>
  <textarea id="noticeBody" style="width:300px;height:120px;"></textarea><br><br>

  <button id="sendNoticeBtn">送信</button>

  <p id="noticeStatus"></p>
`;

export function loadPage(main) {
  main.innerHTML = html;

  document.getElementById("sendNoticeBtn").addEventListener("click", () => {
    document.getElementById("noticeStatus").innerText = "（通知送信機能は未実装）";
  });
}
