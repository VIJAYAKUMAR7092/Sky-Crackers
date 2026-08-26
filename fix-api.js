const fs = require('fs');
const p = 'app/api/admin/combos/validity/route.ts';
let code = fs.readFileSync(p, 'utf8');
code = code.replace(
  'import prisma from "@/lib/db/prisma";',
  'import prisma from "@/lib/db/prisma";\nimport { revalidatePath } from "next/cache";'
);
code = code.replace(
  'return successResponse(settings);',
  'revalidatePath("/", "layout");\n    return successResponse(settings);'
);
fs.writeFileSync(p, code);
console.log('Fixed API route cache revalidation');
