import { Metadata } from 'next';
import { videos } from '@/data/videos';
import VideoCard from '@/components/VideoCard';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Video Tutorials',
  description: 'Watch step-by-step video tutorials for Arduino, Raspberry Pi, and ESP32 smart home projects.',
};

export default function VideosPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Video Tutorials"
          subtitle="Watch and learn with our video guides"
          accent="purple"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <VideoCard key={video.id} {...video} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
