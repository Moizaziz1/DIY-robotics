'use client';

import { useState, useEffect } from 'react';
import { FileText, Video, PenTool, Eye, TrendingUp, ArrowUpRight, Clock, Users, Globe } from 'lucide-react';
import { tutorials } from '@/data/tutorials';
import { videos } from '@/data/videos';
import { blogPosts } from '@/data/blog';
import { useAdminAuth } from '@/lib/admin-auth';

interface VisitStats {
  total_visits: number;
  today_visits: number;
  week_visits: number;
  month_visits: number;
  unique_ips_today: number;
  unique_ips_week: number;
  popular_pages: { path: string; count: number }[];
  visits_by_day: { date: string; count: number }[];
}

export default function DashboardPage() {
  const { authHeaders } = useAdminAuth();
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [recentVisits, setRecentVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = authHeaders();
        const [statsRes, recentRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visits/stats`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visits/recent?limit=10`, { headers }),
        ]);
        if (statsRes.ok) setStats(await statsRes.json());
        if (recentRes.ok) setRecentVisits(await recentRes.json());
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const contentStats = [
    { name: 'Total Tutorials', value: tutorials.length, icon: <FileText className="w-5 h-5" />, color: 'text-neon-cyan', bg: 'bg-neon-cyan/10' },
    { name: 'Total Videos', value: videos.length, icon: <Video className="w-5 h-5" />, color: 'text-neon-purple', bg: 'bg-neon-purple/10' },
    { name: 'Blog Posts', value: blogPosts.length, icon: <PenTool className="w-5 h-5" />, color: 'text-neon-green', bg: 'bg-neon-green/10' },
  ];

  const visitStatsCards = stats
    ? [
        { name: 'Today', value: stats.today_visits, icon: <Eye className="w-5 h-5" />, color: 'text-neon-orange', bg: 'bg-neon-orange/10', sub: `${stats.unique_ips_today} unique` },
        { name: 'This Week', value: stats.week_visits, icon: <TrendingUp className="w-5 h-5" />, color: 'text-neon-cyan', bg: 'bg-neon-cyan/10', sub: `${stats.unique_ips_week} unique` },
        { name: 'This Month', value: stats.month_visits, icon: <Globe className="w-5 h-5" />, color: 'text-neon-purple', bg: 'bg-neon-purple/10', sub: 'all visitors' },
        { name: 'All Time', value: stats.total_visits, icon: <Users className="w-5 h-5" />, color: 'text-neon-green', bg: 'bg-neon-green/10', sub: 'total hits' },
      ]
    : [];

  const recentActivity = [
    { action: 'Tutorial published', title: 'Smart Light Switch with ESP32', time: '2 hours ago', type: 'tutorial' },
    { action: 'Blog post published', title: 'Essential Tools Every DIY Robotics Builder Needs', time: '5 hours ago', type: 'blog' },
    { action: 'Video added', title: 'Smart Plant Watering - ESP32 Project', time: '1 day ago', type: 'video' },
  ];

  const typeColors: Record<string, string> = {
    tutorial: 'bg-neon-cyan/10 text-neon-cyan',
    video: 'bg-neon-purple/10 text-neon-purple',
    blog: 'bg-neon-green/10 text-neon-green',
  };

  return (
    <div className="space-y-6">
      {/* Content Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentStats.map((stat) => (
          <div key={stat.name} className="bg-[#0c0c14] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.name}</div>
          </div>
        ))}
      </div>

      {/* Real Visit Stats */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Live Traffic</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-[#0c0c14] border border-white/5 rounded-2xl p-5 animate-pulse">
                    <div className="h-10 w-10 rounded-xl bg-white/5 mb-3" />
                    <div className="h-8 w-16 rounded bg-white/5 mb-1" />
                    <div className="h-4 w-24 rounded bg-white/5" />
                  </div>
                ))
            : visitStatsCards.map((stat) => (
                <div key={stat.name} className="bg-[#0c0c14] border border-white/5 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.name}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{stat.sub}</div>
                </div>
              ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Visits */}
        <div className="lg:col-span-2 bg-[#0c0c14] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Recent Visits</h2>
            <Eye className="w-4 h-4 text-gray-500" />
          </div>
          {recentVisits.length === 0 ? (
            <p className="text-gray-500 text-sm">No visits recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {recentVisits.map((visit) => (
                <div key={visit.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <Globe className="w-4 h-4 text-neon-cyan shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate font-mono">{visit.path}</p>
                    <p className="text-xs text-gray-500">IP: {visit.ip_address || 'unknown'}</p>
                  </div>
                  <span className="text-xs text-gray-600 shrink-0">
                    {new Date(visit.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Popular Pages */}
        <div className="bg-[#0c0c14] border border-white/5 rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-white mb-5">Popular Pages</h2>
          {stats && stats.popular_pages.length > 0 ? (
            <div className="space-y-3">
              {stats.popular_pages.map((page) => (
                <div key={page.path} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                  <span className="text-sm text-gray-300 font-mono truncate">{page.path}</span>
                  <span className="text-sm font-medium text-neon-cyan shrink-0 ml-2">{page.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No data yet.</p>
          )}

          {/* Content by Platform */}
          <div className="mt-6 pt-5 border-t border-white/5">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Content by Platform</h3>
            {[
              { name: 'Arduino', count: tutorials.filter((t) => t.category === 'arduino').length, color: 'bg-neon-cyan' },
              { name: 'Raspberry Pi', count: tutorials.filter((t) => t.category === 'raspberry-pi').length, color: 'bg-neon-purple' },
              { name: 'ESP32', count: tutorials.filter((t) => t.tags.includes('esp32')).length, color: 'bg-neon-green' },
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
