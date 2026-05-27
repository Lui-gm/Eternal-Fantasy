// pages/maintenance.js
import { db } from "../../js/firebase.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function loadPage(main) {
  main.innerHTML = `
    <h2>メンテナンス管理</h2>

    <div style="margin-top:20px; padding:20px; background:white; border-radius:8px;">

      <label>メンテナンスモード</label><br>
      <select id="mode" style="padding:8px; width:200px; margin-top:5px;">
        <option value="none">none（通常）</option>
        <option value="soft">soft（部分メンテ）</option>
        <option value="hard">hard（ログイン不可）</option>
        <option value="emergency">emergency（緊急遮断）</option>
      </select>

      <br><br>

      <label>ユーザー向けメッセージ</label><br>
      <textarea id="message" style="width:100%; height:80px; margin-top:5px;"></textarea>

      <br><br>

      <label>終了予定時刻</label><br>
      <input id="expectedEnd" type="datetime-local" style="padding:8px; margin-top:5px;">

      <br><br>

      <label>内部メモ（reason）</label><br>
      <textarea id="reason" style="width:100%; height:60px; margin-top:5px;"></textarea>

      <br><br>

      <h3>機能別メンテ設定</h3>

      <label><input type="checkbox" id="f_market"> マーケット</label><br>
      <label><input type="checkbox" id="f_guild"> ギルド</label><br>
      <label><input type="checkbox" id="f_raid"> レイド</label><br>
      <label><input type="checkbox" id="f_pvp"> PvP</label><br>

      <br>

      <button id="saveBtn" style="
        padding:10px 20px; background:#007bff; color:white;
        border:none; border-radius:6px; cursor:pointer;">
        更新する
      </button>

      <div id="status" style="margin-top:20px; color:#555;"></div>
    </div>
  `;

  // Firestore から現在の設定を読み込み
  const ref = doc(db, "system", "maintenance");
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data();

    document.getElementById("mode").value = data.mode ?? "none";
    document.getElementById("message").value = data.message ?? "";
    document.getElementById("reason").value = data.reason ?? "";
    document.getElementById("expectedEnd").value =
      data.expectedEnd ? data.expectedEnd.replace("Z", "") : "";

    // ★ 機能別メンテフラグを反映
    const f = data.features ?? {};
    document.getElementById("f_market").checked = f.market ?? true;
    document.getElementById("f_guild").checked = f.guild ?? true;
    document.getElementById("f_raid").checked = f.raid ?? true;
    document.getElementById("f_pvp").checked = f.pvp ?? true;

    document.getElementById("status").innerHTML = `
      <b>現在の状態：</b> ${data.mode}<br>
      <b>最終更新：</b> ${data.updatedBy ?? "不明"}<br>
      <b>更新時刻：</b> ${new Date(data.updatedAt).toLocaleString()}
    `;
  }

  // 保存処理
  document.getElementById("saveBtn").addEventListener("click", async () => {
    const mode = document.getElementById("mode").value;
    const message = document.getElementById("message").value;
    const reason = document.getElementById("reason").value;
    const expectedEnd = document.getElementById("expectedEnd").value;

    // ★ 機能別メンテフラグを Firestore に保存
    const features = {
      market: document.getElementById("f_market").checked,
      guild: document.getElementById("f_guild").checked,
      raid: document.getElementById("f_raid").checked,
      pvp: document.getElementById("f_pvp").checked
    };

    await setDoc(ref, {
      mode,
      message,
      reason,
      expectedEnd,
      updatedAt: Date.now(),
      updatedBy: "紬稀",
      features
    });

    document.getElementById("status").innerHTML = `
      <b>更新しました。</b><br>
      <b>現在の状態：</b> ${mode}<br>
      <b>最終更新：</b> 紬稀<br>
      <b>更新時刻：</b> ${new Date().toLocaleString()}
    `;
  });
}
