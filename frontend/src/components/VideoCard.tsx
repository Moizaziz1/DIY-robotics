'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';

interface VideoCardProps {
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  category: string;
  index?: number;
}

export default function VideoCard({ title, slug, description, thumbnailUrl, duration, category, index = 0 }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/videos/${slug}`} className="group block">
        <div className="relative bg-[#0c0c14] border border-white/[0.06] rounded-2xl overflow-hidden card-hover group-hover:border-neon-purple/30 group-hover:neon-border-purple">
          <div className="relative h-52 overflow-hidden">
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="w-16 h-16 rounded-full bg-neon-purple/90 flex items-center justify-center shadow-lg shadow-neon-purple/30 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-7 h-7 text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 z-20">
              <span className="px-2.5 py-1 text-xs bg-dark-900/90 text-gray-300 rounded-lg flex items-center gap-1.5 backdrop-blur-sm border border-white/10">
                <Clock className="w-3 h-3" /> {duration}
              </span>
            </div>
          </div>
          <div className="p-6">
            <span className="text-xs text-neon-purple font-semibold tracking-wide uppercase">{category}</span>
            <h3 className="text-lg font-bold text-white group-hover:text-neon-purple transition-colors duration-300 mt-1.5 line-clamp-2 leading-snug">
              {title}
            </h3>
            <p className="text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed">{description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
