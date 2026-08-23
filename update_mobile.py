import os
import re

file_path = 'app/(store)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the "WHY CHOOSE US / FEATURES" section entirely to make it consistent and add premium mobile animations.
old_features_pattern = re.compile(r"\{\/\*\ 2\.\ WHY\ CHOOSE\ US\ \/\ FEATURES.*?<\/section>", re.DOTALL)
new_features = """{/* 2. WHY CHOOSE US / FEATURES (Cracker City Style) */}
        <section className="py-10 sm:py-12 bg-white relative z-30 -mt-8 sm:-mt-10 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              
              <ScrollReveal animation="fade-up" delay={100}>
                <div className="group bg-white hover:bg-primary rounded-2xl md:rounded-[2rem] p-4 sm:p-8 text-center shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 h-full flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2 relative overflow-hidden active:scale-[0.98] md:active:scale-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 animate-[floatGentle_4s_ease-in-out_infinite] md:animate-none">
                    <Truck className="h-8 w-8 sm:h-10 sm:w-10 text-primary group-hover:text-white mb-3 sm:mb-4 mx-auto transition-all duration-300 animate-[bounceMobile_3s_infinite] md:animate-none group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    <h3 className="text-[13px] sm:text-lg font-extrabold text-gray-900 group-hover:text-white mb-1.5 sm:mb-2 uppercase tracking-wide transition-colors">Fast Delivery</h3>
                    <p className="text-[11px] sm:text-sm text-gray-500 group-hover:text-white/90 font-medium transition-colors leading-relaxed">Your parcel will be delivered 3 to 5 working days</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-up" delay={200}>
                <div className="group bg-white hover:bg-primary rounded-2xl md:rounded-[2rem] p-4 sm:p-8 text-center shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 h-full flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2 relative overflow-hidden active:scale-[0.98] md:active:scale-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-primary group-hover:text-white mb-3 sm:mb-4 mx-auto transition-all duration-300 animate-[floatMobile_3.5s_infinite] md:animate-none group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    <h3 className="text-[13px] sm:text-lg font-extrabold text-gray-900 group-hover:text-white mb-1.5 sm:mb-2 uppercase tracking-wide transition-colors">Best Deals</h3>
                    <p className="text-[11px] sm:text-sm text-gray-500 group-hover:text-white/90 font-medium transition-colors leading-relaxed">We provide up to 90% discount on all products</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-up" delay={300}>
                <div className="group bg-white hover:bg-primary rounded-2xl md:rounded-[2rem] p-4 sm:p-8 text-center shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 h-full flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2 relative overflow-hidden active:scale-[0.98] md:active:scale-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 animate-[breatheMobile_4s_ease-in-out_infinite] md:animate-none">
                    <Package className="h-8 w-8 sm:h-10 sm:w-10 text-primary group-hover:text-white mb-3 sm:mb-4 mx-auto transition-transform duration-500 group-hover:scale-110 md:group-hover:scale-100 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
                    <h3 className="text-[13px] sm:text-lg font-extrabold text-gray-900 group-hover:text-white mb-1.5 sm:mb-2 uppercase tracking-wide transition-colors">Premium Packing</h3>
                    <p className="text-[11px] sm:text-sm text-gray-500 group-hover:text-white/90 font-medium transition-colors leading-relaxed">Goods will be safely packed in poly bundle carton boxes</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-up" delay={400}>
                <div className="group bg-white hover:bg-primary rounded-2xl md:rounded-[2rem] p-4 sm:p-8 text-center shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 h-full flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2 relative overflow-hidden active:scale-[0.98] md:active:scale-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-primary group-hover:text-white mb-3 sm:mb-4 mx-auto transition-all duration-300 animate-[floatMobile_3.2s_infinite] md:animate-none group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    <h3 className="text-[13px] sm:text-lg font-extrabold text-gray-900 group-hover:text-white mb-1.5 sm:mb-2 uppercase tracking-wide transition-colors">Working Hours</h3>
                    <p className="text-[11px] sm:text-sm text-gray-500 group-hover:text-white/90 font-medium transition-colors leading-relaxed">You can purchase on all days from 8:00 AM to 10:00 PM</p>
                  </div>
                </div>
              </ScrollReveal>
              
            </div>
          </div>
        </section>"""

