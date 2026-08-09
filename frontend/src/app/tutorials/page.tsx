import { Metadata } from 'next';
import { tutorials, categories } from '@/data/tutorials';
import TutorialCard from '@/components/TutorialCard';
import SectionHeader from '@/components/SectionHeader';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tutorials & Project Guides',
  description: 'Step-by-step DIY tutorials for Arduino, Raspberry Pi, and ESP32 smart home projects. Beginner to advanced difficulty levels.',
};

export default function TutorialsPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Tutorials & Project Guides"
          subtitle="Step-by-step guides for building smart home devices"
          accent="cyan"
        />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link href="/tutorials" className="px-4 py-2 bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 rounded-full text-sm font-medium">
            All Projects
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/platforms/${cat.slug}`}
              className="px-4 py-2 bg-dark-800 text-gray-400 border border-white/10 rounded-full text-sm hover:text-white hover:border-white/20 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial, i) => (
            <div key={tutorial.id}>
              <TutorialCard {...tutorial} index={i} />
              {i === 2 && (
                <div className="mt-6">
                  <AdSlot format="horizontal" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <AdSlot format="horizontal" />
        </div>
      </div>
    </div>
  );
}
