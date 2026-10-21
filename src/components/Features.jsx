import React from 'react';
import { Zap, Leaf, Award, Box, HeartHandshake, ShieldCheck } from 'lucide-react';
import { restaurantStats } from '../data/reviews';

const featureList = [
  {
    icon: Zap,
    title: 'Super-Fast Express Delivery',
    description: 'Hot meals packed in insulated containers dispatched within minutes and delivered straight to your door in 25-30 mins.',
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Leaf,
    title: 'Farm-to-Table Organic',
    description: 'We partner with local certified organic growers to source pesticide-free produce, fresh herbs, and premium meats every morning.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Award,
    title: 'Master Culinary Team',
    description: 'Every recipe is curated and perfected by award-winning chefs who obsess over balance, umami, and presentation.',
    color: 'from-amber-500 to-yellow-500',
    bg: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Box,
    title: '100% Eco-Smart Packaging',
    description: 'Zero single-use plastics. Our meal packaging is completely biodegradable, microwave-safe, and preserves optimum temperatures.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 text-blue-600',
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-black tracking-wider uppercase">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>The EatNow Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-stone-900 font-sans">
            Why Food Lovers Choose Us Every Day
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            We believe eating great food shouldn't be complicated. Here is how we redefine the modern culinary experience.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {featureList.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-3xl bg-stone-50 border border-stone-200/80 hover:bg-white hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${feat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Strip */}
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-12 text-white border border-stone-800 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-stone-800">
            {restaurantStats.map((stat, i) => (
              <div key={i} className="pt-4 md:pt-0 first:pt-0">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-stone-400 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

