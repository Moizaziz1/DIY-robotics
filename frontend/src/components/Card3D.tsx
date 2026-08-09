'use client';

import { useState, useCallback, useRef } from 'react';

export default function Card3D({ color = '#00f5d4', children }: { color?: string; children: React.ReactNode }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'translateY(-4px) scale(1.01)' : ''}`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow border */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${color}40, transparent 40%, ${color}20)`,
          filter: 'blur(1px)',
        }}
      />
      {/* Corner decoration */}
      <div
        className="absolute top-3 right-3 w-8 h-8 opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}60 0%, transparent 70%)`,
          boxShadow: `0 0 12px ${color}40`,
        }}
      />
      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}