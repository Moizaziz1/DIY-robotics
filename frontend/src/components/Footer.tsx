import Link from 'next/link';
import { Cpu } from 'lucide-react';

const footerLinks = {
  'Tutorials': [
    { name: 'Arduino Projects', href: '/platforms/arduino' },
    { name: 'Raspberry Pi Projects', href: '/platforms/raspberry-pi' },
    { name: 'ESP32 Projects', href: '/platforms/esp32' },
    { name: 'All Tutorials', href: '/tutorials' },
  ],
  'Resources': [
    { name: 'Video Tutorials', href: '/videos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Community Forum', href: '/forum' },
    { name: 'Parts Guide', href: '/tutorials' },
  ],
  'Company': [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-[#06060a] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-green flex items-center justify-center group-hover:shadow-lg group-hover:shadow-neon-cyan/20 transition-shadow duration-300">
                <Cpu className="w-5 h-5 text-dark-900" />
              </div>
              <span className="text-lg font-bold font-display">
                <span className="text-neon-cyan">DIY</span>
                <span className="text-white"> SmartHome</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Building the future of smart homes, one project at a time. Tutorials, guides, and community for Arduino, Raspberry Pi, and IoT enthusiasts.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-500 hover:text-neon-cyan text-sm transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2025–2026 DIY Smart Home Robotics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
