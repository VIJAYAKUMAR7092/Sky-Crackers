const fs = require('fs');

let code = fs.readFileSync('app/(store)/checkout/CheckoutClient.tsx', 'utf8');

// Replace signature
code = code.replace(
  'export default function CheckoutPage() {',
  'interface CheckoutClientProps { defaultMinOrder: number; deliveryZones: Array<{ state: string | null; minimumOrder: number; }>; }\nexport default function CheckoutClient({ defaultMinOrder, deliveryZones }: CheckoutClientProps) {'
);

// Add dynamic minOrder calculation
const calcCode = `
  const getMinOrder = () => {
    if (!formData.state) return defaultMinOrder;
    const zone = deliveryZones.find(z => z.state && z.state.toLowerCase() === formData.state.toLowerCase());
    return zone ? Number(zone.minimumOrder) : defaultMinOrder;
  };
  const minOrder = getMinOrder();
`;
code = code.replace(
  'const subtotal = getSubtotal();',
  'const subtotal = getSubtotal();' + calcCode
);

// Replace 3000
code = code.replace(/subtotal < 3000/g, 'subtotal < minOrder');
code = code.replace(/"Minimum Order Rs\. 3000"/g, '`Minimum Order Rs. ${minOrder}`');
code = code.replace(/'Minimum Order Rs\. 3000'/g, '`Minimum Order Rs. ${minOrder}`');

fs.writeFileSync('app/(store)/checkout/CheckoutClient.tsx', code);
