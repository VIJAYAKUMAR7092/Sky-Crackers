const fs = require('fs');
let code = fs.readFileSync('app/admin/(dashboard)/combos/components/ComboClient.tsx', 'utf8');
code = code.replace(
  'await fetch("/api/admin/combos/validity", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ validUpto: dateValue }) });',
  'const res = await fetch("/api/admin/combos/validity", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ validUpto: dateValue }) });\n      if (!res.ok) throw new Error("API failed");'
);
fs.writeFileSync('app/admin/(dashboard)/combos/components/ComboClient.tsx', code);
