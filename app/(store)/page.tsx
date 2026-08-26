import React from "react";
import prisma from "@/lib/db/prisma";
import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "@/components/public/ui/WhatsAppIcon";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Clock, PhoneCall, MapPin, Mail, MessageCircle, PlayCircle, Star, Quote, Package } from "lucide-react";
import FeaturedProductCard from "@/components/public/home/FeaturedProductCard";
import HeroSlider from "@/components/public/home/HeroSlider";
import BrandMarquee from "@/components/public/home/BrandMarquee";
import ComboPacks from "@/components/public/home/ComboPacks";
import TestimonialMarquee from "@/components/public/home/TestimonialMarquee";
import ScrollReveal from "@/components/public/ui/ScrollReveal";
import { getFeaturedProducts, getBestSellingProducts, getAllCategories } from "@/lib/services/public/product.service";
import { getHeroBanners, getVideoContent, getTestimonials, getSEOSettings, getWebsiteSettings } from "@/lib/services/cms/cms.service";
import { HOMEPAGE_IMAGES } from "@/lib/constants/homepage-images";
import { CATEGORY_IMAGES } from "@/lib/constants/category-images";

export async function generateMetadata() {
  const seo = await getSEOSettings('/');
  return {
    title: seo?.title || "Sky Crackers | Buy Crackers Online Sivakasi",
    description: seo?.description || "Celebrate every moment with premium quality fireworks from Sivakasi. Shop our festive collection today.",
    keywords: seo?.keywords,
    openGraph: seo?.ogImage ? { images: [seo.ogImage] } : undefined,
  };
}

export const revalidate = 3600;

