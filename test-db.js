const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.websiteSettings.findUnique({where: {id: "global"}}).then(console.log).catch(console.error);
