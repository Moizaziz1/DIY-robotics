import { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import { Cpu, Code, Users, Award, Shield, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the team behind DIY Smart Home Robotics. We are engineers, makers, and educators passionate about smart home technology.',
};

const team = [
  {
    name: 'Alex Chen',
    role: 'Founder & Lead Engineer',
    bio: 'IoT engineer with over 10 years of experience in embedded systems and smart home technology. Previously worked at Bosch Smart Home and now builds open-source tools for the maker community.',
    avatar: 'AC',
    color: 'from-neon-cyan to-blue-500',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Content Director',
    bio: 'Smart home enthusiast and electronics hobbyist with a passion for making complex technology accessible. Sarah has built over 50 DIY smart home devices and documents every project.',
    avatar: 'SM',
    color: 'from-neon-purple to-pink-500',
  },
  {
    name: 'Marcus Johnson',
    role: 'Community Manager',
    bio: 'Professional robotics instructor and founder of three maker spaces. Marcus mentors the next generation of hardware hackers and runs our community forum and workshops.',
    avatar: 'MJ',
    color: 'from-neon-green to-emerald-500',
  },
];

const values = [
  { icon: <Code className="w-6 h-6" />, title: 'Open Source', description: 'All our tutorials include complete source code and schematics.' },
  { icon: <Users className="w-6 h-6" />, title: 'Community First', description: 'Built by makers, for makers. Our forum helps you succeed.' },
  { icon: <Award className="w-6 h-6" />, title: 'Quality Content', description: 'Every project is tested, documented, and reviewed before publishing.' },
  { icon: <Shield className="w-6 h-6" />, title: 'Safety Focused', description: 'We emphasize safe practices, especially when working with mains voltage.' },
];

export default function AboutPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="About DIY Smart Home Robotics" subtitle="Building the future of smart homes, one project at a time" accent="cyan" />

        <div className="bg-dark-800 border border-white/5 rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-neon-cyan/10 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-neon-cyan" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg">
            DIY Smart Home Robotics was founded in 2022 with a simple goal: make smart home technology accessible to everyone. We believe that building your own smart devices is not only more affordable than buying commercial products, but also more rewarding and educational.
          </p>
          <p className="text-gray-400 leading-relaxed mt-4">
            Our team of experienced engineers and passionate makers creates step-by-step tutorials, video guides, and project resources that help hobbyists, students, and professionals build everything from simple sensors to complex home automation systems. Every project on our site has been built and tested by our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {values.map((value) => (
            <div key={value.title} className="bg-dark-800 border border-white/5 rounded-2xl p-6">
              <div className="text-neon-cyan mb-3">{value.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-gray-400 text-sm">{value.description}</p>
            </div>
          ))}
        </div>

        <SectionHeader title="Meet the Team" subtitle="The people behind the projects" accent="purple" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {team.map((member) => (
            <div key={member.name} className="bg-dark-800 border border-white/5 rounded-2xl p-6 text-center">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-dark-900 text-xl font-bold mx-auto mb-4`}>
                {member.avatar}
              </div>
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-neon-cyan text-sm mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
