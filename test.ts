import { authOptions } from './lib/auth/auth-options';
import prisma from './lib/db/prisma';

async function test() {
  try {
    const user = await prisma.adminUser.findUnique({
      where: { email: 'admin@skycrackers.local' }
    });
    console.log("User:", user);
  } catch (err) {
    console.error("Prisma Error:", err);
  }
}
test();
