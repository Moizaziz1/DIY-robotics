'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visits/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: pathname }),
        });
      } catch {
        // silently ignore tracking errors
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}
