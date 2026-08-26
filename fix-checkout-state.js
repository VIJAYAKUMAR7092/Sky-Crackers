const fs = require('fs');
const p = 'lib/services/public/checkout.service.ts';
let code = fs.readFileSync(p, 'utf8');

const replacement = `    let deliveryCharge = 0;
    let assignedCourier = 'Mettur Transports (MSS)';

    // Find state-level minimum order
    let stateMinOrder = 5000;
    const settings = await prisma.websiteSettings.findUnique({ where: { id: "global" } });
    if (settings?.defaultMinOrder) stateMinOrder = Number(settings.defaultMinOrder);
    
    if (data.address.state) {
      const stateZone = await prisma.deliveryZone.findFirst({
        where: { state: data.address.state, active: true }
      });
      if (stateZone) {
        stateMinOrder = Number(stateZone.minimumOrder);
      }
    }

    if (subtotal < stateMinOrder) {
      throw new AppError(\`Minimum order amount for \${data.address.state || 'your area'} is ?\${stateMinOrder}\`, 'MINIMUM_ORDER_NOT_MET', 400);
    }

    try {
      const zone = await getDeliveryByPincode(data.address.pincode);
      if (zone && zone.courier) {
        assignedCourier = zone.courier;
      }
      deliveryCharge = await calculateShipping(data.address.pincode, subtotal);
    } catch (error: any) {
      // If pincode fails, fallback to 0 (user requested no default 300)
      deliveryCharge = 0;
    }`;

code = code.replace(/let deliveryCharge = 0;[\s\S]*?deliveryCharge = 0;\r?\n\s*\}/, replacement);

fs.writeFileSync(p, code);
console.log('Fixed checkout to check state min order');
