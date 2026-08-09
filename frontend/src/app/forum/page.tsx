'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import AdSlot from '@/components/AdSlot';
import { forumThreads, forumReplies, forumCategories, ForumThread } from '@/data/forum';
import {
  MessageSquare, Users, TrendingUp, Clock, Search, Plus,
  ChevronRight, ArrowLeft, Eye, ThumbsUp, Pin, CheckCircle2,
  X, Send, Tag, User,
} from 'lucide-react';

type View = 'list' | 'thread' | 'new';

export default function ForumPage() {
  const [view, setView] = useState<View>('list');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [threads, setThreads] = useState(forumThreads);
  const [replies, setReplies] = useState(forumReplies);
  const [replyText, setReplyText] = useState('');
  const [newThread, setNewThread] = useState({ title: '', content: '', category: 'General', tags: '' });

  const stats = useMemo(() => ({
    members: '2,847',
    threads: String(threads.length + 1226),
    replies: String(replies.length + 8892),
    online: '42',
  }), [threads.length, replies.length]);

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
        t.author.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    return result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
  }, [threads, activeCategory, searchQuery]);

  const threadReplies = useMemo(() => {
    if (!selectedThread) return [];
    return replies.filter(r => r.threadId === selectedThread.id);
  }, [selectedThread, replies]);

  const openThread = (thread: ForumThread) => {
    setSelectedThread(thread);
    setView('thread');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReply = () => {
    if (!replyText.trim() || !selectedThread) return;
    const newReply = {
      id: replies.length + 1,
      threadId: selectedThread.id,
      author: 'You',
      avatar: 'YO',
      content: replyText.trim(),
      likes: 0,
      createdAt: 'Just now',
    };
    setReplies(prev => [...prev, newReply]);
    setThreads(prev => prev.map(t =>
      t.id === selectedThread.id ? { ...t, replies: t.replies + 1, lastActive: 'Just now' } : t
    ));
    setSelectedThread(prev => prev ? { ...prev, replies: prev.replies + 1, lastActive: 'Just now' } : null);
    setReplyText('');
  };

  const handleNewThread = () => {
    if (!newThread.title.trim() || !newThread.content.trim()) return;
    const thread: ForumThread = {
      id: threads.length + 100,
      title: newThread.title.trim(),
      author: 'You',
      avatar: 'YO',
      content: newThread.content.trim(),
      category: newThread.category,
      replies: 0,
      views: 0,
      likes: 0,
      lastActive: 'Just now',
      createdAt: 'Just now',
      pinned: false,
      tags: newThread.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    setThreads(prev => [thread, ...prev]);
    setNewThread({ title: '', content: '', category: 'General', tags: '' });
    setView('list');
  };

  const handleLikeThread = (threadId: number) => {
    setThreads(prev => prev.map(t => t.id === threadId ? { ...t, likes: t.likes + 1 } : t));
    if (selectedThread?.id === threadId) {
      setSelectedThread(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Community Forum" subtitle="Ask questions, share projects, and connect with makers" accent="green" />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Members', value: stats.members, icon: <Users className="w-5 h-5" /> },
            { label: 'Threads', value: stats.threads, icon: <MessageSquare className="w-5 h-5" /> },
            { label: 'Replies', value: stats.replies, icon: <TrendingUp className="w-5 h-5" /> },
            { label: 'Online Now', value: stats.online, icon: <Clock className="w-5 h-5" /> },
          ].map((stat) => (
            <div key={stat.label} className="bg-dark-800 border border-white/5 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center text-neon-green mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {view === 'list' && (
            <motion.div key="list" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              {/* Search + New Thread */}
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
                  onClick={() => setView('new')}
                  className="px-5 py-2.5 bg-neon-green text-dark-900 font-semibold rounded-xl hover:bg-neon-green/90 transition-colors text-sm flex items-center justify-center gap-2 btn-press"
                >
                  <Plus className="w-4 h-4" /> New Thread
                </button>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {forumCategories.map((cat) => (
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

              {/* Thread List */}
              <div className="bg-dark-800 border border-white/5 rounded-2xl overflow-hidden">
                {filteredThreads.length === 0 ? (
                  <div className="p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No threads found. Try a different search or category.</p>
                  </div>
                ) : (
                  filteredThreads.map((thread, i) => (
                    <div
                      key={thread.id}
                      onClick={() => openThread(thread)}
                      className={`flex items-center gap-3 sm:gap-4 p-4 hover:bg-white/[0.02] transition-colors cursor-pointer ${i < filteredThreads.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center text-neon-green text-xs font-bold shrink-0 border border-white/5">
                        {thread.avatar}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {thread.pinned && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-neon-green/20 text-neon-green rounded font-medium">
                              <Pin className="w-2.5 h-2.5" /> PINNED
                            </span>
                          )}
                          {thread.solved && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-neon-cyan/20 text-neon-cyan rounded font-medium">
                              <CheckCircle2 className="w-2.5 h-2.5" /> SOLVED
                            </span>
                          )}
                          <span className="px-2 py-0.5 text-[10px] bg-dark-700 text-gray-400 rounded">{thread.category}</span>
                        </div>
                        <h3 className="text-white font-medium hover:text-neon-green transition-colors truncate">
                          {thread.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span>by <span className="text-gray-400">{thread.author}</span></span>
                          <span>{thread.lastActive}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="hidden sm:flex items-center gap-5 text-xs text-gray-500 shrink-0">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" /> {thread.likes}
                        </div>
                        <div className="text-center">
                          <div className="text-white font-medium">{thread.replies}</div>
                          <div>replies</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-medium">{thread.views}</div>
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
              <button
                onClick={() => setView('list')}
                className="inline-flex items-center gap-2 text-neon-green hover:gap-3 transition-all mb-6 text-sm"
              >
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
                        {forumCategories.filter(c => c !== 'All').map(cat => (
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
                      disabled={!newThread.title.trim() || !newThread.content.trim()}
                      className="px-6 py-2.5 bg-neon-green text-dark-900 font-semibold rounded-xl hover:bg-neon-green/90 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 btn-press"
                    >
                      <Send className="w-4 h-4" /> Post Thread
                    </button>
                    <button
                      onClick={() => setView('list')}
                      className="px-6 py-2.5 bg-white/5 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-colors text-sm border border-white/10 btn-press"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'thread' && selectedThread && (
            <motion.div key="thread" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <button
                onClick={() => { setView('list'); setSelectedThread(null); }}
                className="inline-flex items-center gap-2 text-neon-green hover:gap-3 transition-all mb-6 text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Forum
              </button>

              {/* Thread Header */}
              <div className="bg-dark-800 border border-white/5 rounded-2xl p-6 sm:p-8 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center text-neon-green text-sm font-bold shrink-0 border border-white/5">
                    {selectedThread.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {selectedThread.pinned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-neon-green/20 text-neon-green rounded font-medium">
                          <Pin className="w-2.5 h-2.5" /> PINNED
                        </span>
                      )}
                      <span className="px-2 py-0.5 text-[10px] bg-dark-700 text-gray-400 rounded">{selectedThread.category}</span>
                      {selectedThread.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] bg-neon-green/10 text-neon-green/70 rounded">#{tag}</span>
                      ))}
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">{selectedThread.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {selectedThread.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedThread.createdAt}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {selectedThread.views}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLikeThread(selectedThread.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-colors text-sm shrink-0 btn-press"
                  >
                    <ThumbsUp className="w-4 h-4" /> {selectedThread.likes}
                  </button>
                </div>
                <div className="mt-6 text-gray-300 leading-relaxed whitespace-pre-line">{selectedThread.content}</div>
              </div>

              {/* Replies */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-neon-green" />
                  {threadReplies.length} {threadReplies.length === 1 ? 'Reply' : 'Replies'}
                </h2>

                <div className="space-y-4">
                  {threadReplies.length === 0 ? (
                    <div className="bg-dark-800 border border-white/5 rounded-2xl p-8 text-center">
                      <MessageSquare className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">No replies yet. Be the first to respond!</p>
                    </div>
                  ) : (
                    threadReplies.map((reply) => (
                      <div key={reply.id} className={`bg-dark-800 border rounded-2xl p-5 sm:p-6 ${reply.isSolution ? 'border-neon-green/30 neon-border-green' : 'border-white/5'}`}>
                        {reply.isSolution && (
                          <div className="flex items-center gap-1.5 text-neon-green text-xs font-medium mb-3">
                            <CheckCircle2 className="w-4 h-4" /> Accepted Solution
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center text-neon-cyan text-xs font-bold shrink-0 border border-white/5">
                            {reply.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 text-sm mb-2">
                              <span className="text-white font-medium">{reply.author}</span>
                              <span className="text-gray-500 text-xs">{reply.createdAt}</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{reply.content}</p>
                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                              <button className="flex items-center gap-1 hover:text-neon-green transition-colors">
                                <ThumbsUp className="w-3 h-3" /> {reply.likes}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Reply Form */}
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
                  disabled={!replyText.trim()}
                  className="px-6 py-2.5 bg-neon-green text-dark-900 font-semibold rounded-xl hover:bg-neon-green/90 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 btn-press"
                >
                  <Send className="w-4 h-4" /> Post Reply
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12">
          <AdSlot format="horizontal" />
        </div>
      </div>
    </div>
  );
}
