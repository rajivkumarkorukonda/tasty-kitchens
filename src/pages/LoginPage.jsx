import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 10) {
      setError('Enter your name and a valid 10-digit mobile number.');
      return;
    }
    login({ name: name.trim(), phone: phone.trim() });
    navigate('/');
  };

  const handleDemoLogin = () => {
    login({ name: 'Foodie Guest', phone: '9876543210' });
    navigate('/');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      <div className="flex flex-col justify-center px-6 sm:px-14 lg:px-20 py-12">
        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-brand text-white flex items-center justify-center shadow-md">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              Tasty<span className="text-brand">Kitchens</span>
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900">Hungry? Order in seconds.</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Real-time restaurant discovery, live order tracking, and instant kitchen notifications.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Arjun Sharma"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Mobile Number
              </label>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
              />
            </div>

            {error && <p className="text-xs font-medium text-rose-600">{error}</p>}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand text-white font-bold text-sm hover:bg-brand-dark transition shadow-md shadow-orange-200"
            >
              Continue to Tasty Kitchens
            </button>
          </form>

          <div className="mt-5">
            <button
              onClick={handleDemoLogin}
              className="w-full py-3 rounded-xl border-2 border-dashed border-orange-300 bg-orange-50/60 text-brand font-bold text-sm hover:bg-orange-100/70 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Instant 1-Click Demo Login
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
          alt="Gourmet spread"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent flex flex-col justify-end p-14 text-white">
          <p className="text-brand font-bold uppercase tracking-widest text-xs mb-2">
            Real-Time Food Delivery
          </p>
          <h2 className="text-4xl font-extrabold leading-tight">
            From your favorite local kitchens straight to your doorstep.
          </h2>
        </div>
      </div>
    </div>
  );
}