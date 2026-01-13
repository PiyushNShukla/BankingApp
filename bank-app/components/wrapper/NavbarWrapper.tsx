"use client";

import Navbar from "../ui/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function NavbarWrapper() {
  const { userName, logout } = useAuth();

  // Hide navbar when not logged in
  if (!userName) return null;

  return (
    <Navbar
      userName={userName}
      onLogout={logout}
    />
  );
}
