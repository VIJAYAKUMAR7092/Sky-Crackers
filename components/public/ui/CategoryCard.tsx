import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: any;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const image = category.imageUrl || "/placeholder-category.jpg"; // Placeholder logic
  
  return (
    <Link 
      href={`/shop?category=${category.slug}`}
      className="group relative h-[300px] rounded-2xl overflow-hidden block"
    >
      <div className="absolute inset-0 bg-secondary/20 z-0">
        <Image 
          src={image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-overlay group-hover:opacity-80"
        />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-sm text-zinc-300 line-clamp-2 mb-4 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {category.description}
          </p>
        )}
        <div className="flex items-center text-primary font-semibold text-sm uppercase tracking-wider opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
          Explore <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
      
      {/* Premium Border */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-2xl z-30 transition-colors pointer-events-none" />
    </Link>
  );
}
