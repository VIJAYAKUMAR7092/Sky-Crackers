import os

with open('app/(store)/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_tag = '{/* DESKTOP CONTACT VIEW */}'
end_tag = '</div>\n        </section>'

start_idx = content.find(start_tag)
end_idx = content.find(end_tag, start_idx)

new_section = '''{/* DESKTOP CONTACT VIEW */}
          <div className="hidden md:grid grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ScrollReveal animation="slide-right" delay={100}>
              <div className="group bg-white rounded-2xl p-8 text-center shadow-md border border-gray-100 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.4)] transition-all duration-500 flex flex-col items-center h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 h-20 w-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] group-hover:scale-110">
                  <PhoneCall className="h-8 w-8 animate-[wiggle_2s_infinite]" />
                </div>
                <h3 className="relative z-10 text-xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Call Us</h3>
                <p className="relative z-10 text-gray-500 mb-4 font-medium">We're available 24/7 for your queries.</p>
                <a href="tel:+916383511818" className="relative z-10 text-lg font-bold text-primary mt-auto group-hover:tracking-wider transition-all">+91 63835 11818</a>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="group bg-white rounded-2xl p-8 text-center shadow-md border border-gray-100 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(37,211,102,0.4)] transition-all duration-500 flex flex-col items-center h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 h-20 w-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(37,211,102,0.3)] group-hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] group-hover:scale-110">
                  <WhatsAppIcon className="h-10 w-10 animate-pulse" />
                </div>
                <h3 className="relative z-10 text-xl font-black text-gray-900 mb-3 group-hover:text-green-600 transition-colors">WhatsApp</h3>
                <p className="relative z-10 text-gray-500 mb-4 font-medium">Quick replies for order support.</p>
                <a href="https://wa.me/919042849344" target="_blank" rel="noopener noreferrer" className="relative z-10 text-lg font-bold text-[#25D366] mt-auto group-hover:tracking-wider transition-all">+91 90428 49344</a>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-left" delay={300}>
              <div className="group bg-white rounded-2xl p-8 text-center shadow-md border border-gray-100 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.4)] transition-all duration-500 flex flex-col items-center h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 h-20 w-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] group-hover:scale-110">
                  <MapPin className="h-8 w-8 animate-bounce" />
                </div>
                <h3 className="relative z-10 text-xl font-black text-gray-900 mb-3 group-hover:text-red-600 transition-colors">Our Location</h3>
                <p className="relative z-10 text-gray-600 font-medium leading-relaxed">2/174D, Sattur Road,<br/>Meenampatti, Sivakasi,<br/>Tamil Nadu - 626189</p>
              </div>
            </ScrollReveal>
          </div>

          {/* MOBILE CONTACT VIEW */}
          <div className="grid md:hidden grid-cols-2 gap-4 max-w-md mx-auto">
            <ScrollReveal animation="zoom-in" delay={100}>
              <a href="tel:+916383511818" className="group bg-gradient-to-b from-white to-blue-50/50 rounded-2xl p-4 text-center shadow-[0_8px_20px_-5px_rgba(59,130,246,0.4)] border border-blue-200 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center aspect-square h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-active:opacity-10 transition-opacity"></div>
                <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <PhoneCall className="h-8 w-8 animate-[wiggle_2s_infinite]" />
                </div>
                <h3 className="text-base font-black text-gray-900 mb-1">Call Now</h3>
                <span className="text-[12px] font-bold text-blue-600 tracking-wide">+91 6383511818</span>
              </a>
            </ScrollReveal>

            <ScrollReveal animation="zoom-in" delay={150}>
              <a href="https://wa.me/919042849344" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-b from-white to-green-50/50 rounded-2xl p-4 text-center shadow-[0_8px_20px_-5px_rgba(37,211,102,0.4)] border border-green-200 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center aspect-square h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-[#25D366] opacity-0 group-active:opacity-10 transition-opacity"></div>
                <div className="h-16 w-16 bg-green-100 text-[#25D366] rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(37,211,102,0.3)]">
                  <WhatsAppIcon className="h-9 w-9 animate-pulse" />
                </div>
                <h3 className="text-base font-black text-gray-900 mb-1">WhatsApp</h3>
                <span className="text-[12px] font-bold text-[#25D366] tracking-wide">Chat Now</span>
              </a>
            </ScrollReveal>

            <ScrollReveal animation="zoom-in" delay={200}>
              <div className="group bg-gradient-to-b from-white to-red-50/50 rounded-2xl p-4 text-center shadow-[0_8px_20px_-5px_rgba(239,68,68,0.3)] border border-red-200 transition-all duration-300 flex flex-col items-center justify-center aspect-square h-full">
                <div className="h-14 w-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3 shadow-inner">
                  <MapPin className="h-7 w-7 animate-bounce" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Address</h3>
                <span className="text-[11px] font-bold leading-tight text-gray-600">Sivakasi,<br/>Tamil Nadu</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="zoom-in" delay={250}>
              <div className="group bg-gradient-to-b from-white to-orange-50/50 rounded-2xl p-4 text-center shadow-[0_8px_20px_-5px_rgba(249,115,22,0.3)] border border-orange-200 transition-all duration-300 flex flex-col items-center justify-center aspect-square h-full">
                <div className="h-14 w-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-3 shadow-inner">
                  <Clock className="h-7 w-7 animate-[spin_4s_linear_infinite]" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Hours</h3>
                <span className="text-[11px] font-bold text-orange-600 tracking-wide">8 AM - 10 PM</span>
              </div>
            </ScrollReveal>
          </div>
          '''

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_section + content[end_idx:]

with open('app/(store)/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
