'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, DollarSign, ArrowRight } from 'lucide-react';

interface TutorialCardProps {
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  timeEstimate?: string;
  costEstimate?: string;
  coverImage: string;
  category: string;
  index?: number;
}

export default function TutorialCard({
  title, slug, description, difficulty, timeEstimate, costEstimate, coverImage, category, index = 0
}: TutorialCardProps) {
  const difficultyColor = {
    Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
  }[difficulty] || 'bg-gray-500/20 text-gray-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/tutorials/${slug}`} className="group block">
        <div className="relative bg-[#0c0c14] border border-white/[0.06] rounded-2xl overflow-hidden card-hover group-hover:border-neon-cyan/30 group-hover:neon-border-cyan">
          <div className="relative h-52 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-transparent z-10 opacity-80" />
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <span className={`px-3 py-1 text-xs font-semibold rounded-lg border backdrop-blur-sm ${difficultyColor}`}>
                {difficulty}
              </span>
            </div>
            <div className="absolute top-4 right-4 z-20">
              <span className="px-3 py-1 text-xs font-medium rounded-lg bg-dark-900/80 text-gray-300 border border-white/10 backdrop-blur-sm">
                {category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors duration-300 line-clamp-2 leading-snug">
              {title}
            </h3>
            <p className="text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed">{description}</p>
            <div className="flex items-center gap-4 mt-4">
              {timeEstimate && (
                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {timeEstimate}
                </div>
              )}
              {costEstimate && (
                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <DollarSign className="w-3.5 h-3.5" />
                  {costEstimate}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-neon-cyan text-sm mt-5 font-medium group-hover:gap-3 transition-all duration-300">
              Read Tutorial <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
