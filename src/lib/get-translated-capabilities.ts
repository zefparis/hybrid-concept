import { getTranslations } from 'next-intl/server';
import { CAPABILITIES } from './constants';

export interface TranslatedCapability {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
  }>;
}

const capabilityKeys: Record<string, string> = {
  'hybrid-vector': 'hybridVector',
  'hybrid-nexus': 'hybridNexus',
  'hybrid-axis': 'hybridAxis',
  'hybrid-cyber': 'hybridCyber',
  'hybrid-iris': 'hybridIris',
  'centers-of-excellence': 'centersOfExcellence',
};

const featureKeys: Record<string, string[]> = {
  'hybrid-vector': ['threatModeling', 'riskQuantification', 'strategicForecasting'],
  'hybrid-nexus': ['apiGateway', 'dataFabric', 'workflowEngine'],
  'hybrid-axis': ['operationalDashboard', 'resourceOrchestration', 'communicationHub'],
  'hybrid-cyber': ['threatDetection', 'incidentResponse', 'threatIntelligence'],
  'hybrid-iris': ['sensorFusion', 'patternRecognition', 'geospatialIntelligence'],
  'centers-of-excellence': ['trainingPrograms', 'regionalSupport', 'researchDevelopment'],
};

export async function getTranslatedCapabilities(locale: string): Promise<TranslatedCapability[]> {
  const t = await getTranslations({ locale, namespace: 'capabilities' });

  return CAPABILITIES.map((capability) => {
    const capKey = capabilityKeys[capability.slug];
    const featKeys = featureKeys[capability.slug] || [];

    return {
      id: capability.id,
      slug: capability.slug,
      name: t(`${capKey}.name`),
      tagline: t(`${capKey}.tagline`),
      description: t(`${capKey}.description`),
      features: featKeys.map((featKey) => ({
        title: t(`${capKey}.features.${featKey}.title`),
        description: t(`${capKey}.features.${featKey}.description`),
      })),
    };
  });
}
