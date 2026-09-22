import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL || "postgresql://admin:skycrackers123@localhost:5432/skycrackers?schema=public";
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const email = 'admin@skycrackers.local';
    const password = 'Sky@123456';
    
    let admin = await prisma.adminUser.findUnique({ where: { email }});
    if (!admin) {
        const hashedPassword = await bcrypt.hash(password, 10);
        admin = await prisma.adminUser.create({
            data: {
                email,
                password: hashedPassword,
                name: 'Admin',
                role: 'SUPERADMIN',
                active: true
            }
        });
        console.log("Admin created successfully!");
    } else {
        console.log("Admin already exists!");
    }
}
main().finally(() => prisma.$disconnect());
