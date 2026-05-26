import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUserById
} from "../services/users.js";

export async function loadPage(main) {

  main.innerHTML = `
    <h1>ユーザー管理</h1>
    <button id="addUserBtn">＋ 新規ユーザー追加</button>

    <table border="1" cellpadding="8" style="margin-top:20px; width:100%;">
      <thead>
        <tr>
          <th>名前</th>
          <th>レベル</th>
          <th>経験値</th>
          <th>BAN</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody id="usersTable"></tbody>
    </table>

    <div id="userForm" style="display:none; margin-top:20px;">
      <h2 id="formTitle">新規ユーザー</h2>

      <input id="userName" placeholder="名前"><br><br>
      <input id="userLevel" type="number" placeholder="レベル"><br><br>
      <input id="userExp" type="number" placeholder="経験値"><br><br>
      <label><input type="checkbox" id="userBanned"> BAN</label><br><br>

      <button id="saveUserBtn">保存</button>
      <button id="cancelUserBtn">キャンセル</button>
    </div>
  `;

  const table = document.getElementById("usersTable");
  const users = await getAllUsers();

  table.innerHTML = users.map(u => `
    <tr>
      <td>${u.name ?? ""}</td>
      <td>${u.level ?? 1}</td>
      <td>${u.exp ?? 0}</td>
      <td>${u.banned ? "✔" : ""}</td>
      <td>
        <button data-id="${u.id}" class="editUser">編集</button>
        <button data-id="${u.id}" class="deleteUser">削除</button>
      </td>
    </tr>
  `).join("");

  // フォーム開閉
  function openForm(user = null) {
    const form = document.getElementById("userForm");
    form.style.display = "block";

    document.getElementById("formTitle").innerText = user ? "ユーザー編集" : "新規ユーザー";

    document.getElementById("userName").value = user?.name || "";
    document.getElementById("userLevel").value = user?.level || 1;
    document.getElementById("userExp").value = user?.exp || 0;
    document.getElementById("userBanned").checked = user?.banned || false;

    document.getElementById("saveUserBtn").onclick = async () => {
      const data = {
        name: document.getElementById("userName").value,
        level: Number(document.getElementById("userLevel").value),
        exp: Number(document.getElementById("userExp").value),
        banned: document.getElementById("userBanned").checked
      };

      if (user) {
        await updateUser(user.id, data);
      } else {
        await addUser(data);
      }

      loadPage(main);
    };

    document.getElementById("cancelUserBtn").onclick = () => {
      form.style.display = "none";
    };
  }

  // イベント登録
  document.getElementById("addUserBtn").onclick = () => openForm();

  document.querySelectorAll(".editUser").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const user = users.find(u => u.id === id);
      openForm(user);
    };
  });

  document.querySelectorAll(".deleteUser").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      if (confirm("削除しますか？")) {
        await deleteUserById(id);
        loadPage(main);
      }
    };
  });
}
