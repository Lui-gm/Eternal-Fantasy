import { db } from "../utils/firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * ログ書き込み
 * @param {string} type - ログの種類 (admin_action, login, error など)
 * @param {object} data - 任意の追加情報
 */
export async function writeLog(type, data = {}) {
  try {
    await addDoc(collection(db, "logs"), {
      type,
      ...data,
      timestamp: serverTimestamp()
    });
  } catch (e) {
    console.error("ログ書き込みエラー:", e);
  }
}
