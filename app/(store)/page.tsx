import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Clock, PhoneCall, MapPin, MessageCircle, PlayCircle, Star, Quote, Package } from "lucide-react";
import FeaturedProductCard from "@/components/public/home/FeaturedProductCard";
import HeroSlider from "@/components/public/home/HeroSlider";
import ScrollReveal from "@/components/public/ui/ScrollReveal";
import { getFeaturedProducts, getBestSellingProducts, getAllCategories } from "@/lib/services/public/product.service";
import { getHeroBanners, getVideoContent, getTestimonials, getSEOSettings } from "@/lib/services/cms/cms.service";
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

export default async function HomePage() {
  const [featuredProducts, bestSellers, dbCategories, heroBanners, videos, testimonials] = await Promise.all([
    getFeaturedProducts(),
    getBestSellingProducts(),
    getAllCategories(),
    getHeroBanners(true),
    getVideoContent(true),
    getTestimonials(true)
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

  const displayBanners = heroBanners && heroBanners.length > 0 ? heroBanners : [
    {
      id: "default-1",
      image: "/images/home/slider-1.jpg",
      title: "Celebrate Every Festival\n<span class=\"text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 drop-shadow-lg inline-block animate-pulse\">With Sky Crackers</span>",
      subtitle: "Buy premium quality firecrackers online direct from Sivakasi at wholesale prices.",
      buttonText: "Shop Now",
      buttonLink: "/shop"
    },
    {
      id: "default-2",
      image: "/images/home/slider-2.jpg",
      title: "Celebrate Every Festival\n<span class=\"text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 drop-shadow-lg inline-block animate-pulse\">With Sky Crackers</span>",
      subtitle: "Buy premium quality firecrackers online direct from Sivakasi at wholesale prices.",
      buttonText: "Shop Now",
      buttonLink: "/shop"
    },
    {
      id: "default-3",
      image: "/images/home/slider-3.jpg",
      title: "Celebrate Every Festival\n<span class=\"text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 drop-shadow-lg inline-block animate-pulse\">With Sky Crackers</span>",
      subtitle: "Buy premium quality firecrackers online direct from Sivakasi at wholesale prices.",
      buttonText: "Shop Now",
      buttonLink: "/shop"
    },
    {
      id: "default-4",
      image: "/images/home/slider-4.jpg",
      title: "Celebrate Every Festival\n<span class=\"text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 drop-shadow-lg inline-block animate-pulse\">With Sky Crackers</span>",
      subtitle: "Buy premium quality firecrackers online direct from Sivakasi at wholesale prices.",
      buttonText: "Shop Now",
      buttonLink: "/shop"
    }
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
    <div className="flex flex-col w-full bg-white text-gray-900 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] lg:h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        <HeroSlider banners={displayBanners} />
      </section>

        {/* 2. WHY CHOOSE US / FEATURES (Cracker City Style) */}
      <section className="py-12 bg-white relative z-30 -mt-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="group bg-white hover:bg-primary rounded-[2rem] p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 h-full flex flex-col items-center justify-center hover:-translate-y-2 transition-all duration-300">
                <Truck className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors" />
                <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-white mb-2 uppercase transition-colors">Fast Delivery</h3>
                <p className="text-sm text-gray-500 group-hover:text-white/90 font-medium transition-colors">Your parcel will be delivered 3 to 5 working days</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="group bg-white hover:bg-primary rounded-[2rem] p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 h-full flex flex-col items-center justify-center hover:-translate-y-2 transition-all duration-300">
                <Sparkles className="h-10 w-10 text-secondary-foreground group-hover:text-white mb-4 transition-colors" />
                <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-white mb-2 uppercase transition-colors">Best Deals</h3>
                <p className="text-sm text-gray-500 group-hover:text-white/90 font-medium transition-colors">We provide up to 80% discount on all products</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="group bg-white hover:bg-primary rounded-[2rem] p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 h-full flex flex-col items-center justify-center hover:-translate-y-2 transition-all duration-300">
                <Package className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors" />
                <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-white mb-2 uppercase transition-colors">Packaging</h3>
                <p className="text-sm text-gray-500 group-hover:text-white/90 font-medium transition-colors">Goods will be packed in poly bundle carton box</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="group bg-white hover:bg-primary rounded-[2rem] p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 h-full flex flex-col items-center justify-center hover:-translate-y-2 transition-all duration-300">
                <Clock className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors" />
                <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-white mb-2 uppercase transition-colors">Working Hours</h3>
                <p className="text-sm text-gray-500 group-hover:text-white/90 font-medium transition-colors">You can purchase on all days from 6:00 AM to 11:50 PM</p>
              </div>
            </ScrollReveal>
            
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">
              Shop By Category
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {displayCategories.map((category, index) => (
              <ScrollReveal key={category.id} animation="fade-up" delay={index * 100}>
                <Link href={`/shop?category=${category.slug}`} className="group block">
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white shadow-sm border border-gray-100 group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-secondary transition-colors duration-300">
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

      {/* 4. EXCLUSIVE DISCOUNT BANNER */}
      <section className="py-20 bg-white px-4 md:px-6">
        <div className="container mx-auto">
          <ScrollReveal animation="scale-up">
            <div className="relative rounded-[3rem] overflow-hidden bg-[#FEF2F2] flex flex-col md:flex-row items-center justify-between min-h-[400px] shadow-lg border border-red-100 group">
              <div className="absolute inset-0 z-0">
                <Image
                  src={HOMEPAGE_IMAGES.banners.diwali}
                  alt="Exclusive Offers"
                  fill
                  className="object-cover transition-transform duration-[1500ms] group-hover:scale-105 opacity-20 mix-blend-multiply"
                />
              </div>
              
              <div className="relative z-10 w-full md:w-1/2 p-10 md:p-16">
                <span className="text-red-600 font-extrabold tracking-wider uppercase text-sm mb-2 block">
                  Exclusive Offer
                </span>
                <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-2 uppercase leading-none">
                  80% <span className="text-3xl md:text-5xl">Discount</span>
                </h2>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 uppercase">
                  On All Crackers
                </h3>
                <p className="text-gray-600 text-lg mb-8 font-medium leading-relaxed max-w-lg">
                  In Sivakasi, we are a leading cracker online shopping website. We offer the BEST QUALITY crackers all over India at unbeatable pricing. 
                </p>
                <Link href="/shop" className="inline-flex px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-green-700 transition-all shadow-lg hover:shadow-primary/30">
                  Shop Now
                </Link>
              </div>
              
              <div className="relative z-10 w-full md:w-1/2 h-[300px] md:h-full min-h-[400px]">
                 <Image
                    src={CATEGORY_IMAGES.giftBoxes}
                    alt="Crackers Collection"
                    fill
                    className="object-contain p-8 drop-shadow-2xl"
                  />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
                  Premium Sivakasi Fireworks
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase">
                  Featured Collection
                </h2>
              </div>
              <Link href="/shop" className="inline-flex items-center text-primary font-bold hover:text-green-800 transition-colors bg-white border border-gray-200 hover:border-primary px-6 py-3 rounded-full shadow-sm">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left: Video */}
            <div className="w-full lg:w-1/2 relative">
              <div className="grid grid-cols-1 gap-6">
                {displayVideos.slice(0, 1).map((video: any, i: number) => (
                  <ScrollReveal key={video.id} animation="fade-right">
                    <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block bg-white p-2 rounded-[2rem] shadow-2xl border border-gray-200 group cursor-pointer relative overflow-hidden aspect-video">
                      <Image
                        src={video.thumbnailUrl || HOMEPAGE_IMAGES.youtube}
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
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tight leading-[1.1]">
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
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <ScrollReveal animation="fade-right">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Image src="/images/about-fireworks.jpg" alt="Sky Crackers Festive Fireworks" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Quality & Safety First</h3>
                    <p className="text-white/80 text-sm">We strictly adhere to all safety guidelines.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div className="w-full lg:w-1/2">
              <ScrollReveal animation="fade-left">
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">ABOUT SKY CRACKERS</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Bringing Joy & Light To <span className="text-secondary">Every Celebration</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  Welcome to Sky Crackers! Located in the heart of Sivakasi, the fireworks capital of India, we take immense pride in manufacturing and supplying premium quality crackers that make your celebrations truly memorable.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  With years of experience in the pyrotechnic industry, our mission is to deliver safe, vibrant, and innovative fireworks right to your doorstep. We offer an extensive range of products including sparklers, flower pots, rockets, and exclusive gift boxes at unbeatable wholesale prices. 
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-bold text-gray-900">100% Safe</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-bold text-gray-900">Secure Packing</span>
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">
              Contact Us
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}

      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="text-yellow-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">TESTIMONIALS</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase leading-none tracking-tighter">
              <span className="text-[#2e7d32] block md:inline">WHAT OUR </span>
              <span className="text-[#827717] block md:inline">CUSTOMERS SAY</span>
            </h2>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 max-w-6xl mx-auto pb-4 custom-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
            {/* Testimonial 1 */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="w-[85vw] md:w-auto shrink-0 snap-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300">
                <div className="flex text-yellow-400 mb-6">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <p className="text-gray-600 mb-6 font-medium italic">"Best crackers in Sivakasi. The wholesale price is very low and quality is top notch. Kids enjoyed the Diwali very well."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-lg">M</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Muthu Kumar</h4>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Chennai</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Testimonial 2 */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="w-[85vw] md:w-auto shrink-0 snap-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-pink-50 rounded-bl-full -z-10" />
                <div className="flex text-yellow-400 mb-6">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <p className="text-gray-600 mb-6 font-medium italic">"I was worried about online ordering but the packing was amazing. All products arrived safely. Definitely recommending to friends!"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center font-bold text-lg">S</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Sangeetha</h4>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Coimbatore</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Testimonial 3 */}
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="w-[85vw] md:w-auto shrink-0 snap-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300">
                <div className="flex text-yellow-400 mb-6">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <p className="text-gray-600 mb-6 font-medium italic">"Amazing discounts. Almost 80% off on MRP for wholesale buying. They delivered on time without any missing items. Very happy."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">R</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Ramesh</h4>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Madurai</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  );
}


