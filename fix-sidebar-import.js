const fs = require('fs');
let content = fs.readFileSync('components/admin/layout/Sidebar.tsx', 'utf8');
content = content.replace(/FileText\r?\n\} from "lucide-react"/, 'FileText,\n  IndianRupee\n} from "lucide-react"');
fs.writeFileSync('components/admin/layout/Sidebar.tsx', content);
