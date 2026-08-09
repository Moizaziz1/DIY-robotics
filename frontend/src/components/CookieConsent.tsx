'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings } from 'lucide-react';

interface CookieConsentContextType {
  consent: 'accepted' | 'declined' | null;
}

const CookieConsentContext = createContext<CookieConsentContextType>({ consent: null });

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null);
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent') as 'accepted' | 'declined' | null;
    if (stored) {
      setConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setConsent('accepted');
    setVisible(false);
    setShowPreferences(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setConsent('declined');
    setVisible(false);
    setShowPreferences(false);
  };

  return (
    <CookieConsentContext.Provider value={{ consent }}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <div className="max-w-4xl mx-auto glass rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/40 border border-white/[0.08]">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-xl bg-neon-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Cookie className="w-5 h-5 text-neon-orange" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg">Cookie Preferences</h3>
                  {!showPreferences ? (
                    <>
                      <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                        We use cookies to enhance your experience, serve personalized ads through Google AdSense, and analyze site traffic.
                        By clicking &quot;Accept All&quot;, you consent to our use of cookies for advertising and analytics purposes.
                        Read our <a href="/privacy" className="text-neon-cyan hover:underline">Privacy Policy</a> for more information.
                      </p>
                      <div className="flex flex-wrap gap-3 mt-5">
                        <button
                          onClick={accept}
                          className="px-6 py-2.5 bg-neon-cyan text-dark-900 font-semibold rounded-xl hover:bg-neon-cyan/90 transition-all text-sm btn-press"
                        >
                          Accept All
                        </button>
                        <button
                          onClick={decline}
                          className="px-6 py-2.5 bg-white/5 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-all text-sm border border-white/10 btn-press"
                        >
                          Decline All
                        </button>
                        <button
                          onClick={() => setShowPreferences(true)}
                          className="px-6 py-2.5 bg-white/5 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-all text-sm border border-white/10 flex items-center gap-2 btn-press"
                        >
                          <Settings className="w-4 h-4" />
                          Manage
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                        Choose which cookies you allow. Essential cookies are always enabled for the site to function.
                      </p>
                      <div className="space-y-2.5 mt-4">
                        {[
                          { name: 'Essential Cookies', desc: 'Required for the website to function', status: 'Always On', accent: true },
                          { name: 'Advertising Cookies', desc: 'Google AdSense personalized ads', status: 'Optional', accent: false },
                          { name: 'Analytics Cookies', desc: 'Help us understand site usage', status: 'Optional', accent: false },
                        ].map((item) => (
                          <div key={item.name} className="flex items-center justify-between gap-3 bg-white/[0.03] rounded-xl p-3.5 border border-white/[0.04]">
                            <div className="min-w-0">
                              <p className="text-white text-sm font-medium">{item.name}</p>
                              <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                            </div>
                            <span className={`text-xs font-medium shrink-0 ${item.accent ? 'text-neon-green' : 'text-gray-500'}`}>{item.status}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-5">
                        <button
                          onClick={accept}
                          className="px-6 py-2.5 bg-neon-cyan text-dark-900 font-semibold rounded-xl hover:bg-neon-cyan/90 transition-all text-sm btn-press"
                        >
                          Accept All
                        </button>
                        <button
                          onClick={decline}
                          className="px-6 py-2.5 bg-white/5 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-all text-sm border border-white/10 btn-press"
                        >
                          Decline All
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <button onClick={decline} className="text-gray-500 hover:text-white transition-colors p-1 shrink-0">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CookieConsentContext.Provider>
  );
}
