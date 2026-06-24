import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting started',
      collapsed: false,
      items: ['getting-started/overview', 'getting-started/tech-stack', 'getting-started/local-setup'],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/marketplace',
        'features/3d-viewer',
        'features/consultations-quotes',
        'features/dashboard',
        'features/admin',
        'features/i18n-currency',
        'features/theming',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: ['architecture/overview', 'architecture/firestore-data-model', 'architecture/rbac'],
    },
    {
      type: 'category',
      label: 'Workers API',
      items: ['workers/overview', 'workers/reference'],
    },
    {
      type: 'category',
      label: 'Deployment',
      items: ['deployment/web-hosting', 'deployment/workers', 'deployment/android'],
    },
  ],
};

export default sidebars;
