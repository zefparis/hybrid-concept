'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export function HCSWidgetScript() {
  useEffect(() => {
    // Suppress HCS widget console errors
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].includes('[HCS-U7]')) {
        return; // Ignore HCS widget errors
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <Script
      src="https://hcs-widget-mvp.vercel.app/widget/v3/hcs-widget.js"
      data-widget="wid_252792d76ceaa21f2d263aab"
      strategy="afterInteractive"
      onError={(e) => {
        // Silently fail - widget is optional
        console.log('HCS widget failed to load:', e);
      }}
    />
  );
}
