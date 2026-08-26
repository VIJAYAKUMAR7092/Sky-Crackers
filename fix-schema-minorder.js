const fs = require('fs');
let code = fs.readFileSync('prisma/schema.prisma', 'utf8');
code = code.replace(
  'comboValidUpto String?\n  createdAt      DateTime',
  'comboValidUpto String?\n  defaultMinOrder Decimal @default(5000) @db.Decimal(10, 2)\n  createdAt      DateTime'
);
code = code.replace(
  'comboValidUpto String?\r\n  createdAt      DateTime',
  'comboValidUpto String?\r\n  defaultMinOrder Decimal @default(5000) @db.Decimal(10, 2)\r\n  createdAt      DateTime'
);
fs.writeFileSync('prisma/schema.prisma', code);
