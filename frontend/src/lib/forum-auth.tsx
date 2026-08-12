'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface ForumUser {
  id: number;
  username: string;
  display_name?: string;
  email: string;
}

interface ForumAuthContextType {
  user: ForumUser | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  authHeaders: () => Record<string, string>;
}

const ForumAuthContext = createContext<ForumAuthContextType>({
  user: null,
  token: null,
  login: async () => false,
  register: async () => ({ success: false }),
  logout: () => {},
  authHeaders: () => ({}),
});

export function ForumAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ForumUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('forum-token');
    if (stored) {
      setToken(stored);
      fetchUser(stored);
    }
  }, []);

  const fetchUser = async (accessToken: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        localStorage.removeItem('forum-token');
        setToken(null);
      }
    } catch {
      localStorage.removeItem('forum-token');
      setToken(null);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      localStorage.setItem('forum-token', data.access_token);
      setToken(data.access_token);
      await fetchUser(data.access_token);
      return true;
    } catch {
      return false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        return { success: false, error: data.detail || 'Registration failed' };
      }
      return { success: true };
    } catch {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('forum-token');
    setToken(null);
    setUser(null);
  };

  const authHeaders = (): Record<string, string> => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return (
    <ForumAuthContext.Provider value={{ user, token, login, register, logout, authHeaders }}>
      {children}
    </ForumAuthContext.Provider>
  );
}

export function useForumAuth() {
  return useContext(ForumAuthContext);
}
