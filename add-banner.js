const fs = require('fs');
let code = fs.readFileSync('prisma/schema.prisma', 'utf8');

const newModel = `
model TopBanner {
  id        String   @id @default(cuid())
  text      String
  isActive  Boolean  @default(true)
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`;

if (!code.includes('model TopBanner')) {
  code += newModel;
  fs.writeFileSync('prisma/schema.prisma', code);
  console.log("Added TopBanner model");
} else {
  console.log("TopBanner already exists");
}
