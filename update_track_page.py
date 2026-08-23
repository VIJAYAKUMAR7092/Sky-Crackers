import os

file_path = 'app/(store)/track-order/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update getStatusColor
content = content.replace(
    'case "CANCELLED": return "text-red-600 bg-red-50";',
    'case "CANCELLED": return "text-red-600 bg-red-50";\n      case "DELETED": return "text-red-600 bg-red-100";'
)

# Update getStatusIcon
content = content.replace(
    'case "CANCELLED": return <XCircle className="w-5 h-5" />;',
    'case "CANCELLED": return <XCircle className="w-5 h-5" />;\n      case "DELETED": return <XCircle className="w-5 h-5" />;'
)

# Update renderTimeline
old_render_timeline = 'const renderTimeline = (currentStatus: string) => {'
new_render_timeline = """const renderTimeline = (currentStatus: string, isDeleted: boolean) => {
    if (isDeleted) {
      return (
        <div className="flex items-center gap-3 text-red-600 p-4 bg-red-50 rounded-xl mt-4">
          <XCircle className="w-6 h-6" />
          <span className="font-bold">Order Deleted / Cancelled.</span>
        </div>
      );
    }"""
content = content.replace(old_render_timeline, new_render_timeline)

# Find where renderTimeline is called
content = content.replace(
    '{renderTimeline(order.status)}',
    '{renderTimeline(order.status, order.isDeleted)}'
)

# Update status display in header
content = content.replace(
    '<span className={`px-3 py-1 rounded-full text-xs font-bold border border-current ${getStatusColor(order.status)}`}>\n                        {order.status}\n                      </span>',
    '<span className={`px-3 py-1 rounded-full text-xs font-bold border border-current ${getStatusColor(order.isDeleted ? "DELETED" : order.status)}`}>\n                        {order.isDeleted ? "DELETED" : order.status}\n                      </span>'
)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
