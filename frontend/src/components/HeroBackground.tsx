'use client';

import dynamic from 'next/dynamic';
import LazyVisible from './LazyVisible';

const ThreeBackground = dynamic(() => import('./ThreeBackground'), {
  ssr: false,
  loading: () => null,
});

export default function HeroBackground() {
  return (
    <>
      <LazyVisible fallback={<div className="absolute inset-0 hero-canvas opacity-30" />}>
        <ThreeBackground />
      </LazyVisible>
      <div className="ambient-blob w-[600px] h-[600px] bg-neon-cyan top-[-200px] left-[-200px]" style={{ animationDelay: '0s' }} />
      <div className="ambient-blob w-[500px] h-[500px] bg-neon-purple top-[10%] right-[-150px]" style={{ animationDelay: '-7s' }} />
      <div className="ambient-blob w-[400px] h-[400px] bg-neon-green bottom-[-100px] left-[30%]" style={{ animationDelay: '-14s' }} />
    </>
  );
}