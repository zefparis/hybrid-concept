'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';
import { FlagIcon } from './FlagIcon';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    setOpen(false);
    router.push(segments.join('/'));
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-foreground-secondary hover:text-foreground hover:bg-surface-hover transition-colors"
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <FlagIcon country={locale === 'en' ? 'GB' : locale === 'fr' ? 'FR' : 'PT'} />
        <span className="text-body-sm uppercase">{locale}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-40 glass-elevated rounded-md z-50 shadow-lg"
        >
          {locales.map((loc) => (
            <button
              key={loc}
              role="option"
              aria-selected={locale === loc}
              onClick={() => switchLocale(loc)}
              className={cn(
                'w-full px-4 py-2 text-left text-body-sm hover:bg-surface-hover transition-colors first:rounded-t-md last:rounded-b-md flex items-center gap-3',
                locale === loc ? 'text-accent font-medium' : 'text-foreground-secondary'
              )}
            >
              <FlagIcon country={loc === 'en' ? 'GB' : loc === 'fr' ? 'FR' : 'PT'} />
              <span>{localeNames[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
