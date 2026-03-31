'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface VideoTransitionProps {
  src: string;
  href: string;
  onClose: () => void;
}

export function VideoTransition({ src, href, onClose }: VideoTransitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const navigate = () => router.push(href);

    video.addEventListener('ended', navigate);
    video.addEventListener('error', navigate);

    video.play().catch(navigate);

    return () => {
      video.removeEventListener('ended', navigate);
      video.removeEventListener('error', navigate);
    };
  }, [href, router]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
