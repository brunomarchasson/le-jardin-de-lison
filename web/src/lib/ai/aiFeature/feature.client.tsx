'use client'

import { AiToolbarButton } from '@/components/payload/AiToolbarButton'
import { createClientFeature, toolbarFeatureButtonsGroupWithItems } from '@payloadcms/richtext-lexical/client'

export const MyClientFeature = createClientFeature({
  toolbarFixed: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          ChildComponent: AiToolbarButton,
          
          key: 'aiNode',
          
          
        },
      ]),
    ],
  },
})

