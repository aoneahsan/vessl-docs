import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

const SITE_URL = 'https://vessl-docs.aoneahsan.com';
const APP_URL = 'https://vessl.aoneahsan.com';
const GITHUB_DOCS = 'https://github.com/aoneahsan/vessl-docs';

const config: Config = {
  title: 'Vessl Docs',
  tagline: 'Your showroom, elevated — documentation for the Vessl car-marketplace platform.',
  favicon: 'img/favicon.svg',

  url: SITE_URL,
  baseUrl: '/',

  organizationName: 'aoneahsan',
  projectName: 'vessl-docs',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: false,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: `${GITHUB_DOCS}/edit/main/`,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.6,
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og-image.png',
    metadata: [
      {
        name: 'description',
        content:
          'Official documentation for Vessl, a premium car-marketplace platform built as white-label SaaS: features, architecture, Cloudflare Workers API, Firestore data model, and deployment.',
      },
      { name: 'keywords', content: 'vessl, car marketplace, white-label saas, capacitor, firebase, cloudflare workers, react, documentation' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Vessl Docs' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Vessl',
      logo: {
        alt: 'Vessl logo',
        src: 'img/logo.svg',
      },
      items: [
        { type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Docs' },
        { href: APP_URL, label: 'Live app', position: 'right' },
        { href: 'https://github.com/aoneahsan', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Introduction', to: '/' },
            { label: 'Architecture', to: '/architecture/overview' },
            { label: 'Workers API', to: '/workers/reference' },
          ],
        },
        {
          title: 'Product',
          items: [
            { label: 'Live app', href: APP_URL },
            { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.aoneahsan.vessl' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Portfolio', href: 'https://aoneahsan.com' },
            { label: 'GitHub', href: 'https://github.com/aoneahsan' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vessl · Built by Ahsan Mahmood (aoneahsan).`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,

  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'canonical', href: SITE_URL + '/' },
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': SITE_URL + '/#website',
            url: SITE_URL + '/',
            name: 'Vessl Docs',
            description: 'Documentation for the Vessl premium car-marketplace platform.',
            inLanguage: 'en',
          },
          {
            '@type': 'Organization',
            '@id': SITE_URL + '/#org',
            name: 'Vessl',
            url: APP_URL,
            logo: SITE_URL + '/img/logo.svg',
            sameAs: ['https://aoneahsan.com', 'https://github.com/aoneahsan'],
          },
          {
            '@type': 'SoftwareApplication',
            name: 'Vessl',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web, Android',
            url: APP_URL,
            description:
              'A premium car-marketplace platform built as white-label SaaS: inventory, interactive 3D viewer, consultations and quotes, multi-currency and i18n, RBAC admin, and a Cloudflare Workers backend.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
        ],
      }),
    },
  ],
};

export default config;
