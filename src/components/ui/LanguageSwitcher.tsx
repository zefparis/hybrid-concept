'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // Replace current locale in pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="relative group">
      <button 
        className="flex items-center gap-2 px-3 py-2 rounded-md text-foreground-secondary hover:text-foreground hover:bg-surface-hover transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-body-sm uppercase">{locale}</span>
      </button>
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-40 glass-elevated rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={cn(
              "w-full px-4 py-2 text-left text-body-sm hover:bg-surface-hover transition-colors first:rounded-t-md last:rounded-b-md",
              locale === loc ? "text-accent font-medium" : "text-foreground-secondary"
            )}
          >
            {localeNames[loc]}
          </button>
        ))}
      </div>
    </div>
  );
}
