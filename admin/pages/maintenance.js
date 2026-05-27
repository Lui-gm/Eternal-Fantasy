import { db } from "../../js/firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export function loadPage(main) {
  main.innerHTML = `
    <h2>メンテナンス管理</h2>

    <div style="
      background:white; padding:20px; border-radius:12px;
      box-shadow:0 4px 12px rgba(0,0,0,0.1); width:500px;">

      <label>メンテナンス開始時刻</label><br>
      <input id="startAt" type="datetime-local" style="width:100%; padding:10px;"><br><br>

      <label>メンテナンス終了予定時刻</label><br>
      <input id="endAt" type="datetime-local" style="width:100%; padding:10px;"><br><br>

      <label>メンテナンス内容</label><br>
      <textarea id="message" style="
        width:100%; height:120px; padding:10px; border-radius:8px; border:1px solid #ccc;"></textarea><br><br>

      <button id="manualStart" style="
        padding:10px 20px; background:#ff9800; color:white;
        border:none; border-radius:8px; cursor:pointer; margin-right:10px;">
        手動メンテ開始
      </button>

      <button id="manualEnd" style="
        padding:10px 20px; background:#4caf50; color:white;
        border:none; border-radius:8px; cursor:pointer;">
        手動メンテ終了
      </button>

      <p id="maintenanceStatus" style="margin-top:15px; color:#555;"></p>
    </div>
  `;

  const status = document.getElementById("maintenanceStatus");

  document.getElementById("manualStart").addEventListener("click", async () => {
    const start = new Date(document.getElementById("startAt").value).getTime();
    const end = new Date(document.getElementById("endAt").value).getTime();
    const msg = document.getElementById("message").value;

    await setDoc(doc(db, "system", "maintenance"), {
      active: true,
      manual: true,
      startAt: start || Date.now(),
      endAt: end || null,
      message: msg || "メンテナンス中です"
    });

    status.innerText = "手動メンテナンスを開始しました。";
  });

  document.getElementById("manualEnd").addEventListener("click", async () => {
    await setDoc(doc(db, "system", "maintenance"), {
      active: false,
      manual: false,
      endAt: Date.now(),
      message: ""
    });

    status.innerText = "メンテナンスを終了しました。";
  });
}
