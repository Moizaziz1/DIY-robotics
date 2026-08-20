import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tutorials, categories } from '@/data/tutorials';
import TutorialCard from '@/components/TutorialCard';
import Link from 'next/link';
import { ChevronRight, Cpu, CpuIcon, Wifi } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return { title: 'Platform Not Found' };
  return {
    title: `${category.name} Projects and Tutorials`,
    description: category.description,
  };
}

const platformIcons: Record<string, React.ReactNode> = {
  arduino: <CpuIcon className="w-12 h-12" />,
  'raspberry-pi': <Cpu className="w-12 h-12" />,
  esp32: <Wifi className="w-12 h-12" />,
};

const platformColors: Record<string, string> = {
  arduino: 'from-neon-cyan to-blue-500',
  'raspberry-pi': 'from-neon-purple to-pink-500',
  esp32: 'from-neon-green to-emerald-500',
};

export default function PlatformPage({ params }: Props) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();
  const categoryTutorials = tutorials.filter((t) => t.category === params.slug);

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center text-sm text-gray-500">
            <li><Link href="/" className="hover:text-neon-cyan transition-colors">Home</Link></li>
            <li className="px-2"><ChevronRight className="w-3 h-3" /></li>
            <li className="text-gray-300">{category.name}</li>
          </ol>
        </nav>
        <div className="flex items-center gap-6 mb-12">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${platformColors[params.slug] || 'from-neon-cyan to-neon-green'} flex items-center justify-center text-dark-900 shrink-0`}>
            {platformIcons[params.slug] || <Cpu className="w-12 h-12" />}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{category.name} Projects</h1>
            <p className="text-gray-400 mt-2 max-w-2xl">{category.description}</p>
          </div>
        </div>
        {categoryTutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTutorials.map((tutorial, i) => (
              <TutorialCard key={tutorial.id} {...tutorial} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-dark-800 border border-white/5 rounded-2xl">
            <h2 className="text-xl font-semibold text-white mb-2">Projects Coming Soon</h2>
            <p className="text-gray-400">We are working on {category.name} tutorials. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
