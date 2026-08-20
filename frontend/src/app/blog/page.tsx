import { Metadata } from 'next';
import { blogPosts } from '@/data/blog';
import BlogCard from '@/components/BlogCard';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'News, product reviews, comparisons, and insights from the DIY smart home robotics community.',
};

export default function BlogPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Blog" subtitle="News, reviews, and insights from the maker community" accent="green" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} {...post} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
