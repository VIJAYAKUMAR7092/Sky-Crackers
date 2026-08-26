const fs = require('fs');

const p2 = 'lib/services/public/checkout.service.ts';
let c2 = fs.readFileSync(p2, 'utf8');
c2 = c2.replace("AppError(`Minimum order amount for ${data.address.state || 'your area'} is ?${stateMinOrder}`", "AppError(`Minimum order amount for ${data.address.state || 'your area'} is ?${stateMinOrder}`");
fs.writeFileSync(p2, c2);

console.log("Fixed checkout symbols 3");
