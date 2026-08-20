import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { videos } from '@/data/videos';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Play } from 'lucide-react';
import { extractYouTubeId } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const video = videos.find((v) => v.slug === params.slug);
  if (!video) return { title: 'Video Not Found' };
  return {
    title: video.title,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      type: 'video.other',
      images: [{ url: video.thumbnailUrl }],
    },
  };
}

export default function VideoPage({ params }: Props) {
  const video = videos.find((v) => v.slug === params.slug);
  if (!video) notFound();

  const videoId = extractYouTubeId(video.youtubeUrl);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.youtubeUrl,
    duration: video.duration,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center text-sm text-gray-500">
              <li><Link href="/" className="hover:text-neon-cyan transition-colors">Home</Link></li>
              <li className="px-2"><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/videos" className="hover:text-neon-cyan transition-colors">Videos</Link></li>
              <li className="px-2"><ChevronRight className="w-3 h-3" /></li>
              <li className="text-gray-300 truncate max-w-[200px] sm:max-w-[400px]">{video.title}</li>
            </ol>
          </nav>

          <div className="relative aspect-video rounded-2xl overflow-hidden bg-dark-800 mb-8">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <span className="text-sm text-neon-purple font-medium">{video.category}</span>
              <h1 className="text-3xl font-bold text-white mt-2">{video.title}</h1>
              <p className="text-gray-400 mt-4 leading-relaxed">{video.description}</p>

              {video.transcript && (
                <div className="mt-8 bg-dark-800 border border-white/5 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Transcript</h2>
                  <p className="text-gray-400 leading-relaxed whitespace-pre-line">{video.transcript}</p>
                </div>
              )}
            </div>
            <div>
              {relatedTutorials.length > 0 && (
                <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Related Videos</h3>
                  <div className="space-y-4">
                    {videos.filter(v => v.category === video.category && v.id !== video.id).slice(0, 3).map((v) => (
                      <Link key={v.id} href={`/videos/${v.slug}`} className="block group">
                        <h4 className="text-sm font-medium text-gray-300 group-hover:text-neon-purple transition-colors">
                          {v.title}
                        </h4>
                        <span className="text-xs text-gray-500">{v.duration}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12">
            <Link href="/videos" className="inline-flex items-center gap-2 text-neon-purple hover:gap-3 transition-all">
              <ArrowLeft className="w-5 h-5" /> Back to All Videos
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
