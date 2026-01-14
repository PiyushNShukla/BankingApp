// File: app/settings/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import { useAuth } from '@/context/AuthContext';
import NavbarWrapper from '@/components/wrapper/NavbarWrapper';
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

interface UserData {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  is2FAEnabled: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const { userName, isAuthenticated } = useAuth();

  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/sign-in');
      return;
    }

    // Try to load saved user data from localStorage
    const savedData = localStorage.getItem('bankUser');
    
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUser(parsed);
      setFormData({
        fullName: parsed.fullName || '',
        email: parsed.email || '',
        mobile: parsed.mobile || '',
        address: parsed.address || ''
      });
    } else {
      // Create default user data if none exists
      const defaultUser: UserData = {
        fullName: userName || 'User',
        email: 'user@example.com',
        mobile: '+91 98123-43210',
        address: '123 Address, State, India',
        is2FAEnabled: false
      };
      
      localStorage.setItem('bankUser', JSON.stringify(defaultUser));
      setUser(defaultUser);
      setFormData({
        fullName: defaultUser.fullName,
        email: defaultUser.email,
        mobile: defaultUser.mobile,
        address: defaultUser.address
      });
    }

    setIsLoading(false);
  }, [isAuthenticated, userName, router]);

  const handleSave = () => {
    if (!user) return;
    
    const updatedUser: UserData = {
      ...user,
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      address: formData.address
    };
    
    localStorage.setItem('bankUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert('Account details updated successfully!');
  };

  const toggle2FA = () => {
    if (!user) return;
    const newState = !user.is2FAEnabled;

    if (!newState) {
      alert('⚠️ Security Warning: Two-Factor Authentication has been turned OFF.');
    } else {
      alert('✅ Two-Factor Authentication has been turned ON.');
    }

    const updatedUser = { ...user, is2FAEnabled: newState };
    localStorage.setItem('bankUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  if (!isAuthenticated) return null;

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Settings...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
       <NavbarWrapper />
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-600 mt-2">
            Manage your personal details and security preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* PERSONAL DETAILS */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Personal & Contact Details
              </h3>

              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
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
              {/* Full Name */}
              <div>
                <label className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-2">
                  <UserIcon size={14} /> FULL NAME
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={formData.fullName}
                    onChange={e =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-2">
                  <Mail size={14} /> EMAIL
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user.email}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-2">
                  <Phone size={14} /> MOBILE NUMBER
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={formData.mobile}
                    onChange={e =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user.mobile}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-2">
                  <MapPin size={14} /> ADDRESS
                </label>
                {isEditing ? (
                  <textarea
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    value={formData.address}
                    onChange={e =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* SECURITY */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Security Controls
            </h3>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium flex items-center gap-2 text-gray-900">
                  {user.is2FAEnabled ? (
                    <ShieldCheck className="text-green-600" size={20} />
                  ) : (
                    <ShieldOff className="text-red-600" size={20} />
                  )}
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Secure withdrawals with SMS verification
                </p>
              </div>

              <button
                onClick={toggle2FA}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                  user.is2FAEnabled
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                {user.is2FAEnabled ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>

          {/* Account Info */}
          <div className="rounded-2xl border border-gray-200 bg-blue-50 p-6">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <UserIcon className="text-blue-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Account Type</h4>
                <p className="text-sm text-gray-600 mt-1">Standard Savings Account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}