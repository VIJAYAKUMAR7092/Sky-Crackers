import 'dotenv/config'
import prisma from './lib/db/prisma'

async function main() {
  try {
    await prisma.product.count()
    console.log('product count OK')
  } catch(e) { console.error('product error', e) }

  try {
    await prisma.category.count()
    console.log('category count OK')
  } catch(e) { console.error('category error', e) }

  try {
    await prisma.order.count()
    console.log('order count OK')
  } catch(e: any) { console.error('order error', e?.message) }

  try {
    await prisma.customer.count()
    console.log('customer count OK')
  } catch(e: any) { console.error('customer error', e?.message) }
}
main().catch(console.error)
