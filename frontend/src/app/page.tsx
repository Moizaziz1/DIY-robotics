'use client';

import dynamic from 'next/dynamic';
import HeroBackground from '@/components/HeroBackground';
import LazyVisible from '@/components/LazyVisible';
import TutorialCard from '@/components/TutorialCard';
import VideoCard from '@/components/VideoCard';
import BlogCard from '@/components/BlogCard';
import SectionHeader from '@/components/SectionHeader';
import NewsletterForm from '@/components/NewsletterForm';
import ScrollReveal from '@/components/ScrollReveal';
import { tutorials } from '@/data/tutorials';
import { videos } from '@/data/videos';
import { blogPosts } from '@/data/blog';
import Link from 'next/link';
import { ArrowRight, Cpu, Wifi, CpuIcon } from 'lucide-react';

const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false });
const Card3D = dynamic(() => import('@/components/Card3D'), { ssr: false });

export default function HomePage() {
  const featuredTutorials = tutorials.filter(t => t.difficulty !== 'Advanced').slice(0, 3);
  const latestVideos = videos.slice(0, 4);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-circuit-grid">
        <HeroBackground />
        <LazyVisible>
          <Hero3D />
        </LazyVisible>
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060a]/30 via-[#06060a]/60 to-[#06060a] hero-gradient" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full mb-8 backdrop-blur-sm hero-badge">
              <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-lg shadow-neon-green/50" />
              <span className="text-gray-300 text-sm font-medium">Community of 10,000+ Makers</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
              <span className="text-white">Build </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-green to-neon-cyan glow-text-cyan">
                Smart Home
              </span>
              <br />
              <span className="text-white">Robots & </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-pink glow-text-purple">
                IoT
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed hero-subtitle">
              Step-by-step tutorials, project guides, and video walkthroughs for Arduino, Raspberry Pi, and ESP32. From beginner to advanced.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link
                href="/tutorials"
                className="px-8 py-4 bg-neon-cyan text-dark-900 font-bold rounded-xl hover:shadow-lg hover:shadow-neon-cyan/25 transition-all duration-300 flex items-center justify-center gap-2 btn-press text-base hero-cta-primary"
              >
                Browse Tutorials <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/forum"
                className="px-8 py-4 bg-white/[0.04] text-white font-bold rounded-xl border border-white/[0.08] hover:border-neon-cyan/30 hover:bg-white/[0.06] transition-all duration-300 flex items-center justify-center gap-2 btn-press text-base backdrop-blur-sm hero-cta-secondary"
              >
                Join Community
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Platform Hubs */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Choose Your Platform" subtitle="Explore projects organized by hardware platform" accent="cyan" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Arduino', slug: 'arduino', icon: <CpuIcon className="w-8 h-8" />, color: 'from-neon-cyan to-blue-500', count: '13 Projects', desc: 'Microcontrollers, sensors, and actuators', glow: 'neon-border-cyan' },
              { name: 'Raspberry Pi', slug: 'raspberry-pi', icon: <Cpu className="w-8 h-8" />, color: 'from-neon-purple to-pink-500', count: '12 Projects', desc: 'Linux-powered smart home hub', glow: 'neon-border-purple' },
              { name: 'ESP32/ESP8266', slug: 'esp32', icon: <Wifi className="w-8 h-8" />, color: 'from-neon-green to-emerald-500', count: '5 Projects', desc: 'WiFi & Bluetooth IoT modules', glow: 'neon-border-green' },
            ].map((platform, i) => (
              <ScrollReveal key={platform.slug} delay={i * 0.1}>
                <Link href={`/platforms/${platform.slug}`} className="group block">
                  <Card3D color={platform.color.includes('cyan') ? '#00f5d4' : platform.color.includes('purple') ? '#9b5de5' : '#00bbf9'}>
                    <div className="relative bg-[#0c0c14] border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.12] transition-all duration-500 card-hover group-hover:${platform.glow}">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-dark-900 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        {platform.icon}
                      </div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-neon-cyan transition-colors duration-300">{platform.name}</h3>
                      <p className="text-gray-400 text-sm mt-2 leading-relaxed">{platform.desc}</p>
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-neon-cyan text-sm font-semibold">{platform.count}</span>
                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-neon-cyan group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Card3D>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-24 px-4 relative bg-[#08080e]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Featured Tutorials" subtitle="Start building with our most popular guides" accent="purple" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTutorials.map((tutorial, i) => (
              <TutorialCard key={tutorial.id} {...tutorial} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/tutorials" className="inline-flex items-center gap-2 text-neon-cyan hover:gap-3 transition-all font-semibold btn-press">
              View All Tutorials <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Videos */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Latest Video Tutorials" subtitle="Watch and learn with step-by-step video guides" accent="green" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestVideos.map((video, i) => (
              <VideoCard key={video.id} {...video} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/videos" className="inline-flex items-center gap-2 text-neon-purple hover:gap-3 transition-all font-semibold btn-press">
              View All Videos <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-24 px-4 relative bg-[#08080e]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="From the Blog" subtitle="News, reviews, and insights from the maker community" accent="orange" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post, i) => (
              <BlogCard key={post.id} {...post} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-neon-green hover:gap-3 transition-all font-semibold btn-press">
              Read More Articles <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
