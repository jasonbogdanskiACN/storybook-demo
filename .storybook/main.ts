import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    "../projects/demo-app/src/shared/ui-components/**/*.mdx",
    "../projects/demo-app/src/shared/ui-components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-mcp"
  ],
  framework: "@storybook/angular"
};
export default config;