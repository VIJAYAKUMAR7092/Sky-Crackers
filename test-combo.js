fetch("http://localhost:3000/api/admin/combos/validity", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ validUpto: "25TH AUGUST" })
}).then(r => r.json()).then(console.log).catch(console.error);
