import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET() {
  const cats = await prisma.category.findMany();
  for (const cat of cats) {
     if (cat.name.toLowerCase().includes('ground chak')) {
        await prisma.category.update({
            where: { id: cat.id },
            data: { displayOrder: 5 }
        });
     }
  }
  return NextResponse.json({success:true});
}
