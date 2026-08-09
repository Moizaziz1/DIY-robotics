import { Metadata } from 'next';
import { videos } from '@/data/videos';
import VideoCard from '@/components/VideoCard';
import SectionHeader from '@/components/SectionHeader';
import AdSlot from '@/components/AdSlot';

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
            <div key={video.id}>
              <VideoCard {...video} index={i} />
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
