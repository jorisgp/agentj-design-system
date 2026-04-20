import { Meta, StoryObj } from "@storybook/angular";
import { DropdownButtonComponent } from "./dropdown-button";

const options = [
  { label: "Claude Opus 4.1", value: "claude-opus-4-1" },
  { label: "Claude Sonnet 4.5", value: "claude-sonnet-4-5" },
  { label: "GPT-4o", value: "gpt-4o" },
  { label: "Gemini 2.0 Flash", value: "gemini-2-flash", disabled: true },
];

const meta: Meta<DropdownButtonComponent> = {
  component: DropdownButtonComponent,
  title: "Composites/DropdownButton",
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
  },
};

export default meta;
type Story = StoryObj<DropdownButtonComponent>;

export const Default: Story = {
  args: {
    label: "Claude Opus 4.1",
    variant: "ghost",
    size: "md",
    options,
  },
};

export const Secondary: Story = {
  args: {
    label: "Select model",
    variant: "secondary",
    size: "md",
    options,
  },
};
