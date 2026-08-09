'use client';

import { FileText, Video, PenTool, Users, Eye, TrendingUp, ArrowUpRight, Clock } from 'lucide-react';
import { tutorials } from '@/data/tutorials';
import { videos } from '@/data/videos';
import { blogPosts } from '@/data/blog';

const stats = [
  { name: 'Total Tutorials', value: tutorials.length, icon: <FileText className="w-5 h-5" />, color: 'text-neon-cyan', bg: 'bg-neon-cyan/10', change: '+3 this month' },
  { name: 'Total Videos', value: videos.length, icon: <Video className="w-5 h-5" />, color: 'text-neon-purple', bg: 'bg-neon-purple/10', change: '+2 this month' },
  { name: 'Blog Posts', value: blogPosts.length, icon: <PenTool className="w-5 h-5" />, color: 'text-neon-green', bg: 'bg-neon-green/10', change: '+1 this month' },
  { name: 'Page Views', value: '12.4K', icon: <Eye className="w-5 h-5" />, color: 'text-neon-orange', bg: 'bg-neon-orange/10', change: '+18% vs last month' },
];

const recentActivity = [
  { action: 'Tutorial published', title: 'Smart Light Switch with ESP32', time: '2 hours ago', type: 'tutorial' },
  { action: 'Blog post published', title: 'Essential Tools Every DIY Robotics Builder Needs', time: '5 hours ago', type: 'blog' },
  { action: 'Video added', title: 'Smart Plant Watering - ESP32 Project', time: '1 day ago', type: 'video' },
  { action: 'Tutorial updated', title: 'MQTT Sensor Network with ESP32', time: '2 days ago', type: 'tutorial' },
  { action: 'Blog post published', title: 'Building a Mesh Network with ESP32', time: '3 days ago', type: 'blog' },
];

const typeColors: Record<string, string> = {
  tutorial: 'bg-neon-cyan/10 text-neon-cyan',
  video: 'bg-neon-purple/10 text-neon-purple',
  blog: 'bg-neon-green/10 text-neon-green',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-[#0c0c14] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.name}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#0c0c14] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <Clock className="w-4 h-4 text-gray-500" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <span className={`px-2 py-1 rounded-lg text-[10px] font-medium uppercase ${typeColors[item.type]}`}>
                  {item.type}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.action}</p>
                </div>
                <span className="text-xs text-gray-600 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0c0c14] border border-white/5 rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-white mb-5">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { name: 'New Tutorial', href: '/admin/tutorials', icon: <FileText className="w-4 h-4" /> },
              { name: 'New Video', href: '/admin/videos', icon: <Video className="w-4 h-4" /> },
              { name: 'New Blog Post', href: '/admin/blog', icon: <PenTool className="w-4 h-4" /> },
              { name: 'View Site', href: '/', icon: <ArrowUpRight className="w-4 h-4" />, external: true },
            ].map((action) => (
              <a
                key={action.name}
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 transition-all text-sm text-gray-300 hover:text-white"
              >
                {action.icon}
                {action.name}
              </a>
            ))}
          </div>

          {/* Content Breakdown */}
          <div className="mt-6 pt-5 border-t border-white/5">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Content by Platform</h3>
            {[
              { name: 'Arduino', count: tutorials.filter(t => t.category === 'arduino').length, color: 'bg-neon-cyan' },
              { name: 'Raspberry Pi', count: tutorials.filter(t => t.category === 'raspberry-pi').length, color: 'bg-neon-purple' },
              { name: 'ESP32', count: tutorials.filter(t => t.tags.includes('esp32')).length, color: 'bg-neon-green' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-400">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-white">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}