const fs = require('fs');
let code = fs.readFileSync('app/api/checkout/route.ts', 'utf8');

code = code.replace(
  "require('fs').writeFileSync('checkout-error.log', String(error?.stack || error));",
  "// Removed fs.writeFileSync because Vercel is read-only"
);

fs.writeFileSync('app/api/checkout/route.ts', code);
