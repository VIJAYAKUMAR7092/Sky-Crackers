import re

with open('app/(store)/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to replace the grid block inside the contact section.
# The grid block starts right after the h-1 w-20 line
old_contact_regex = r'<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">.*?</div>\s*</div>\s*</section>'

new_contact = """{/* DESKTOP CONTACT VIEW */}
          <div className="hidden md:grid grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center h-full">
                <div className="h-16 w-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
                  <PhoneCall className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
                <p className="text-gray-500 mb-4 font-medium">We're available 24/7 for your queries.</p>
                <a href="tel:+916383511818" className="text-lg font-bold text-primary mt-auto">+91 6383511818</a>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center h-full">
                <div className="h-16 w-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">WhatsApp</h3>
                <p className="text-gray-500 mb-4 font-medium">Quick replies for order support.</p>
                <a href="https://wa.me/919042849344" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-green-500 mt-auto">+91 9042849344</a>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center h-full">
                <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Location</h3>
                <p className="text-gray-500 font-medium">2/174D, Sattur Road,<br/>Meenampatti, Sivakasi,<br/>Tamil Nadu - 626189</p>
              </div>
            </ScrollReveal>
          </div>

          {/* MOBILE CONTACT VIEW */}
          <div className="grid md:hidden grid-cols-2 gap-4 max-w-sm mx-auto">
            <ScrollReveal animation="fade-up" delay={100}>
              <a href="tel:+916383511818" className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 active:shadow-inner active:scale-95 transition-all duration-200 flex flex-col items-center justify-center aspect-square h-full">
                <div className="h-12 w-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Phone</h3>
                <span className="text-xs font-bold text-primary">+91 6383511818</span>
              </a>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <a href="mailto:info@skycrackers.com" className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 active:shadow-inner active:scale-95 transition-all duration-200 flex flex-col items-center justify-center aspect-square h-full">
                <div className="h-12 w-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-3">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Email</h3>
                <span className="text-xs font-bold text-primary">Mail Us</span>
              </a>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center aspect-square h-full">
                <div className="h-12 w-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Address</h3>
                <span className="text-[10px] leading-tight text-gray-500">Sivakasi,<br/>Tamil Nadu</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center aspect-square h-full">
                <div className="h-12 w-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-3">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Hours</h3>
                <span className="text-xs font-bold text-gray-500">8 AM - 10 PM</span>
              </div>
            </ScrollReveal>
          </div>
          </div>
        </section>"""

content = re.sub(old_contact_regex, new_contact, content, flags=re.DOTALL)

with open('app/(store)/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
