"use client";

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  CreditCard, 
  Bell, 
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Plus,
  Trash2,
  Wifi,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  ArrowRightLeft
} from 'lucide-react';

// --- Types & Utilities ---

interface CardData {
  id: string;
  number: string;
  holder: string;
  expiry: string;
  type: 'credit' | 'debit';
  brand: 'visa' | 'mastercard';
}

const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/.{1,4}/g);
  return matches ? matches.join(' ').substring(0, 19) : v;
};

const formatExpiry = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (v.length >= 2) return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  return v;
};

const getCardBrand = (number: string): 'visa' | 'mastercard' => {
  return number.startsWith('5') ? 'mastercard' : 'visa';
};

// --- Sub-Components ---

const VisaLogo = () => (
  <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
    <path d="M19.9688 2.39062L13.2188 19.125H8.78125L5.15625 5.5C4.96875 4.59375 3.96875 3.5 2.5 3.09375L0.21875 2.39062V1.0625H8.15625C9.125 1.0625 10.0312 1.71875 10.25 2.8125L12.0312 12.375L16.6562 1.0625H19.9688V2.39062ZM37.9375 13.0625C37.9688 8.09375 31.0625 7.84375 31.125 5.625C31.1562 4.9375 31.8125 4.25 33.3438 4.09375C34.0938 4.03125 36.1875 4 38.0938 4.875L38.8125 1.5625C37.8438 1.125 35.875 0.75 33.4375 0.75C27.5625 0.75 23.4062 3.84375 23.375 8.4375C23.3438 11.9062 26.5 13.8437 28.9375 15.0312C31.4375 16.25 32.2812 17.0312 32.2812 18.25C32.2812 20.125 30.0938 20.9688 28.0312 21C26.1562 21.0312 24.1562 20.5938 22.4688 19.8125L21.3438 23.2812C23.2188 24.1562 25.75 24.5 28.25 24.5C34.375 24.5 38.3438 21.5 38.375 16.7812L37.9375 13.0625ZM46.9688 1.0625H43.25C42.0625 1.0625 41.0625 1.75 40.625 2.8125L34.7188 16.8438L38.875 24.2188H43.4375L47.625 2.84375C47.7188 2.0625 47.9375 1.5625 48.0625 1.0625H46.9688ZM15.9062 19.125L18.6562 2.39062H22.9688L20.2188 19.125H15.9062Z" fill="currentColor"/>
  </svg>
);

const MasterCardLogo = () => (
  <svg className="w-12 h-8" viewBox="0 0 32 24" fill="none">
    <circle cx="10" cy="12" r="10" fill="#EB001B" fillOpacity="0.8"/>
    <circle cx="22" cy="12" r="10" fill="#F79E1B" fillOpacity="0.8"/>
    <path d="M16 5.26794C14.7778 6.94025 14.0588 9.02324 14.0588 11.2778C14.0588 13.5323 14.7778 15.6153 16 17.2876C17.2222 15.6153 17.9412 13.5323 17.9412 11.2778C17.9412 9.02324 17.2222 6.94025 16 5.26794Z" fill="#FF5F00"/>
  </svg>
);

