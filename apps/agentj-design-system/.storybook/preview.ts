import type { Preview } from "@storybook/angular";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Agentj", "FieldServices", "*"],
      },
    },
  },
};

export default preview;
