import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  try {
    const settings = await prisma.websiteSettings.upsert({
      where: { id: "global" },
      update: { comboValidUpto: "25TH AUGUST" },
      create: { id: "global", comboValidUpto: "25TH AUGUST" }
    });
    console.log("Success:", settings);
  } catch (e) {
    console.error("Error:", e);
  }
}
main();
