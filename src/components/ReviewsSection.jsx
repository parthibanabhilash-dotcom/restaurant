import React from 'react';
import { reviews } from '../data/reviews';
import { Star, MessageSquareQuote, CheckCircle, ThumbsUp } from 'lucide-react';

export const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 bg-stone-100/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-black tracking-wider uppercase">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Community Love</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-stone-900 font-sans">
            Loved by Over 50,000+ Foodies
          </h2>
          <p className="text-stone-600 text-base">
            Don't just take our word for it. Hear what food critics and regular guests have to say about EatNow.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-7 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/30"
                    />
                    <div>
                      <h4 className="font-extrabold text-stone-900 text-base flex items-center gap-1.5">
                        {rev.name}
                        <CheckCircle className="w-4 h-4 text-emerald-500" title="Verified Customer" />
                      </h4>
                      <p className="text-xs text-stone-400 font-medium">{rev.role}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Review Body */}
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic relative">
                  "{rev.comment}"
                </p>
              </div>

              {/* Review Footer with Dish Tag */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-400">{rev.date}</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-50 text-orange-700 font-bold">
                  Ordered: {rev.dish}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

