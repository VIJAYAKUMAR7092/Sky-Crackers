import os

file_path = 'app/admin/(dashboard)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_stmt = "import SalesOverviewChart from '../../../components/admin/dashboard/SalesOverviewChart';\n"
if "SalesOverviewChart" not in content:
    content = content.replace("import Link from \"next/link\"", "import Link from \"next/link\"\n" + import_stmt)

# Remove the placeholder and insert the SalesOverviewChart
placeholder_start = """            <CardContent className="flex-1">
              <div className="h-full min-h-[300px] w-full flex flex-col items-center justify-center border 
border-dashed border-border/60 rounded-2xl bg-gradient-to-br from-secondary/5 to-secondary/10 hover:from-secondary/10 
hover:to-secondary/20 transition-all duration-500">
                <div className="p-4 bg-background/50 rounded-full mb-4 shadow-sm border border-border/50">
                  <BarChart className="h-8 w-8 text-primary/60" />
                </div>
                <span className="text-sm font-semibold text-foreground">Premium Chart Area</span>
                <span className="text-xs text-muted-foreground mt-1">Data visualization component will mount 
here</span>
              </div>
            </CardContent>"""

# Since lines might have different spaces due to formatting:
import re
placeholder_pattern = re.compile(r"<CardContent className=\"flex-1\">\s*<div className=\"h-full min-h-\[300px\].*?<\/CardContent>", re.DOTALL)

replacement = """<CardContent className="flex-1 overflow-hidden p-4 sm:p-6">
              <SalesOverviewChart />
            </CardContent>"""

if re.search(placeholder_pattern, content):
    content = re.sub(placeholder_pattern, replacement, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
