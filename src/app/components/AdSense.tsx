'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-7391347597198934"
      data-ad-slot="2099893538"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}