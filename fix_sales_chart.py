import os

file_path = 'components/admin/dashboard/SalesOverviewChart.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("bg-white/50", "bg-background/50")
content = content.replace("bg-gray-50/50", "bg-muted/30")
content = content.replace("stroke=\"#f3f4f6\"", "stroke=\"currentColor\" className=\"text-border\"")
content = content.replace("fill: '#6b7280'", "fill: 'currentColor'")
content = content.replace("color: '#111827'", "color: 'inherit'")

tooltip_old = "contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 500 }}"
tooltip_new = "contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--popover)', color: 'var(--popover-foreground)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 500 }}"
content = content.replace(tooltip_old, tooltip_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed SalesOverviewChart.tsx")
