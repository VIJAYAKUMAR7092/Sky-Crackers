const fs = require('fs');
let pageFile = 'app/(store)/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// Try replacing whatever old section variant exists
const regexOptions = [
    /\{\/\* 1\.5 DESKTOP SHOP BUTTON[\s\S]*?<\/svg>\s*<\/span>\s*<\/Link>\s*<\/div>/,
    /\{\/\* 1\.5 NEW PREMIUM DESKTOP SHOP BUTTON \*\/\}[\s\S]*?<\/section>/
];

const newButtonCode = `
      {/* 1.5 EXACT MATCH SHOP BUTTON */}
      <div className="w-full py-8 bg-white hidden md:flex justify-center items-center z-20 relative">
        <Link 
          href="/shop" 
          className="group relative inline-flex items-center justify-center px-10 py-3 rounded-full font-bold text-[16px] tracking-widest transition-all duration-300"
          style={{
            background: 'linear-gradient(90deg, #dce775, #f0f4c3, #dce775)',
            backgroundSize: '200% auto',
            color: '#1b3b24',
            boxShadow: '0 4px 15px rgba(220, 231, 117, 0.4)'
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            SHOP NOW
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      </div>
`;

let replaced = false;
for (const regex of regexOptions) {
    if (pageContent.match(regex)) {
        pageContent = pageContent.replace(regex, newButtonCode.trim());
        replaced = true;
        break;
    }
}

if (!replaced) {
    console.log("Could not find the button section to replace.");
} else {
    fs.writeFileSync(pageFile, pageContent, 'utf8');
    console.log("Button styling exact match applied.");
}
