import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Clock, PhoneCall, MapPin, MessageCircle, PlayCircle, Star, Quote, Package } from "lucide-react";
import FeaturedProductCard from "@/components/public/home/FeaturedProductCard";
import HeroSlider from "@/components/public/home/HeroSlider";
import ScrollReveal from "@/components/public/ui/ScrollReveal";
import { getFeaturedProducts, getBestSellingProducts, getAllCategories } from "@/lib/services/public/product.service";
import { HOMEPAGE_IMAGES } from "@/lib/constants/homepage-images";
import { CATEGORY_IMAGES } from "@/lib/constants/category-images";

export const metadata = {
  title: "Sky Crackers | Buy Crackers Online Sivakasi",
  description: "Celebrate every moment with premium quality fireworks from Sivakasi. Shop our festive collection today.",
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
    <div className="flex flex-col w-full bg-white text-gray-900 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] lg:h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        <HeroSlider />
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="container relative z-20 mx-auto px-4 text-center mt-10">
          <ScrollReveal animation="fade-up" duration="slow" delay={100}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 text-primary text-xs md:text-sm font-extrabold uppercase mb-6 shadow-lg">
              <Sparkles className="h-4 w-4 text-secondary-foreground" />
              100% Sivakasi Fireworks
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="scale-up" duration="slow" delay={300}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-xl">
              Light Up Your <br />
              <span className="text-secondary drop-shadow-lg">
                Celebrations!
              </span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" duration="normal" delay={500}>
            <p className="text-lg md:text-2xl text-white/95 font-medium mb-10 max-w-2xl mx-auto drop-shadow-md">
              Buy premium quality firecrackers online direct from Sivakasi at wholesale prices.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop" className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-green-700 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1 flex items-center justify-center">
                Explore Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/shop?category=gift-boxes" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 text-lg font-bold rounded-full hover:bg-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center border border-gray-200">
                View Combo Packs
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. WHY CHOOSE US / FEATURES (Cracker City Style) */}
      <section className="py-12 bg-white relative z-30 -mt-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">
              Watch Our Excellence
            </h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Premium Quality in Action</p>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-4" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal animation="fade-right">
              <a href="https://youtube.com/@skycrackersofficial" target="_blank" rel="noopener noreferrer" className="block bg-gray-50 p-2 rounded-3xl shadow-lg border border-gray-200 group cursor-pointer relative overflow-hidden aspect-video">
                <Image
                  src={HOMEPAGE_IMAGES.youtube}
                  alt="Sky Crackers YouTube Channel"
                  fill
                  className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 rounded-2xl bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 bg-red-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal animation="fade-left">
              <div className="flex flex-col justify-center h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">See Our Crackers In Action</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Want to know exactly what you are buying? Watch our high-quality video demonstrations on YouTube. Experience the color, sound, and brilliance of our premium fireworks before making a choice.
                </p>
                <a href="https://youtube.com/@skycrackersofficial" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-md w-max">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  Visit YouTube Channel
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* 7. TESTIMONIALS SECTION */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">
              What Our Customers Say
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300">
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
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300 relative overflow-hidden">
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
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300">
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

