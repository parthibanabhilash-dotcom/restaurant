import React from 'react';
import { categories } from '../data/categories';
import { 
  Utensils, 
  Beef, 
  Pizza, 
  Soup, 
  Wheat, 
  Salad, 
  Cake, 
  Coffee 
} from 'lucide-react';

const iconMap = {
  Utensils,
  Beef,
  Pizza,
  Soup,
  Wheat,
  Salad,
  Cake,
  Coffee,
};

export const CategoryPills = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const IconComponent = iconMap[cat.icon] || Utensils;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-200 shrink-0 shadow-sm ${
                isSelected
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-[1.02]'
                  : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200/80'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-orange-500'
                }`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              <span>{cat.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-stone-950/20 text-white' : 'bg-stone-100 text-stone-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

