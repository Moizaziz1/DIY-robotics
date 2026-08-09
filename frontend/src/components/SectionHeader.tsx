'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ title, subtitle, accent = 'cyan', align = 'center' }: SectionHeaderProps) {
  const accentColors: Record<string, string> = {
    cyan: 'from-neon-cyan to-neon-green',
    purple: 'from-neon-purple to-neon-pink',
    green: 'from-neon-green to-neon-cyan',
    orange: 'from-neon-orange to-neon-pink',
  };

  const glowColors: Record<string, string> = {
    cyan: 'glow-text-cyan',
    purple: 'glow-text-purple',
    green: 'glow-text-green',
    orange: '',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-14 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
        {title.split(' ').map((word, i) => {
          const isAccent = word === 'Arduino' || word === 'Raspberry' || word === 'Pi' || word === 'Smart' || word === 'Video' || word === 'Blog';
          return isAccent ? (
            <span key={i} className={`bg-clip-text text-transparent bg-gradient-to-r ${accentColors[accent]} ${glowColors[accent]}`}>
              {word}{' '}
            </span>
          ) : (
            <span key={i}>{word} </span>
          );
        })}
      </h2>
      {subtitle && (
        <p className="text-gray-400 mt-4 max-w-2xl text-lg leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-[2px] w-20 bg-gradient-to-r ${accentColors[accent]} rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
