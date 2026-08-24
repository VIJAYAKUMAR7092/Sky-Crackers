import os

file_path = 'components/public/home/TestimonialMarquee.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_heading = """<style dangerouslySetInnerHTML={{__html: `
            @keyframes softGlowFloat {
              0%, 100% { transform: translateY(0); text-shadow: 0 0 2px rgba(223, 38, 12, 0.1); opacity: 0.8; }
              50% { transform: translateY(-3px); text-shadow: 0 0 12px rgba(223, 38, 12, 0.6); opacity: 1; }
            }
          `}} />
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 inline-block" style={{ animation: 'softGlowFloat 4s ease-in-out infinite' }}>TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase leading-none tracking-tighter">
            <span className="text-[#2e7d32] block md:inline">WHAT OUR </span>
            <span className="text-[#827717] block md:inline">CUSTOMERS SAY</span>
          </h2>"""

new_heading = """<style dangerouslySetInnerHTML={{__html: `
            @keyframes softGlowFloat {
              0%, 100% { transform: translateY(0); text-shadow: 0 0 2px rgba(223, 38, 12, 0.1); opacity: 0.8; }
              50% { transform: translateY(-3px); text-shadow: 0 0 12px rgba(223, 38, 12, 0.6); opacity: 1; }
            }
            @keyframes redGlowPulse {
              0%, 100% { transform: scale(1); text-shadow: 0 0 5px rgba(223,38,12,0.2); }
              50% { transform: scale(1.02); text-shadow: 0 0 20px rgba(223,38,12,0.7); }
            }
          `}} />
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 inline-block" style={{ animation: 'softGlowFloat 4s ease-in-out infinite' }}>TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase leading-none tracking-tighter text-primary inline-block" style={{ animation: 'redGlowPulse 3s ease-in-out infinite' }}>
            WHAT OUR CUSTOMERS SAY
          </h2>"""

content = content.replace(old_heading, new_heading)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
