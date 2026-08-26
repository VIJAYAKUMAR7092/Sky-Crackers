const fs = require('fs');

// Fix MinimumOrderClient.tsx
const p1 = 'app/admin/(dashboard)/minimum-order/MinimumOrderClient.tsx';
let c1 = fs.readFileSync(p1, 'utf8');
c1 = c1.replace('<span className="text-muted-foreground">?</span>', '<span className="text-muted-foreground">?</span>');
fs.writeFileSync(p1, c1);

// Fix checkout.service.ts
const p2 = 'lib/services/public/checkout.service.ts';
let c2 = fs.readFileSync(p2, 'utf8');
c2 = c2.replace(/is \?\$\{stateMinOrder\}/g, 'is ?${stateMinOrder}');
fs.writeFileSync(p2, c2);

console.log("Fixed symbols");
