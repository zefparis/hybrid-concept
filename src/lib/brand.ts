/**
 * Single source of truth for the HMH brand identity.
 * Every component, metadata, and i18n string referring to the brand must read
 * from here. No string literals like "HC-1", "Hybrid Concepts", or
 * "Hybrid Mobility Holdings" elsewhere in the codebase.
 */

export const BRAND = {
  name: 'HMH',
  fullName: 'Hybrid Mobility Holdings',
  tagline: 'Anticipate. Secure. Operate.',
  url: 'https://hybrid-concept.vercel.app',
  copyright: '© 2025 HMH | Hybrid Mobility Holdings. All rights reserved.',
} as const;

export type Brand = typeof BRAND;
