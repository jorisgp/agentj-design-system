import { Meta, StoryObj } from "@storybook/angular";
import { ChatBubbleComponent } from "./chat-bubble";

const meta: Meta<ChatBubbleComponent> = {
  component: ChatBubbleComponent,
  title: "Primitives/Chat Bubble",
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["incoming", "outgoing"],
    },
    tone: {
      control: { type: "select" },
      options: ["neutral", "primary", "success", "warning"],
    },
  },
};

export default meta;
type Story = StoryObj<ChatBubbleComponent>;

export const Incoming: Story = {
  args: {
    author: "Alex",
    timestamp: "10:34",
    message: "Can we ship the dropdown variant in this sprint?",
    direction: "incoming",
    tone: "neutral",
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 560px;">
        <jaids-chat-bubble
          [author]="author"
          [timestamp]="timestamp"
          [message]="message"
          [direction]="direction"
          [tone]="tone"
        ></jaids-chat-bubble>
      </div>
    `,
  }),
};

export const Outgoing: Story = {
  args: {
    author: "You",
    timestamp: "10:35",
    message: "Yes, let us include radio + checkbox too.",
    direction: "outgoing",
    tone: "primary",
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 560px;">
        <jaids-chat-bubble
          [author]="author"
          [timestamp]="timestamp"
          [message]="message"
          [direction]="direction"
          [tone]="tone"
        ></jaids-chat-bubble>
      </div>
    `,
  }),
};

export const Conversation: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 560px;">
        <jaids-chat-bubble
          author="Alex"
          timestamp="10:34"
          message="Can we ship the dropdown variant in this sprint?"
          direction="incoming"
          tone="neutral"
        ></jaids-chat-bubble>

        <jaids-chat-bubble
          author="You"
          timestamp="10:35"
          message="Yes, let us include radio + checkbox too."
          direction="outgoing"
          tone="primary"
        ></jaids-chat-bubble>

        <jaids-chat-bubble
          author="Alex"
          timestamp="10:36"
          message="Perfect. I will review the Storybook examples."
          direction="incoming"
          tone="success"
        ></jaids-chat-bubble>
      </div>
    `,
  }),
};
