// /admin/pages/weapons.js
import { getAllWeapons, addWeapon, updateWeapon, deleteWeapon } from "../services/weapons.js";

export async function loadPage(main) {
  main.innerHTML = `
    <h1>武器管理</h1>
    <button id="addWeaponBtn">＋ 新規武器追加</button>

    <table border="1" cellpadding="8" style="margin-top:20px; width:100%;">
      <thead>
        <tr>
          <th>名前</th>
          <th>攻撃力</th>
          <th>属性</th>
          <th>レア度</th>
          <th>説明</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody id="weaponsTable"></tbody>
    </table>

    <div id="weaponForm" style="display:none; margin-top:20px;">
      <h2 id="weaponFormTitle">新規武器</h2>
      <input id="weaponName" placeholder="名前"><br><br>
      <input id="weaponAtk" type="number" placeholder="攻撃力"><br><br>
      <input id="weaponElement" placeholder="属性 (fire / water / wind / earth)"><br><br>
      <input id="weaponRarity" placeholder="レア度 (N / R / SR / SSR)"><br><br>
      <textarea id="weaponDesc" placeholder="説明"></textarea><br><br>
      <button id="saveWeaponBtn">保存</button>
      <button id="cancelWeaponBtn">キャンセル</button>
    </div>
  `;

  const table = document.getElementById("weaponsTable");
  const weapons = await getAllWeapons();

  table.innerHTML = weapons.map(w => `
    <tr>
      <td>${w.name}</td>
      <td>${w.atk}</td>
      <td>${w.element}</td>
      <td>${w.rarity}</td>
      <td>${w.description}</td>
      <td>
        <button data-id="${w.id}" class="editWeapon">編集</button>
        <button data-id="${w.id}" class="deleteWeapon">削除</button>
      </td>
    </tr>
  `).join("");

  document.getElementById("addWeaponBtn").onclick = () => openForm();

  document.querySelectorAll(".editWeapon").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const weapon = weapons.find(w => w.id === id);
      openForm(weapon);
    };
  });

  document.querySelectorAll(".deleteWeapon").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      if (confirm("削除しますか？")) {
        await deleteWeapon(id);
        loadPage(main);
      }
    };
  });

  function openForm(weapon = null) {
    const form = document.getElementById("weaponForm");
    form.style.display = "block";
    document.getElementById("weaponFormTitle").innerText = weapon ? "武器編集" : "新規武器";

    document.getElementById("weaponName").value = weapon?.name || "";
    document.getElementById("weaponAtk").value = weapon?.atk || "";
    document.getElementById("weaponElement").value = weapon?.element || "";
    document.getElementById("weaponRarity").value = weapon?.rarity || "";
    document.getElementById("weaponDesc").value = weapon?.description || "";

    document.getElementById("saveWeaponBtn").onclick = async () => {
      const data = {
        name: document.getElementById("weaponName").value,
        atk: Number(document.getElementById("weaponAtk").value),
        element: document.getElementById("weaponElement").value,
        rarity: document.getElementById("weaponRarity").value,
        description: document.getElementById("weaponDesc").value
      };

      if (weapon) {
        await updateWeapon(weapon.id, data);
      } else {
        await addWeapon(data);
      }
      loadPage(main);
    };

    document.getElementById("cancelWeaponBtn").onclick = () => {
      form.style.display = "none";
    };
  }
}
