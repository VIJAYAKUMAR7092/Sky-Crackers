import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET() {
  const cats = await prisma.category.findMany({ orderBy: { displayOrder: 'asc' }, select: { name: true, displayOrder: true } });
  return NextResponse.json({ cats });
}
