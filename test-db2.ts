import prisma from "./lib/db/prisma";
async function main() {
  const s = await prisma.websiteSettings.findUnique({where: {id: "global"}});
  console.log("DB SETTINGS:", s);
}
main();
