import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for DIY Smart Home Robotics. Learn how we handle your data, cookies, and Google AdSense.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center text-sm text-gray-500">
            <li><Link href="/" className="hover:text-neon-cyan transition-colors">Home</Link></li>
            <li className="px-2"><ChevronRight className="w-3 h-3" /></li>
            <li className="text-gray-300">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: July 27, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
            <p className="text-gray-400 leading-relaxed">
              DIY Smart Home Robotics (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website diysmarthomerobotics.com. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website and use our services, including our community forum, newsletter, and contact forms.
            </p>
            <p className="text-gray-400 leading-relaxed mt-3">
              We are committed to protecting your privacy and being transparent about the data we collect. This policy applies to all visitors and users of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p className="text-gray-400 leading-relaxed mb-3">We may collect the following types of information:</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li><strong className="text-gray-300">Account Information:</strong> Username, email address, and display name when you register for our community forum.</li>
              <li><strong className="text-gray-300">Contact Submissions:</strong> Name, email, and message content when you use our contact form.</li>
              <li><strong className="text-gray-300">Newsletter Subscription:</strong> Email address when you subscribe to our newsletter.</li>
              <li><strong className="text-gray-300">Usage Data:</strong> Pages visited, time spent on pages, referring URLs, and general analytics data.</li>
              <li><strong className="text-gray-300">Device Information:</strong> Browser type, operating system, screen resolution, and IP address.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Google AdSense and Third-Party Advertising</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              We use Google AdSense, a service provided by Google Inc. (&quot;Google&quot;), to display advertisements on our website. Google AdSense uses cookies, web beacons, and similar technologies to collect information about your visits to this website and other websites in order to provide relevant advertisements.
            </p>

            <h3 className="text-lg font-semibold text-gray-200 mt-4 mb-2">3.1 How Google AdSense Works</h3>
            <p className="text-gray-400 leading-relaxed mb-3">
              Google AdSense uses the DoubleClick DART cookie to serve ads based on your prior visits to our website and/or other websites on the internet. The DART cookie enables Google to serve ads to you based on your browsing history and interests. When you visit our website, Google may place additional cookies on your browser for ad personalization, ad measurement, and other purposes.
            </p>

            <h3 className="text-lg font-semibold text-gray-200 mt-4 mb-2">3.2 Third-Party Vendors</h3>
            <p className="text-gray-400 leading-relaxed mb-3">
              Third-party advertisers, including Google, may use cookies, web beacons, and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Serve personalized advertisements based on your interests and browsing history</li>
              <li>Measure the effectiveness of advertising campaigns</li>
              <li>Perform frequency capping (limit how many times you see an ad)</li>
              <li>Conduct ad attribution and conversion tracking</li>
              <li>Prevent ad fraud and ensure ad quality</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-200 mt-4 mb-2">3.3 Your Advertising Choices</h3>
            <p className="text-gray-400 leading-relaxed mb-3">
              You can opt out of personalized advertising by:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Visiting <a href="https://www.google.com/settings/ads" className="text-neon-cyan hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
              <li>Visiting <a href="http://www.aboutads.info/choices/" className="text-neon-cyan hover:underline" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance (DAA) opt-out page</a></li>
              <li>Visiting <a href="https://www.youronlinechoices.eu/" className="text-neon-cyan hover:underline" target="_blank" rel="noopener noreferrer">European Interactive Digital Advertising Alliance (EDAA) opt-out page</a></li>
              <li>Disabling cookies through our cookie consent banner when you first visit our site</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-3">
              Please note that opting out does not mean you will not see advertisements. It means you will not receive personalized ads based on your browsing history.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              We use the following types of cookies on our website:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li><strong className="text-gray-300">Essential Cookies:</strong> Required for basic website functionality, such as remembering your cookie consent preference and maintaining session state.</li>
              <li><strong className="text-gray-300">Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
              <li><strong className="text-gray-300">Advertising Cookies:</strong> Used by Google AdSense and third-party advertisers to serve relevant ads and measure ad performance. These include the DoubleClick DART cookie and Google&apos;s advertising cookies.</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-3">
              You can control cookie preferences through our cookie consent banner, which appears when you first visit our website. You may change your preferences at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>To provide and maintain our services, including the community forum</li>
              <li>To respond to your inquiries submitted through the contact form</li>
              <li>To send newsletters and updates you have subscribed to</li>
              <li>To improve our website and user experience</li>
              <li>To serve relevant advertisements through Google AdSense</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Data Sharing</h2>
            <p className="text-gray-400 leading-relaxed">
              We do not sell your personal information. We may share data with the following categories of third parties:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4 mt-3">
              <li><strong className="text-gray-300">Google (AdSense and Analytics):</strong> For serving advertisements and analyzing website traffic. Google&apos;s use of data is governed by <a href="https://policies.google.com/privacy" className="text-neon-cyan hover:underline" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</li>
              <li><strong className="text-gray-300">Hosting Providers:</strong> Our website is hosted on Vercel, and our database is hosted on Neon. Both providers process data on our behalf.</li>
              <li><strong className="text-gray-300">Email Service Providers:</strong> For newsletter delivery and transactional emails.</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-3">
              All third-party processors are contractually obligated to protect your data and process it only in accordance with our instructions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Your Rights (GDPR)</h2>
            <p className="text-gray-400 leading-relaxed mb-3">If you are located in the European Economic Area (EEA), you have the following rights:</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Right to access your personal data</li>
              <li>Right to rectify inaccurate data</li>
              <li>Right to erase your data (&quot;right to be forgotten&quot;)</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent at any time</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-3">
              To exercise these rights, please contact us at homerobotics515@gmail.com. We will respond to your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. California Privacy Rights (CCPA)</h2>
            <p className="text-gray-400 leading-relaxed">
              If you are a California resident, you have the right to know what personal information we collect, use, and disclose about you. You also have the right to request deletion of your personal information. We do not sell your personal information as defined under the CCPA. To exercise your rights, please contact us at homerobotics515@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Data Security</h2>
            <p className="text-gray-400 leading-relaxed">
              We implement industry-standard security measures including SSL/TLS encryption, secure database hosting, and regular security audits. However, no method of transmission over the internet is 100% secure. We cannot guarantee the absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Children&apos;s Privacy</h2>
            <p className="text-gray-400 leading-relaxed">
              Our services are not directed to individuals under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">11. Changes to This Policy</h2>
            <p className="text-gray-400 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the &quot;Last updated&quot; date at the top of this page. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">12. Contact Us</h2>
            <p className="text-gray-400 leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-gray-400 leading-relaxed mt-2">
              Email: <a href="mailto:homerobotics515@gmail.com" className="text-neon-cyan hover:underline">homerobotics515@gmail.com</a><br />
              Contact Page: <Link href="/contact" className="text-neon-cyan hover:underline">Contact Us</Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
