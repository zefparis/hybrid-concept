'use client';

import { cn } from '@/lib/utils';

interface FlagIconProps {
  country: 'GB' | 'FR' | 'PT';
  className?: string;
}

export function FlagIcon({ country, className }: FlagIconProps) {
  const flags = {
    GB: (
      <svg viewBox="0 0 60 40" className={cn("w-full h-full", className)}>
        <rect width="60" height="40" fill="#012169"/>
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/>
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5"/>
        <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13"/>
        <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8"/>
      </svg>
    ),
    FR: (
      <svg viewBox="0 0 60 40" className={cn("w-full h-full", className)}>
        <rect width="20" height="40" fill="#002395"/>
        <rect x="20" width="20" height="40" fill="#fff"/>
        <rect x="40" width="20" height="40" fill="#ED2939"/>
      </svg>
    ),
    PT: (
      <svg viewBox="0 0 60 40" className={cn("w-full h-full", className)}>
        <rect width="24" height="40" fill="#046A38"/>
        <rect x="24" width="36" height="40" fill="#DA020E"/>
        <circle cx="24" cy="20" r="8" fill="#FFE900"/>
        <circle cx="24" cy="20" r="6" fill="#fff" opacity="0.3"/>
      </svg>
    ),
  };

  return (
    <span className="inline-block w-6 h-4 rounded-sm overflow-hidden shadow-sm">
      {flags[country]}
    </span>
  );
}
