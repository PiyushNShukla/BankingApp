'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import { useAuth } from '@/context/AuthContext';
import NavbarWrapper from '@/components/wrapper/NavbarWrapper';
import { 
  Search, 
  Smartphone, 
  Zap, 
  Droplets, 
  Wifi, 
  Tv, 
  CreditCard, 
  ShieldCheck, 
  Car, 
  History,
  Clock,
  ArrowRight,
  Plus
} from 'lucide-react';

export default function BillPaymentsPage() {
  const router = useRouter();
  const { userName, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'mobile', name: 'Mobile', icon: <Smartphone />, color: 'text-orange-600', bg: 'bg-orange-100' },
    { id: 'electricity', name: 'Electricity', icon: <Zap />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { id: 'water', name: 'Water', icon: <Droplets />, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'broadband', name: 'Broadband', icon: <Wifi />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { id: 'dth', name: 'DTH', icon: <Tv />, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 'cc', name: 'Credit Card', icon: <CreditCard />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { id: 'insurance', name: 'Insurance', icon: <ShieldCheck />, color: 'text-rose-600', bg: 'bg-rose-100' },
    { id: 'fastag', name: 'Fastag', icon: <Car />, color: 'text-slate-600', bg: 'bg-slate-100' },
  ];

  const upcomingBills = [
    { id: 1, provider: 'Airtel Postpaid', amount: '₹1,299', dueIn: '2 days', type: 'mobile' },
    { id: 2, provider: 'Tata Power', amount: '₹4,550', dueIn: '5 days', type: 'electricity' },
  ];

  const recentPayers = [
    { id: 1, name: 'Mom\'s Phone', provider: 'Jio', initial: 'M', color: 'bg-blue-500' },
    { id: 2, name: 'Home Wifi', provider: 'Alliance', initial: 'H', color: 'bg-purple-500' },
    { id: 3, name: 'CC Bill', provider: 'HDFC Bank', initial: 'C', color: 'bg-slate-700' },
  ];

  if (!isAuthenticated) return null;

  return (
    <main className="bg-slate-50 min-h-screen pb-20">
       <NavbarWrapper />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* TOP SECTION: Search & Recent */}
        <section className="space-y-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Bill Payments</h2>
              <p className="text-slate-500 text-sm">Pay your utilities and credit cards instantly</p>
            </div>
            <button 
              onClick={() => router.push('/insights')}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <History size={18} /> Transaction History
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search billers (e.g. Electricity, Airtel, Credit Card)..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-white shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Recent Payers</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <button className="flex flex-col items-center gap-2 min-w-[80px]">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all">
                  <Plus size={24} />
                </div>
                <span className="text-xs font-medium">Add New</span>
              </button>
              {recentPayers.map(payer => (
                <div key={payer.id} className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group">
                  <div className={`w-14 h-14 rounded-full ${payer.color} flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform`}>
                    {payer.initial}
                  </div>
                  <span className="text-xs font-medium text-slate-700">{payer.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MIDDLE SECTION: Categories Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6">Categories</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
                {categories.map(cat => (
                  <button key={cat.id} className="flex flex-col items-center gap-3 group">
                    <div className={`w-12 h-12 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all shadow-sm`}>
                      {cat.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-600 text-center">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR: Upcoming Bills */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
              <div className="flex items-center gap-2 mb-6">
                <Clock size={20} className="text-blue-400" />
                <h3 className="font-bold text-lg">Upcoming Bills</h3>
              </div>
              
              <div className="space-y-4">
                {upcomingBills.map(bill => (
                  <div key={bill.id} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-medium text-blue-400 uppercase tracking-tighter">{bill.type}</span>
                      <span className="text-xs text-rose-400 font-bold">Due in {bill.dueIn}</span>
                    </div>
                    <p className="font-bold text-sm mb-1">{bill.provider}</p>
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold">{bill.amount}</span>
                      <ArrowRight size={16} className="text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-blue-600 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
                View All Dues
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}