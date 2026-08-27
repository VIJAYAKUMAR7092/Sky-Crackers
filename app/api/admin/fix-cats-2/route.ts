import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

const desiredOrder = [
  "Combo pack",
  "One sound crackers",
  "Flower pot",
  "Tricolor fountain",
  "Ground checker",
  "Fancy wheels",
  "Torches and pencil",
  "Twinkling star",
  "Rocket",
  "Kids novelties",
  "Fancy novelties",
  "Fancy fountain multicolor",
  "Special fountain exotic series",
  "Peacock fountain",
  "New arrivals 2026",
  "Bombs",
  "Paper bombs",
  "Digital lar",
  "Loose crackers",
  "Single Ariel fancy 5pcs",
  "Single arial fancy",
  "Special colour Ariel fancy",
  "Combo Ariel fancy",
  "Sony fancy",
  "Vanitha fire work special fancy outs",
  "Repeating multicolor shots",
  "Special multi colour shirts 2026",
  "Festival display set out",
  "Sparkles",
  "Special colour sparkleres",
  "Colour matches",
  "Guns",
  "Gift box"
];

function normalize(s: string) {
  return s.toLowerCase()
    .replace(/s$/g, '') 
    .replace(/es$/g, '') 
    .replace(/[^a-z0-9]/g, '')
    .replace('colour', 'color')
    .replace('tricolour', 'tricolor')
    .replace('sparkles', 'sparklers')
    .replace('shirts', 'shots')
    .replace('arial', 'ariel');
}

export async function GET() {
  const cats = await prisma.category.findMany();
  for (const cat of cats) {
     let order = 99; 
     
     const cName = cat.name.toLowerCase();
     if (cName.includes('combo pack') && !cName.includes('night')) order = 1;
     else if (cName.includes('flower pot')) order = 3;
     else if (cName.includes('tri colour') || cName.includes('tricolor')) order = 4;
     else if (cName.includes('torches')) order = 7;
     else if (cName.includes('fountain multi')) order = 12;
     else if (cName.includes('single ariel fancy') && !cName.includes('5')) order = 21;
     else if (cName.includes('special color ariel')) order = 22;
     else if (cName.includes('sony') || cName.includes('sonny')) order = 24;
     else if (cName.includes('vanitha')) order = 25;
     else if (cName.includes('gift box')) order = 33;
     else if (cName.includes('color match') || cName.includes('colour match')) order = 31;
     else if (cName.includes('sparkler') && cName.includes('special color')) order = 30;
     else if (cName.includes('sparkler')) order = 29;
     else if (cName.includes('single ariel fancy') && cName.includes('5')) order = 20;
     else {
         const matchIndex = desiredOrder.findIndex(d => normalize(d) === normalize(cat.name));
         if (matchIndex !== -1) order = matchIndex + 1;
     }
     
     await prisma.category.update({
        where: { id: cat.id },
        data: { displayOrder: order }
     });
  }
  return NextResponse.json({success:true});
}
