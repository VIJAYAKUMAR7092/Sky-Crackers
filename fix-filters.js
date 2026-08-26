const fs = require('fs');
const paths = [
  'app/admin/(dashboard)/orders/components/OrdersClient.tsx',
  'app/admin/(dashboard)/products/components/ProductClient.tsx',
  'app/admin/(dashboard)/categories/components/CategoryClient.tsx',
  'app/admin/(dashboard)/customers/components/CustomersClient.tsx',
  'app/admin/(dashboard)/delivery/components/DeliveryClient.tsx',
  'app/admin/(dashboard)/coupons/components/CouponsClient.tsx'
];
for (const p of paths) {
  try {
    let code = fs.readFileSync(p, 'utf8');
    code = code.replace(/const params = new URLSearchParams\(searchParams as Record<string, string>\);/g, "const params = new URLSearchParams(searchParamsHook.toString());");
    fs.writeFileSync(p, code);
    console.log('Updated ' + p);
  } catch (err) {
    console.log('Failed on ' + p + ': ' + err.message);
  }
}
