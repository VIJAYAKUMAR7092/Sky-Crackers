import 'dotenv/config'
import prisma from './lib/db/prisma'

async function main() {
  try {
    await Promise.all([
      prisma.product.count({ where: { active: true } }),
      prisma.order.count(),
      prisma.customer.count(),
      prisma.category.count({ where: { active: true } }),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.product.count({ where: { stockStatus: 'OUT_OF_STOCK' } }),
    ])
    console.log('Promise.all OK')
  } catch(e) { console.error('Promise.all error', e) }

  try {
    await prisma.order.aggregate({ _sum: { finalTotal: true } })
    console.log('Aggregate OK')
  } catch(e) { console.error('Aggregate error', e) }
}
main().catch(console.error)
