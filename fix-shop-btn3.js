const fs = require('fs');
let c = fs.readFileSync('app/(store)/page.tsx', 'utf8');

c = c.replace(
    /<Link[\s\S]*?className="absolute z-20 group cursor-pointer"[\s\S]*?<\/Link>/,
    `<Link 
              href="/shop"
              className="absolute z-20 group cursor-pointer animate-[bounce_2s_infinite]"
              style={{ left: '29.5%', top: '32.5%', width: '41%', height: '35%', borderRadius: '100px' }}
            >
              <div className="absolute inset-0 rounded-[100px] border-2 border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.8)]"></div>
              <div className="absolute inset-0 rounded-[100px] bg-yellow-400 opacity-40 animate-ping"></div>
            </Link>`
);

fs.writeFileSync('app/(store)/page.tsx', c);
console.log("Updated with Regex 2");
