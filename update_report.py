import os
import re

file_path = 'app/admin/(dashboard)/reports/components/ReportClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
import_stmt = "import OrderFlowchart from './OrderFlowchart';\n"
if "OrderFlowchart" not in content:
    content = content.replace("import { useRouter } from 'next/navigation';", "import { useRouter } from 'next/navigation';\n" + import_stmt)

# Add flowchart to overview
overview_start = """        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">"""

overview_new = """        {activeTab === 'overview' && (
          <>
            <OrderFlowchart />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">"""

if overview_start in content:
    content = content.replace(overview_start, overview_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
