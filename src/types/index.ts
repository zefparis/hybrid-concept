/**
 * HC-1 Core Type Definitions
 * Strategic Command & Integration Authority
 */

// ============================================================================
// NAVIGATION & STRUCTURE
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
}

export interface NavigationConfig {
  main: NavItem[];
  footer: {
    sections: FooterSection[];
    legal: NavItem[];
  };
}

export interface FooterSection {
  title: string;
  links: NavItem[];
}

// ============================================================================
// SECTORS
// ============================================================================

export type SectorSlug =
  | 'government-national-programs'
  | 'critical-infrastructure'
  | 'energy-mining'
  | 'ports-borders-logistics'
  | 'cyber-resilience'
  | 'ai-fusion-intelligence';

export interface Sector {
  id: string;
  slug: SectorSlug;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  capabilities: string[];
  challenges: string[];
  outcomes: string[];
  metadata: PageMetadata;
}

// ============================================================================
// CAPABILITIES
// ============================================================================

export type CapabilitySlug =
  | 'hybrid-vector'
  | 'hybrid-nexus'
  | 'hybrid-axis'
  | 'hybrid-cyber'
  | 'hybrid-iris'
  | 'centers-of-excellence';

export interface Capability {
  id: string;
  slug: CapabilitySlug;
  name: string;
  tagline: string;
  description: string;
  features: CapabilityFeature[];
  useCases: UseCase[];
  integrations: string[];
  metadata: PageMetadata;
}

export interface CapabilityFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface UseCase {
  title: string;
  sector: SectorSlug;
  description: string;
  outcome: string;
}

// ============================================================================
// INSIGHTS (BLOG/ARTICLES)
// ============================================================================

export type InsightCategory =
  | 'strategic-analysis'
  | 'technology'
  | 'governance'
  | 'case-study'
  | 'whitepaper';

export interface Insight {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: InsightCategory;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
  tags: string[];
  relatedSectors?: SectorSlug[];
  relatedCapabilities?: CapabilitySlug[];
  metadata: PageMetadata;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

// ============================================================================
// SEO & METADATA
// ============================================================================

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

export interface SiteMetadata {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  twitterHandle?: string;
  locale: string;
}

// ============================================================================
// CONTACT & FORMS
// ============================================================================

export type ContactInquiryType =
  | 'general'
  | 'partnership'
  | 'media'
  | 'careers'
  | 'security';

export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  role?: string;
  inquiryType: ContactInquiryType;
  sector?: SectorSlug;
  message: string;
  consent: boolean;
}

// ============================================================================
// UI COMPONENTS
// ============================================================================

export interface HeroProps {
  title: string;
  tagline?: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  variant?: 'home' | 'page' | 'minimal';
}

export interface SectorCardProps {
  sector: Sector;
  variant?: 'grid' | 'featured' | 'compact';
}

export interface CapabilityCardProps {
  capability: Capability;
  variant?: 'full' | 'preview';
}

// ============================================================================
// ANIMATION TOKENS
// ============================================================================

export interface AnimationConfig {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    default: string;
    smooth: string;
    bounce: string;
  };
}

// ============================================================================
// THEME
// ============================================================================

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  accent: string;
  accentHover: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderSubtle: string;
  success: string;
  warning: string;
  error: string;
}
