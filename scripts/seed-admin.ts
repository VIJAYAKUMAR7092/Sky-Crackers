import prisma from "../lib/db/prisma";
import bcrypt from "bcrypt";
import "dotenv/config";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variables.");
    process.exit(1);
  }

  // Check if any admin exists
  const existingAdminCount = await prisma.adminUser.count();
  
  if (existingAdminCount > 0) {
    console.log("Admin user already exists. Skipping seed.");
    return;
  }

  console.log(`Seeding initial SUPERADMIN: ${email}`);

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.adminUser.create({
    data: {
      name: "Sky Crackers Admin",
      email: email,
      password: hashedPassword,
      role: "SUPERADMIN",
      active: true,
    },
  });

  console.log("Initial admin created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
