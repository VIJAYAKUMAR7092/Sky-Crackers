const fs = require('fs');
let code = fs.readFileSync('app/api/checkout/route.ts', 'utf8');

code = code.replace(
  'return errorResponse("Failed to process order", "SERVER_ERROR", 500);',
  'return errorResponse(error?.message || "Failed to process order", "SERVER_ERROR", 500);'
);

fs.writeFileSync('app/api/checkout/route.ts', code);
