'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import { useAuth } from '@/context/AuthContext';
import NavbarWrapper from '@/components/wrapper/NavbarWrapper';
import { 
  ShieldCheck, 
  Monitor, 
  EyeOff, 
  Bell, 
  Share2, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

export default function SecurityPage() {
  const router = useRouter();
  const { userName, isAuthenticated, logout } = useAuth();

  const [privacySettings, setPrivacySettings] = useState({
    marketingEmails: false,
    shareData: true,
    showBalanceOnHome: true
  });

  const handleDeactivate = () => {
    const confirm = window.confirm(
      "Are you sure? This will log you out and clear your local session data permanently."
    );
    if (confirm) {
      localStorage.clear();
      logout(); // Use the logout from your AuthContext
      router.push('/');
    }
  };

  const toggleSetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isAuthenticated) return null;

  return (
    <main className="bg-slate-50 min-h-screen">
       <NavbarWrapper />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <ShieldCheck className="text-blue-600" size={28} />
            Security & Privacy
          </h2>
          <p className="text-slate-500">
            Control your account safety and data permissions
          </p>
        </div>

        <div className="space-y-6">
          {/* ACTIVE SESSIONS */}
          <section className="bg-white rounded-2xl border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Monitor className="text-slate-400" size={20} />
              <h3 className="font-semibold text-lg">Active Sessions</h3>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Monitor size={20} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Windows PC • Chrome Browser</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Current Device • Online
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-slate-400">Kolkata, India</span>
            </div>
          </section>

          {/* PRIVACY CONTROLS */}
          <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="font-semibold text-lg">Data & Privacy</h3>
            </div>
            
            <div className="divide-y divide-slate-100">
              {/* Marketing Emails */}
              <div className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex gap-4">
                  <div className="mt-1 text-slate-400"><Bell size={20} /></div>
                  <div>
                    <p className="font-medium text-slate-900">Marketing Communications</p>
                    <p className="text-sm text-slate-500">Receive newsletters and offer updates</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSetting('marketingEmails')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${privacySettings.marketingEmails ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${privacySettings.marketingEmails ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {/* Third-party Sharing */}
              <div className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex gap-4">
                  <div className="mt-1 text-slate-400"><Share2 size={20} /></div>
                  <div>
                    <p className="font-medium text-slate-900">Third-party Sharing</p>
                    <p className="text-sm text-slate-500">Allow sharing data with partner credit agencies</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSetting('shareData')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${privacySettings.shareData ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${privacySettings.shareData ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {/* Privacy Mode */}
              <div className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex gap-4">
                  <div className="mt-1 text-slate-400"><EyeOff size={20} /></div>
                  <div>
                    <p className="font-medium text-slate-900">Privacy Mode</p>
                    <p className="text-sm text-slate-500">Hide balance amounts on the dashboard</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSetting('showBalanceOnHome')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${privacySettings.showBalanceOnHome ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${privacySettings.showBalanceOnHome ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </section>

          {/* DANGER ZONE */}
          <section className="bg-rose-50 rounded-2xl border border-rose-100 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl text-rose-600 shadow-sm">
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-rose-900 text-lg">Danger Zone</h3>
                <p className="text-rose-700 text-sm mb-4">
                  Deactivating your account will disable all cards, stop recurring payments, and clear your session data. This action is permanent.
                </p>
                <button 
                  onClick={handleDeactivate}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-rose-200 active:scale-95"
                >
                  Deactivate Account
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}