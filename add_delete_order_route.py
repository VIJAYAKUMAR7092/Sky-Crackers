import os

file_path = 'app/api/admin/orders/[id]/route.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import { getOrderById, updateOrderStatus } from '@/lib/services/orders/order.service';", "import { getOrderById, updateOrderStatus, deleteOrder } from '@/lib/services/orders/order.service';")

delete_method = """
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  
  return withErrorHandler(async () => {
    await requireAdmin();
    const result = await deleteOrder(resolvedParams.id);
    return successResponse(result);
  });
};
"""

content = content + "\n" + delete_method

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
