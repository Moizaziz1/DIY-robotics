'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  display_name?: string;
  is_admin: boolean;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  authHeaders: () => Record<string, string>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
  login: async () => false,
  logout: () => {},
  authHeaders: () => ({}),
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('admin-token');
    if (storedToken) {
      setToken(storedToken);
      verifyToken(storedToken);
    } else {
      setChecked(true);
    }
  }, []);

  const verifyToken = async (accessToken: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('admin-token');
        setToken(null);
      }
    } catch {
      localStorage.removeItem('admin-token');
      setToken(null);
    } finally {
      setChecked(true);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      localStorage.setItem('admin-token', data.access_token);
      setToken(data.access_token);
      await verifyToken(data.access_token);
      router.push('/admin/dashboard');
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin-token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    router.push('/admin');
  };

  const authHeaders = (): Record<string, string> => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  if (!checked) return null;

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, token, login, logout, authHeaders }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
