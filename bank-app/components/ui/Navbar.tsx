// File: components/Navbar.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { User, ChevronDown, ChevronUp, Home, Settings, Shield, Headphones, LogOut } from 'lucide-react';

interface NavbarProps {
  userName: string;
  onLogout: () => void;
}

export default function Navbar({ userName, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="relative z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="no-underline">
            <h2 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
              TDD Bank
            </h2>
          </Link>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 font-medium">{userName}</span>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">{userName}</p>
                  <p className="text-sm text-gray-500">Standard Savings AC</p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition no-underline"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition no-underline"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Account Settings</span>
                  </Link>

                  <Link
                    href="/security"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition no-underline"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="w-5 h-5" />
                    <span>Security & Privacy</span>
                  </Link>

                  <Link
                    href="/support"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition no-underline"
                    onClick={() => setIsOpen(false)}
                  >
                    <Headphones className="w-5 h-5" />
                    <span>Help & Support</span>
                  </Link>
                </div>

                {/* Logout Button */}
                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}