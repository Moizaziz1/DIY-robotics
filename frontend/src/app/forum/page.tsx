'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import AdSlot from '@/components/AdSlot';
import { ForumAuthProvider, useForumAuth } from '@/lib/forum-auth';
import {
  MessageSquare, Users, TrendingUp, Clock, Search, Plus,
  ChevronRight, ArrowLeft, Eye, ThumbsUp, Pin, CheckCircle2,
  X, Send, Tag, User, LogIn, UserPlus,
} from 'lucide-react';

type View = 'list' | 'thread' | 'new';

interface ForumThread {
  id: number;
  title: string;
  content: string;
  author: { id: number; username: string; display_name?: string };
  category?: string;
  tags?: string;
  is_pinned: boolean;
  is_locked: boolean;
  upvotes: number;
  view_count: number;
  created_at: string;
  reply_count: number;
  replies?: ForumReply[];
}

interface ForumReply {
  id: number;
  thread_id: number;
  content: string;
  author: { id: number; username: string; display_name?: string };
  upvotes: number;
  created_at: string;
}

const categories = ['All', 'Arduino', 'Raspberry Pi', 'ESP32', 'Home Assistant', 'Projects', 'General', 'Tools', '3D Printing'];

function ForumContent() {
  const { user, login, register, logout, authHeaders } = useForumAuth();
  const [view, setView] = useState<View>('list');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [replyText, setReplyText] = useState('');
  const [newThread, setNewThread] = useState({ title: '', content: '', category: 'General', tags: '' });
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [authForm, setAuthForm] = useState({ username: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/threads`);
      if (res.ok) {
        const data = await res.json();
        setThreads(data);
      }
    } catch { /* ignore */ }
    setLoading(false);
  };

  const fetchThread = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/threads/${id}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedThread(data);
        setReplies(data.replies || []);
      }
    } catch { /* ignore */ }
  };

  const stats = useMemo(() => ({
    threads: String(threads.length),
    replies: String(threads.reduce((acc, t) => acc + (t.reply_count || 0), 0)),
  }), [threads]);

  const filteredThreads = useMemo(() => {
    let result = threads;
    if (activeCategory !== 'All') {
      result = result.filter(t => t.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.content.toLowerCase().includes(q) ||
        t.author.username.toLowerCase().includes(q)
      );
    }
    return result;
  }, [threads, activeCategory, searchQuery]);

  const openThread = async (thread: ForumThread) => {
    await fetchThread(thread.id);
    setView('thread');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);

    if (authModal === 'login') {
      const success = await login(authForm.username, authForm.password);
      if (success) {
        setAuthModal(null);
        setAuthForm({ username: '', email: '', password: '' });
      } else {
        setAuthError('Invalid username or password');
      }
    } else {
      const result = await register(authForm.username, authForm.email, authForm.password);
      if (result.success) {
        setAuthModal(null);
        setAuthForm({ username: '', email: '', password: '' });
        setAuthError('');
        await login(authForm.username, authForm.password);
      } else {
        setAuthError(result.error || 'Registration failed');
      }
    }
    setSubmitting(false);
  };

  const handleReply = async () => {
    if (!replyText.trim() || !selectedThread || !user) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/threads/${selectedThread.id}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ content: replyText.trim() }),
      });
      if (res.ok) {
        const newReply = await res.json();
        setReplies(prev => [...prev, newReply]);
        setReplyText('');
        setSelectedThread(prev => prev ? { ...prev, reply_count: (prev.reply_count || 0) + 1 } : null);
      }
    } catch { /* ignore */ }
    setSubmitting(false);
  };

  const handleNewThread = async () => {
    if (!newThread.title.trim() || !newThread.content.trim() || !user) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/threads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({
          title: newThread.title.trim(),
          content: newThread.content.trim(),
          category: newThread.category,
          tags: newThread.tags,
        }),
      });
      if (res.ok) {
        const thread = await res.json();
        setThreads(prev => [thread, ...prev]);
        setNewThread({ title: '', content: '', category: 'General', tags: '' });
        setView('list');
      }
    } catch { /* ignore */ }
    setSubmitting(false);
  };

  const handleUpvote = async (threadId: number) => {
    if (!user) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/threads/${threadId}/upvote`, {
        method: 'POST',
        headers: authHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setThreads(prev => prev.map(t => t.id === threadId ? { ...t, upvotes: data.upvotes } : t));
        if (selectedThread?.id === threadId) {
          setSelectedThread(prev => prev ? { ...prev, upvotes: data.upvotes } : null);
        }
      }
    } catch { /* ignore */ }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Community Forum" subtitle="Ask questions, share projects, and connect with makers" accent="green" />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Threads', value: stats.threads, icon: <MessageSquare className="w-5 h-5" /> },
            { label: 'Replies', value: stats.replies, icon: <TrendingUp className="w-5 h-5" /> },
            { label: 'Members', value: '—', icon: <Users className="w-5 h-5" /> },
            { label: 'Online Now', value: '—', icon: <Clock className="w-5 h-5" /> },
          ].map((stat) => (
            <div key={stat.label} className="bg-dark-800 border border-white/5 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center text-neon-green mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Auth Bar */}
        <div className="flex items-center justify-between mb-6">
          <div />
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                Logged in as <span className="text-white font-medium">{user.display_name || user.username}</span>
              </span>
              <button onClick={logout} className="text-sm text-gray-500 hover:text-red-400 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setAuthModal('login'); setAuthError(''); }}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-colors flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Login
              </button>
              <button
                onClick={() => { setAuthModal('register'); setAuthError(''); }}
                className="px-4 py-2 text-sm bg-neon-green text-dark-900 font-semibold rounded-xl hover:bg-neon-green/90 transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" /> Register
              </button>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {view === 'list' && (
            <motion.div key="list" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search threads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50"
                  />
                </div>
                <button
                  onClick={() => {
                    if (!user) { setAuthModal('login'); return; }
                    setView('new');
                  }}
                  className="px-5 py-2.5 bg-neon-green text-dark-900 font-semibold rounded-xl hover:bg-neon-green/90 transition-colors text-sm flex items-center justify-center gap-2 btn-press"
                >
                  <Plus className="w-4 h-4" /> New Thread
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      activeCategory === cat
                        ? 'bg-neon-green/20 text-neon-green border-neon-green/30'
                        : 'bg-dark-800 text-gray-400 border-white/10 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="bg-dark-800 border border-white/5 rounded-2xl overflow-hidden">
                {loading ? (
                  <div className="p-12 text-center">
                    <div className="w-8 h-8 border-2 border-neon-green/30 border-t-neon-green rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-gray-400">Loading threads...</p>
                  </div>
                ) : filteredThreads.length === 0 ? (
                  <div className="p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No threads found. Be the first to start a discussion!</p>
                  </div>
                ) : (
                  filteredThreads.map((thread, i) => (
                    <div
                      key={thread.id}
                      onClick={() => openThread(thread)}
                      className={`flex items-center gap-3 sm:gap-4 p-4 hover:bg-white/[0.02] transition-colors cursor-pointer ${i < filteredThreads.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center text-neon-green text-xs font-bold shrink-0 border border-white/5">
                        {thread.author?.display_name?.[0] || thread.author?.username?.[0] || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {thread.is_pinned && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-neon-green/20 text-neon-green rounded font-medium">
                              <Pin className="w-2.5 h-2.5" /> PINNED
                            </span>
                          )}
                          {thread.category && (
                            <span className="px-2 py-0.5 text-[10px] bg-dark-700 text-gray-400 rounded">{thread.category}</span>
                          )}
                        </div>
                        <h3 className="text-white font-medium hover:text-neon-green transition-colors truncate">
                          {thread.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span>by <span className="text-gray-400">{thread.author?.display_name || thread.author?.username}</span></span>
                          <span>{formatTime(thread.created_at)}</span>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-5 text-xs text-gray-500 shrink-0">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" /> {thread.upvotes}
                        </div>
                        <div className="text-center">
                          <div className="text-white font-medium">{thread.reply_count}</div>
                          <div>replies</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-medium">{thread.view_count}</div>
                          <div>views</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {view === 'new' && (
            <motion.div key="new" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <button onClick={() => setView('list')} className="inline-flex items-center gap-2 text-neon-green hover:gap-3 transition-all mb-6 text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Forum
              </button>
              <div className="bg-dark-800 border border-white/5 rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-neon-green" /> Create New Thread
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Title</label>
                    <input
                      type="text"
                      value={newThread.title}
                      onChange={(e) => setNewThread(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="What's your question or topic?"
                      className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Category</label>
                      <select
                        value={newThread.category}
                        onChange={(e) => setNewThread(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50"
                      >
                        {categories.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={newThread.tags}
                        onChange={(e) => setNewThread(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="e.g. arduino, servo, help"
                        className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Content</label>
                    <textarea
                      value={newThread.content}
                      onChange={(e) => setNewThread(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Describe your question, project, or topic in detail..."
                      rows={8}
                      className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50 resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleNewThread}
                      disabled={!newThread.title.trim() || !newThread.content.trim() || submitting}
                      className="px-6 py-2.5 bg-neon-green text-dark-900 font-semibold rounded-xl hover:bg-neon-green/90 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 btn-press"
                    >
                      <Send className="w-4 h-4" /> {submitting ? 'Posting...' : 'Post Thread'}
                    </button>
                    <button onClick={() => setView('list')} className="px-6 py-2.5 bg-white/5 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-colors text-sm border border-white/10 btn-press">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'thread' && selectedThread && (
            <motion.div key="thread" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <button onClick={() => { setView('list'); setSelectedThread(null); }} className="inline-flex items-center gap-2 text-neon-green hover:gap-3 transition-all mb-6 text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Forum
              </button>

              <div className="bg-dark-800 border border-white/5 rounded-2xl p-6 sm:p-8 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center text-neon-green text-sm font-bold shrink-0 border border-white/5">
                    {selectedThread.author?.display_name?.[0] || selectedThread.author?.username?.[0] || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {selectedThread.is_pinned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-neon-green/20 text-neon-green rounded font-medium">
                          <Pin className="w-2.5 h-2.5" /> PINNED
                        </span>
                      )}
                      {selectedThread.category && (
                        <span className="px-2 py-0.5 text-[10px] bg-dark-700 text-gray-400 rounded">{selectedThread.category}</span>
                      )}
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">{selectedThread.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {selectedThread.author?.display_name || selectedThread.author?.username}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatTime(selectedThread.created_at)}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {selectedThread.view_count}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUpvote(selectedThread.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-colors text-sm shrink-0 btn-press"
                  >
                    <ThumbsUp className="w-4 h-4" /> {selectedThread.upvotes}
                  </button>
                </div>
                <div className="mt-6 text-gray-300 leading-relaxed whitespace-pre-line">{selectedThread.content}</div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-neon-green" />
                  {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
                </h2>
                <div className="space-y-4">
                  {replies.length === 0 ? (
                    <div className="bg-dark-800 border border-white/5 rounded-2xl p-8 text-center">
                      <MessageSquare className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">No replies yet. Be the first to respond!</p>
                    </div>
                  ) : (
                    replies.map((reply) => (
                      <div key={reply.id} className="bg-dark-800 border border-white/5 rounded-2xl p-5 sm:p-6">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center text-neon-cyan text-xs font-bold shrink-0 border border-white/5">
                            {reply.author?.display_name?.[0] || reply.author?.username?.[0] || '?'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 text-sm mb-2">
                              <span className="text-white font-medium">{reply.author?.display_name || reply.author?.username}</span>
                              <span className="text-gray-500 text-xs">{formatTime(reply.created_at)}</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {user ? (
                <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Post a Reply</h3>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Share your thoughts, experience, or solution..."
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50 resize-none mb-4"
                  />
                  <button
                    onClick={handleReply}
                    disabled={!replyText.trim() || submitting}
                    className="px-6 py-2.5 bg-neon-green text-dark-900 font-semibold rounded-xl hover:bg-neon-green/90 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 btn-press"
                  >
                    <Send className="w-4 h-4" /> {submitting ? 'Posting...' : 'Post Reply'}
                  </button>
                </div>
              ) : (
                <div className="bg-dark-800 border border-white/5 rounded-2xl p-6 text-center">
                  <p className="text-gray-400 mb-4">Login to post a reply</p>
                  <button
                    onClick={() => setAuthModal('login')}
                    className="px-5 py-2.5 bg-neon-green text-dark-900 font-semibold rounded-xl hover:bg-neon-green/90 transition-colors text-sm"
                  >
                    Login to Reply
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12">
          <AdSlot format="horizontal" />
        </div>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {authModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setAuthModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#0c0c14] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {authModal === 'login' ? 'Login' : 'Register'}
                </h2>
                <button onClick={() => setAuthModal(null)} className="text-gray-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Username</label>
                  <input
                    type="text"
                    value={authForm.username}
                    onChange={(e) => setAuthForm(prev => ({ ...prev, username: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-green/50 text-sm"
                    placeholder="Your username"
                  />
                </div>
                {authModal === 'register' && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={authForm.email}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-green/50 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Password</label>
                  <input
                    type="password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-green/50 text-sm"
                    placeholder="Your password"
                  />
                </div>
                {authError && (
                  <p className="text-red-400 text-sm">{authError}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-neon-green text-dark-900 font-semibold rounded-xl hover:bg-neon-green/90 transition-colors disabled:opacity-50 text-sm"
                >
                  {submitting ? 'Please wait...' : authModal === 'login' ? 'Login' : 'Register'}
                </button>
                <p className="text-center text-sm text-gray-500">
                  {authModal === 'login' ? (
                    <>Don't have an account? <button type="button" onClick={() => { setAuthModal('register'); setAuthError(''); }} className="text-neon-green hover:underline">Register</button></>
                  ) : (
                    <>Already have an account? <button type="button" onClick={() => { setAuthModal('login'); setAuthError(''); }} className="text-neon-green hover:underline">Login</button></>
                  )}
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ForumPage() {
  return (
    <ForumAuthProvider>
      <ForumContent />
    </ForumAuthProvider>
  );
}
