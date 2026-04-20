import { Meta, StoryObj } from "@storybook/angular";
import { BackgroundComponent } from "./background";

const meta: Meta<BackgroundComponent> = {
  component: BackgroundComponent,
  title: "Primitives/Background",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    color: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<BackgroundComponent>;

export const Default: Story = {
  args: {
    color: "#ffffff",
  },
  render: (args) => ({
    props: args,
    template: `<agentjds-background [color]="color"></agentjds-background>`,
  }),
};

export const LightGray: Story = {
  args: {
    color: "#f4f7fb",
  },
  render: (args) => ({
    props: args,
    template: `<agentjds-background [color]="color"></agentjds-background>`,
  }),
};
