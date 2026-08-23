import os

file_path = 'app/api/track-order/route.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_return = "return NextResponse.json({ success: true, data: orders });"

new_return = """
    // Safely convert Prisma Decimal fields to Javascript Numbers for JSON serialization
    const formattedOrders = orders.map(order => ({
      ...order,
      finalTotal: Number(order.finalTotal),
      items: order.items.map(item => ({
        ...item,
        unitPrice: Number(item.unitPrice)
      }))
    }));

    return NextResponse.json({ success: true, data: formattedOrders });
"""

content = content.replace(old_return, new_return.strip())

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
