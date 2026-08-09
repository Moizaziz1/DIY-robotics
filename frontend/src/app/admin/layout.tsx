'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Video, PenTool, Settings, LogOut, Menu, X, Cpu, ChevronRight } from 'lucide-react';
import { AdminAuthProvider, useAdminAuth } from '@/lib/admin-auth';
import AdminLoginPage from './page';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'Tutorials', href: '/admin/tutorials', icon: <FileText className="w-5 h-5" /> },
  { name: 'Videos', href: '/admin/videos', icon: <Video className="w-5 h-5" /> },
  { name: 'Blog', href: '/admin/blog', icon: <PenTool className="w-5 h-5" /> },
  { name: 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#06060a] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a12] border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 px-6 h-16 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-green flex items-center justify-center">
            <Cpu className="w-5 h-5 text-dark-900" />
          </div>
          <div>
            <span className="font-bold text-white text-sm">Admin Panel</span>
            <span className="block text-[10px] text-gray-500">DIY SmartHome</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.icon}
                {item.name}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-[#0a0a12]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-4 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-400 hover:text-white mr-3">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-white capitalize">
            {pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
          </h1>
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-gray-500 hover:text-neon-cyan transition-colors px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10"
            >
              View Site ↗
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}