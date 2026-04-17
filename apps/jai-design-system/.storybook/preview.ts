import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Jai', 'FieldServices', '*'],
      },
    },
  },
};

export default preview;
