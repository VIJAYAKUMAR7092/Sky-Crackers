import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Clock, PhoneCall, MapPin, MessageCircle, PlayCircle, Star, Quote } from "lucide-react";
import ProductCard from "@/components/public/ui/ProductCard";
import FeaturedProductCard from "@/components/public/home/FeaturedProductCard";
import HeroSlider from "@/components/public/home/HeroSlider";
import ScrollReveal from "@/components/public/ui/ScrollReveal";
import { getFeaturedProducts, getBestSellingProducts, getAllCategories } from "@/lib/services/public/product.service";
import { HOMEPAGE_IMAGES } from "@/lib/constants/homepage-images";
import { CATEGORY_IMAGES } from "@/lib/constants/category-images";

export const metadata = {
  title: "Sky Crackers | Premium Sivakasi Fireworks",
  description: "Celebrate every moment with premium quality fireworks from Sivakasi. Shop our luxury collection today.",
};

export default async function HomePage() {
  const [featuredProducts, bestSellers, dbCategories] = await Promise.all([
    getFeaturedProducts(),
    getBestSellingProducts(),
    getAllCategories()
  ]);

  const targetCategories = [
    { name: "Sparklers", image: CATEGORY_IMAGES.sparklers },
    { name: "Flower Pots", image: CATEGORY_IMAGES.flowerPots },
    { name: "Rockets", image: CATEGORY_IMAGES.rockets },
    { name: "Chakkars", image: CATEGORY_IMAGES.chakkars },
    { name: "Fancy Shots", image: CATEGORY_IMAGES.fancyShots },
    { name: "Sound Crackers", image: CATEGORY_IMAGES.soundCrackers },
    { name: "Kids Collection", image: CATEGORY_IMAGES.kidsCollection },
    { name: "Gift Boxes", image: CATEGORY_IMAGES.giftBoxes }
  ];
  
  const displayCategories = targetCategories.map(cat => {
    const found = dbCategories.find(c => c.name.toLowerCase().includes(cat.name.toLowerCase()));
    return {
      id: found?.id || cat.name.toLowerCase().replace(/\s+/g, '-'),
      name: found?.name || cat.name,
      slug: found?.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
      image: found?.image || cat.image
    };
  });

  return (
    <div className="flex flex-col w-full bg-[#050505] selection:bg-primary/30 text-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-[#050505]">
        <HeroSlider />
                <div className="container relative z-30 mx-auto px-4 text-center mt-20">
          
          
          <ScrollReveal animation="fade-up" duration="slow" delay={100}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 border border-primary/40 text-primary text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Sparkles className="h-4 w-4" />
              Sky Crackers Exclusive
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="scale-up" duration="slow" delay={300}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-extrabold text-white tracking-tight mb-8 drop-shadow-2xl">
              Celebrate Every Festival <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-primary to-amber-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
                With Sky Crackers
              </span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" duration="normal" delay={500}>
            <p className="mt-4 text-base md:text-xl text-zinc-300 max-w-2xl mx-auto mb-14 drop-shadow-lg font-light leading-relaxed">
              Premium Sivakasi Fireworks <br className="md:hidden" />Delivered Across Tamil Nadu
            </p>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" duration="normal" delay={700}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/shop" 
                className="group relative w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-primary to-amber-500 text-black text-lg font-extrabold rounded-full hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative flex items-center justify-center gap-3">
                  Shop Now <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                href="#categories"
                className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white text-sm font-bold rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-500 backdrop-blur-xl flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                View Collections
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. CATEGORY SHOWCASE */}
      <section id="categories" className="py-32 bg-[#050505] relative z-30">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal animation="fade-up" className="text-center mb-20">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Curated Collections</span>
            <h2 className="text-3xl md:text-3xl font-bold text-white mb-6">Explore By Category</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-amber-200 mx-auto rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {displayCategories.map((category, idx) => (
              <ScrollReveal key={category.id} animation="fade-up" delay={idx * 100}>
                <Link 
                  href={`/shop?category=${category.id}`}
                  className="group relative h-[420px] rounded-[24px] overflow-hidden block border border-white/5 bg-zinc-900 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)]"
                >
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  </div>
                  
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-[24px] z-30 transition-all duration-500 group-hover:shadow-[inset_0_0_30px_rgba(212,175,55,0.3)] pointer-events-none" />
                  
                  <div className="absolute inset-0 z-20 p-8 flex flex-col items-center justify-end text-center">
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      Premium Sivakasi Collection
                    </span>
                    <h3 className="text-3xl sm:text-3xl font-bold text-white mb-6 group-hover:text-primary transition-colors duration-500 drop-shadow-2xl">
                      {category.name}
                    </h3>
                    <div className="flex items-center text-white/90 group-hover:text-white font-bold text-sm tracking-widest transition-all duration-500 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 delay-150">
                      Explore Collection 
                      <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-500 group-hover:translate-x-2 text-primary" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      {featuredProducts.length > 0 && (
        <section className="py-32 bg-[#080808] relative z-30 border-t border-white/5">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-4 block">
                  Premium Sivakasi Fireworks Handpicked For Every Celebration
                </span>
                <h2 className="text-3xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg">
                  Featured Fireworks Collection
                </h2>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 bg-gradient-to-r from-amber-500 to-primary rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                  <div className="h-1.5 w-4 bg-primary rounded-full" />
                  <div className="h-1.5 w-1.5 bg-amber-200 rounded-full" />
                </div>
              </div>
              <Link href="/shop" className="inline-flex items-center text-primary font-bold hover:text-black transition-colors bg-white/5 border border-white/10 hover:bg-primary px-8 py-4 rounded-full tracking-wide backdrop-blur-md hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                View All Premium Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {featuredProducts.slice(0, 4).map((product: any, idx: number) => (
                <ScrollReveal key={product.id} animation="fade-up" delay={idx * 150}>
                  <FeaturedProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. FESTIVAL OFFER BANNERS */}
      <section className="py-32 bg-[#050505] px-4 md:px-6 border-t border-white/5">
        <div className="container mx-auto space-y-12">
          {/* Banner 1: Diwali Special */}
          <ScrollReveal animation="fade-up">
            <div className="relative rounded-[3rem] overflow-hidden bg-[#0a0a0a] p-10 md:p-20 flex flex-col items-start justify-center min-h-[500px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] group border border-white/5 hover:border-primary/30 transition-colors duration-700">
              <div className="absolute inset-0 z-0">
                <Image
                  src={HOMEPAGE_IMAGES.banners.diwali}
                  alt="Diwali Special Offers"
                  fill
                  className="object-cover transition-transform duration-[1500ms] group-hover:scale-105 opacity-60 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10" />
              </div>
              
              <div className="relative z-20 md:max-w-2xl">
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block inline-flex items-center gap-2 bg-primary/10 px-5 py-2 rounded-full border border-primary/20 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" /> Festive Special
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
                  Diwali Grand Offers
                </h2>
                <p className="text-zinc-300 text-xl md:text-2xl mb-10 font-light leading-relaxed drop-shadow-md">
                  Experience the grandest festival of lights with our exclusive premium collection. Celebrate brighter.
                </p>
                <Link href="/shop" className="inline-flex px-10 py-5 bg-primary text-black text-lg font-extrabold rounded-full hover:bg-amber-400 transition-all hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:-translate-y-1">
                  Shop The Collection
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal animation="fade-right" delay={200}>
              <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] p-10 md:p-14 min-h-[450px] flex items-end group shadow-2xl border border-white/5 hover:border-primary/20 transition-colors duration-700">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={HOMEPAGE_IMAGES.banners.family}
                    alt="Family Combos"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" />
                </div>
                <div className="relative z-20">
                  <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-xl">Family Combos</h3>
                  <p className="text-zinc-300 text-lg mb-8 font-light drop-shadow-md">Curated luxury boxes with everything you need for a perfect evening.</p>
                  <Link href="/shop?category=gift-boxes" className="inline-flex items-center text-primary font-bold hover:text-white transition-colors tracking-wide text-lg bg-white/5 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 group-hover:bg-primary group-hover:text-black">
                    Shop Combos <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={400}>
              <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] p-10 md:p-14 min-h-[450px] flex items-end group shadow-2xl border border-white/5 hover:border-primary/20 transition-colors duration-700">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={HOMEPAGE_IMAGES.banners.bulk}
                    alt="Bulk Orders"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" />
                </div>
                <div className="relative z-20">
                  <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-xl">Bulk Orders</h3>
                  <p className="text-zinc-300 text-lg mb-8 font-light drop-shadow-md">Special wholesale pricing for corporate gifting and large celebrations.</p>
                  <Link href="#contact" className="inline-flex items-center text-primary font-bold hover:text-white transition-colors tracking-wide text-lg bg-white/5 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 group-hover:bg-primary group-hover:text-black">
                    Contact Us <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. ABOUT SKY CRACKERS (BRAND STORY) */}
      <section id="about" className="py-32 bg-[#080808] border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <ScrollReveal animation="fade-right">
              <div className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 group">
                <div className="absolute inset-0 bg-[#050505] z-0" />
                <Image
                  src={HOMEPAGE_IMAGES.about}
                  alt="Sky Crackers Legacy"
                  fill
                  className="object-cover transition-transform duration-[1500ms] group-hover:scale-105 opacity-80 z-10"
                />
                <div className="absolute inset-0 border-8 border-white/5 rounded-[3rem] z-20 pointer-events-none transition-colors duration-700 group-hover:border-primary/20" />
                <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-primary/20 blur-[120px] rounded-full z-20" />
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-left">
              <div className="space-y-10">
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm block">Our Heritage</span>
                <h2 className="text-3xl md:text-3xl font-bold leading-tight text-white drop-shadow-lg">
                  The Legacy of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-primary">Sivakasi Fireworks</span>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-amber-200 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                
                <div className="prose prose-lg dark:prose-invert text-zinc-400 font-light leading-relaxed">
                  <p>
                    Rooted in the heart of Sivakasi, the fireworks capital of India, Sky Crackers brings you decades of expertise in crafting moments of pure joy and celebration.
                  </p>
                  <p>
                    We believe that every festival deserves the finest illumination. Our commitment to premium quality, rigorous safety standards, and spectacular visual displays makes us the most trusted choice for families and businesses alike.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div>
                    <h4 className="text-3xl font-bold text-white mb-2">10k+</h4>
                    <p className="text-zinc-500 font-medium tracking-wide">Happy Families</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-white mb-2">25+</h4>
                    <p className="text-zinc-500 font-medium tracking-wide">Years Legacy</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US (ANIMATED CARDS) */}
      <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal animation="fade-up" className="text-center mb-20">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">The Sky Crackers Promise</span>
            <h2 className="text-3xl md:text-3xl font-bold text-white mb-6">Why Choose Us</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-amber-200 mx-auto rounded-full" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "100% Safe & Certified", desc: "Rigorous quality checks ensuring completely safe celebrations for your family." },
              { icon: Truck, title: "Fast Secure Delivery", desc: "Expedited shipping across Tamil Nadu via our trusted transport network." },
              { icon: PhoneCall, title: "Premium Support", desc: "Dedicated VIP customer service for your complete peace of mind." }
            ].map((feature, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                <div className="p-12 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:shadow-[0_20px_40px_rgba(212,175,55,0.1)] transition-all duration-500 hover:-translate-y-3 hover:border-primary/30 group text-center flex flex-col items-center">
                  <div className="h-24 w-24 bg-black/50 rounded-[1.5rem] flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_0_20px_rgba(212,175,55,0.1)] group-hover:shadow-[inset_0_0_30px_rgba(212,175,55,0.3)] border border-white/5">
                    <feature.icon className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md">{feature.title}</h3>
                  <p className="text-zinc-400 text-base font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS (NEW SECTION) */}
      <section className="py-32 bg-[#080808] border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal animation="fade-up" className="text-center mb-20">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Words From Our Customers</span>
            <h2 className="text-3xl md:text-3xl font-bold text-white mb-6">Trusted By Thousands</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-amber-200 mx-auto rounded-full" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Karthik R.", loc: "Chennai", text: "The quality of the fireworks is unmatched. Sky Crackers truly delivers a premium experience. Highly recommended for Diwali!" },
              { name: "Priya S.", loc: "Coimbatore", text: "Seamless ordering and incredibly fast delivery. The family combos were curated perfectly. Thank you for making our festival special." },
              { name: "Manoj V.", loc: "Madurai", text: "Best Sivakasi crackers I've bought online. The website feels luxurious and the actual products exceeded my expectations completely." }
            ].map((review, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                <div className="p-10 bg-[#0a0a0a] rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all duration-500 shadow-xl group">
                  <Quote className="h-10 w-10 text-primary/20 mb-6 group-hover:text-primary/50 transition-colors duration-500" />
                  <p className="text-zinc-300 font-light text-lg leading-relaxed mb-8 italic">&quot;{review.text}&quot;</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-zinc-800 to-black rounded-full flex items-center justify-center border border-white/10 text-primary font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{review.name}</h4>
                      <div className="flex items-center text-xs text-zinc-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" /> {review.loc}
                      </div>
                    </div>
                    <div className="ml-auto flex text-amber-400">
                      {[1,2,3,4,5].map(star => <Star key={star} className="h-4 w-4 fill-current" />)}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. DELIVERY & CONTACT SECTION & YOUTUBE */}
      <section id="contact" className="py-16 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Contact Card */}
            <ScrollReveal animation="fade-right">
              <div className="bg-[#0a0a0a] p-8 md:p-10 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] transition-opacity duration-1000 group-hover:opacity-100 opacity-50" />
                <div className="relative z-10">
                  <h2 className="text-xl md:text-2xl font-bold mb-6 text-white drop-shadow-md">Get In Touch</h2>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-6 group/item">
                      <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/10 group-hover/item:border-primary/50 transition-colors">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 text-white">Premium Store</h4>
                        <p className="text-zinc-400 leading-relaxed text-sm font-light">
                          2/174D, Sattur Road,<br/>
                          Meenampatti, Sivakasi,<br/>
                          Tamil Nadu - 626189
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-6 group/item">
                      <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/10 group-hover/item:border-green-500/50 transition-colors">
                        <MessageCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 text-white">WhatsApp VIP Support</h4>
                        <p className="text-zinc-400 leading-relaxed mb-2 text-sm font-light">Message us for quick luxury orders.</p>
                        <a href="https://wa.me/919042849344" className="text-lg font-bold text-white hover:text-green-500 transition-colors">+91 90428 49344</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-6 group/item">
                      <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/10 group-hover/item:border-primary/50 transition-colors">
                        <PhoneCall className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 text-white">Concierge Call</h4>
                        <p className="text-zinc-400 leading-relaxed mb-2 text-sm font-light">Speak directly to our sales experts.</p>
                        <a href="tel:+916383511818" className="text-lg font-bold text-white hover:text-primary transition-colors">+91 63835 11818</a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col xl:flex-row gap-5">
                    <a href="https://wa.me/919042849344" className="flex-1 bg-[#25D366] hover:bg-[#1ebd5a] text-white text-lg font-extrabold py-3 rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:-translate-y-1">
                      <MessageCircle className="h-5 w-5" /> WhatsApp Order</a>
                    <a href="tel:+916383511818" className="flex-1 bg-white hover:bg-zinc-200 text-black text-lg font-extrabold py-3 rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:-translate-y-1">
                      <PhoneCall className="h-5 w-5" /> Call Now
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            {/* YouTube Showcase */}
            <ScrollReveal animation="fade-left">
              <div className="bg-[#0a0a0a] p-8 md:p-10 rounded-[2rem] text-white flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/5 h-full group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-transparent z-0 pointer-events-none" />
                <div className="relative z-10 mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-red-600 p-4 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                      <PlayCircle className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight drop-shadow-md">Sky Crackers TV</h2>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-md font-light">
                    Watch our premium fireworks in action! Subscribe to our YouTube channel for spectacular product demonstrations.
                  </p>
                </div>
                
                <div className="relative z-10 mt-auto">
                  <div className="aspect-video bg-black rounded-[2rem] border border-white/10 overflow-hidden relative mb-6 shadow-xl group/video cursor-pointer">
                    <Image
                      src={HOMEPAGE_IMAGES.youtube}
                      alt="Sky Crackers YouTube Channel"
                      fill
                      className="object-cover opacity-60 transition-transform duration-[1500ms] group-hover/video:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/0 transition-colors duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="h-16 w-16 bg-red-600/90 backdrop-blur-md rounded-full flex items-center justify-center pl-2 shadow-[0_0_40px_rgba(220,38,38,0.8)] group-hover/video:scale-110 group-hover/video:bg-red-600 transition-all duration-500">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent" />
                      </div>
                    </div>
                  </div>
                  
                  <a href="https://youtube.com/@skycrackersofficial" target="_blank" rel="noopener noreferrer" className="inline-flex w-full px-6 py-4 bg-red-600/10 text-red-500 hover:text-white hover:bg-red-600 text-sm font-bold rounded-full border border-red-600/20 transition-all duration-500 items-center justify-center gap-3">
                    <PlayCircle className="h-5 w-5" /> Subscribe on YouTube
                  </a>
                </div>
              </div>
            </ScrollReveal>
            
          </div>
        </div>
      </section>
    </div>
  );
}
