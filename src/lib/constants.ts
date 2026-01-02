/**
 * HC-1 Site Constants
 * Centralized configuration for navigation, metadata, and content
 */

import type {
  NavigationConfig,
  SiteMetadata,
  AnimationConfig,
  Sector,
  Capability,
} from '@/types';

// ============================================================================
// SITE METADATA
// ============================================================================

export const SITE_METADATA: SiteMetadata = {
  siteName: 'HC-1 | Hybrid Concepts',
  siteUrl: 'https://hc-1.com',
  defaultTitle: 'HC-1 | Strategic Command & Integration Authority',
  defaultDescription:
    'HC-1 delivers sovereign security, systems integration, and operational continuity for governments and critical infrastructure worldwide.',
  defaultOgImage: '/og-image.jpg',
  twitterHandle: '@hc1_official',
  locale: 'en',
};

// ============================================================================
// NAVIGATION
// ============================================================================

export const NAVIGATION: NavigationConfig = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'About HC-1', href: '/about' },
    {
      label: 'Sectors',
      href: '/sectors',
      children: [
        {
          label: 'Government & National Programs',
          href: '/sectors/government-national-programs',
          description: 'Sovereign digital transformation and national security programs',
        },
        {
          label: 'Critical Infrastructure',
          href: '/sectors/critical-infrastructure',
          description: 'Protection and resilience for essential services',
        },
        {
          label: 'Energy & Mining',
          href: '/sectors/energy-mining',
          description: 'Operational technology security and asset protection',
        },
        {
          label: 'Ports, Borders & Logistics',
          href: '/sectors/ports-borders-logistics',
          description: 'Supply chain security and border management',
        },
        {
          label: 'Cyber Resilience',
          href: '/sectors/cyber-resilience',
          description: 'Enterprise-grade cyber defense and incident response',
        },
        {
          label: 'AI Fusion & Intelligence',
          href: '/sectors/ai-fusion-intelligence',
          description: 'Advanced analytics and decision intelligence',
        },
      ],
    },
    {
      label: 'Capabilities',
      href: '/capabilities',
      children: [
        {
          label: 'HC-1 | Hybrid Vector',
          href: '/capabilities/hybrid-vector',
          description: 'Strategic threat assessment and risk modeling',
        },
        {
          label: 'HC-1 | Hybrid Nexus',
          href: '/capabilities/hybrid-nexus',
          description: 'Systems integration and interoperability platform',
        },
        {
          label: 'HC-1 | Hybrid Axis',
          href: '/capabilities/hybrid-axis',
          description: 'Command and control infrastructure',
        },
        {
          label: 'HC-1 | Hybrid Cyber',
          href: '/capabilities/hybrid-cyber',
          description: 'Cyber defense and threat intelligence',
        },
        {
          label: 'HC-1 | Hybrid Iris',
          href: '/capabilities/hybrid-iris',
          description: 'Surveillance and situational awareness',
        },
        {
          label: 'Centers of Excellence',
          href: '/capabilities/centers-of-excellence',
          description: 'Regional expertise and training facilities',
        },
      ],
    },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
  footer: {
    sections: [
      {
        title: 'Sectors',
        links: [
          { label: 'Government & National Programs', href: '/sectors/government-national-programs' },
          { label: 'Critical Infrastructure', href: '/sectors/critical-infrastructure' },
          { label: 'Energy & Mining', href: '/sectors/energy-mining' },
          { label: 'Ports, Borders & Logistics', href: '/sectors/ports-borders-logistics' },
          { label: 'Cyber Resilience', href: '/sectors/cyber-resilience' },
          { label: 'AI Fusion & Intelligence', href: '/sectors/ai-fusion-intelligence' },
        ],
      },
      {
        title: 'Capabilities',
        links: [
          { label: 'Hybrid Vector', href: '/capabilities/hybrid-vector' },
          { label: 'Hybrid Nexus', href: '/capabilities/hybrid-nexus' },
          { label: 'Hybrid Axis', href: '/capabilities/hybrid-axis' },
          { label: 'Hybrid Cyber', href: '/capabilities/hybrid-cyber' },
          { label: 'Hybrid Iris', href: '/capabilities/hybrid-iris' },
          { label: 'Centers of Excellence', href: '/capabilities/centers-of-excellence' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About HC-1', href: '/about' },
          { label: 'Insights', href: '/insights' },
          { label: 'Contact', href: '/contact' },
          { label: 'Careers', href: '/careers' },
        ],
      },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Security', href: '/security' },
      { label: 'Compliance', href: '/compliance' },
    ],
  },
};

