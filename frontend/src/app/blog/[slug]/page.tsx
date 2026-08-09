import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowLeft, Clock, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.coverImage, width: 800, height: 600 }],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.coverImage,
  };

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center text-sm text-gray-500">
              <li><Link href="/" className="hover:text-neon-cyan transition-colors">Home</Link></li>
              <li className="px-2"><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/blog" className="hover:text-neon-cyan transition-colors">Blog</Link></li>
              <li className="px-2"><ChevronRight className="w-3 h-3" /></li>
              <li className="text-gray-300 truncate max-w-[200px] sm:max-w-[400px]">{post.title}</li>
            </ol>
          </nav>

          <div className="mb-8">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-neon-green/20 text-neon-green border border-neon-green/30">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>

          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
              priority
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{post.excerpt}</p>
                <p className="text-gray-400 leading-relaxed">{post.content}</p>

                <div className="my-8">
                  <AdSlot format="horizontal" label="Advertisement" />
                </div>

                <div className="mt-8 p-6 bg-dark-800 border border-white/5 rounded-2xl">
                  <h3 className="text-lg font-semibold text-white mb-2">About the Author</h3>
                  <p className="text-gray-400 text-sm">{post.authorBio}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs bg-dark-800 text-gray-400 border border-white/10 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <AdSlot format="vertical" />
              {relatedPosts.length > 0 && (
                <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((p) => (
                      <Link key={p.id} href={`/blog/${p.slug}`} className="block group">
                        <h4 className="text-sm font-medium text-gray-300 group-hover:text-neon-green transition-colors">
                          {p.title}
                        </h4>
                        <span className="text-xs text-gray-500">{p.readTime}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-neon-green hover:gap-3 transition-all">
              <ArrowLeft className="w-5 h-5" /> Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
