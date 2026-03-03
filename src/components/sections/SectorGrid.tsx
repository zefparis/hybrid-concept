'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const ICONS: Record<string, React.ReactNode> = {
  government: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  ),
  infrastructure: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
  energy: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  logistics: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  cyber: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  ai: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
};

const SECTOR_BACKGROUNDS: Record<string, React.ReactNode> = {
  government: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      {/* Ambient grid */}
      <g opacity="0.06">
        {[...Array(12)].map((_, i) => (
          <line key={`gh${i}`} x1="0" y1={40 + i * 38} x2="500" y2={40 + i * 38} strokeWidth="1" />
        ))}
        {[...Array(12)].map((_, i) => (
          <line key={`gv${i}`} x1={40 + i * 38} y1="0" x2={40 + i * 38} y2="500" strokeWidth="1" />
        ))}
      </g>

      {/* Glow */}
      <circle cx="250" cy="210" r="140" fill="#38bdf8" opacity="0.04" />
      <circle cx="250" cy="210" r="80" fill="#818cf8" opacity="0.05" />

      <g transform="translate(80, 40)">
        {/* Grand building structure */}
        <path d="M170 80 L340 80 L340 360 L170 360 Z" strokeWidth="1" opacity="0.08" fill="currentColor" fillOpacity="0.03" />

        {/* Pediment / Triangle */}
        <path d="M120 120 L255 40 L390 120 Z" strokeWidth="2" opacity="0.15" fill="currentColor" fillOpacity="0.04" />
        <path d="M160 120 L255 60 L350 120 Z" strokeWidth="1.5" stroke="#38bdf8" opacity="0.25" fill="#38bdf8" fillOpacity="0.03" />

        {/* Columns */}
        <rect x="150" y="120" width="14" height="220" rx="3" fill="currentColor" fillOpacity="0.06" stroke="none" />
        <rect x="200" y="120" width="14" height="220" rx="3" fill="currentColor" fillOpacity="0.06" stroke="none" />
        <rect x="250" y="120" width="14" height="220" rx="3" fill="currentColor" fillOpacity="0.08" stroke="none" />
        <rect x="300" y="120" width="14" height="220" rx="3" fill="currentColor" fillOpacity="0.06" stroke="none" />
        <rect x="350" y="120" width="14" height="220" rx="3" fill="currentColor" fillOpacity="0.06" stroke="none" />

        {/* Column highlights */}
        <line x1="157" y1="130" x2="157" y2="330" strokeWidth="1" stroke="#38bdf8" opacity="0.15" />
        <line x1="257" y1="130" x2="257" y2="330" strokeWidth="1.5" stroke="#818cf8" opacity="0.2" />
        <line x1="357" y1="130" x2="357" y2="330" strokeWidth="1" stroke="#38bdf8" opacity="0.15" />

        {/* Base platform */}
        <rect x="120" y="340" width="280" height="16" rx="2" fill="currentColor" fillOpacity="0.06" stroke="none" />
        <line x1="120" y1="340" x2="400" y2="340" strokeWidth="2" opacity="0.12" />
        <line x1="120" y1="356" x2="400" y2="356" strokeWidth="1" stroke="#38bdf8" opacity="0.15" />

        {/* Lintel / Entablature */}
        <rect x="135" y="115" width="250" height="10" rx="1" fill="currentColor" fillOpacity="0.05" stroke="none" />
        <line x1="135" y1="115" x2="385" y2="115" strokeWidth="1.5" stroke="#818cf8" opacity="0.18" />

        {/* Network nodes on columns */}
        <circle cx="157" cy="180" r="4" fill="#38bdf8" opacity="0.7" stroke="none" />
        <circle cx="207" cy="220" r="3" fill="#c084fc" opacity="0.6" stroke="none" />
        <circle cx="257" cy="170" r="5" fill="#818cf8" opacity="0.8" stroke="none" />
        <circle cx="307" cy="240" r="3" fill="#38bdf8" opacity="0.6" stroke="none" />
        <circle cx="357" cy="200" r="4" fill="#c084fc" opacity="0.7" stroke="none" />

        {/* Interconnect lines between nodes */}
        <line x1="157" y1="180" x2="257" y2="170" strokeWidth="1" stroke="#38bdf8" opacity="0.2" strokeDasharray="4 6" />
        <line x1="257" y1="170" x2="357" y2="200" strokeWidth="1" stroke="#818cf8" opacity="0.2" strokeDasharray="4 6" />
        <line x1="207" y1="220" x2="307" y2="240" strokeWidth="1" stroke="#c084fc" opacity="0.15" strokeDasharray="3 5" />
        <line x1="157" y1="180" x2="207" y2="220" strokeWidth="1" opacity="0.12" strokeDasharray="4 4" />
        <line x1="307" y1="240" x2="357" y2="200" strokeWidth="1" opacity="0.12" strokeDasharray="4 4" />

        {/* Data flow dots */}
        <circle cx="200" cy="175" r="2" fill="#38bdf8" opacity="0.5" stroke="none" />
        <circle cx="310" cy="205" r="2" fill="#818cf8" opacity="0.5" stroke="none" />
        <circle cx="255" cy="80" r="3" fill="#38bdf8" opacity="0.6" stroke="none" />

        {/* Floating abstract data lines */}
        <line x1="60" y1="280" x2="140" y2="280" strokeWidth="1" opacity="0.08" strokeDasharray="6 4 2 4" />
        <line x1="380" y1="260" x2="440" y2="260" strokeWidth="1" opacity="0.08" strokeDasharray="4 6 2 4" />
        <line x1="60" y1="300" x2="120" y2="300" strokeWidth="1" stroke="#38bdf8" opacity="0.1" strokeDasharray="8 4" />
      </g>
    </svg>
  ),
  infrastructure: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      {/* Ambient grid */}
      <g opacity="0.05">
        {[...Array(10)].map((_, i) => (
          <line key={`ig${i}`} x1="0" y1={50 + i * 45} x2="500" y2={50 + i * 45} strokeWidth="1" />
        ))}
      </g>

      {/* Glow */}
      <circle cx="250" cy="230" r="150" fill="#818cf8" opacity="0.04" />
      <circle cx="280" cy="200" r="90" fill="#38bdf8" opacity="0.05" />

      <g transform="translate(30, 30)">
        {/* Isometric platform base */}
        <path d="M220 320 L440 210 L440 240 L220 350 Z" fill="currentColor" fillOpacity="0.04" stroke="none" />
        <path d="M220 320 L0 210 L0 240 L220 350 Z" fill="currentColor" fillOpacity="0.03" stroke="none" />
        <path d="M0 210 L220 100 L440 210 L220 320 Z" fill="currentColor" fillOpacity="0.05" stroke="none" />
        <path d="M0 210 L220 100 L440 210 L220 320 Z" strokeWidth="1.5" opacity="0.12" />

        {/* Inner platform */}
        <path d="M110 265 L220 210 L330 265 L220 320 Z" strokeWidth="1" stroke="#38bdf8" opacity="0.2" fill="#38bdf8" fillOpacity="0.03" />

        {/* Grid lines on platform */}
        <line x1="55" y1="237" x2="385" y2="237" strokeWidth="0.5" opacity="0.08" />
        <line x1="110" y1="265" x2="330" y2="265" strokeWidth="0.5" stroke="#818cf8" opacity="0.1" />
        <line x1="165" y1="155" x2="165" y2="292" strokeWidth="0.5" opacity="0.08" />
        <line x1="275" y1="155" x2="275" y2="292" strokeWidth="0.5" opacity="0.08" />
        <line x1="220" y1="100" x2="220" y2="320" strokeWidth="0.5" stroke="#38bdf8" opacity="0.12" />

        {/* Building blocks - left */}
        <rect x="100" y="150" width="60" height="90" rx="2" fill="currentColor" fillOpacity="0.06" stroke="none" />
        <line x1="100" y1="150" x2="160" y2="150" strokeWidth="1" opacity="0.1" />
        <line x1="100" y1="240" x2="160" y2="240" strokeWidth="1" opacity="0.1" />
        <line x1="110" y1="165" x2="150" y2="165" strokeWidth="1" stroke="#38bdf8" opacity="0.15" />
        <line x1="110" y1="180" x2="140" y2="180" strokeWidth="1" opacity="0.08" />
        <line x1="110" y1="195" x2="150" y2="195" strokeWidth="1" stroke="#c084fc" opacity="0.12" />
        <line x1="110" y1="210" x2="135" y2="210" strokeWidth="1" opacity="0.08" />

        {/* Building blocks - center tall */}
        <rect x="190" y="90" width="60" height="150" rx="2" fill="currentColor" fillOpacity="0.07" stroke="none" />
        <line x1="190" y1="90" x2="250" y2="90" strokeWidth="1.5" stroke="#818cf8" opacity="0.2" />
        <line x1="200" y1="110" x2="240" y2="110" strokeWidth="1" stroke="#38bdf8" opacity="0.18" />
        <line x1="200" y1="130" x2="230" y2="130" strokeWidth="1" opacity="0.08" />
        <line x1="200" y1="150" x2="240" y2="150" strokeWidth="1" stroke="#c084fc" opacity="0.12" />
        <line x1="200" y1="170" x2="235" y2="170" strokeWidth="1" opacity="0.08" />
        <line x1="200" y1="190" x2="240" y2="190" strokeWidth="1" stroke="#38bdf8" opacity="0.12" />
        <line x1="200" y1="210" x2="225" y2="210" strokeWidth="1" opacity="0.06" />

        {/* Building blocks - right */}
        <rect x="280" y="170" width="60" height="70" rx="2" fill="currentColor" fillOpacity="0.05" stroke="none" />
        <line x1="280" y1="170" x2="340" y2="170" strokeWidth="1" opacity="0.1" />
        <line x1="290" y1="185" x2="330" y2="185" strokeWidth="1" stroke="#818cf8" opacity="0.15" />
        <line x1="290" y1="200" x2="320" y2="200" strokeWidth="1" opacity="0.08" />
        <line x1="290" y1="215" x2="330" y2="215" strokeWidth="1" stroke="#38bdf8" opacity="0.12" />

        {/* Connection nodes */}
        <circle cx="130" cy="150" r="4" fill="#38bdf8" opacity="0.7" stroke="none" />
        <circle cx="220" cy="90" r="5" fill="#818cf8" opacity="0.8" stroke="none" />
        <circle cx="310" cy="170" r="4" fill="#c084fc" opacity="0.7" stroke="none" />
        <circle cx="220" cy="240" r="4" fill="#38bdf8" opacity="0.6" stroke="none" />

        {/* Network connections */}
        <line x1="130" y1="150" x2="220" y2="90" strokeWidth="1.5" stroke="#38bdf8" opacity="0.15" strokeDasharray="6 4" />
        <line x1="220" y1="90" x2="310" y2="170" strokeWidth="1.5" stroke="#818cf8" opacity="0.15" strokeDasharray="6 4" />
        <line x1="130" y1="150" x2="220" y2="240" strokeWidth="1" opacity="0.1" strokeDasharray="4 6" />
        <line x1="310" y1="170" x2="220" y2="240" strokeWidth="1" stroke="#c084fc" opacity="0.1" strokeDasharray="4 6" />

        {/* Pulse rings */}
        <circle cx="220" cy="90" r="12" stroke="#818cf8" strokeWidth="1" opacity="0.15" />
        <circle cx="220" cy="90" r="22" stroke="#818cf8" strokeWidth="0.5" opacity="0.08" strokeDasharray="4 4" />

        {/* Scattered data dots */}
        <circle cx="70" cy="200" r="2" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="380" cy="220" r="2" fill="#c084fc" opacity="0.4" stroke="none" />
        <circle cx="170" cy="280" r="2" fill="#818cf8" opacity="0.3" stroke="none" />
        <circle cx="300" cy="280" r="2" fill="#38bdf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  energy: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      {/* Radial glow */}
      <circle cx="260" cy="220" r="160" fill="#fbbf24" opacity="0.03" />
      <circle cx="260" cy="220" r="100" fill="#38bdf8" opacity="0.04" />
      <circle cx="260" cy="220" r="50" fill="#fbbf24" opacity="0.05" />

      {/* Background energy arcs */}
      <g opacity="0.08" strokeWidth="1">
        <path d="M50 250 Q 150 50 250 250 T 450 250" />
        <path d="M50 280 Q 150 80 250 280 T 450 280" />
        <path d="M50 310 Q 150 110 250 310 T 450 310" />
      </g>

      <g transform="translate(50, 40)">
        {/* Giant lightning bolt */}
        <path d="M220 40 L180 180 L240 180 L160 380 L210 220 L150 220 Z" 
          strokeWidth="2" opacity="0.12" fill="currentColor" fillOpacity="0.04" />
        <path d="M225 60 L190 175 L240 175 L175 350 L215 215 L165 215 Z" 
          strokeWidth="1.5" stroke="#fbbf24" opacity="0.2" fill="#fbbf24" fillOpacity="0.03" />

        {/* Energy wave rings */}
        <ellipse cx="200" cy="210" rx="160" ry="40" strokeWidth="1" opacity="0.08" />
        <ellipse cx="200" cy="210" rx="130" ry="32" strokeWidth="1" stroke="#38bdf8" opacity="0.12" />
        <ellipse cx="200" cy="210" rx="100" ry="25" strokeWidth="1.5" stroke="#fbbf24" opacity="0.18" />
        <ellipse cx="200" cy="210" rx="60" ry="15" strokeWidth="1" stroke="#818cf8" opacity="0.15" />

        {/* Core energy hub */}
        <circle cx="200" cy="210" r="30" fill="currentColor" fillOpacity="0.06" stroke="none" />
        <circle cx="200" cy="210" r="18" fill="#fbbf24" fillOpacity="0.12" stroke="none" />
        <circle cx="200" cy="210" r="8" fill="#fbbf24" opacity="0.8" stroke="none" />
        <circle cx="200" cy="210" r="4" fill="#fff" opacity="0.9" stroke="none" />

        {/* Radiating energy beams */}
        <line x1="200" y1="180" x2="200" y2="60" strokeWidth="1.5" stroke="#fbbf24" opacity="0.2" strokeDasharray="8 6" />
        <line x1="200" y1="240" x2="200" y2="380" strokeWidth="1.5" stroke="#fbbf24" opacity="0.15" strokeDasharray="8 6" />
        <line x1="170" y1="210" x2="40" y2="210" strokeWidth="1" stroke="#38bdf8" opacity="0.15" strokeDasharray="6 8" />
        <line x1="230" y1="210" x2="380" y2="210" strokeWidth="1" stroke="#38bdf8" opacity="0.15" strokeDasharray="6 8" />
        
        {/* Diagonal beams */}
        <line x1="180" y1="190" x2="80" y2="90" strokeWidth="1" opacity="0.08" strokeDasharray="4 6" />
        <line x1="220" y1="190" x2="340" y2="90" strokeWidth="1" opacity="0.08" strokeDasharray="4 6" />
        <line x1="180" y1="230" x2="80" y2="340" strokeWidth="1" stroke="#c084fc" opacity="0.1" strokeDasharray="4 6" />
        <line x1="220" y1="230" x2="340" y2="340" strokeWidth="1" stroke="#c084fc" opacity="0.1" strokeDasharray="4 6" />

        {/* Satellite energy nodes */}
        <circle cx="80" cy="90" r="5" fill="#38bdf8" opacity="0.5" stroke="none" />
        <circle cx="340" cy="90" r="4" fill="#fbbf24" opacity="0.5" stroke="none" />
        <circle cx="80" cy="340" r="4" fill="#c084fc" opacity="0.5" stroke="none" />
        <circle cx="340" cy="340" r="5" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="40" cy="210" r="3" fill="#818cf8" opacity="0.5" stroke="none" />
        <circle cx="380" cy="210" r="3" fill="#fbbf24" opacity="0.5" stroke="none" />

        {/* Particle scatter */}
        <circle cx="140" cy="130" r="2" fill="#fbbf24" opacity="0.4" stroke="none" />
        <circle cx="280" cy="140" r="2" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="120" cy="300" r="2" fill="#818cf8" opacity="0.3" stroke="none" />
        <circle cx="300" cy="290" r="2" fill="#fbbf24" opacity="0.3" stroke="none" />
        <circle cx="250" cy="120" r="1.5" fill="#fbbf24" opacity="0.5" stroke="none" />
        <circle cx="160" cy="280" r="1.5" fill="#c084fc" opacity="0.4" stroke="none" />
      </g>
    </svg>
  ),
  ports: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      {/* Subtle grid */}
      <g opacity="0.05">
        {[...Array(8)].map((_, i) => (
          <line key={`pg${i}`} x1="0" y1={60 + i * 50} x2="500" y2={60 + i * 50} strokeWidth="1" />
        ))}
      </g>

      {/* Glow */}
      <circle cx="250" cy="250" r="140" fill="#34d399" opacity="0.03" />
      <circle cx="250" cy="230" r="80" fill="#38bdf8" opacity="0.04" />

      <g transform="translate(30, 50)">
        {/* World map outline — abstract curved shapes */}
        <path d="M60 200 Q 120 140 200 160 T 340 150 Q 380 150 420 190" strokeWidth="1.5" opacity="0.1" fill="none" />
        <path d="M40 230 Q 100 180 180 200 T 360 190 Q 400 195 440 220" strokeWidth="1" stroke="#34d399" opacity="0.12" fill="none" />
        <path d="M60 260 Q 140 220 220 240 T 380 240" strokeWidth="1" opacity="0.06" fill="none" />

        {/* Major port/hub nodes */}
        <circle cx="100" cy="170" r="8" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5" />
        <circle cx="100" cy="170" r="3" fill="#38bdf8" opacity="0.8" stroke="none" />

        <circle cx="230" cy="155" r="10" fill="#34d399" fillOpacity="0.15" stroke="#34d399" strokeWidth="1.5" opacity="0.5" />
        <circle cx="230" cy="155" r="4" fill="#34d399" opacity="0.8" stroke="none" />

        <circle cx="360" cy="165" r="8" fill="#818cf8" fillOpacity="0.15" stroke="#818cf8" strokeWidth="1.5" opacity="0.5" />
        <circle cx="360" cy="165" r="3" fill="#818cf8" opacity="0.8" stroke="none" />

        <circle cx="170" cy="280" r="7" fill="#c084fc" fillOpacity="0.12" stroke="#c084fc" strokeWidth="1" opacity="0.4" />
        <circle cx="170" cy="280" r="3" fill="#c084fc" opacity="0.7" stroke="none" />

        <circle cx="310" cy="300" r="7" fill="#38bdf8" fillOpacity="0.12" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
        <circle cx="310" cy="300" r="3" fill="#38bdf8" opacity="0.7" stroke="none" />

        {/* Route lines between hubs */}
        <path d="M100 170 Q 160 130 230 155" strokeWidth="1.5" stroke="#38bdf8" opacity="0.2" strokeDasharray="6 4" />
        <path d="M230 155 Q 290 140 360 165" strokeWidth="1.5" stroke="#34d399" opacity="0.2" strokeDasharray="6 4" />
        <path d="M100 170 Q 130 230 170 280" strokeWidth="1" stroke="#c084fc" opacity="0.15" strokeDasharray="4 6" />
        <path d="M230 155 Q 260 220 310 300" strokeWidth="1" stroke="#818cf8" opacity="0.15" strokeDasharray="4 6" />
        <path d="M360 165 Q 340 230 310 300" strokeWidth="1" stroke="#38bdf8" opacity="0.12" strokeDasharray="4 6" />
        <path d="M170 280 Q 240 290 310 300" strokeWidth="1" stroke="#c084fc" opacity="0.12" strokeDasharray="5 5" />

        {/* Ship/container icons — abstract rectangles */}
        <rect x="145" y="140" width="20" height="8" rx="1" fill="#38bdf8" opacity="0.2" stroke="none" />
        <rect x="280" y="148" width="18" height="7" rx="1" fill="#34d399" opacity="0.18" stroke="none" />
        <rect x="200" y="240" width="16" height="6" rx="1" fill="#818cf8" opacity="0.15" stroke="none" />

        {/* Animated pulse rings on main hub */}
        <circle cx="230" cy="155" r="20" stroke="#34d399" strokeWidth="1" opacity="0.12" />
        <circle cx="230" cy="155" r="35" stroke="#34d399" strokeWidth="0.5" opacity="0.06" strokeDasharray="4 4" />

        {/* Scattered data particles */}
        <circle cx="60" cy="220" r="1.5" fill="#34d399" opacity="0.5" stroke="none" />
        <circle cx="410" cy="200" r="1.5" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="140" cy="320" r="1.5" fill="#818cf8" opacity="0.3" stroke="none" />
        <circle cx="380" cy="280" r="1.5" fill="#34d399" opacity="0.3" stroke="none" />
        <circle cx="250" cy="340" r="2" fill="#c084fc" opacity="0.3" stroke="none" />

        {/* Abstract wave at bottom */}
        <path d="M0 360 Q 60 340 120 360 T 240 360 T 360 360 T 440 360" strokeWidth="1" stroke="#34d399" opacity="0.1" />
        <path d="M0 375 Q 60 355 120 375 T 240 375 T 360 375 T 440 375" strokeWidth="0.5" opacity="0.06" />
      </g>
    </svg>
  ),
  cyber: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      {/* Matrix-style background lines */}
      <g strokeWidth="1" opacity="0.06">
        {[...Array(16)].map((_, i) => (
          <line key={`cl${i}`} x1={30 + (i % 4) * 15} y1={30 + i * 28} x2={470 - (i % 3) * 20} y2={30 + i * 28}
            strokeDasharray={`${(i * 7 % 20) + 4} ${(i * 11 % 15) + 8} ${(i * 13 % 25) + 6} ${(i * 17 % 10) + 4}`} />
        ))}
      </g>

      {/* Central glow */}
      <circle cx="250" cy="220" r="150" fill="#38bdf8" opacity="0.03" />
      <circle cx="250" cy="220" r="80" fill="#818cf8" opacity="0.05" />

      <g transform="translate(70, 30)">
        {/* Outermost shield */}
        <path d="M180 30 L350 90 V280 C350 370 270 420 180 440 C90 420 10 370 10 280 V90 Z" 
          strokeWidth="1.5" opacity="0.1" fill="currentColor" fillOpacity="0.02" />

        {/* Second shield ring */}
        <path d="M180 60 L320 110 V270 C320 345 255 390 180 408 C105 390 40 345 40 270 V110 Z" 
          strokeWidth="1.5" stroke="#38bdf8" opacity="0.15" fill="#38bdf8" fillOpacity="0.02" />

        {/* Third shield ring */}
        <path d="M180 90 L290 130 V260 C290 320 240 360 180 375 C120 360 70 320 70 260 V130 Z" 
          strokeWidth="2" stroke="#818cf8" opacity="0.2" fill="#818cf8" fillOpacity="0.03" />

        {/* Inner shield core */}
        <path d="M180 120 L260 150 V250 C260 295 225 330 180 342 C135 330 100 295 100 250 V150 Z" 
          strokeWidth="2" stroke="#c084fc" opacity="0.25" fill="#c084fc" fillOpacity="0.04" />

        {/* Central lock icon */}
        <rect x="160" y="200" width="40" height="35" rx="3" fill="currentColor" fillOpacity="0.08" stroke="none" />
        <path d="M165 200 V185 C165 170 195 170 195 185 V200" strokeWidth="2" stroke="#38bdf8" opacity="0.4" fill="none" />
        <circle cx="180" cy="218" r="5" fill="#38bdf8" opacity="0.8" stroke="none" />
        <line x1="180" y1="223" x2="180" y2="228" strokeWidth="2" stroke="#38bdf8" opacity="0.6" />

        {/* Hexagonal grid overlay */}
        <path d="M180 140 L220 160 L220 200 L180 220 L140 200 L140 160 Z" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 4" />
        <path d="M180 100 L250 135 L250 215 L180 250 L110 215 L110 135 Z" strokeWidth="0.5" stroke="#818cf8" opacity="0.08" strokeDasharray="6 4" />

        {/* Scan lines radiating from shield */}
        <line x1="180" y1="30" x2="180" y2="120" strokeWidth="1" stroke="#38bdf8" opacity="0.1" strokeDasharray="4 8" />
        <line x1="10" y1="185" x2="100" y2="185" strokeWidth="1" opacity="0.08" strokeDasharray="4 8" />
        <line x1="260" y1="185" x2="350" y2="185" strokeWidth="1" opacity="0.08" strokeDasharray="4 8" />

        {/* Perimeter sensor nodes */}
        <circle cx="180" cy="30" r="3" fill="#38bdf8" opacity="0.6" stroke="none" />
        <circle cx="350" cy="90" r="3" fill="#818cf8" opacity="0.5" stroke="none" />
        <circle cx="10" cy="90" r="3" fill="#c084fc" opacity="0.5" stroke="none" />
        <circle cx="350" cy="280" r="3" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="10" cy="280" r="3" fill="#818cf8" opacity="0.4" stroke="none" />
        <circle cx="180" cy="440" r="3" fill="#c084fc" opacity="0.4" stroke="none" />

        {/* Shield highlight streaks */}
        <line x1="180" y1="60" x2="320" y2="110" strokeWidth="0.5" stroke="#38bdf8" opacity="0.12" />
        <line x1="40" y1="110" x2="180" y2="60" strokeWidth="0.5" stroke="#c084fc" opacity="0.1" />

        {/* Data particles */}
        <circle cx="130" cy="150" r="2" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="240" cy="170" r="2" fill="#c084fc" opacity="0.4" stroke="none" />
        <circle cx="120" cy="300" r="1.5" fill="#818cf8" opacity="0.3" stroke="none" />
        <circle cx="250" cy="310" r="1.5" fill="#38bdf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  ai: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      {/* Brain glow */}
      <circle cx="250" cy="220" r="170" fill="#c084fc" opacity="0.03" />
      <circle cx="250" cy="220" r="100" fill="#818cf8" opacity="0.04" />
      <circle cx="250" cy="210" r="50" fill="#38bdf8" opacity="0.05" />

      <g transform="translate(40, 30)">
        {/* Neural network — Input layer (4 nodes) */}
        <circle cx="40" cy="100" r="6" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
        <circle cx="40" cy="100" r="3" fill="#38bdf8" opacity="0.8" stroke="none" />
        <circle cx="40" cy="190" r="6" fill="#818cf8" fillOpacity="0.2" stroke="#818cf8" strokeWidth="1" opacity="0.5" />
        <circle cx="40" cy="190" r="3" fill="#818cf8" opacity="0.8" stroke="none" />
        <circle cx="40" cy="280" r="6" fill="#c084fc" fillOpacity="0.2" stroke="#c084fc" strokeWidth="1" opacity="0.5" />
        <circle cx="40" cy="280" r="3" fill="#c084fc" opacity="0.8" stroke="none" />
        <circle cx="40" cy="370" r="6" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
        <circle cx="40" cy="370" r="3" fill="#38bdf8" opacity="0.7" stroke="none" />

        {/* Hidden layer 1 (5 nodes) */}
        <circle cx="160" cy="70" r="5" fill="#818cf8" fillOpacity="0.15" stroke="#818cf8" strokeWidth="1" opacity="0.4" />
        <circle cx="160" cy="70" r="2.5" fill="#818cf8" opacity="0.7" stroke="none" />
        <circle cx="160" cy="150" r="7" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5" />
        <circle cx="160" cy="150" r="3.5" fill="#38bdf8" opacity="0.9" stroke="none" />
        <circle cx="160" cy="235" r="8" fill="#c084fc" fillOpacity="0.2" stroke="#c084fc" strokeWidth="1.5" opacity="0.5" />
        <circle cx="160" cy="235" r="4" fill="#c084fc" opacity="0.9" stroke="none" />
        <circle cx="160" cy="310" r="6" fill="#818cf8" fillOpacity="0.15" stroke="#818cf8" strokeWidth="1" opacity="0.4" />
        <circle cx="160" cy="310" r="3" fill="#818cf8" opacity="0.7" stroke="none" />
        <circle cx="160" cy="390" r="5" fill="#38bdf8" fillOpacity="0.12" stroke="#38bdf8" strokeWidth="1" opacity="0.35" />
        <circle cx="160" cy="390" r="2.5" fill="#38bdf8" opacity="0.6" stroke="none" />

        {/* Hidden layer 2 (4 nodes) */}
        <circle cx="280" cy="110" r="6" fill="#c084fc" fillOpacity="0.15" stroke="#c084fc" strokeWidth="1" opacity="0.45" />
        <circle cx="280" cy="110" r="3" fill="#c084fc" opacity="0.8" stroke="none" />
        <circle cx="280" cy="200" r="10" fill="#818cf8" fillOpacity="0.2" stroke="#818cf8" strokeWidth="2" opacity="0.5" />
        <circle cx="280" cy="200" r="5" fill="#818cf8" opacity="0.9" stroke="none" />
        <circle cx="280" cy="290" r="7" fill="#38bdf8" fillOpacity="0.18" stroke="#38bdf8" strokeWidth="1.5" opacity="0.45" />
        <circle cx="280" cy="290" r="3.5" fill="#38bdf8" opacity="0.8" stroke="none" />
        <circle cx="280" cy="370" r="5" fill="#c084fc" fillOpacity="0.12" stroke="#c084fc" strokeWidth="1" opacity="0.35" />
        <circle cx="280" cy="370" r="2.5" fill="#c084fc" opacity="0.6" stroke="none" />

        {/* Output layer (3 nodes) */}
        <circle cx="400" cy="150" r="7" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5" />
        <circle cx="400" cy="150" r="3.5" fill="#38bdf8" opacity="0.9" stroke="none" />
        <circle cx="400" cy="240" r="9" fill="#c084fc" fillOpacity="0.25" stroke="#c084fc" strokeWidth="2" opacity="0.55" />
        <circle cx="400" cy="240" r="4.5" fill="#c084fc" opacity="0.9" stroke="none" />
        <circle cx="400" cy="330" r="6" fill="#818cf8" fillOpacity="0.15" stroke="#818cf8" strokeWidth="1" opacity="0.4" />
        <circle cx="400" cy="330" r="3" fill="#818cf8" opacity="0.7" stroke="none" />

        {/* Connections: Input → Hidden1 (selective for clarity) */}
        <line x1="46" y1="100" x2="154" y2="70" strokeWidth="1" stroke="#38bdf8" opacity="0.12" />
        <line x1="46" y1="100" x2="154" y2="150" strokeWidth="1" stroke="#38bdf8" opacity="0.15" />
        <line x1="46" y1="190" x2="154" y2="150" strokeWidth="1" stroke="#818cf8" opacity="0.15" />
        <line x1="46" y1="190" x2="154" y2="235" strokeWidth="1.5" stroke="#818cf8" opacity="0.18" />
        <line x1="46" y1="280" x2="154" y2="235" strokeWidth="1.5" stroke="#c084fc" opacity="0.18" />
        <line x1="46" y1="280" x2="154" y2="310" strokeWidth="1" stroke="#c084fc" opacity="0.12" />
        <line x1="46" y1="370" x2="154" y2="310" strokeWidth="1" opacity="0.1" />
        <line x1="46" y1="370" x2="154" y2="390" strokeWidth="1" stroke="#38bdf8" opacity="0.1" />

        {/* Connections: Hidden1 → Hidden2 */}
        <line x1="166" y1="70" x2="274" y2="110" strokeWidth="1" opacity="0.1" />
        <line x1="166" y1="150" x2="274" y2="110" strokeWidth="1" stroke="#38bdf8" opacity="0.12" />
        <line x1="166" y1="150" x2="274" y2="200" strokeWidth="1.5" stroke="#38bdf8" opacity="0.2" />
        <line x1="166" y1="235" x2="274" y2="200" strokeWidth="2" stroke="#c084fc" opacity="0.22" />
        <line x1="166" y1="235" x2="274" y2="290" strokeWidth="1.5" stroke="#c084fc" opacity="0.18" />
        <line x1="166" y1="310" x2="274" y2="290" strokeWidth="1" stroke="#818cf8" opacity="0.15" />
        <line x1="166" y1="310" x2="274" y2="370" strokeWidth="1" opacity="0.1" />
        <line x1="166" y1="390" x2="274" y2="370" strokeWidth="1" stroke="#38bdf8" opacity="0.1" />

        {/* Connections: Hidden2 → Output */}
        <line x1="286" y1="110" x2="394" y2="150" strokeWidth="1" stroke="#c084fc" opacity="0.15" />
        <line x1="286" y1="200" x2="394" y2="150" strokeWidth="1.5" stroke="#818cf8" opacity="0.18" />
        <line x1="286" y1="200" x2="394" y2="240" strokeWidth="2" stroke="#818cf8" opacity="0.25" />
        <line x1="286" y1="290" x2="394" y2="240" strokeWidth="1.5" stroke="#38bdf8" opacity="0.2" />
        <line x1="286" y1="290" x2="394" y2="330" strokeWidth="1" stroke="#38bdf8" opacity="0.15" />
        <line x1="286" y1="370" x2="394" y2="330" strokeWidth="1" stroke="#c084fc" opacity="0.12" />

        {/* Central pulse on biggest hidden node */}
        <circle cx="280" cy="200" r="18" fill="#818cf8" fillOpacity="0.08" stroke="none" />
        <circle cx="280" cy="200" r="30" stroke="#818cf8" strokeWidth="0.5" opacity="0.08" strokeDasharray="4 4" />

        {/* Sparkle accents */}
        <circle cx="110" cy="120" r="1.5" fill="#38bdf8" opacity="0.5" stroke="none" />
        <circle cx="220" cy="165" r="1.5" fill="#c084fc" opacity="0.5" stroke="none" />
        <circle cx="340" cy="195" r="1.5" fill="#818cf8" opacity="0.5" stroke="none" />
        <circle cx="120" cy="340" r="1.5" fill="#c084fc" opacity="0.3" stroke="none" />
        <circle cx="340" cy="310" r="1.5" fill="#38bdf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  )
};

