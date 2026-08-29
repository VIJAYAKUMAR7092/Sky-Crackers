const fs = require('fs');
let code = fs.readFileSync('app/(store)/checkout/CheckoutClient.tsx', 'utf8');

code = code.replace(
  "if (!res.ok) throw new Error(data.error || 'Failed to place order');",
  "if (!res.ok) throw new Error(data.error?.message || (typeof data.error === 'string' ? data.error : 'Failed to place order'));"
);

fs.writeFileSync('app/(store)/checkout/CheckoutClient.tsx', code);
