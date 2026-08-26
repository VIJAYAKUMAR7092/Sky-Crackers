const fs = require('fs');
const p = 'lib/services/public/checkout.service.ts';
let code = fs.readFileSync(p, 'utf8');

const regex = /deliveryCharge = await calculateShipping\(data\.address\.pincode, subtotal\);\r?\n\s*\} catch \(error: any\) \{\r?\n\s*\/\/ If pincode fails, fallback to 0 \(user requested no default 300\)\r?\n\s*deliveryCharge = 0;\r?\n\s*\}/;

const replacement = `      deliveryCharge = await calculateShipping(data.address.pincode, subtotal);
    if (zone && subtotal < Number(zone.minimumOrder)) {
      throw new AppError(\`Minimum order amount for your area is ?\${Number(zone.minimumOrder)}\`, 'MINIMUM_ORDER_NOT_MET', 400);
    }
  } catch (error: any) {
    if (error instanceof AppError && error.code === 'MINIMUM_ORDER_NOT_MET') throw error;
    if (subtotal < 5000) {
      throw new AppError('Minimum order amount is ?5000', 'MINIMUM_ORDER_NOT_MET', 400);
    }
    // If pincode fails, fallback to 0 (user requested no default 300)
    deliveryCharge = 0;
  }`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync(p, code);
  console.log('Fixed checkout service');
} else {
  console.log('Regex did not match!');
}
