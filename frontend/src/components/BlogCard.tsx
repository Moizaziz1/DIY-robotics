'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  readTime: string;
  publishedAt: string;
  category: string;
  index?: number;
}

export default function BlogCard({ title, slug, excerpt, coverImage, author, readTime, publishedAt, category, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/blog/${slug}`} className="group block">
        <div className="relative bg-[#0c0c14] border border-white/[0.06] rounded-2xl overflow-hidden card-hover group-hover:border-neon-green/30 group-hover:neon-border-green">
          <div className="relative h-52 overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-transparent opacity-60" />
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-neon-green/20 text-neon-green border border-neon-green/30 backdrop-blur-sm">
                {category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-white group-hover:text-neon-green transition-colors duration-300 line-clamp-2 leading-snug">
              {title}
            </h3>
            <p className="text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed">{excerpt}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{author}</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span>{readTime}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-neon-green opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
