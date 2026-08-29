const fs = require('fs');
let code = fs.readFileSync('lib/services/public/checkout.service.ts', 'utf8');

const oldLogic = `    // 5. Generate Order Reference
    const count = await tx.order.count();
    const orderReference = \`SC-\${new Date().getFullYear()}-\${String(count + 1001).padStart(4, '0')}\`;`;

const newLogic = `    // 5. Generate Order Reference safely
    const currentYear = new Date().getFullYear();
    const lastOrder = await tx.order.findFirst({
      where: { orderReference: { startsWith: \`SC-\${currentYear}-\` } },
      orderBy: { orderReference: 'desc' }
    });
    
    let nextNumber = 1001;
    if (lastOrder) {
      const parts = lastOrder.orderReference.split('-');
      if (parts.length === 3) {
        nextNumber = parseInt(parts[2], 10) + 1;
      }
    }
    const orderReference = \`SC-\${currentYear}-\${String(nextNumber).padStart(4, '0')}\`;`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('lib/services/public/checkout.service.ts', code);
