import React from "react";
import { Star, ThumbsUp } from "lucide-react";

export default function ProductReviews() {
  const reviews = [
    {
      id: 1,
      name: "Ramesh K.",
      date: "Oct 15, 2025",
      rating: 5,
      title: "Excellent Quality!",
      comment: "The colors were vibrant and the sound was perfect. Sky Crackers never disappoints with their premium Sivakasi quality. Will definitely order again next Diwali.",
      verified: true
    },
    {
      id: 2,
      name: "Suresh P.",
      date: "Nov 2, 2025",
      rating: 4,
      title: "Very Good, safe packaging",
      comment: "Packaging was extremely safe. Reached Chennai in 2 days. One or two sparklers didn't light up but overall the display items were spectacular.",
      verified: true
    },
    {
      id: 3,
      name: "Arun V.",
      date: "Nov 10, 2025",
      rating: 5,
      title: "Best value for money",
      comment: "Compared to local shops, the price and quality here is unmatched. The kids absolutely loved it.",
      verified: true
    }
  ];

  return (
    <div className="mt-16 pt-16 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-1 text-primary">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.8 / 5</span>
            <span className="text-zinc-500 text-sm">({reviews.length} reviews)</span>
          </div>
        </div>
        <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 transition-colors text-sm">
          Write a Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-zinc-700"}`} />
                ))}
              </div>
              <span className="text-xs text-zinc-500 font-medium">{review.date}</span>
            </div>
            
            <h4 className="text-white font-bold mb-2 text-sm">{review.title}</h4>
            <p className="text-zinc-400 text-sm font-light leading-relaxed flex-1 mb-6">
              &quot;{review.comment}&quot;
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold text-zinc-400">
                  {review.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">{review.name}</span>
                  {review.verified && (
                    <span className="text-[10px] text-green-500 font-medium">Verified Buyer</span>
                  )}
                </div>
              </div>
              <button className="text-zinc-500 hover:text-primary transition-colors flex items-center gap-1 text-xs">
                <ThumbsUp className="h-3 w-3" /> Helpful
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
