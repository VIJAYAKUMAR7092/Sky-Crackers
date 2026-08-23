import os

with open('components/public/layout/Footer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the contact info section
old_contact = """          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-extrabold mb-4 uppercase text-sm border-b border-white/20 pb-1.5">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-yellow-400 shrink-0 mt-1" />
                <span className="text-sm text-orange-100 leading-relaxed font-medium break-words">
                  {settings?.address ? (
                    <span dangerouslySetInnerHTML={{ __html: settings.address.replace(/\\n/g, "<br/>") }} />
                  ) : (
                    <>2/174D, Sattur Road,<br/>Meenampatti. Sivakasi,<br/>Tamil Nadu - 626189</>
                  )}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon className="h-4 w-4 text-yellow-400 shrink-0" />
                <a href={`https://wa.me/${settings?.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, "") : "919042849344"}`} className="text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200 break-all">
                  {settings?.whatsapp || "+91 9042849344"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-yellow-400 shrink-0" />
                <a href={`tel:${settings?.primaryPhone || "+916383511818"}`} className="text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200 break-all">
                  {settings?.primaryPhone || "+91 6383511818"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-yellow-400 shrink-0" />
                <a href="tel:+919344745092" className="text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200 break-all">
                  +91 93447 45092
                </a>
              </li>
            </ul>
          </div>"""

new_contact = """          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-extrabold mb-3 md:mb-4 uppercase text-[13px] md:text-sm border-b border-white/20 pb-1.5">Contact Us</h3>
            <div className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-1">
              <div className="flex items-start gap-2 md:gap-3">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 shrink-0 mt-0.5 md:mt-1" />
                <span className="text-[11px] md:text-sm text-orange-100 leading-relaxed font-medium break-words">
                  {settings?.address ? (
                    <span dangerouslySetInnerHTML={{ __html: settings.address.replace(/\\n/g, "<br/>") }} />
                  ) : (
                    <>2/174D, Sattur Road,<br/>Meenampatti. Sivakasi,<br/>Tamil Nadu - 626189</>
                  )}
                </span>
              </div>
              <ul className="space-y-1.5 md:space-y-3">
                <li className="flex items-center gap-2 md:gap-3">
                  <WhatsAppIcon className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 shrink-0" />
                  <a href={`https://wa.me/${settings?.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, "") : "919042849344"}`} className="text-[11px] md:text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200 break-all">
                    {settings?.whatsapp || "+91 9042849344"}
                  </a>
                </li>
                <li className="flex items-center gap-2 md:gap-3">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 shrink-0" />
                  <a href={`tel:${settings?.primaryPhone || "+916383511818"}`} className="text-[11px] md:text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200 break-all">
                    {settings?.primaryPhone || "+91 6383511818"}
                  </a>
                </li>
                <li className="flex items-center gap-2 md:gap-3">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 shrink-0" />
                  <a href="tel:+919344745092" className="text-[11px] md:text-sm font-bold text-white hover:text-yellow-400 transition-colors duration-200 break-all">
                    +91 93447 45092
                  </a>
                </li>
              </ul>
            </div>
          </div>"""

content = content.replace(old_contact, new_contact)

with open('components/public/layout/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
