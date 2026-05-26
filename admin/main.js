function startRealtimeListener() {
  const ref = collection(db, "logs");  // ← query() すら不要

  onSnapshot(ref, (snap) => {
    logsCache = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderLogs();
  });
}
