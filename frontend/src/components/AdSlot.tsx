'use client';

import { useEffect, useRef } from 'react';
import { useCookieConsent } from '@/components/CookieConsent';

interface AdSlotProps {
  format?: 'auto' | 'horizontal' | 'vertical' | 'square';
  className?: string;
  label?: string;
}

const adUnitIds: Record<string, string> = {
  horizontal: process.env.NEXT_PUBLIC_AD_SLOT_HORIZONTAL || '',
  vertical: process.env.NEXT_PUBLIC_AD_SLOT_VERTICAL || '',
  square: process.env.NEXT_PUBLIC_AD_SLOT_SQUARE || '',
  auto: process.env.NEXT_PUBLIC_AD_SLOT_AUTO || '',
};

const adFormats: Record<string, { style: string; format?: string }> = {
  horizontal: { style: 'display:inline-block;width:728px;height:90px' },
  vertical: { style: 'display:inline-block;width:300px;height:600px' },
  square: { style: 'display:inline-block;width:300px;height:250px' },
  auto: { style: 'display:block', format: 'auto' },
};

export default function AdSlot({ format = 'auto', className = '', label = 'Advertisement' }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const { consent } = useCookieConsent();
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
  const adUnitId = adUnitIds[format] || adUnitIds.auto;

  useEffect(() => {
    if (consent !== 'accepted' || !publisherId || !adUnitId || !adRef.current) return;

    const container = adRef.current;
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.style.textAlign = 'center';
    if (adFormats[format]?.format) {
      ins.setAttribute('data-ad-format', adFormats[format].format!);
    }
    ins.setAttribute('data-full-width-responsive', 'true');
    ins.setAttribute('data-ad-client', publisherId);
    ins.setAttribute('data-ad-slot', adUnitId);

    container.innerHTML = '';
    container.appendChild(ins);

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, [consent, publisherId, adUnitId, format]);

  const dimensions: Record<string, string> = {
    auto: 'w-full min-h-[250px]',
    horizontal: 'w-full h-[90px]',
    vertical: 'w-full sm:w-[300px] h-[600px]',
    square: 'w-full sm:w-[300px] h-[250px]',
  };

  if (consent === 'declined') {
    return null;
  }

  if (consent === null || !publisherId || !adUnitId) {
    return (
      <div className={`relative ${className}`}>
        <div className="text-[10px] text-gray-600 uppercase tracking-wider text-center mb-1">
          {label}
        </div>
        <div
          className={`${dimensions[format]} bg-dark-800/50 border border-dashed border-white/5 rounded-lg flex items-center justify-center overflow-hidden`}
        >
          <div className="text-center p-4">
            <div className="text-gray-700 text-xs">
              {!publisherId ? 'AdSense not configured' : consent === null ? 'Ad loads after cookie consent' : 'Ad Space'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="text-[10px] text-gray-600 uppercase tracking-wider text-center mb-1">
        {label}
      </div>
      <div
        ref={adRef}
        className={`${dimensions[format]} bg-dark-800 border border-dashed border-white/10 rounded-lg flex items-center justify-center overflow-hidden`}
      />
    </div>
  );
}
