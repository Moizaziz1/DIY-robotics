import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VisitTracker from '@/components/VisitTracker';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://diysmarthomerobotics.com';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'DIY Smart Home Robotics';
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION;
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Tutorials, Guides & Community`,
    template: `%s | ${siteName}`,
  },
  description: 'Build smart home devices with Arduino, Raspberry Pi, and ESP32. Tutorials, project guides, video walkthroughs, and a maker community.',
  keywords: ['DIY', 'smart home', 'robotics', 'Arduino', 'Raspberry Pi', 'ESP32', 'IoT', 'tutorials', 'projects', 'home automation'],
  authors: [{ name: `${siteName} Team` }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: `${siteName} | Tutorials, Guides & Community`,
    description: 'Build smart home devices with Arduino, Raspberry Pi, and ESP32.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: 'Build smart home devices with Arduino, Raspberry Pi, and ESP32.',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
  description: 'Build smart home devices with Arduino, Raspberry Pi, and ESP32. Tutorials, project guides, video walkthroughs, and a maker community.',
  publisher: {
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.jpeg`,
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/tutorials?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {googleVerification && (
          <meta name="google-site-verification" content={googleVerification} />
        )}
        {googleAnalyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${googleAnalyticsId}');`,
              }}
            />
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':true;document.documentElement.classList.toggle('dark',d);document.documentElement.classList.toggle('light',!d)}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-dark-900 text-gray-100 min-h-screen flex flex-col">
          <VisitTracker />
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1 pt-16">{children}</main>
          <Footer />
      </body>
    </html>
  );
}
