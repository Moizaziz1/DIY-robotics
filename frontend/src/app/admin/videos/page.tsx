'use client';

import { useState } from 'react';
import { videos } from '@/data/videos';
import { Search, Plus, Edit, Trash2, ExternalLink, Play, Clock } from 'lucide-react';

export default function VideosAdminPage() {
  const [search, setSearch] = useState('');

  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase()) || v.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Videos</h2>
          <p className="text-gray-500 text-sm mt-1">{videos.length} total videos</p>
        </div>
        <button className="px-4 py-2.5 bg-neon-purple text-white font-semibold rounded-xl hover:bg-neon-purple/90 transition-colors text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Video
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search videos..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#0c0c14] border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple/50 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((video) => (
          <div key={video.id} className="bg-[#0c0c14] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors group">
            <div className="relative aspect-video bg-dark-800">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </a>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-white truncate">{video.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{video.description}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-neon-purple/10 text-neon-purple text-[10px] font-medium rounded">
                    {video.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-neon-purple hover:bg-neon-purple/10 rounded-lg transition-all" title="Watch">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button className="p-2 text-gray-500 hover:text-neon-purple hover:bg-neon-purple/10 rounded-lg transition-all" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-[#0c0c14] border border-white/5 rounded-2xl text-gray-500">
          No videos found.
        </div>
      )}
    </div>
  );
}