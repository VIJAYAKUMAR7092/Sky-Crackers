const fs = require('fs');
let code = fs.readFileSync('prisma/schema.prisma', 'utf8');

const newModel = `
model HomePageCategory {
  id        String   @id @default(cuid())
  categoryId String? 
  name      String
  image     String?
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`;

if (!code.includes('model HomePageCategory')) {
  code += newModel;
  fs.writeFileSync('prisma/schema.prisma', code);
  console.log("Added HomePageCategory model");
} else {
  console.log("HomePageCategory already exists");
}