const ChipIcon = () => (
  <svg className="w-10 h-10 text-yellow-500/80" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="4" width="20" height="16" rx="2" className="opacity-20" />
    <path d="M7 8H4M7 12H4M7 16H4M17 8H20M17 12H20M17 16H20M10 4V7M14 4V7M10 17V20M14 17V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const PremiumVirtualCard = ({ card, onRemove }: { card: CardData; onRemove: () => void }) => {
  const [showNumber, setShowNumber] = useState(false);
  const isCredit = card.type === 'credit';
  
  return (
    <div className="relative group w-full animate-in fade-in zoom-in duration-500">
      <div 
        className={`relative w-full aspect-[1.586] rounded-[24px] overflow-hidden transition-all duration-700 hover:scale-[1.02] shadow-2xl flex flex-col justify-between p-8 ${
          isCredit 
            ? "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-700/40" 
            : "bg-gradient-to-br from-teal-500 via-emerald-600 to-cyan-700 text-white border border-white/20 shadow-emerald-200/20"
        }`}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="absolute -top-[50%] -right-[50%] w-[100%] h-[100%] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex justify-between items-start">
          <ChipIcon />
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">TDD Bank Global</span>
            <Wifi className="w-6 h-6 rotate-90 opacity-40" />
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 group/number">
          <div className="text-xl sm:text-2xl font-mono tracking-[0.2em] drop-shadow-lg transition-all duration-300">
            {showNumber ? card.number : `•••• •••• •••• ${card.number.slice(-4)}`}
          </div>
          <button 
            onClick={() => setShowNumber(!showNumber)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors opacity-0 group-hover/number:opacity-100"
          >
            {showNumber ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>

        <div className="relative z-10 flex justify-between items-end">
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-[0.25em] opacity-60 font-bold">Holder</div>
            <div className="font-semibold tracking-wide uppercase truncate max-w-[180px] text-sm sm:text-base">{card.holder}</div>
          </div>
          <div className="flex items-end gap-6">
            <div className="space-y-1 text-right">
              <div className="text-[10px] uppercase tracking-[0.25em] opacity-60 font-bold">Expiry</div>
              <div className="font-mono text-sm">{card.expiry}</div>
            </div>
            <div className="mb-0.5 filter drop-shadow-md">
              {card.brand === 'mastercard' ? <MasterCardLogo /> : <VisaLogo />}
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onRemove}
        className="absolute -top-3 -right-3 p-2.5 bg-red-500 text-white rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 focus:opacity-100 scale-75 group-hover:scale-100 z-20 border-4 border-white"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

const AddCardForm = ({ type, onAdd, onCancel }: { type: 'credit' | 'debit', onAdd: (c: CardData) => void, onCancel: () => void }) => {
  const [data, setData] = useState({ number: '', holder: '', expiry: '', cvv: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.number.replace(/\s/g, '').length < 16) {
      setError('Invalid card number length');
      return;
    }
    if (!data.holder.trim()) {
      setError('Cardholder name required');
      return;
    }
    if (data.expiry.length < 5) {
      setError('Expiry date required');
      return;
    }
    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      type,
      brand: getCardBrand(data.number)
    });
  };

  return (
    <div className="w-full aspect-[1.586] rounded-[24px] bg-white border-2 border-dashed border-slate-200 p-8 flex flex-col justify-center animate-in slide-in-from-bottom-4 duration-500 shadow-sm hover:border-indigo-200 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Register New {type}</h3>
          <p className="text-[10px] text-slate-400">Enter details for TDD Bank Virtual Card</p>
        </div>
        <button onClick={onCancel} className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors">Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-[10px] text-red-500 bg-red-50 p-2 rounded-lg flex items-center gap-2 border border-red-100 animate-pulse"><AlertCircle size={12}/> {error}</p>}
        
        <div className="space-y-3">
          <input 
            placeholder="CARD NUMBER"
            value={data.number}
            onChange={(e) => setData({...data, number: formatCardNumber(e.target.value)})}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm tracking-widest"
            maxLength={19}
          />
          <input 
            placeholder="CARDHOLDER FULL NAME"
            value={data.holder}
            onChange={(e) => setData({...data, holder: e.target.value.toUpperCase()})}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-bold uppercase tracking-wider"
          />
          <div className="flex gap-4">
            <input 
              placeholder="MM/YY"
              value={data.expiry}
              onChange={(e) => setData({...data, expiry: formatExpiry(e.target.value)})}
              className="w-1/2 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
              maxLength={5}
            />
            <div className="w-1/2 relative">
              <input 
                placeholder="CVV"
                type="password"
                maxLength={3}
                onChange={(e) => setData({...data, cvv: e.target.value.replace(/\D/g, '')})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
            </div>
          </div>
        </div>
        
        <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-200 flex items-center justify-center gap-2">
          <ShieldCheck size={16}/> Provision Card
        </button>
      </form>
    </div>
  );
};

const EmptySlot = ({ type, onClick }: { type: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full aspect-[1.586] rounded-[24px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group overflow-hidden relative"
  >
    <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
      <Plus size={32} className="group-hover:rotate-90 transition-transform duration-500" />
    </div>
    <div className="text-center">
      <span className="font-black text-xs uppercase tracking-widest block">Add {type}</span>
      <span className="text-[10px] opacity-60 tracking-tight">Generate TDD Bank Virtual Asset</span>
    </div>
  </button>
);

// --- Main Application Shell ---

const App = () => {
  const [cards, setCards] = useState<{ credit: CardData | null, debit: CardData | null }>({
    credit: { id: 'c1', number: '5421 8890 1234 5678', holder: '------ ------', expiry: '12/28', type: 'credit', brand: 'mastercard' },
    debit: null
  });
  const [adding, setAdding] = useState<'credit' | 'debit' | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-40 px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">T</div>
            <div>
              <span className="text-2xl font-black tracking-tighter text-slate-800 block leading-tight">TDD Bank</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Digital Assets</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Encrypted Session</span>
            </div>
            <button className="p-3 text-slate-500 hover:bg-slate-100 rounded-2xl transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-12 h-12 rounded-2xl bg-slate-100 p-0.5 border border-slate-200 hover:scale-105 transition-transform cursor-pointer overflow-hidden shadow-sm">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="p-8 max-w-7xl mx-auto space-y-10">
        {/* Statistics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Total Spending', value: '₹12,840', color: 'indigo', icon: TrendingUp },
             { label: 'Available Credit', value: '₹50,000', color: 'emerald', icon: ShieldCheck },
             { label: 'Checking Balance', value: '₹8,250', color: 'cyan', icon: CreditCard },
             { label: 'Account Health', value: 'Excellent', color: 'amber', icon: ShieldCheck },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
               <div className={`w-12 h-12 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                 <stat.icon size={24}/>
               </div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
               <div className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</div>
             </div>
           ))}
        </div>

        {/* Card Management Interface */}
        <section className="bg-white rounded-[40px] p-8 sm:p-12 border border-slate-100 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Manage My Cards</h2>
              <p className="text-sm text-slate-500 font-medium max-w-md">Instantly provision virtual cards for global spending at TDD Bank.</p>
            </div>
            <div className="flex gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 items-center px-4">
               <Lock size={14} className="text-slate-400"/>
               <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">AES-256 Protected</span>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Credit Slot */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-slate-900 rounded-full"></div>
                  <span className="text-xs font-black text-slate-800 uppercase tracking-widest">TDD Credit Line</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">PRIMARY SLOT</span>
              </div>
              {adding === 'credit' ? (
                <AddCardForm type="credit" onCancel={() => setAdding(null)} onAdd={(c) => { setCards({...cards, credit: c}); setAdding(null); }} />
              ) : cards.credit ? (
                <PremiumVirtualCard card={cards.credit} onRemove={() => setCards({...cards, credit: null})} />
              ) : (
                <EmptySlot type="Credit" onClick={() => setAdding('credit')} />
              )}
            </div>

            {/* Debit Slot */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs font-black text-slate-800 uppercase tracking-widest">TDD Checking</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">SECONDARY SLOT</span>
              </div>
              {adding === 'debit' ? (
                <AddCardForm type="debit" onCancel={() => setAdding(null)} onAdd={(c) => { setCards({...cards, debit: c}); setAdding(null); }} />
              ) : cards.debit ? (
                <PremiumVirtualCard card={cards.debit} onRemove={() => setCards({...cards, debit: null})} />
              ) : (
                <EmptySlot type="Debit" onClick={() => setAdding('debit')} />
              )}
            </div>
          </div>

          {/* Bottom Security Box */}
          <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-center gap-6">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                <Lock size={24} />
             </div>
             <div className="flex-1 text-center sm:text-left">
                <h4 className="font-black text-xs uppercase tracking-widest text-slate-800 mb-1">TDD Bank Security Protocol</h4>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Your virtual cards are strictly protected. CVV numbers are regenerated for every session and are never displayed without active multi-factor authentication. Freeze your cards instantly if you notice suspicious activity.</p>
             </div>
             <div className="flex gap-3">
               <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-800 hover:border-red-500 hover:text-red-600 transition-all">Freeze All</button>
               <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">View History</button>
             </div>
          </div>
        </section>

        {/* Promotion */}
        <section className="bg-slate-900 rounded-[40px] p-10 text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -mr-48 -mt-48 transition-all group-hover:scale-110" />
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                 <h3 className="text-3xl font-black tracking-tighter mb-2">Upgrade to Physical Titanium</h3>
                 <p className="text-indigo-100/60 font-medium text-sm">Experience the weight of true luxury. Order your physical TDD Bank card today.</p>
              </div>
              <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-50 transition-all flex items-center gap-3">
                 Claim Now <ChevronRight size={18} />
              </button>
           </div>
        </section>
      </main>

      <footer className="p-12 text-center border-t border-slate-100 mt-10">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">© 2025 TDD Banking Group. All Rights Reserved. Member FDIC.</p>
      </footer>
    </div>
  );
};

// --- Render Entry Point ---

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;
