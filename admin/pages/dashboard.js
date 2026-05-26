// /admin/pages/dashboard.js
import { getFirestore, collection, getCountFromServer, query, where, getDocs, orderBy, limit } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "../utils/firestore.js";

export async function loadPage(main) {
  const db = getFirestore(app);

  // Firestore 参照
  const usersRef = collection(db, "users");
  const logsRef = collection(db, "logs");
  const gachaRef = collection(db, "gacha_logs");
  const weaponsRef = collection(db, "weapons");
  const skillsRef = collection(db, "skills");

  // 総ユーザー数
  const totalUsersSnap = await getCountFromServer(usersRef);
  const totalUsers = totalUsersSnap.data().count;

  // 今日のログイン数
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayLoginQuery = query(logsRef, where("type", "==", "login"), where("timestamp", ">=", today));
  const todayLoginSnap = await getDocs(todayLoginQuery);
  const todayLogins = todayLoginSnap.size;

  // ガチャ回転数
  const gachaSnap = await getCountFromServer(gachaRef);
  const gachaCount = gachaSnap.data().count;

  // エラー件数
  const errorQuery = query(logsRef, where("type", "==", "error"));
  const errorSnap = await getDocs(errorQuery);
  const errorCount = errorSnap.size;

  // 最近追加された武器
  const latestWeaponsQuery = query(weaponsRef, orderBy("createdAt", "desc"), limit(5));
  const latestWeaponsSnap = await getDocs(latestWeaponsQuery);
  const latestWeapons = latestWeaponsSnap.docs.map(d => d.data());

  // 最近追加されたスキル
  const latestSkillsQuery = query(skillsRef, orderBy("createdAt", "desc"), limit(5));
  const latestSkillsSnap = await getDocs(latestSkillsQuery);
  const latestSkills = latestSkillsSnap.docs.map(d => d.data());

  // UI 描画
  main.innerHTML = `
    <h1>ダッシュボード</h1>

    <div style="display:flex; gap:20px; flex-wrap:wrap;">

      <div style="background:white; padding:20px; border-radius:8px; width:260px;">
        <h3>総ユーザー数</h3>
        <p style="font-size:28px; font-weight:bold;">${totalUsers}</p>
      </div>

      <div style="background:white; padding:20px; border-radius:8px; width:260px;">
        <h3>今日のログイン数</h3>
        <p style="font-size:28px; font-weight:bold;">${todayLogins}</p>
      </div>

      <div style="background:white; padding:20px; border-radius:8px; width:260px;">
        <h3>ガチャ回転数</h3>
        <p style="font-size:28px; font-weight:bold;">${gachaCount}</p>
      </div>

      <div style="background:white; padding:20px; border-radius:8px; width:260px;">
        <h3>エラー件数</h3>
        <p style="font-size:28px; font-weight:bold; color:red;">${errorCount}</p>
      </div>

    </div>

    <h2 style="margin-top:40px;">管理者ショートカット</h2>
    <button onclick="window.open('https://lui-gm.github.io/eternal-fantasy/?admin=true','_blank')"
      style="padding:10px 20px; background:#007bff; color:white; border:none; border-radius:6px; cursor:pointer;">
      管理者としてゲームにログイン
    </button>

    <h2 style="margin-top:40px;">最近追加された武器</h2>
    <ul>
      ${latestWeapons.map(w => `<li>${w.name}（${w.rarity}）</li>`).join("")}
    </ul>

    <h2 style="margin-top:40px;">最近追加されたスキル</h2>
    <ul>
      ${latestSkills.map(s => `<li>${s.name}（威力: ${s.power}）</li>`).join("")}
    </ul>
  `;
}
