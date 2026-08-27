import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET() {
  const cats = await prisma.category.findMany({ where: { displayOrder: 99 } });
  return NextResponse.json({ cats });
}
