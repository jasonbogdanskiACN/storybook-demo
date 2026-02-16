import type { Preview } from '@storybook/angular';
import { setCompodocJson } from "@storybook/addon-docs/angular";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import docJson from "../documentation.json";
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => ({
      ...story(),
      applicationConfig: {
        providers: [
          provideAnimationsAsync(),
          providePrimeNG({
            theme: {
              preset: Aura,
              options: {
                darkModeSelector: false
              }
            }
          })
        ],
      },
    }),
  ],
};

export default preview;