// ============================================================================
// ANIMATION TOKENS
// ============================================================================

export const ANIMATION: AnimationConfig = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

// ============================================================================
// FRAMER MOTION VARIANTS
// ============================================================================

export const MOTION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  },
};

// ============================================================================
// SECTORS DATA
// ============================================================================

export const SECTORS: Sector[] = [
  {
    id: 'sector-gov',
    slug: 'government-national-programs',
    title: 'Government & National Programs',
    shortTitle: 'Government',
    description: 'Sovereign digital transformation and national security programs',
    longDescription:
      'HC-1 partners with governments to deliver secure, sovereign digital infrastructure that protects national interests while enabling modernization at scale.',
    icon: 'government',
    capabilities: ['hybrid-vector', 'hybrid-nexus', 'hybrid-axis'],
    challenges: [
      'Legacy system modernization',
      'Cross-agency interoperability',
      'Sovereign data protection',
      'Citizen service delivery',
    ],
    outcomes: [
      'Unified national security posture',
      'Accelerated digital transformation',
      'Enhanced citizen trust',
    ],
    metadata: {
      title: 'Government & National Programs | HC-1',
      description:
        'Sovereign digital transformation and national security programs for governments worldwide.',
      keywords: ['government security', 'national programs', 'digital transformation', 'sovereign infrastructure'],
    },
  },
  {
    id: 'sector-infra',
    slug: 'critical-infrastructure',
    title: 'Critical Infrastructure',
    shortTitle: 'Infrastructure',
    description: 'Protection and resilience for essential services',
    longDescription:
      'We secure the systems that societies depend on—power grids, water systems, telecommunications, and transportation networks.',
    icon: 'infrastructure',
    capabilities: ['hybrid-cyber', 'hybrid-nexus', 'hybrid-iris'],
    challenges: [
      'OT/IT convergence security',
      'Legacy SCADA protection',
      'Supply chain vulnerabilities',
      'Regulatory compliance',
    ],
    outcomes: [
      'Zero-downtime operations',
      'Regulatory compliance',
      'Threat-resilient infrastructure',
    ],
    metadata: {
      title: 'Critical Infrastructure Protection | HC-1',
      description:
        'Comprehensive protection and resilience solutions for critical infrastructure and essential services.',
      keywords: ['critical infrastructure', 'OT security', 'SCADA', 'infrastructure protection'],
    },
  },
  {
    id: 'sector-energy',
    slug: 'energy-mining',
    title: 'Energy & Mining',
    shortTitle: 'Energy',
    description: 'Operational technology security and asset protection',
    longDescription:
      'From offshore platforms to remote mining operations, HC-1 delivers security solutions that operate in the most demanding environments.',
    icon: 'energy',
    capabilities: ['hybrid-cyber', 'hybrid-iris', 'hybrid-axis'],
    challenges: [
      'Remote site security',
      'Industrial control systems',
      'Environmental monitoring',
      'Workforce safety',
    ],
    outcomes: [
      'Operational continuity',
      'Asset protection',
      'Safety compliance',
    ],
    metadata: {
      title: 'Energy & Mining Security | HC-1',
      description:
        'Operational technology security and asset protection for energy and mining operations.',
      keywords: ['energy security', 'mining security', 'OT security', 'industrial control'],
    },
  },
  {
    id: 'sector-ports',
    slug: 'ports-borders-logistics',
    title: 'Ports, Borders & Logistics',
    shortTitle: 'Ports & Borders',
    description: 'Supply chain security and border management',
    longDescription:
      'HC-1 enables secure, efficient movement of goods and people across borders while maintaining sovereign control.',
    icon: 'logistics',
    capabilities: ['hybrid-iris', 'hybrid-nexus', 'hybrid-vector'],
    challenges: [
      'Cargo screening efficiency',
      'Border threat detection',
      'Multi-agency coordination',
      'Trade facilitation',
    ],
    outcomes: [
      'Enhanced border security',
      'Streamlined trade flows',
      'Reduced contraband',
    ],
    metadata: {
      title: 'Ports, Borders & Logistics | HC-1',
      description:
        'Supply chain security and border management solutions for ports and logistics operations.',
      keywords: ['border security', 'port security', 'supply chain', 'logistics security'],
    },
  },
  {
    id: 'sector-cyber',
    slug: 'cyber-resilience',
    title: 'Cyber Resilience',
    shortTitle: 'Cyber',
    description: 'Enterprise-grade cyber defense and incident response',
    longDescription:
      'Our cyber resilience practice combines threat intelligence, defensive operations, and incident response to protect organizations from sophisticated adversaries.',
    icon: 'cyber',
    capabilities: ['hybrid-cyber', 'hybrid-vector', 'hybrid-nexus'],
    challenges: [
      'Advanced persistent threats',
      'Ransomware defense',
      'Insider threats',
      'Cloud security',
    ],
    outcomes: [
      'Reduced attack surface',
      'Rapid incident response',
      'Continuous threat monitoring',
    ],
    metadata: {
      title: 'Cyber Resilience | HC-1',
      description:
        'Enterprise-grade cyber defense, threat intelligence, and incident response capabilities.',
      keywords: ['cyber security', 'threat intelligence', 'incident response', 'cyber defense'],
    },
  },
  {
    id: 'sector-ai',
    slug: 'ai-fusion-intelligence',
    title: 'AI Fusion & Intelligence',
    shortTitle: 'AI & Intelligence',
    description: 'Advanced analytics and decision intelligence',
    longDescription:
      'HC-1 harnesses artificial intelligence to fuse disparate data sources into actionable intelligence for strategic decision-making.',
    icon: 'ai',
    capabilities: ['hybrid-iris', 'hybrid-vector', 'hybrid-axis'],
    challenges: [
      'Data silos',
      'Real-time analysis',
      'Predictive modeling',
      'Decision automation',
    ],
    outcomes: [
      'Unified intelligence picture',
      'Predictive threat detection',
      'Accelerated decision cycles',
    ],
    metadata: {
      title: 'AI Fusion & Intelligence | HC-1',
      description:
        'Advanced analytics, AI fusion, and decision intelligence for strategic operations.',
      keywords: ['AI', 'artificial intelligence', 'data fusion', 'decision intelligence'],
    },
  },
];

