const fs = require('fs');
let code = fs.readFileSync('prisma/schema.prisma', 'utf8');

code = code.replace(
  'priceListUrl String?\n  createdAt    DateTime',
  'priceListUrl String?\n  comboValidUpto String?\n  defaultMinOrder Decimal @default(5000) @db.Decimal(10, 2)\n  createdAt    DateTime'
);
code = code.replace(
  'priceListUrl String?\r\n  createdAt    DateTime',
  'priceListUrl String?\r\n  comboValidUpto String?\r\n  defaultMinOrder Decimal @default(5000) @db.Decimal(10, 2)\r\n  createdAt    DateTime'
);

code = code.replace(
  'freeDeliveryThreshold Decimal? @db.Decimal(10, 2)\n  estimatedTime',
  'freeDeliveryThreshold Decimal? @db.Decimal(10, 2)\n  minimumOrder Decimal @default(5000) @db.Decimal(10, 2)\n  estimatedTime'
);
code = code.replace(
  'freeDeliveryThreshold Decimal? @db.Decimal(10, 2)\r\n  estimatedTime',
  'freeDeliveryThreshold Decimal? @db.Decimal(10, 2)\r\n  minimumOrder Decimal @default(5000) @db.Decimal(10, 2)\r\n  estimatedTime'
);

fs.writeFileSync('prisma/schema.prisma', code);
console.log('Fixed schema');
