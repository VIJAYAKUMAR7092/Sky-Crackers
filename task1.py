import os

file_path = 'components/public/home/TestimonialMarquee.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_heading = '<span className="text-yellow-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">TESTIMONIALS</span>'
new_heading = """<style dangerouslySetInnerHTML={{__html: `
            @keyframes softGlowFloat {
              0%, 100% { transform: translateY(0); text-shadow: 0 0 2px rgba(223, 38, 12, 0.1); opacity: 0.8; }
              50% { transform: translateY(-3px); text-shadow: 0 0 12px rgba(223, 38, 12, 0.6); opacity: 1; }
            }
          `}} />
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 inline-block" style={{ animation: 'softGlowFloat 4s ease-in-out infinite' }}>TESTIMONIALS</span>"""

content = content.replace(old_heading, new_heading)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
