'use client';

import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { Mail, Send, Loader2, Check } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Contact Us" subtitle="Have a question or want to collaborate? Get in touch." accent="cyan" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-dark-800 border border-white/5 rounded-2xl p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50"
                  placeholder="What is this about?"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-3 bg-neon-cyan text-dark-900 font-semibold rounded-xl hover:bg-neon-cyan/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                ) : status === 'success' ? (
                  <><Check className="w-4 h-4" /> Message Sent!</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </button>
              {status === 'success' && (
                <p className="text-neon-green text-sm mt-4">Thank you! Your message has been sent successfully.</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm mt-4">Something went wrong. Please try again later.</p>
              )}
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 text-neon-cyan shrink-0" />
                  <a href="mailto:homerobotics515@gmail.com" className="hover:text-neon-cyan transition-colors">
                    homerobotics515@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}