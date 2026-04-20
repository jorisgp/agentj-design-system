import { Meta, StoryObj } from "@storybook/angular";
import { ChatInputComponent } from "./chat-input";

const meta: Meta<ChatInputComponent> = {
  component: ChatInputComponent,
  title: "UI Components/ChatInput",
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    maxRows: {
      control: { type: "number", min: 1, max: 20 },
    },
  },
};

export default meta;
type Story = StoryObj<ChatInputComponent>;

export const Default: Story = {
  args: {
    placeholder: "Leer over...",
    disabled: false,
    maxRows: 6,
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 600px; padding: 16px;">
      <agentjds-chat-input [placeholder]="placeholder" [disabled]="disabled" [maxRows]="maxRows" />
    </div>`,
  }),
};

export const Disabled: Story = {
  args: {
    placeholder: "Leer over...",
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 600px; padding: 16px;">
      <agentjds-chat-input [placeholder]="placeholder" [disabled]="disabled" />
    </div>`,
  }),
};
