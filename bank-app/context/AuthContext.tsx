'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  userName: string | null;
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in (from localStorage or session)
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Redirect logic
    if (!isLoading) {
      const isAuthPage = pathname?.startsWith('/sign');
      
      if (!userName && !isAuthPage) {
        // Not logged in and not on auth page -> redirect to signin
        router.push('/sign-in');
      } else if (userName && isAuthPage) {
        // Logged in and on auth page -> redirect to home
        router.push('/');
      }
    }
  }, [userName, pathname, isLoading, router]);

  const login = (name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
    router.push('/');
  };

  const logout = () => {
    setUserName(null);
    localStorage.removeItem('userName');
    router.push('/sign-in');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ userName, isAuthenticated: !!userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}