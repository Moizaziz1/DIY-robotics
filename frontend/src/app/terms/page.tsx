import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for DIY Smart Home Robotics. Read our community guidelines and legal terms.',
};

export default function TermsPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center text-sm text-gray-500">
            <li><Link href="/" className="hover:text-neon-cyan transition-colors">Home</Link></li>
            <li className="px-2"><ChevronRight className="w-3 h-3" /></li>
            <li className="text-gray-300">Terms of Service</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: July 27, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-400 leading-relaxed">
              By accessing and using DIY Smart Home Robotics (diysmarthomerobotics.com), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. User Accounts</h2>
            <p className="text-gray-400 leading-relaxed mb-3">To participate in our community forum, you must create an account. You agree to:</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your password</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Community Guidelines</h2>
            <p className="text-gray-400 leading-relaxed mb-3">When using our forum, you agree to:</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Be respectful and constructive in all interactions</li>
              <li>Share original content and properly credit others</li>
              <li>No spam, self-promotion, or off-topic content</li>
              <li>No sharing of harmful, illegal, or dangerous information</li>
              <li>Report inappropriate content to moderators</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-3">
              We reserve the right to remove content and suspend accounts that violate these guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Intellectual Property</h2>
            <p className="text-gray-400 leading-relaxed">
              Our tutorials, articles, and original content are licensed under <a href="https://creativecommons.org/licenses/by-nc/4.0/" className="text-neon-cyan hover:underline" target="_blank" rel="noopener noreferrer">Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)</a>. You may share and adapt our content for non-commercial purposes with proper attribution.
            </p>
            <p className="text-gray-400 leading-relaxed mt-3">
              User-generated content in the forum remains the intellectual property of the author, but by posting on our platform, you grant us a non-exclusive license to display and distribute your content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Disclaimer of Warranties</h2>
            <p className="text-gray-400 leading-relaxed">
              Our tutorials and projects are provided for educational purposes. DIY electronics projects involve risk of injury, property damage, or electrical hazards. Always follow proper safety procedures, especially when working with mains voltage. We are not responsible for any damage or injury resulting from following our tutorials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-400 leading-relaxed">
              DIY Smart Home Robotics shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services. Our total liability shall not exceed the amount you paid us, if any, in the past twelve months.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Changes to Terms</h2>
            <p className="text-gray-400 leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms. We will notify users of significant changes via email or site notification.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Advertising</h2>
            <p className="text-gray-400 leading-relaxed">
              Our website displays advertisements served through Google AdSense and other advertising partners. These advertisements help fund the creation of free educational content. By using our website, you agree to the display of advertisements. You may opt out of personalized advertising through our cookie consent banner or by visiting <a href="https://www.google.com/settings/ads" className="text-neon-cyan hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Contact</h2>
            <p className="text-gray-400 leading-relaxed">
              Questions about these Terms? Contact us at <a href="mailto:homerobotics515@gmail.com" className="text-neon-cyan hover:underline">homerobotics515@gmail.com</a> or through our <Link href="/contact" className="text-neon-cyan hover:underline">Contact Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
