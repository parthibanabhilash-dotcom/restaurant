import React, { useState, useMemo } from 'react';
import { dishes } from '../data/dishes';
import { CategoryPills } from './CategoryPills';
import { DishCard } from './DishCard';
import { Search, SlidersHorizontal, Sparkles, Flame, Leaf, RotateCcw } from 'lucide-react';

export const MenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg', 'spicy', 'chef'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'

  // Filter and sort dishes
  const filteredDishes = useMemo(() => {
    return dishes
      .filter((dish) => {
        // Category match
        if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
          return false;
        }

        // Search match
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = dish.name.toLowerCase().includes(q);
          const matchDesc = dish.description.toLowerCase().includes(q);
          const matchCategory = dish.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCategory) return false;
        }

        // Dietary & special filter
        if (dietaryFilter === 'veg' && dish.dietary !== 'veg') return false;
        if (dietaryFilter === 'non-veg' && dish.dietary !== 'non-veg') return false;
        if (dietaryFilter === 'spicy' && (!dish.spicyLevel || dish.spicyLevel === 0)) return false;
        if (dietaryFilter === 'chef' && !dish.isChefSpecial) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [selectedCategory, searchQuery, dietaryFilter, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setDietaryFilter('all');
    setSortBy('featured');
  };

  return (
    <section id="menu" className="py-20 bg-stone-50 text-stone-900 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Food Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-stone-900 font-sans">
            Crafted with Passion & Freshness
          </h2>
          <p className="text-stone-600 text-base">
            Every dish is prepared to order using local organic produce, authentic spices, and time-honored culinary techniques.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="mb-8">
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Search, Dietary Chips & Sorting Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/80 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Wagyu, Truffle, Pizza, Ramen, Salmon)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700 bg-stone-200 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-stone-400 hidden sm:inline uppercase">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              >
                <option value="featured">Featured Dishes</option>
                <option value="rating">Highest Rated (★)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Dietary Filters Pill Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar text-xs">
            <span className="font-bold text-stone-400 uppercase tracking-wider text-[11px] mr-1 hidden sm:inline">
              Filter:
            </span>

            {[
              { id: 'all', label: 'All Items' },
              { id: 'veg', label: '🌱 Vegetarian' },
              { id: 'non-veg', label: '🥩 Non-Veg' },
              { id: 'spicy', label: '🌶️ Spicy' },
              { id: 'chef', label: '⭐ Chef Specials' },
            ].map((chip) => {
              const active = dietaryFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setDietaryFilter(chip.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}

            {(searchQuery || dietaryFilter !== 'all' || selectedCategory !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="ml-auto inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-bold text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold text-stone-500">
            Showing <span className="text-stone-900">{filteredDishes.length}</span> delicious dishes
          </p>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-2xl">
              🍽️
            </div>
            <h3 className="text-xl font-bold text-stone-900">No dishes found matching your criteria</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              Try adjusting your search query, choosing a different category, or removing dietary filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/20"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

