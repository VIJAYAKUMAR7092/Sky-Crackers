import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace from {/* 2. EXACT SHOP NOW CTA */} up to the <section className="py-10 sm:py-12 bg-white relative z-30 -mt-8 sm:-mt-10 overflow-hidden">
start_marker = r'\{\/\* 2\. EXACT SHOP NOW CTA \*\/\}'
end_marker = r'<section className="py-10 sm:py-12 bg-white relative z-30 -mt-8 sm:-mt-10 overflow-hidden">'

# Find the start
start_match = re.search(start_marker, content)
end_match = re.search(end_marker, content)

if start_match and end_match:
    start_idx = start_match.start()
    end_idx = end_match.start()
    
    new_section = """{/* 2. EXACT SHOP NOW CTA */}
        <section className="w-full relative z-10 bg-[#FCF8E8] flex justify-center">
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
              <span className="absolute inset-0 rounded-[100px] shadow-[0_0_20px_rgba(255,215,0,0.5)] animate-[luxuryPulse_3s_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              {/* Shine sweep effect inside the button area */}
              <span className="absolute inset-0 rounded-[100px] overflow-hidden">
                <span className="absolute inset-0 -translate-x-[200%] animate-[luxuryShine_3s_infinite_linear] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 w-1/2"></span>
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
            @keyframes luxuryPulse {
              0%, 100% { box-shadow: 0 0 10px rgba(255,215,0,0.3); }
              50% { box-shadow: 0 0 25px rgba(255,215,0,0.8); }
            }
          `}} />
        </section>

        """
        
    new_content = content[:start_idx] + new_section + content[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced section.")
else:
    print("Could not find markers.")
