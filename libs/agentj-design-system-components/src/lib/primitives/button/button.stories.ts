import { Meta, StoryObj } from "@storybook/angular";
import { ButtonComponent } from "./button";

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: "Primitives/Button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: { variant: "primary", size: "md", disabled: false },
  render: (args) => ({
    props: args,
    template: `<agentjds-button [variant]="variant" [size]="size" [disabled]="disabled">Primary</agentjds-button>`,
  }),
};

export const Secondary: Story = {
  args: { variant: "secondary", size: "md", disabled: false },
  render: (args) => ({
    props: args,
    template: `<agentjds-button [variant]="variant" [size]="size" [disabled]="disabled">Secondary</agentjds-button>`,
  }),
};

export const Danger: Story = {
  args: { variant: "danger", size: "md", disabled: false },
  render: (args) => ({
    props: args,
    template: `<agentjds-button [variant]="variant" [size]="size" [disabled]="disabled">Delete</agentjds-button>`,
  }),
};

export const Ghost: Story = {
  args: { variant: "ghost", size: "md", disabled: false },
  render: (args) => ({
    props: args,
    template: `<agentjds-button [variant]="variant" [size]="size" [disabled]="disabled">Ghost</agentjds-button>`,
  }),
};

export const Small: Story = {
  args: { variant: "primary", size: "sm", disabled: false },
  render: (args) => ({
    props: args,
    template: `<agentjds-button [variant]="variant" [size]="size" [disabled]="disabled">Small</agentjds-button>`,
  }),
};

export const Large: Story = {
  args: { variant: "primary", size: "lg", disabled: false },
  render: (args) => ({
    props: args,
    template: `<agentjds-button [variant]="variant" [size]="size" [disabled]="disabled">Large</agentjds-button>`,
  }),
};

export const Disabled: Story = {
  args: { variant: "primary", size: "md", disabled: true },
  render: (args) => ({
    props: args,
    template: `<agentjds-button [variant]="variant" [size]="size" [disabled]="disabled">Disabled</agentjds-button>`,
  }),
};