// ============================================================================
// CAPABILITIES DATA
// ============================================================================

export const CAPABILITIES: Capability[] = [
  {
    id: 'cap-vector',
    slug: 'hybrid-vector',
    name: 'HC-1 | Hybrid Vector',
    tagline: 'Strategic Threat Assessment',
    description:
      'Hybrid Vector delivers comprehensive threat modeling and risk assessment capabilities, enabling organizations to anticipate and prepare for emerging threats.',
    features: [
      { title: 'Threat Modeling', description: 'Advanced threat landscape analysis and scenario planning' },
      { title: 'Risk Quantification', description: 'Data-driven risk scoring and prioritization' },
      { title: 'Strategic Forecasting', description: 'Predictive intelligence for long-term planning' },
    ],
    useCases: [
      {
        title: 'National Security Assessment',
        sector: 'government-national-programs',
        description: 'Comprehensive threat assessment for national security agencies',
        outcome: 'Unified threat picture across all domains',
      },
    ],
    integrations: ['hybrid-nexus', 'hybrid-cyber'],
    metadata: {
      title: 'Hybrid Vector | Strategic Threat Assessment | HC-1',
      description: 'Strategic threat assessment and risk modeling platform for enterprise and government.',
    },
  },
  {
    id: 'cap-nexus',
    slug: 'hybrid-nexus',
    name: 'HC-1 | Hybrid Nexus',
    tagline: 'Systems Integration Platform',
    description:
      'Hybrid Nexus is our enterprise integration platform, connecting disparate systems into a unified operational fabric.',
    features: [
      { title: 'API Gateway', description: 'Secure, scalable API management and orchestration' },
      { title: 'Data Fabric', description: 'Unified data layer across legacy and modern systems' },
      { title: 'Workflow Engine', description: 'Automated process orchestration and event handling' },
    ],
    useCases: [
      {
        title: 'Multi-Agency Integration',
        sector: 'government-national-programs',
        description: 'Connecting government agencies for seamless information sharing',
        outcome: 'Real-time cross-agency collaboration',
      },
    ],
    integrations: ['hybrid-vector', 'hybrid-axis', 'hybrid-cyber', 'hybrid-iris'],
    metadata: {
      title: 'Hybrid Nexus | Systems Integration Platform | HC-1',
      description: 'Enterprise systems integration and interoperability platform.',
    },
  },
  {
    id: 'cap-axis',
    slug: 'hybrid-axis',
    name: 'HC-1 | Hybrid Axis',
    tagline: 'Command & Control Infrastructure',
    description:
      'Hybrid Axis provides the command and control backbone for coordinated operations across distributed environments.',
    features: [
      { title: 'Operational Dashboard', description: 'Real-time situational awareness and command interface' },
      { title: 'Resource Orchestration', description: 'Dynamic allocation and coordination of assets' },
      { title: 'Communication Hub', description: 'Secure, resilient communications infrastructure' },
    ],
    useCases: [
      {
        title: 'National Operations Center',
        sector: 'government-national-programs',
        description: 'Unified command center for national security operations',
        outcome: 'Coordinated response across all agencies',
      },
    ],
    integrations: ['hybrid-nexus', 'hybrid-iris'],
    metadata: {
      title: 'Hybrid Axis | Command & Control | HC-1',
      description: 'Command and control infrastructure for coordinated operations.',
    },
  },
  {
    id: 'cap-cyber',
    slug: 'hybrid-cyber',
    name: 'HC-1 | Hybrid Cyber',
    tagline: 'Cyber Defense Platform',
    description:
      'Hybrid Cyber delivers comprehensive cyber defense capabilities, from threat detection to incident response.',
    features: [
      { title: 'Threat Detection', description: 'AI-powered threat detection and analysis' },
      { title: 'Incident Response', description: 'Automated and orchestrated incident handling' },
      { title: 'Threat Intelligence', description: 'Global threat intelligence feeds and analysis' },
    ],
    useCases: [
      {
        title: 'Critical Infrastructure Defense',
        sector: 'critical-infrastructure',
        description: 'Protecting essential services from cyber threats',
        outcome: 'Zero-day threat detection and rapid response',
      },
    ],
    integrations: ['hybrid-nexus', 'hybrid-vector'],
    metadata: {
      title: 'Hybrid Cyber | Cyber Defense Platform | HC-1',
      description: 'Enterprise cyber defense, threat intelligence, and incident response platform.',
    },
  },
  {
    id: 'cap-iris',
    slug: 'hybrid-iris',
    name: 'HC-1 | Hybrid Iris',
    tagline: 'Surveillance & Awareness',
    description:
      'Hybrid Iris provides comprehensive surveillance and situational awareness capabilities across physical and digital domains.',
    features: [
      { title: 'Sensor Fusion', description: 'Multi-source sensor integration and correlation' },
      { title: 'Pattern Recognition', description: 'AI-driven anomaly and pattern detection' },
      { title: 'Geospatial Intelligence', description: 'Location-based intelligence and mapping' },
    ],
    useCases: [
      {
        title: 'Border Surveillance',
        sector: 'ports-borders-logistics',
        description: 'Comprehensive border monitoring and threat detection',
        outcome: 'Enhanced border security with reduced false positives',
      },
    ],
    integrations: ['hybrid-nexus', 'hybrid-axis'],
    metadata: {
      title: 'Hybrid Iris | Surveillance & Awareness | HC-1',
      description: 'Surveillance and situational awareness platform for physical and digital domains.',
    },
  },
  {
    id: 'cap-coe',
    slug: 'centers-of-excellence',
    name: 'Centers of Excellence',
    tagline: 'Regional Expertise & Training',
    description:
      'Our Centers of Excellence provide regional expertise, training, and support to ensure successful deployment and operation of HC-1 solutions.',
    features: [
      { title: 'Training Programs', description: 'Comprehensive certification and training curricula' },
      { title: 'Regional Support', description: 'Local expertise and 24/7 support capabilities' },
      { title: 'Research & Development', description: 'Continuous innovation and capability development' },
    ],
    useCases: [
      {
        title: 'National Cyber Academy',
        sector: 'government-national-programs',
        description: 'Building national cyber defense capabilities through training',
        outcome: 'Self-sufficient national cyber defense workforce',
      },
    ],
    integrations: [],
    metadata: {
      title: 'Centers of Excellence | HC-1',
      description: 'Regional expertise, training, and support facilities for HC-1 solutions.',
    },
  },
];

