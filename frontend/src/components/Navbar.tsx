'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Tutorials', href: '/tutorials' },
  { name: 'Videos', href: '/videos' },
  {
    name: 'Arduino',
    href: '/platforms/arduino',
    dropdown: [
      { name: 'All Arduino Projects', href: '/platforms/arduino' },
      { name: 'Beginner Projects', href: '/platforms/arduino?difficulty=beginner' },
      { name: 'Intermediate Projects', href: '/platforms/arduino?difficulty=intermediate' },
      { name: 'Advanced Projects', href: '/platforms/arduino?difficulty=advanced' },
    ],
  },
  {
    name: 'Raspberry Pi',
    href: '/platforms/raspberry-pi',
    dropdown: [
      { name: 'All Pi Projects', href: '/platforms/raspberry-pi' },
      { name: 'Getting Started', href: '/platforms/raspberry-pi?tag=getting-started' },
      { name: 'Home Automation', href: '/platforms/raspberry-pi?tag=smart-home' },
      { name: 'Security Projects', href: '/platforms/raspberry-pi?tag=security' },
    ],
  },
  { name: 'Forum', href: '/forum' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const isDark = saved ? saved === 'dark' : true;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.classList.toggle('light', !next);
  };

  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="shrink-0" aria-label="DIY SmartHome - Home">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan via-neon-green to-neon-cyan rounded-xl rotate-12 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green to-neon-cyan rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-dark-900" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5" role="menubar">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
                role="none"
              >
                <Link
                  href={link.href}
                  role="menuitem"
                  aria-haspopup={link.dropdown ? 'true' : undefined}
                  aria-expanded={link.dropdown ? activeDropdown === link.name : undefined}
                  className="flex items-center gap-1 px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm text-gray-300 hover:text-neon-cyan transition-colors rounded-lg hover:bg-white/5 min-h-[44px] whitespace-nowrap"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-3 h-3 shrink-0" aria-hidden="true" />}
                </Link>
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        role="menu"
                        aria-label={`${link.name} submenu`}
                        className="absolute top-full left-0 mt-1 w-56 bg-dark-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            role="menuitem"
                            className="block px-4 py-3 text-sm text-gray-300 hover:text-neon-cyan hover:bg-white/5 transition-colors min-h-[44px]"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 text-gray-400 hover:text-neon-cyan transition-colors rounded-lg hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {darkMode ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden p-2 text-gray-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="menu"
            aria-label="Mobile navigation"
            className="lg:hidden bg-dark-800 border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  role="menuitem"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-gray-300 hover:text-neon-cyan hover:bg-white/5 rounded-lg transition-colors min-h-[44px]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
