import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Search, Plus, Minus, ShoppingBag, MapPin } from 'lucide-react';
import { FALLBACK_IMG, RESTAURANTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function RestaurantPage() {
  const { id } = useParams();
  const { cart, addItemToCart, updateItemQty, getCartTotals } = useApp();

  const restaurant = RESTAURANTS.find((r) => r.id === id);
  const [menuSearch, setMenuSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  if (!restaurant) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold">Restaurant not found</h2>
        <Link to="/" className="inline-block mt-4 text-brand font-bold underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const filteredMenu = restaurant.menu.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(menuSearch.trim().toLowerCase());
    const matchesVeg = !vegOnly || item.isVeg;
    return matchesSearch && matchesVeg;
  });

  const getQty = (itemId) => {
    if (cart.restaurantId !== restaurant.id) return 0;
    const found = cart.items.find((i) => i.id === itemId);
    return found ? found.qty : 0;
  };

  const { itemCount, itemTotal } = getCartTotals();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-brand mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Restaurants
      </Link>

      {/* Dark Hero Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center shadow-lg">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMG;
          }}
          className="w-full sm:w-44 h-36 object-cover rounded-2xl shrink-0"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold">{restaurant.name}</h1>
            {restaurant.pureVeg && (
              <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                PURE VEG
              </span>
            )}
          </div>
          <p className="text-slate-300 text-sm mt-1">{restaurant.cuisine}</p>
          <p className="text-slate-400 text-xs mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {restaurant.location}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-600 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-white" /> {restaurant.rating} ({restaurant.reviewsCount})
            </span>
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold text-xs">
              <Clock className="w-4 h-4 text-brand" /> {restaurant.deliveryTime} mins
            </span>
            <span className="text-slate-200 font-semibold text-xs">
              ₹{restaurant.costForTwo} for two
            </span>
          </div>
        </div>
      </div>

      {/* Menu Controls */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={menuSearch}
            onChange={(e) => setMenuSearch(e.target.value)}
            placeholder="Search dishes in this menu..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <button
          onClick={() => setVegOnly((v) => !v)}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition ${
            vegOnly
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white text-slate-700 border-slate-200'
          }`}
        >
          Veg Only
        </button>
      </div>

      {/* Menu List */}
      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900">
          Recommended Menu ({filteredMenu.length})
        </h2>

        {filteredMenu.map((item) => {
          const qty = getQty(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex justify-between gap-4 hover:shadow-md transition"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                    />
                  </span>
                  {item.bestseller && (
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                      ★ Bestseller
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 mt-1.5">{item.name}</h3>
                <p className="font-extrabold text-slate-900 text-sm mt-0.5">₹{item.price}</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>

              <div className="relative w-28 sm:w-36 shrink-0 flex flex-col items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                  className="w-28 sm:w-36 h-24 sm:h-28 object-cover rounded-2xl"
                />

                <div className="-mt-4 z-10">
                  {qty === 0 ? (
                    <button
                      onClick={() => addItemToCart(restaurant, item)}
                      className="px-6 py-1.5 rounded-xl bg-white border border-slate-200 shadow-md text-emerald-600 font-extrabold text-xs hover:bg-emerald-600 hover:text-white transition"
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-emerald-600 text-white shadow-md font-bold text-xs">
                      <button onClick={() => updateItemQty(item.id, -1)} aria-label="Decrease">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span>{qty}</span>
                      <button onClick={() => updateItemQty(item.id, 1)} aria-label="Increase">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Floating Cart Bar */}
      {itemCount > 0 && (
        <div className="fixed bottom-4 inset-x-4 max-w-3xl mx-auto z-30">
          <Link
            to="/cart"
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl px-5 py-3.5 shadow-2xl flex items-center justify-between transition"
          >
            <div>
              <p className="font-extrabold text-sm">
                {itemCount} {itemCount === 1 ? 'Item' : 'Items'} | ₹{itemTotal}
              </p>
              <p className="text-xs text-emerald-100">From {cart.restaurantName}</p>
            </div>
            <span className="flex items-center gap-2 font-extrabold text-sm">
              View Cart <ShoppingBag className="w-4 h-4" />
            </span>
          </Link>
        </div>
      )}
    </main>
  );
}