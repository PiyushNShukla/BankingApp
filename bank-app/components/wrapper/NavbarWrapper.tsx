// File: components/wrapper/NavbarWrapper.tsx

"use client";

import { usePathname } from 'next/navigation';
import Navbar from "../ui/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function NavbarWrapper() {
  const { userName, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();

  // Hide navbar on auth pages (signin/signup)
  const isAuthPage = pathname?.startsWith('/sign');
  
  if (isAuthPage || !isAuthenticated) {
    return null;
  }

  return (
    <Navbar
      userName={userName || 'Guest'}
      onLogout={logout}
    />
  );
}