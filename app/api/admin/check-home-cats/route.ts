import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET() {
  const cats = await prisma.homePageCategory.findMany();
  return NextResponse.json({ cats });
}
