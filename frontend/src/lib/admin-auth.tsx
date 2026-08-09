'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

const ADMIN_PASSWORD = 'diyadmin2026';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('admin-auth');
    setIsAuthenticated(auth === 'true');
    setChecked(true);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin-auth', 'true');
      setIsAuthenticated(true);
      router.push('/admin/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin-auth');
    setIsAuthenticated(false);
    router.push('/admin');
  };

  if (!checked) return null;

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}