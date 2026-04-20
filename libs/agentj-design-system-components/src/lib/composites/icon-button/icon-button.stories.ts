import { Meta, StoryObj } from "@storybook/angular";
import { IconButtonComponent } from "./icon-button";

const meta: Meta<IconButtonComponent> = {
  component: IconButtonComponent,
  title: "Composites/IconButton",
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: { type: "select" },
      options: [
        "send",
        "attach",
        "mic",
        "close",
        "plus",
        "search",
        "menu",
        "sparkle",
      ],
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    shape: {
      control: { type: "select" },
      options: ["circle", "square"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<IconButtonComponent>;

export const Send: Story = {
  args: {
    icon: "send",
    variant: "primary",
    size: "md",
    shape: "circle",
    ariaLabel: "Send message",
  },
};

export const Attach: Story = {
  args: {
    icon: "attach",
    variant: "ghost",
    size: "md",
    shape: "square",
    ariaLabel: "Attach file",
  },
};

export const Ghost: Story = {
  args: {
    icon: "mic",
    variant: "ghost",
    size: "md",
    shape: "square",
    ariaLabel: "Voice input",
  },
};
