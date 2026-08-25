import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The section to insert
legal_section = """
        {/* 8. LEGAL COMPLIANCE NOTICE */}
        <section className="py-12 sm:py-16 bg-gray-50 border-t border-gray-100 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <ScrollReveal animation="fade-up">
              <div className="relative group bg-gradient-to-br from-[#1a0505] via-[#2a0808] to-[#1a0505] rounded-3xl p-6 sm:p-10 shadow-2xl border border-red-900/50 overflow-hidden transition-all duration-500 hover:shadow-red-900/30 hover:-translate-y-1">
                
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full animate-pulse pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-[#fce074]/5 blur-[80px] rounded-full animate-pulse pointer-events-none delay-1000"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-950 flex items-center justify-center border border-red-800 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#fce074]" />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-widest uppercase">
                      Legal Compliance Notice
                    </h2>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-gray-300 leading-relaxed max-w-4xl font-medium text-justify sm:text-center">
                    <p>
                      As per 2018 Supreme Court order, online sale of firecrackers are not permitted! We value our customers and at the same time, respect jurisdiction. We request you to add your products to the cart and submit the required crackers through the enquiry button.
                    </p>
                    <p>
                      We will contact you within 24 hrs and confirm the order through WhatsApp or phone call. Please add and submit your enquiries and enjoy your Diwali with <span className="text-[#fce074] font-bold">SKY CRACKERS</span>.
                    </p>
                    <p>
                      <span className="text-[#fce074] font-bold">SKY CRACKERS</span> as a company following 100% legal & statutory compliances and all our shops, go-downs are maintained as per the explosive acts. We send the parcels through registered and legal transport service providers as like every other major companies in Sivakasi is doing so.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
"""

# Find where to insert it. Below <TestimonialMarquee />
target = "<TestimonialMarquee />"
if target in content:
    content = content.replace(target, target + "\n" + legal_section)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Inserted legal notice.")
else:
    print("Could not find TestimonialMarquee.")
