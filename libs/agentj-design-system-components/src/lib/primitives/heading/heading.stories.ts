import { Meta, StoryObj } from "@storybook/angular";
import { HeadingComponent } from "./heading";

const meta: Meta<HeadingComponent> = {
  component: HeadingComponent,
  title: "Primitives/Heading",
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    muted: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<HeadingComponent>;

export const Default: Story = {
  args: {
    level: 1,
    size: "xl",
    muted: false,
  },
  render: (args) => ({
    props: args,
    template: `<agentjds-heading [level]="level" [size]="size" [muted]="muted">Hoe kan ik u helpen?</agentjds-heading>`,
  }),
};

export const Display: Story = {
  args: {
    level: 1,
    size: "2xl",
  },
  render: (args) => ({
    props: args,
    template: `<agentjds-heading [level]="level" [size]="size">Hoe kan ik u helpen?</agentjds-heading>`,
  }),
};

export const Muted: Story = {
  args: {
    level: 2,
    size: "md",
    muted: true,
  },
  render: (args) => ({
    props: args,
    template: `<agentjds-heading [level]="level" [size]="size" [muted]="muted">Subtitle text</agentjds-heading>`,
  }),
};
