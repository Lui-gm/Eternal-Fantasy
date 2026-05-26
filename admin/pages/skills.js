// /admin/pages/skills.js
import { getAllSkills, addSkill, updateSkill, deleteSkill } from "../services/skills.js";

export async function loadPage(main) {
  main.innerHTML = `
    <h1>スキル管理</h1>
    <button id="addSkillBtn">＋ 新規スキル追加</button>

    <table border="1" cellpadding="8" style="margin-top:20px; width:100%;">
      <thead>
        <tr>
          <th>名前</th>
          <th>威力</th>
          <th>コスト</th>
          <th>属性</th>
          <th>説明</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody id="skillsTable"></tbody>
    </table>

    <div id="skillForm" style="display:none; margin-top:20px;">
      <h2 id="formTitle">新規スキル</h2>
      <input id="skillName" placeholder="名前"><br><br>
      <input id="skillPower" type="number" placeholder="威力"><br><br>
      <input id="skillCost" type="number" placeholder="コスト"><br><br>
      <input id="skillElement" placeholder="属性 (fire / water / wind / earth)"><br><br>
      <textarea id="skillDesc" placeholder="説明"></textarea><br><br>
      <button id="saveSkillBtn">保存</button>
      <button id="cancelSkillBtn">キャンセル</button>
    </div>
  `;

  const table = document.getElementById("skillsTable");
  const skills = await getAllSkills();

  table.innerHTML = skills.map(s => `
    <tr>
      <td>${s.name ?? ""}</td>
      <td>${s.power ?? ""}</td>
      <td>${s.cost ?? ""}</td>
      <td>${s.element ?? ""}</td>
      <td>${s.description ?? ""}</td>
      <td>
        <button data-id="${s.id}" class="editSkill">編集</button>
        <button data-id="${s.id}" class="deleteSkill">削除</button>
      </td>
    </tr>
  `).join("");

  document.getElementById("addSkillBtn").onclick = () => openForm();

  document.querySelectorAll(".editSkill").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const skill = skills.find(s => s.id === id);
      openForm(skill);
    };
  });

  document.querySelectorAll(".deleteSkill").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      if (confirm("削除しますか？")) {
        await deleteSkill(id);
        loadPage(main);
      }
    };
  });

  function openForm(skill = null) {
    const form = document.getElementById("skillForm");
    form.style.display = "block";
    document.getElementById("formTitle").innerText = skill ? "スキル編集" : "新規スキル";

    document.getElementById("skillName").value = skill?.name || "";
    document.getElementById("skillPower").value = skill?.power || "";
    document.getElementById("skillCost").value = skill?.cost || "";
    document.getElementById("skillElement").value = skill?.element || "";
    document.getElementById("skillDesc").value = skill?.description || "";

    document.getElementById("saveSkillBtn").onclick = async () => {
      const data = {
        name: document.getElementById("skillName").value,
        power: Number(document.getElementById("skillPower").value),
        cost: Number(document.getElementById("skillCost").value),
        element: document.getElementById("skillElement").value,
        description: document.getElementById("skillDesc").value
      };

      if (skill) {
        await updateSkill(skill.id, data);
      } else {
        await addSkill(data);
      }
      loadPage(main);
    };

    document.getElementById("cancelSkillBtn").onclick = () => {
      form.style.display = "none";
    };
  }
}
