import type { StorybookConfig } from '@storybook/nextjs-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-docs'
  ],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      // .svg files are React components here (SVGR), not next/image sources.
      // Without this the framework's image plugin claims them first and the
      // preview build fails to resolve them.
      image: { excludeFiles: ['**/*.svg'] }
    }
  },

  staticDirs: ['../public'],

  viteFinal: (viteConfig) => {
    // The app imports .svg files as React components (SVGR, configured for the
    // Next build in next.config.js `turbopack.rules`). Without this the
    // nextjs-vite framework hands .svg to its next/image handler instead and
    // the preview build fails to resolve them.
    viteConfig.plugins = [
      svgr({ include: '**/*.svg' }),
      ...(viteConfig.plugins ?? [])
    ];

    return viteConfig;
  }
};

export default config;
