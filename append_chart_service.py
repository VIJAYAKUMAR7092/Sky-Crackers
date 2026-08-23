import os

file_path = 'lib/services/dashboard/dashboard.service.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_function = """

export async function getSalesChartData(preset: '7days' | 'yesterday' | '30days' | 'thisMonth' = '7days') {
  const now = new Date();
  let start = new Date();
  
  if (preset === '7days') {
    start.setDate(now.getDate() - 6);
    start.setHours(0, 0, 0, 0);
  } else if (preset === 'yesterday') {
    start.setDate(now.getDate() - 1);
    start.setHours(0, 0, 0, 0);
    now.setDate(now.getDate() - 1);
    now.setHours(23, 59, 59, 999);
  } else if (preset === '30days') {
    start.setDate(now.getDate() - 29);
    start.setHours(0, 0, 0, 0);
  } else if (preset === 'thisMonth') {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
  }

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: now
      },
      status: {
        not: 'CANCELLED'
      },
      isDeleted: false
    },
    select: {
      createdAt: true,
      finalTotal: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return orders.map(o => ({
    createdAt: o.createdAt.toISOString(),
    finalTotal: Number(o.finalTotal)
  }));
}
"""

if "getSalesChartData" not in content:
    with open(file_path, 'a', encoding='utf-8') as f:
        f.write(new_function)
