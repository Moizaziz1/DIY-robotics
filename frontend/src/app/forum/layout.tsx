import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Forum',
  description: 'Join the DIY Smart Home Robotics community. Ask questions, share projects, and connect with fellow makers.',
};

export default function ForumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
