'use client';

import { useState } from 'react';
import { blogPosts } from '@/data/blog';
import { Search, Plus, Edit, Trash2, ExternalLink, Calendar, User } from 'lucide-react';

export default function BlogAdminPage() {
  const [search, setSearch] = useState('');

  const filtered = blogPosts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
          <p className="text-gray-500 text-sm mt-1">{blogPosts.length} total posts</p>
        </div>
        <button className="px-4 py-2.5 bg-neon-green text-dark-900 font-semibold rounded-xl hover:bg-neon-green/90 transition-colors text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blog posts..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#0c0c14] border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/50 text-sm"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((post) => (
          <div key={post.id} className="bg-[#0c0c14] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-xl bg-dark-800 overflow-hidden shrink-0 hidden sm:block">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-medium text-white">{post.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-neon-green hover:bg-neon-green/10 rounded-lg transition-all" title="View">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button className="p-2 text-gray-500 hover:text-neon-green hover:bg-neon-green/10 rounded-lg transition-all" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <User className="w-3 h-3" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {post.publishedAt}
                  </span>
                  <span className="px-2 py-0.5 bg-neon-green/10 text-neon-green text-[10px] font-medium rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-600">{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-[#0c0c14] border border-white/5 rounded-2xl text-gray-500">
          No blog posts found.
        </div>
      )}
    </div>
  );
}