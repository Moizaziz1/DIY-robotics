'use client';

import { useState } from 'react';
import { tutorials } from '@/data/tutorials';
import { Search, Plus, Edit, Trash2, Eye, ChevronDown, Filter, ExternalLink } from 'lucide-react';

export default function TutorialsAdminPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filtered = tutorials.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'all' || t.category === categoryFilter;
    const matchDifficulty = difficultyFilter === 'all' || t.difficulty === difficultyFilter;
    return matchSearch && matchCategory && matchDifficulty;
  });

  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-neon-green/10 text-neon-green',
    Intermediate: 'bg-neon-cyan/10 text-neon-cyan',
    Advanced: 'bg-neon-purple/10 text-neon-purple',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Tutorials</h2>
          <p className="text-gray-500 text-sm mt-1">{tutorials.length} total tutorials</p>
        </div>
        <button className="px-4 py-2.5 bg-neon-cyan text-dark-900 font-semibold rounded-xl hover:bg-neon-cyan/90 transition-colors text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Tutorial
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tutorials..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#0c0c14] border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-sm"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 bg-[#0c0c14] border border-white/5 rounded-xl text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-neon-cyan/50"
          >
            <option value="all">All Platforms</option>
            <option value="arduino">Arduino</option>
            <option value="raspberry-pi">Raspberry Pi</option>
            <option value="esp32">ESP32</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="pl-4 pr-8 py-2.5 bg-[#0c0c14] border border-white/5 rounded-xl text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-neon-cyan/50"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0c0c14] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Tutorial</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Platform</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Difficulty</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Author</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((tutorial) => (
                <tr key={tutorial.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-white truncate max-w-xs">{tutorial.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{tutorial.timeEstimate} · {tutorial.costEstimate}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs text-gray-400 capitalize">{tutorial.category.replace('-', ' ')}</span>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${difficultyColors[tutorial.difficulty]}`}>
                      {tutorial.difficulty}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-gray-400">{tutorial.author}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/tutorials/${tutorial.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-neon-cyan hover:bg-neon-cyan/10 rounded-lg transition-all"
                        title="View"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button className="p-2 text-gray-500 hover:text-neon-cyan hover:bg-neon-cyan/10 rounded-lg transition-all" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No tutorials found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}