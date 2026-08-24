import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the Premium SVGs imports and add next/image
content = content.replace(
    'import { RocketSVG, FlowerPotSVG, FireworkSVG } from "@/components/public/ui/PremiumCrackerSVGs";',
    'import Image from "next/image";'
)

# Replace LEFT SIDE
old_left = """          {/* LEFT SIDE ANIMATIONS */}
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

new_left = """          {/* LEFT SIDE ANIMATIONS */}
          <div className="absolute left-0 top-0 bottom-0 w-[40%] flex items-center justify-start pl-4 sm:pl-10 md:pl-20 pointer-events-none">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-[syncCycle1_30s_infinite]">
              <Image src="/images/animations/c1_no_bg.png" alt="Animation 1" fill className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-[rocketFloat_3s_ease-in-out_infinite]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-start pl-4 sm:pl-10 md:pl-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-[syncCycle2_30s_infinite]">
              <Image src="/images/animations/c2_no_bg.png" alt="Animation 2" fill className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-[rocketFloat_3s_ease-in-out_infinite_1s]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-start pl-4 sm:pl-10 md:pl-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-[syncCycle3_30s_infinite]">
              <Image src="/images/animations/c3_no_bg.png" alt="Animation 3" fill className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-[rocketFloat_3s_ease-in-out_infinite_2s]" />
            </div>
          </div>"""

content = content.replace(old_left, new_left)

# Replace RIGHT SIDE
old_right = """          {/* RIGHT SIDE ANIMATIONS */}
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

new_right = """          {/* RIGHT SIDE ANIMATIONS */}
          <div className="absolute right-0 top-0 bottom-0 w-[40%] flex items-center justify-end pr-4 sm:pr-10 md:pr-20 pointer-events-none">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-[syncCycle1_30s_infinite]">
              <Image src="/images/animations/c3_no_bg.png" alt="Animation 3" fill className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-[rocketFloat_3s_ease-in-out_infinite_1s]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-10 md:pr-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-[syncCycle2_30s_infinite]">
              <Image src="/images/animations/c1_no_bg.png" alt="Animation 1" fill className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-[rocketFloat_3s_ease-in-out_infinite_2s]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-10 md:pr-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 animate-[syncCycle3_30s_infinite]">
              <Image src="/images/animations/c2_no_bg.png" alt="Animation 2" fill className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-[rocketFloat_3s_ease-in-out_infinite]" />
            </div>
          </div>"""

content = content.replace(old_right, new_right)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated page.tsx to use processed images")
