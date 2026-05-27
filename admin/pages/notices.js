export const html = `
  <h2>通知送信</h2>

  <div style="
    background:white; padding:20px; border-radius:12px;
    box-shadow:0 4px 12px rgba(0,0,0,0.1); width:500px;">

    <label>タイトル</label><br>
    <input id="noticeTitle" type="text" style="
      width:100%; padding:10px; border-radius:8px; border:1px solid #ccc;"><br><br>

    <label>本文</label><br>
    <textarea id="noticeBody" style="
      width:100%; height:150px; padding:10px; border-radius:8px; border:1px solid #ccc;"></textarea><br><br>

    <button id="sendNoticeBtn" style="
      padding:10px 20px; background:#007bff; color:white;
      border:none; border-radius:8px; cursor:pointer;">
      通知を送信
    </button>

    <p id="noticeStatus" style="margin-top:10px; color:#555;"></p>
  </div>
`;

export function loadPage(main) {
  main.innerHTML = html;

  document.getElementById("sendNoticeBtn").addEventListener("click", () => {
    document.getElementById("noticeStatus").innerText =
      "※ 通知送信機能は未実装（Firestore Console で管理）";
  });
}