content = re.sub(old_features_pattern, new_features, content)

# 2. Replace the ABOUT US section
old_about_pattern = re.compile(r"\{\/\*\ ABOUT\ US\ SECTION\ \*\/\}.*?<\/section>", re.DOTALL)
new_about = """{/* ABOUT US SECTION */}
        <section id="about" className="py-16 sm:py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-5 md:px-6">
            <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 items-center">
              <div className="w-full lg:w-1/2">
                <ScrollReveal animation="fade-right">
                  <div className="relative rounded-[2rem] sm:rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group animate-[floatGentle_6s_ease-in-out_infinite] md:animate-none">
                    <Image src="/images/about-fireworks.jpg" alt="Sky Crackers Festive Fireworks" fill className="object-cover transition-transform duration-[15s] ease-out scale-110 sm:scale-100 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 transform transition-transform duration-500">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2 drop-shadow-md">Quality & Safety First</h3>
                      <p className="text-white/90 text-[13px] sm:text-sm drop-shadow-sm font-medium">We strictly adhere to all safety guidelines to ensure safe celebrations.</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
              <div className="w-full lg:w-1/2">
                <ScrollReveal animation="fade-left">
                  <span className="text-primary font-extrabold tracking-[0.25em] uppercase text-[10px] sm:text-xs mb-3 sm:mb-4 block">ABOUT SKY CRACKERS</span>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-5 sm:mb-6 leading-[1.3] sm:leading-tight">
                    Bringing Joy & Light To <span className="text-secondary block sm:inline mt-1 sm:mt-0">Every Celebration</span>
                  </h2>
                  <p className="text-gray-600 leading-[1.7] mb-5 sm:mb-6 text-[15px] sm:text-lg">
                    Welcome to Sky Crackers! Located in the heart of Sivakasi, the fireworks capital of India, we take immense pride in manufacturing and supplying premium quality crackers that make your celebrations truly memorable.
                  </p>
                  <p className="text-gray-600 leading-[1.7] mb-6 sm:mb-8 text-[15px] sm:text-lg">
                    With years of experience in the pyrotechnic industry, our mission is to deliver safe, vibrant, and innovative fireworks right to your doorstep. We offer an extensive range of products including sparklers, flower pots, rockets, and exclusive gift boxes at unbeatable wholesale prices. 
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-2 sm:mb-8">
                    <div className="flex items-center gap-3.5 bg-gray-50/80 sm:bg-transparent p-3 sm:p-0 rounded-2xl sm:rounded-none">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <span className="font-bold text-gray-900 text-[15px] sm:text-base tracking-tight">100% Safe Products</span>
                    </div>
                    <div className="flex items-center gap-3.5 bg-gray-50/80 sm:bg-transparent p-3 sm:p-0 rounded-2xl sm:rounded-none">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <span className="font-bold text-gray-900 text-[15px] sm:text-base tracking-tight">Premium Packing</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>"""

content = re.sub(old_about_pattern, new_about, content)

# 3. Add Keyframes to the first <style dangerouslySetInnerHTML> in page.tsx
old_style_pattern = re.compile(r"(@keyframes\ breatheMobile\ \{\n\s*0%,\ 100%\ \{\ transform:\ scale\(1\);\ \}\n\s*50%\ \{\ transform:\ scale\(1\.08\);\ \}\n\s*\})", re.DOTALL)
new_style = """@keyframes breatheMobile {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounceMobile {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }"""
content = re.sub(old_style_pattern, new_style, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
