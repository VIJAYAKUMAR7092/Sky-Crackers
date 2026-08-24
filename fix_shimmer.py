import os

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the animation class
old_span = """            {/* Shimmer Effect */}
            <span className="absolute inset-0 -translate-x-[150%] animate-[shimmer_2.5s_infinite_ease-in-out] bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 z-0"></span>"""

new_span = """            {/* Shimmer Effect */}
            <span className="absolute inset-0 -translate-x-[150%] animate-[shimmer_1.5s_infinite_linear] bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 z-0"></span>"""

content = content.replace(old_span, new_span)

# Fix the keyframes
old_keyframes = """          @keyframes shimmer {
            0% { transform: translateX(-150%) skewX(12deg); }
            50%, 100% { transform: translateX(150%) skewX(12deg); }
          }"""

new_keyframes = """          @keyframes shimmer {
            0% { transform: translateX(-150%) skewX(12deg); }
            100% { transform: translateX(150%) skewX(12deg); }
          }"""

content = content.replace(old_keyframes, new_keyframes)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed shimmer animation")