// ============================================================================
// SERVICES (What We Do)
// ============================================================================

export interface ServiceStep {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export const SERVICES: ServiceStep[] = [
  {
    id: 'plan',
    title: 'Plan',
    description: 'Strategic architecture and risk anticipation upstream to prevent operational disruption.',
    icon: 'plan',
  },
  {
    id: 'integrate',
    title: 'Integrate',
    description: 'Sovereign systems integration with zero-trust architecture and full traceability.',
    icon: 'integrate',
  },
  {
    id: 'assure',
    title: 'Assure',
    description: 'Continuous monitoring, SLA-based governance, and mission-critical continuity.',
    icon: 'assure',
  },
];

// ============================================================================
// OPERATING MODEL STEPS
// ============================================================================

export interface ModelStep {
  id: string;
  label: string;
  description: string;
}

export const OPERATING_STEPS: ModelStep[] = [
  {
    id: 'anticipate',
    label: 'Anticipate',
    description: 'Identify and model risk upstream',
  },
  {
    id: 'assure',
    label: 'Assure',
    description: 'Architect and integrate secure systems',
  },
  {
    id: 'continuity',
    label: 'Continuity',
    description: 'Monitor and maintain operational uptime',
  },
  {
    id: 'revenue',
    label: 'Revenue',
    description: 'Protect and maximize financial outcomes',
  },
];

// ============================================================================
// TRUST SIGNALS
// ============================================================================

export interface TrustSignal {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export const TRUST_SIGNALS: TrustSignal[] = [
  {
    id: 'sovereignty',
    title: 'Data Sovereignty',
    description: 'Full control over data residency and operational sovereignty.',
    icon: 'shield',
  },
  {
    id: 'zero-trust',
    title: 'Zero-Trust Architecture',
    description: 'Every access verified, every transaction authenticated.',
    icon: 'lock',
  },
  {
    id: 'sla',
    title: 'SLA-Based Assurance',
    description: 'Guaranteed uptime and performance commitments.',
    icon: 'check',
  },
  {
    id: 'traceability',
    title: 'Full Traceability',
    description: 'Complete audit trails and accountability.',
    icon: 'document',
  },
  {
    id: 'compliance',
    title: 'Regulatory Compliance',
    description: 'ISO 27001, SOC 2, and sector-specific certifications.',
    icon: 'certificate',
  },
];

// ============================================================================
// HOMEPAGE CONTENT
// ============================================================================

export const HOMEPAGE_CONTENT = {
  hero: {
    title: 'HC-1 | Hybrid Concepts',
    subtitle: 'Strategic Command & Integration Authority',
    coreStatement:
      'HC-1 anticipates and secures systems upstream to prevent disruption, reduce operational risk, eliminate the cost and inefficiency of reactive response, and protect and maximize revenue through assured continuity and operational efficiency.',
    cta: {
      label: 'Explore Capabilities',
      href: '/capabilities',
    },
    secondaryCta: {
      label: 'Contact Us',
      href: '/contact',
    },
  },
  whatWeDo: {
    title: 'What We Do',
    services: SERVICES,
  },
  operatingModel: {
    title: 'Operating Model',
    description: 'From threat anticipation to revenue protection',
    steps: OPERATING_STEPS,
  },
  trustSignals: {
    title: 'Governance & Trust',
    signals: TRUST_SIGNALS,
  },
  cta: {
    title: 'Ready to Secure Your Future?',
    description: 'Connect with our team to discuss your strategic security requirements.',
    buttonLabel: 'Get in Touch',
    href: '/contact',
  },
};
