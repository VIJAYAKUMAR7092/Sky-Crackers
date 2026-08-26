const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL || "postgres://neondb_owner:npg_u1vFj3LNKpVI@ep-bold-truth-az8zrqta-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
});
prisma.websiteSettings.findMany().then(console.log).catch(console.error);
