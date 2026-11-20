import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, Heart, Tag, Filter, Bike } from 'lucide-react';
import { CATEGORIES, FALLBACK_IMG, OFFERS, ORDER_STAGES, RESTAURANTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { favorites, toggleFavorite, notify, activeOrder, setTrackingOrderId } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [pureVegOnly, setPureVegOnly] = useState(false);
  const [rating45Plus, setRating45Plus] = useState(false);

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((res) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        res.name.toLowerCase().includes(q) ||
        res.cuisine.toLowerCase().includes(q) ||
        res.menu.some((m) => m.name.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === 'All' || res.categories.includes(selectedCategory);
      const matchesVeg = !pureVegOnly || res.pureVeg;
      const matchesRating = !rating45Plus || res.rating >= 4.5;

      return matchesSearch && matchesCategory && matchesVeg && matchesRating;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'time') return a.deliveryTime - b.deliveryTime;
      if (sortBy === 'costLow') return a.costForTwo - b.costForTwo;
      return 0;
    });
  }, [search, selectedCategory, sortBy, pureVegOnly, rating45Plus]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-20">
      {/* Mobile Active Order Banner */}
      {activeOrder && (
        <div
          onClick={() => setTrackingOrderId(activeOrder.id)}
          className="md:hidden cursor-pointer bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center animate-pulse">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-orange-300 font-semibold">LIVE ORDER • {activeOrder.id}</p>
              <p className="text-sm font-bold">{ORDER_STAGES[activeOrder.statusIndex].label}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500 text-xs font-bold">
            {ORDER_STAGES[activeOrder.statusIndex].eta} min
          </span>
        </div>
      )}

      {/* Hero Offers Carousel */}
      <section>
        <div className="grid md:grid-cols-3 gap-4">
          {OFFERS.map((offer) => (
            <div
              key={offer.id}
              onClick={() => {
                navigator.clipboard?.writeText(offer.code);
                notify('Coupon Copied!', `Apply ${offer.code} at checkout.`, 'success');
              }}
              className={`cursor-pointer rounded-2xl p-5 text-white bg-gradient-to-r ${offer.gradient} shadow-md hover:scale-[1.01] transition flex flex-col justify-between min-h-[136px]`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur px-2.5 py-1 rounded-full">
                  {offer.badge}
                </span>
                <Tag className="w-4 h-4 opacity-80" />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-extrabold">{offer.title}</h3>
                <p className="text-xs text-white/90 mt-0.5">{offer.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's on your mind — Categories */}
      <section>
        <h2 className="text-lg font-extrabold text-slate-900 mb-3">What&apos;s on your mind?</h2>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold border transition ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-brand'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Search + Filter Toolbar */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for restaurants, biryani, dosa, pizza..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setPureVegOnly((v) => !v)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
              pureVegOnly
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Pure Veg
          </button>

          <button
            onClick={() => setRating45Plus((v) => !v)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
              rating45Plus
                ? 'bg-brand text-white border-brand'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Ratings 4.5+
          </button>

          <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-3 py-2 bg-white">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-transparent focus:outline-none"
            >
              <option value="rating">Sort: Rating High</option>
              <option value="time">Sort: Fastest Delivery</option>
              <option value="costLow">Sort: Cost Low to High</option>
            </select>
          </div>
        </div>
      </section>

      {/* Restaurant Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-slate-900">
            Top Restaurants Near You ({filteredRestaurants.length})
          </h2>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-lg font-bold text-slate-800">No matching kitchens found</p>
            <p className="text-sm text-slate-500 mt-1">
              Try clearing your search or switching off one of the filters.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setPureVegOnly(false);
                setRating45Plus(false);
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((res) => {
              const isFav = favorites.includes(res.id);
              return (
                <div
                  key={res.id}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <Link to={`/restaurant/${res.id}`}>
                      <img
                        src={res.image}
                        alt={res.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMG;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </Link>
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
                    <span className="absolute bottom-3 left-3 text-white font-extrabold text-sm tracking-tight">
                      {res.offerText}
                    </span>
                    <button
                      onClick={() => toggleFavorite(res.id, res.name)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:scale-110 transition"
                      aria-label="Toggle Favorite"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  </div>

                  <Link to={`/restaurant/${res.id}`} className="p-4 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-base text-slate-900 group-hover:text-brand transition">
                        {res.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shrink-0">
                        <Star className="w-3 h-3 fill-white" />
                        {res.rating}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 truncate mt-1">{res.cuisine}</p>

                    <div className="mt-auto pt-3 flex items-center justify-between text-xs font-semibold text-slate-600 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand" />
                        {res.deliveryTime} mins
                      </span>
                      <span>₹{res.costForTwo} for two</span>
                      <span className="text-slate-400">{res.location}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}