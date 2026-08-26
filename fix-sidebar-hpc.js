const fs = require('fs');
let content = fs.readFileSync('components/admin/layout/Sidebar.tsx', 'utf8');

const target = `{ title: "Homepage CMS", href: "/admin/cms", icon: LayoutTemplate },`;
const replacement = `{ title: "Homepage Categories", href: "/admin/homepage-categories", icon: FolderTree },
      { title: "Homepage CMS", href: "/admin/cms", icon: LayoutTemplate },`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('components/admin/layout/Sidebar.tsx', content);
  console.log("Updated Sidebar");
} else {
  console.log("Target not found!");
}
