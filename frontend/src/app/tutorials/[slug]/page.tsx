import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tutorials } from '@/data/tutorials';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, DollarSign, ArrowLeft, ChevronRight, User } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return tutorials.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tutorial = tutorials.find((t) => t.slug === params.slug);
  if (!tutorial) return { title: 'Tutorial Not Found' };
  return {
    title: tutorial.metaTitle,
    description: tutorial.metaDescription,
    openGraph: {
      title: tutorial.metaTitle,
      description: tutorial.metaDescription,
      type: 'article',
      images: [{ url: tutorial.coverImage, width: 800, height: 600 }],
    },
  };
}

export default function TutorialPage({ params }: Props) {
  const tutorial = tutorials.find((t) => t.slug === params.slug);
  if (!tutorial) notFound();

  const difficultyColor = {
    Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
  }[tutorial.difficulty];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: tutorial.title,
    description: tutorial.description,
    estimatedCost: { '@type': 'MonetaryAmount', value: tutorial.costEstimate },
    totalTime: tutorial.timeEstimate,
    step: tutorial.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.content,
    })),
  };

  const relatedTutorials = tutorials
    .filter((t) => t.category === tutorial.category && t.id !== tutorial.id)
    .slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-neon-cyan transition-colors">Home</Link>
              </li>
              <li className="px-2"><ChevronRight className="w-3 h-3" /></li>
              <li>
                <Link href="/tutorials" className="hover:text-neon-cyan transition-colors">Tutorials</Link>
              </li>
              <li className="px-2"><ChevronRight className="w-3 h-3" /></li>
              <li className="text-gray-300 truncate max-w-[200px] sm:max-w-[400px]">
                {tutorial.title}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${difficultyColor}`}>
                {tutorial.difficulty}
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-dark-700 text-gray-300 border border-white/10">
                {tutorial.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {tutorial.title}
            </h1>
            <p className="text-gray-400 text-lg mt-4">{tutorial.description}</p>
            <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neon-cyan" />
                {tutorial.timeEstimate}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-neon-green" />
                {tutorial.costEstimate}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-neon-purple" />
                {tutorial.author}
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
            <Image
              src={tutorial.coverImage}
              alt={tutorial.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
              priority
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Parts List */}
              <div className="bg-dark-800 border border-white/5 rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Parts List</h2>
                <ul className="space-y-2">
                  {tutorial.partsList.map((part, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <span className="w-2 h-2 bg-neon-cyan rounded-full shrink-0" />
                      {part}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white">Step-by-Step Instructions</h2>
                {tutorial.steps.map((step, i) => (
                  <div key={i}>
                    <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-8 h-8 bg-neon-cyan/20 text-neon-cyan rounded-lg flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{step.content}</p>
                      {step.code && (
                        <pre className="mt-4 bg-dark-900 border border-white/5 rounded-xl p-4 overflow-x-auto">
                          <code className="text-sm text-neon-green font-mono">{step.code}</code>
                        </pre>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {relatedTutorials.length > 0 && (
                <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Related Tutorials</h3>
                  <div className="space-y-4">
                    {relatedTutorials.map((t) => (
                      <Link key={t.id} href={`/tutorials/${t.slug}`} className="block group">
                        <h4 className="text-sm font-medium text-gray-300 group-hover:text-neon-cyan transition-colors">
                          {t.title}
                        </h4>
                        <span className="text-xs text-gray-500">{t.difficulty} · {t.timeEstimate}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-12">
            <Link href="/tutorials" className="inline-flex items-center gap-2 text-neon-cyan hover:gap-3 transition-all">
              <ArrowLeft className="w-5 h-5" /> Back to All Tutorials
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
