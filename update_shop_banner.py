import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '{/* 2. EXACT SHOP NOW CTA */}'
end_marker = '        <ComboPacks combos={comboProducts} />'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_section = """{/* 2. EXACT SHOP NOW CTA */}
        <section className="w-full relative z-10 bg-[#FCF8E8] flex justify-center overflow-hidden">
          <div className="relative w-full max-w-[1400px] aspect-[1024/409]">
            <Image 
              src="/images/shop-banner.jpg" 
              alt="Shop Fireworks Collection" 
              fill 
              className="object-contain"
              priority
            />
            
            {/* Clickable Button Area with Animation */}
            <Link 
              href="/shop"
              className="absolute z-20 group cursor-pointer"
              style={{
                left: '29.5%',
                top: '32.5%',
                width: '41%',
                height: '35%',
                borderRadius: '100px'
              }}
            >
              {/* Pulsing glow behind/around the button */}
              <span className="absolute inset-0 rounded-[100px] shadow-[0_0_20px_rgba(255,215,0,0.5)] animate-pulse opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              {/* Shine sweep effect inside the button area */}
              <span className="absolute inset-0 rounded-[100px] overflow-hidden">
                <span className="absolute inset-0 -translate-x-[200%] animate-[luxuryShine_4s_infinite_linear] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 w-1/2"></span>
              </span>
            </Link>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes luxuryShine {
              0% { transform: translateX(-200%) skewX(25deg); opacity: 0; }
              10%, 20% { opacity: 1; }
              30% { transform: translateX(200%) skewX(25deg); opacity: 0; }
              100% { transform: translateX(200%) skewX(25deg); opacity: 0; }
            }
          `}} />
        </section>

"""

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_section + content[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Updated successfully.')
else:
    print('Markers not found', start_idx, end_idx)
