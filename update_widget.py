import os

file_path = 'components/public/layout/FloatingStoreWidgets.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace wiggle with premiumFloat
content = content.replace('animate-[wiggle_4s_infinite]', 'animate-[premiumFloat_2.5s_ease-in-out_infinite]')

old_keyframes = """          <style dangerouslySetInnerHTML={{__html: `
            @keyframes wiggle {
              0%, 100% { transform: rotate(-3deg) scale(1); }
              50% { transform: rotate(3deg) scale(1.02); }
            }
          `}} />"""

new_keyframes = """          <style dangerouslySetInnerHTML={{__html: `
            @keyframes premiumFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-18px); }
            }
          `}} />"""

content = content.replace(old_keyframes, new_keyframes)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
