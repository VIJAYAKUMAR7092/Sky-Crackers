const http = require('http');

async function testApi() {
  // First get categories to get valid IDs
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const cats = await prisma.category.findMany({ take: 3 });
  await prisma.$disconnect();

  const payload = cats.map((c, i) => ({ id: c.id, displayOrder: i + 1 }));

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/admin/categories/reorder',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // We might get unauthorized if requireAdmin is active, wait
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('Response:', data));
  });

  req.write(JSON.stringify(payload));
  req.end();
}
testApi();
