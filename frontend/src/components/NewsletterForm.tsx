'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, Loader2 } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await new Promise(r => setTimeout(r, 1000));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative glass rounded-3xl p-10 md:p-14 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-neon-purple/5 rounded-full blur-[60px] pointer-events-none" />
      <div className="relative max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-neon-cyan/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-neon-cyan/20">
          <Mail className="w-8 h-8 text-neon-cyan" />
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
          Stay Updated on <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-green">New Projects</span>
        </h3>
        <p className="text-gray-400 mt-3 mb-8 leading-relaxed">
          Get weekly tutorials, project ideas, and smart home tips delivered to your inbox. No spam, unsubscribe anytime.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
            className="flex-1 px-5 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/40 focus:ring-1 focus:ring-neon-cyan/30 transition-all"
          />
          {status === 'error' && (
            <p id="newsletter-error" role="alert" className="text-red-400 text-sm mt-1">Something went wrong. Please try again.</p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-7 py-3.5 bg-neon-cyan text-dark-900 font-bold rounded-xl hover:shadow-lg hover:shadow-neon-cyan/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 btn-press"
          >
            {status === 'loading' ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing...</>
            ) : status === 'success' ? (
              <><Check className="w-4 h-4" /> Subscribed!</>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
