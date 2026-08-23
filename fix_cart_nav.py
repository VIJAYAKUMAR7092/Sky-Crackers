import os

with open('app/(store)/cart/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_checkout = """              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-primary text-black font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-6"
              >
                Proceed to Checkout <ArrowRight className="h-5 w-5" />
              </button>"""

new_checkout = """              <button
                onClick={() => window.location.href = '/checkout'}
                className="w-full bg-primary text-black font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-6"
              >
                Proceed to Checkout <ArrowRight className="h-5 w-5" />
              </button>"""

content = content.replace(old_checkout, new_checkout)

with open('app/(store)/cart/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
