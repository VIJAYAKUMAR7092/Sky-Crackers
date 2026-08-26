const fs = require('fs');
let c = fs.readFileSync('app/(store)/page.tsx', 'utf8');

const target = `<Link 
              href="/shop"
              className="absolute z-20 group cursor-pointer"
              style={{ left: '29.5%', top: '32.5%', width: '41%', height: '35%', borderRadius: '100px' }}
            >
              <span className="absolute inset-0 rounded-[100px] shadow-[0_0_20px_rgba(255,215,0,0.5)] animate-[luxuryPulse_3s_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>`;

const replacement = `<Link 
              href="/shop"
              className="absolute z-20 group cursor-pointer animate-[bounce_2s_infinite]"
              style={{ left: '29.5%', top: '32.5%', width: '41%', height: '35%', borderRadius: '100px' }}
            >
              {/* WhatsApp like ping/ripple */}
              <div className="absolute inset-0 rounded-[100px] border-2 border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.8)]"></div>
              <div className="absolute inset-0 rounded-[100px] bg-yellow-400 opacity-30 animate-ping"></div>
            </Link>`;

c = c.replace(target, replacement);

fs.writeFileSync('app/(store)/page.tsx', c);
console.log("Updated Mobile Shop Now button");
