const fs = require('fs');

const p2 = 'lib/services/public/checkout.service.ts';
let c2 = fs.readFileSync(p2, 'utf8');
c2 = c2.replace("is ?${stateMinOrder}`", "is ?${stateMinOrder}`");
fs.writeFileSync(p2, c2);

console.log("Fixed checkout symbols");
