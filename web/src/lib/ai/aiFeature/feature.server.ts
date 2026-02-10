import { createServerFeature } from '@payloadcms/richtext-lexical'

export const AiFeature = createServerFeature({
  feature: {
    ClientFeature: '/lib/ai/aiFeature/feature.client#MyClientFeature',
  },
  key: 'aiFeature',
//   dependenciesPriority: ['otherFeature'],
})