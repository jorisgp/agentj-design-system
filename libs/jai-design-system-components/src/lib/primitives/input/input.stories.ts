import { Meta, StoryObj } from "@storybook/angular";
import { InputComponent } from "./input";

const meta: Meta<InputComponent> = {
  component: InputComponent,
  title: "Primitives/Input",
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: { type: "text", size: "md", placeholder: "Enter text..." },
  render: (args) => ({
    props: args,
    template: `<jaids-input [type]="type" [size]="size" [placeholder]="placeholder"></jaids-input>`,
  }),
};

export const WithLabel: Story = {
  args: {
    type: "text",
    size: "md",
    label: "Username",
    placeholder: "Enter username",
  },
  render: (args) => ({
    props: args,
    template: `<jaids-input [label]="label" [type]="type" [size]="size" [placeholder]="placeholder"></jaids-input>`,
  }),
};

export const Required: Story = {
  args: {
    type: "email",
    size: "md",
    label: "Email",
    placeholder: "you@example.com",
    required: true,
  },
  render: (args) => ({
    props: args,
    template: `<jaids-input [label]="label" [type]="type" [size]="size" [placeholder]="placeholder" [required]="required"></jaids-input>`,
  }),
};

export const WithError: Story = {
  args: {
    type: "email",
    size: "md",
    label: "Email",
    error: "Please enter a valid email",
  },
  render: (args) => ({
    props: args,
    template: `<jaids-input [label]="label" [type]="type" [size]="size" [error]="error"></jaids-input>`,
  }),
};

export const WithHint: Story = {
  args: {
    type: "password",
    size: "md",
    label: "Password",
    hint: "At least 8 characters",
  },
  render: (args) => ({
    props: args,
    template: `<jaids-input [label]="label" [type]="type" [size]="size" [hint]="hint"></jaids-input>`,
  }),
};

export const Small: Story = {
  args: { size: "sm", placeholder: "Small input" },
  render: (args) => ({
    props: args,
    template: `<jaids-input [size]="size" [placeholder]="placeholder"></jaids-input>`,
  }),
};

export const Large: Story = {
  args: { size: "lg", placeholder: "Large input" },
  render: (args) => ({
    props: args,
    template: `<jaids-input [size]="size" [placeholder]="placeholder"></jaids-input>`,
  }),
};

export const Disabled: Story = {
  args: { size: "md", placeholder: "Disabled", disabled: true },
  render: (args) => ({
    props: args,
    template: `<jaids-input [size]="size" [placeholder]="placeholder" [disabled]="disabled"></jaids-input>`,
  }),
};
