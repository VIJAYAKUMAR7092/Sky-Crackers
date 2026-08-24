import re
import os

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will add the Cracker Animations component import
import_stmt = 'import { FlowerPotFountain, BurstingFirework, Sparkler } from "@/components/public/ui/CrackerAnimations";\n'

if "CrackerAnimations" not in content:
    # Add after import Link from "next/link";
    content = content.replace('import Link from "next/link";', 'import Link from "next/link";\n' + import_stmt)

# Update the PREMIUM SHOP NOW CTA section
pattern = re.compile(r'{/\*\s*2\. PREMIUM SHOP NOW CTA\s*\*/}.*?<section className="w-full py-8 sm:py-12 flex justify-center items-center bg-white relative z-10">', re.DOTALL)

new_section_start = """{/* 2. PREMIUM SHOP NOW CTA */}
        <section className="w-full py-10 sm:py-14 flex justify-center items-center bg-white relative z-10 overflow-hidden">
          
          {/* LEFT SIDE ANIMATIONS */}
          <div className="absolute left-0 top-0 bottom-0 w-1/3 flex items-center justify-center pointer-events-none opacity-80">
            <div className="relative w-full h-full animate-[syncCycle1_30s_infinite]">
              <FlowerPotFountain side="left" />
            </div>
            <div className="absolute inset-0 w-full h-full animate-[syncCycle2_30s_infinite]">
              <BurstingFirework side="left" />
            </div>
            <div className="absolute inset-0 w-full h-full animate-[syncCycle3_30s_infinite]">
              <Sparkler side="left" />
            </div>
          </div>

          {/* RIGHT SIDE ANIMATIONS */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center justify-center pointer-events-none opacity-80">
            <div className="relative w-full h-full animate-[syncCycle1_30s_infinite]">
              <BurstingFirework side="right" />
            </div>
            <div className="absolute inset-0 w-full h-full animate-[syncCycle2_30s_infinite]">
              <Sparkler side="right" />
            </div>
            <div className="absolute inset-0 w-full h-full animate-[syncCycle3_30s_infinite]">
              <FlowerPotFountain side="right" />
            </div>
          </div>
          """

content = pattern.sub(new_section_start, content)

# Now inject the new keyframes for the cracker animations
keyframes = """
            @keyframes syncCycle1 {
              0%, 30% { opacity: 1; transform: scale(1); }
              33%, 97% { opacity: 0; transform: scale(0.8); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes syncCycle2 {
              0%, 30% { opacity: 0; transform: scale(0.8); }
              33%, 63% { opacity: 1; transform: scale(1); }
              66%, 100% { opacity: 0; transform: scale(0.8); }
            }
            @keyframes syncCycle3 {
              0%, 63% { opacity: 0; transform: scale(0.8); }
              66%, 97% { opacity: 1; transform: scale(1); }
              100% { opacity: 0; transform: scale(0.8); }
            }

            @keyframes fountainSparks {
              0% { transform: translateY(0) scale(1); opacity: 1; }
              100% { transform: translateY(-60px) scale(0); opacity: 0; }
            }
            @keyframes fireworkBurst {
              0% { transform: translate(0, 0) scale(1); opacity: 1; }
              100% { transform: translate(40px, -40px) scale(0); opacity: 0; }
            }
            @keyframes waveSparkler {
              0%, 100% { transform: rotate(-15deg); }
              50% { transform: rotate(15deg); }
            }
            @keyframes sparklerSparks {
              0% { transform: translateY(0) scale(1); opacity: 1; }
              100% { transform: translateY(-30px) scale(0); opacity: 0; }
            }
"""

content = content.replace("          <style dangerouslySetInnerHTML={{__html: `", "          <style dangerouslySetInnerHTML={{__html: `" + keyframes)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Animations added to page.tsx")
