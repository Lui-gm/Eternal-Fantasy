function startRealtimeListener() {
  const q = query(
    collection(db, "logs"),
    where("timestamp", ">=", new Date(0)),   // ← これが最強の回避策
    orderBy("timestamp", "desc"),
    limit(200)
  );

  onSnapshot(q, (snap) => {
    logsCache = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderLogs();
  });
}
