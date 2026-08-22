const fs = require('fs');

// Fix page.tsx
let page = fs.readFileSync('app/(store)/page.tsx', 'utf8');
if(!page.includes('getSEOSettings')) {
  page = page.replace('import { getHeroBanners, getVideoContent, getTestimonials } from \"@/lib/services/cms/cms.service\";', 'import { getHeroBanners, getVideoContent, getTestimonials, getSEOSettings } from \"@/lib/services/cms/cms.service\";');
}
fs.writeFileSync('app/(store)/page.tsx', page);

// Fix static page
let staticPage = fs.readFileSync('app/(store)/pages/[slug]/page.tsx', 'utf8');
staticPage = staticPage.replace(/isPublished/g, 'active');
fs.writeFileSync('app/(store)/pages/[slug]/page.tsx', staticPage);

// Fix root layout
let root = fs.readFileSync('app/layout.tsx', 'utf8');
root = root.replace('icons: website?.faviconUrl ? { icon: website.faviconUrl } : undefined,', '');
fs.writeFileSync('app/layout.tsx', root);

// Fix Navbar
let nav = fs.readFileSync('components/public/layout/Navbar.tsx', 'utf8');
nav = nav.replace(/contactPhone/g, 'primaryPhone');
nav = nav.replace(/contactEmail/g, 'email');
fs.writeFileSync('components/public/layout/Navbar.tsx', nav);

// Fix Footer
let foot = fs.readFileSync('components/public/layout/Footer.tsx', 'utf8');
foot = foot.replace(/contactPhone/g, 'primaryPhone');
foot = foot.replace(/contactEmail/g, 'email');
foot = foot.replace(/youtubeUrl/g, 'youtube');
fs.writeFileSync('components/public/layout/Footer.tsx', foot);

