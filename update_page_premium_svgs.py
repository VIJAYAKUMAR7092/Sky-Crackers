import re
import os

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace import
content = content.replace(
    'import { FlowerPotFountain, BurstingFirework, Sparkler } from "@/components/public/ui/CrackerAnimations";',
    'import { RocketSVG, FlowerPotSVG, FireworkSVG } from "@/components/public/ui/PremiumCrackerSVGs";'
)

# Update the HTML block
old_left = """          {/* LEFT SIDE ANIMATIONS */}
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
          </div>"""

new_left = """          {/* LEFT SIDE ANIMATIONS */}
          <div className="absolute left-0 top-0 bottom-0 w-[40%] flex items-center justify-start pl-4 sm:pl-10 md:pl-20 pointer-events-none">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-[syncCycle1_30s_infinite]">
              <FlowerPotSVG className="w-full h-full drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-start pl-4 sm:pl-10 md:pl-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-[syncCycle2_30s_infinite]">
              <FireworkSVG className="w-full h-full drop-shadow-[0_0_20px_rgba(255,69,0,0.8)]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-start pl-4 sm:pl-10 md:pl-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-[syncCycle3_30s_infinite]">
              <RocketSVG className="w-full h-full drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
            </div>
          </div>"""

content = content.replace(old_left, new_left)

old_right = """          {/* RIGHT SIDE ANIMATIONS */}
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
          </div>"""

new_right = """          {/* RIGHT SIDE ANIMATIONS */}
          <div className="absolute right-0 top-0 bottom-0 w-[40%] flex items-center justify-end pr-4 sm:pr-10 md:pr-20 pointer-events-none">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-[syncCycle1_30s_infinite]">
              <FireworkSVG className="w-full h-full drop-shadow-[0_0_20px_rgba(255,69,0,0.8)]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-10 md:pr-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-[syncCycle2_30s_infinite]">
              <RocketSVG className="w-full h-full drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-10 md:pr-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-[syncCycle3_30s_infinite]">
              <FlowerPotSVG className="w-full h-full drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
            </div>
          </div>"""

content = content.replace(old_right, new_right)

# Add some custom animations for the new SVGs
new_keyframes = """
            @keyframes rocketFloat {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(5deg); }
            }
            @keyframes flicker {
              0%, 100% { opacity: 1; transform: scaleY(1); }
              50% { opacity: 0.8; transform: scaleY(0.9); }
            }
            @keyframes fountainBurst {
              0% { transform: translateY(0) scale(1); opacity: 0.8; }
              100% { transform: translateY(-10px) scale(1.1); opacity: 1; }
            }
            @keyframes fireworkRotate {
              0% { transform: rotate(0deg) scale(1); }
              50% { transform: rotate(180deg) scale(1.1); }
              100% { transform: rotate(360deg) scale(1); }
            }
            @keyframes fireworkDash {
              0% { stroke-dashoffset: 25; opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: 0; }
            }
"""

content = content.replace("            @keyframes waveSparkler {", new_keyframes + "\n            @keyframes waveSparkler {")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated page.tsx with premium SVGs")