const SECTOR_DATA = [
  { key: 'government', slug: 'government-national-programs', icon: 'government' },
  { key: 'infrastructure', slug: 'critical-infrastructure', icon: 'infrastructure' },
  { key: 'energy', slug: 'energy-mining', icon: 'energy' },
  { key: 'ports', slug: 'ports-borders-logistics', icon: 'logistics' },
  { key: 'cyber', slug: 'cyber-resilience', icon: 'cyber' },
  { key: 'ai', slug: 'ai-fusion-intelligence', icon: 'ai' },
] as const;

interface SectorGridProps {
  title?: string;
}

/**
 * Grid display of sector cards
 * Used on homepage and sectors index page
 */
export function SectorGrid({ title }: SectorGridProps) {
  const t = useTranslations('sectors');
  const tCommon = useTranslations('common');

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <h2 className="text-display-sm md:text-display-md font-bold text-foreground">
            {title || t('heading')}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTOR_DATA.map((sector, index) => (
            <motion.div
              key={sector.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="h-full"
            >
              <Link
                href={`/sectors/${sector.slug}`}
                className={cn(
                  'group relative block h-full p-8 md:p-10 rounded-2xl overflow-hidden',
                  'bg-[#1a1b2e] border border-white/5',
                  'hover:border-white/10 hover-lift shadow-xl',
                  'transition-all duration-500'
                )}
              >
                {/* Background Graphic */}
                {SECTOR_BACKGROUNDS[sector.key]}

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-[#38bdf8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-6 text-white/80 group-hover:text-white transition-colors duration-300">
                    <div className="w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center bg-white/5">
                      {ICONS[sector.icon] || ICONS.government}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#38bdf8] transition-colors">
                    {t(`${sector.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-white/70 font-medium line-clamp-3">
                    {t(`${sector.key}.description`)}
                  </p>

                  {/* Arrow */}
                  <div className="mt-auto pt-6 flex items-center text-[#38bdf8] font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm">{tCommon('learnMore')}</span>
                    <svg
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
