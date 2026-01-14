'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types/auth';
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ShieldOff,
  Pencil,
  Save
} from 'lucide-react';

interface EnhancedUser extends User {
  mobile?: string;
  address?: string;
  is2FAEnabled: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const { userName, isAuthenticated } = useAuth();

  const [user, setUser] = useState<EnhancedUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: ''
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    const savedData = localStorage.getItem('bankUser');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUser(parsed);
      setFormData({
        name: parsed.name || '',
        email: parsed.email || '',
        mobile: parsed.mobile || '+91 98123-43210',
        address: parsed.address || '123 Address, State, India'
      });
    }

    setIsLoading(false);
  }, [isAuthenticated]);

  const handleSave = () => {
    if (!user) return;
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('bankUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert('Account details updated successfully!');
  };

  const toggle2FA = () => {
    if (!user) return;
    const newState = !user.is2FAEnabled;

    if (!newState) {
      alert(
        '⚠️ Security Warning: Two-Factor Authentication has been turned OFF.'
      );
    }

    const updatedUser = { ...user, is2FAEnabled: newState };
    localStorage.setItem('bankUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  if (!isAuthenticated) return null;

  if (isLoading || !user) {
    return <div className="p-10 text-center">Loading Security...</div>;
  }

  return (
    <main>
      <Navbar userName={userName!} onLogout={() => router.push('/')} />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary">
            Account Settings
          </h2>
          <p className="text-slate-500">
            Manage your personal details and security preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* PERSONAL DETAILS */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">
                Personal & Contact Details
              </h3>

              <button
                onClick={() =>
                  isEditing ? handleSave() : setIsEditing(true)
                }
                className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                {isEditing ? (
                  <>
                    <Save size={16} /> Save
                  </>
                ) : (
                  <>
                    <Pencil size={16} /> Edit
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <UserIcon size={14} /> FULL NAME
                </label>
                {isEditing ? (
                  <input
                    className="w-full rounded-lg border px-3 py-2"
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                ) : (
                  <p>{user.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <Mail size={14} /> EMAIL
                </label>
                {isEditing ? (
                  <input
                    className="w-full rounded-lg border px-3 py-2"
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                ) : (
                  <p>{user.email}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <Phone size={14} /> MOBILE NUMBER
                </label>
                {isEditing ? (
                  <input
                    className="w-full rounded-lg border px-3 py-2"
                    value={formData.mobile}
                    onChange={e =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                  />
                ) : (
                  <p>{formData.mobile}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <MapPin size={14} /> ADDRESS
                </label>
                {isEditing ? (
                  <textarea
                    className="w-full rounded-lg border px-3 py-2 min-h-[80px]"
                    value={formData.address}
                    onChange={e =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                ) : (
                  <p>{formData.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* SECURITY */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Security Controls</h3>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium flex items-center gap-2">
                  {user.is2FAEnabled ? (
                    <ShieldCheck className="text-green-600" size={18} />
                  ) : (
                    <ShieldOff className="text-red-600" size={18} />
                  )}
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-slate-500">
                  Secure withdrawals with SMS verification
                </p>
              </div>

              <button
                onClick={toggle2FA}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  user.is2FAEnabled
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {user.is2FAEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
