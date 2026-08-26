const fs = require('fs');
const p = 'lib/services/public/checkout.service.ts';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  /if \(error instanceof AppError && error\.code === 'MINIMUM_ORDER_NOT_MET'\) throw error;\n\s*\/\/ If pincode fails, fallback to 0.*/g,
  `if (error instanceof AppError && error.code === 'MINIMUM_ORDER_NOT_MET') throw error;
      if (subtotal < 5000) {
        throw new AppError('Minimum order amount is ?5000', 'MINIMUM_ORDER_NOT_MET', 400);
      }
      // If pincode fails, fallback to 0 (user requested no default 300)
      deliveryCharge = 0;`
);

fs.writeFileSync(p, code);
console.log('Fixed checkout service for fallback');