export default async function HomePage() {
    const combos = await prisma.product.findMany({
    where: { isCombo: true },
    orderBy: { comboOrder: 'asc' },
    include: { images: true, category: true }
  });

  const comboProducts = combos.map(combo => ({
    ...combo,
    mrp: Number(combo.mrp).toString(),
    sellingPrice: Number(combo.sellingPrice).toString(),
    discount: combo.discount ? Number(combo.discount).toString() : null
  }));

  const [featuredProducts, bestSellers, dbCategories, heroBanners, videos, testimonials, websiteSettings] = await Promise.all([
    getFeaturedProducts(),
    getBestSellingProducts(),
    getAllCategories(),
    getHeroBanners(true),
    getVideoContent(true),
    getTestimonials(true),
    getWebsiteSettings()
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

  const displayBanners = heroBanners && heroBanners.length > 0 
    ? heroBanners.map((b: any) => ({ id: b.id, image: b.imageUrl, link: b.linkUrl }))
    : [
        { id: 'b1', image: '/images/home/new-banner-1.jpg' },
        { id: 'b2', image: '/images/home/new-banner-2.jpg' },
        { id: 'b3', image: '/images/home/new-banner-3.jpg' },
        { id: 'b4', image: '/images/home/new-banner-4.png' }
      ];

  const displayVideos = videos && videos.length > 0 ? videos : [
    {
      id: "default-vid-1",
      youtubeUrl: "https://youtube.com/@skycrackersofficial",
      title: "Sky Crackers in Action",
      thumbnailUrl: HOMEPAGE_IMAGES.youtube || "/images/home/sky-crackers-tv.jpg"
    }
  ];


  return (
    <div className="flex flex-col w-full bg-white text-gray-900 font-sans overflow-x-hidden max-w-[100vw]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatMobile {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes breatheMobile {
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
        }
      `}} />

      
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#050505]">
        <HeroSlider banners={displayBanners} />
      </section>            

      {/* 1.5 NEW PREMIUM DESKTOP SHOP BUTTON (Golden) */}
      <section className="w-full py-6 bg-[#FCF8E8] hidden md:flex justify-center items-center z-20 relative">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes goldShine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes floatPremium {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .btn-premium-gold {
            background: linear-gradient(90deg, #B8860B, #FFD700, #FDF5E6, #FFD700, #B8860B);
            background-size: 200% auto;
            animation: goldShine 3s linear infinite, floatPremium 4s ease-in-out infinite;
            position: relative;
            overflow: hidden;
          }
          .btn-premium-gold::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%);
            opacity: 0;
            transform: scale(0.5);
            transition: opacity 0.3s, transform 0.5s;
            pointer-events: none;
          }
          .btn-premium-gold:hover::before {
            opacity: 0.4;
            transform: scale(1);
          }
        `}} />
        <Link 
          href="/shop" 
          className="btn-premium-gold group relative inline-flex items-center justify-center px-12 py-3.5 rounded-full text-black font-extrabold text-lg tracking-widest uppercase shadow-[0_0_20px_rgba(218,165,32,0.4)] hover:shadow-[0_0_35px_rgba(255,215,0,0.7)] transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            SHOP NOW
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      </section>

      {/* 2. EXACT SHOP NOW CTA (MOBILE ONLY) */}
      <section className="w-full py-4 sm:py-8 md:py-10 relative z-10 bg-[#FCF8E8] flex justify-center md:hidden">
        <div className="relative w-[95%] sm:w-[85%] md:w-[75%] max-w-[1000px] aspect-[1024/409]">
          <Image 
            src="/images/shop-banner.jpg" 
            alt="Shop Fireworks Collection" 
            fill 
            className="object-contain"
            priority
          />
          <Link 
            href="/shop"
            className="absolute z-20 group cursor-pointer"
            style={{ left: '29.5%', top: '32.5%', width: '41%', height: '35%', borderRadius: '100px' }}
          >
            <span className="absolute inset-0 rounded-[100px] shadow-[0_0_20px_rgba(255,215,0,0.5)] animate-[luxuryPulse_3s_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </div>
      </section>

      <BrandMarquee />

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
        </section>

      <ComboPacks combos={comboProducts} />

      {/* 3. CATEGORIES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">
              Shop By Category
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4 sm:gap-6 lg:gap-8">
            {displayCategories.map((category, index) => (
              <ScrollReveal key={category.id} animation="fade-up" delay={index * 100}>
                <Link href={`/shop?category=${category.slug}`} className="group block">
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white shadow-sm border border-gray-100 group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 animate-[breatheMobile_5s_infinite] md:animate-none md:group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    
                    <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end items-center text-center">
                      <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2 leading-tight group-hover:text-secondary transition-colors duration-300">
                        {category.name}
                      </h3>
                      <div className="flex items-center text-white/90 text-sm font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Explore <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 sm:gap-6">
              <div>
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
                  Premium Sivakasi Fireworks
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 uppercase">
                  Featured Collection
                </h2>
              </div>
              <Link href="/shop" className="inline-flex items-center text-primary font-bold hover:text-green-800 transition-colors bg-white border border-gray-200 hover:border-primary px-6 py-3 rounded-full shadow-sm">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredProducts.slice(0, 4).map((product: any, idx: number) => (
                <ScrollReveal key={product.id} animation="fade-up" delay={idx * 150}>
                  <FeaturedProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. YOUTUBE SHOWCASE */}
      <section className="py-12 md:py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left: Video */}
            <div className="w-full lg:w-1/2 relative">
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {displayVideos.slice(0, 1).map((video: any, i: number) => (
                  <ScrollReveal key={video.id} animation="fade-right">
                    <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block bg-white p-2 rounded-[2rem] shadow-2xl border border-gray-200 group cursor-pointer relative overflow-hidden aspect-video">
                      <Image
                        src={(video as any).thumbnail || HOMEPAGE_IMAGES.youtube}
                        alt={video.title || "YouTube Video"}
                        fill
                        className="object-cover rounded-[1.5rem] group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 rounded-[1.5rem] bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-20 w-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <svg className="w-10 h-10 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                      <div className="absolute top-6 left-6 flex justify-between items-start">
                         <span className="bg-red-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest animate-pulse flex items-center gap-2">
                           <span className="w-2 h-2 bg-white rounded-full"></span> Live
                         </span>
                      </div>
                      {video.title && (
                         <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-[1.5rem]">
                           <p className="text-white font-extrabold text-2xl truncate">{video.title}</p>
                         </div>
                      )}
                    </a>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left pl-0 lg:pl-4">
              <ScrollReveal animation="fade-left">
                <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">Premium Quality in Action</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tight leading-[1.1]">
                  Experience The <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Magic of Sivakasi</span>
                </h2>
                <div className="h-1.5 w-24 bg-red-600 rounded-full mt-8 mx-auto lg:mx-0" />
                
                <p className="text-gray-600 mt-8 text-lg lg:text-xl leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                  Words can only say so much. Watch our exclusive showcase to see the brilliant colors, spectacular bursts, and superior quality of Sky Crackers. We bring the grandest celebrations directly to your screen!
                </p>
                
                <div className="mt-12">
                  <a href="https://youtube.com/@skycrackersofficial" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-red-600/30 hover:-translate-y-1 text-lg group">
                    <svg className="w-7 h-7 fill-current group-hover:animate-bounce" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    Visit Us Live
                  </a>
                </div>
              </ScrollReveal>
            </div>
            
          </div>
        </div>
      </section>
      
            {/* ABOUT US SECTION */}
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
        </section>

      {/* CONTACT US SECTION */}
      <section id="contact" className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">REACH OUT</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">
              Contact Us
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          {/* DESKTOP CONTACT VIEW */}
          <div className="hidden md:grid grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ScrollReveal animation="fade-right" delay={100}>
              <div className="group bg-white rounded-2xl p-8 text-center shadow-md border border-gray-100 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.4)] transition-all duration-500 flex flex-col items-center h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 h-20 w-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] group-hover:scale-110">
                  <PhoneCall className="h-8 w-8 animate-[wiggle_2s_infinite]" />
                </div>
                <h3 className="relative z-10 text-xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Call Us</h3>
                <p className="relative z-10 text-gray-500 mb-4 font-medium">We're available 24/7 for your queries.</p>
                <a href={`tel:${websiteSettings?.primaryPhone || "+919042849344"}`} className="relative z-10 text-lg font-bold text-primary mt-auto group-hover:tracking-wider transition-all">{websiteSettings?.primaryPhone || "+91 90428 49344"}</a>
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

            <ScrollReveal animation="fade-left" delay={300}>
              <div className="group bg-white rounded-2xl p-8 text-center shadow-md border border-gray-100 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.4)] transition-all duration-500 flex flex-col items-center h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 h-20 w-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] group-hover:scale-110">
                  <MapPin className="h-8 w-8 animate-bounce" />
                </div>
                <h3 className="relative z-10 text-xl font-black text-gray-900 mb-3 group-hover:text-red-600 transition-colors">Our Location</h3>
                <p className="relative z-10 text-gray-600 font-medium leading-relaxed whitespace-pre-line">{websiteSettings?.address || "2/174D, Sattur Road,\nMeenampatti, Sivakasi,\nTamil Nadu - 626189"}</p>
              </div>
            </ScrollReveal>
          </div>

          {/* MOBILE CONTACT VIEW */}
          <div className="grid md:hidden grid-cols-2 gap-4 max-w-md mx-auto">
            <ScrollReveal animation="scale-up" delay={100}>
              <a href="tel:+919042849344" className="group bg-gradient-to-b from-white to-blue-50/50 rounded-2xl p-4 text-center shadow-[0_8px_20px_-5px_rgba(59,130,246,0.4)] border border-blue-200 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center aspect-square h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-active:opacity-10 transition-opacity"></div>
                <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <PhoneCall className="h-8 w-8 animate-[wiggle_2s_infinite]" />
                </div>
                <h3 className="text-base font-black text-gray-900 mb-1">Call Now</h3>
                <span className="text-[12px] font-bold text-blue-600 tracking-wide">+91 9042849344</span>
              </a>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={150}>
              <a href="https://wa.me/919042849344" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-b from-white to-green-50/50 rounded-2xl p-4 text-center shadow-[0_8px_20px_-5px_rgba(37,211,102,0.4)] border border-green-200 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center aspect-square h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-[#25D366] opacity-0 group-active:opacity-10 transition-opacity"></div>
                <div className="h-16 w-16 bg-green-100 text-[#25D366] rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(37,211,102,0.3)]">
                  <WhatsAppIcon className="h-9 w-9 animate-pulse" />
                </div>
                <h3 className="text-base font-black text-gray-900 mb-1">WhatsApp</h3>
                <span className="text-[12px] font-bold text-[#25D366] tracking-wide">Chat Now</span>
              </a>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={200}>
              <div className="group bg-gradient-to-b from-white to-red-50/50 rounded-2xl p-4 text-center shadow-[0_8px_20px_-5px_rgba(239,68,68,0.3)] border border-red-200 transition-all duration-300 flex flex-col items-center justify-center aspect-square h-full">
                <div className="h-14 w-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3 shadow-inner">
                  <MapPin className="h-7 w-7 animate-bounce" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Address</h3>
                <span className="text-[11px] font-bold leading-tight text-gray-600">Sivakasi,<br/>Tamil Nadu</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={250}>
              <div className="group bg-gradient-to-b from-white to-orange-50/50 rounded-2xl p-4 text-center shadow-[0_8px_20px_-5px_rgba(249,115,22,0.3)] border border-orange-200 transition-all duration-300 flex flex-col items-center justify-center aspect-square h-full">
                <div className="h-14 w-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-3 shadow-inner">
                  <Clock className="h-7 w-7 animate-[spin_4s_linear_infinite]" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Hours</h3>
                <span className="text-[11px] font-bold text-orange-600 tracking-wide">8 AM - 10 PM</span>
              </div>
            </ScrollReveal>
          </div>
          </div>
        </section>

      {/* 7. TESTIMONIALS SECTION */}
      <TestimonialMarquee />

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


    </div>
  );
}
