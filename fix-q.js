const fs = require('fs');
const p1 = 'app/admin/(dashboard)/minimum-order/MinimumOrderClient.tsx';
let c1 = fs.readFileSync(p1, 'utf8');

c1 = c1.replace('Current Minimum Order (?)', 'Current Minimum Order (?)');
c1 = c1.replace('<span className="text-muted-foreground">?</span>', '<span className="text-muted-foreground">?</span>');

fs.writeFileSync(p1, c1);
console.log("Done");
