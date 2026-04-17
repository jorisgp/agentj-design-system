import { Meta, StoryObj } from "@storybook/angular";
import { BadgeComponent } from "./badge";

const meta: Meta<BadgeComponent> = {
  component: BadgeComponent,
  title: "Primitives/Badge",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["neutral", "primary", "success", "warning", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
    },
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Default: Story = {
  args: { text: "Badge", variant: "neutral", size: "md" },
  render: (args) => ({
    props: args,
    template: `<jaids-badge [text]="text" [variant]="variant" [size]="size"></jaids-badge>`,
  }),
};

export const StatusVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <jaids-badge text="Neutral" variant="neutral"></jaids-badge>
        <jaids-badge text="Primary" variant="primary"></jaids-badge>
        <jaids-badge text="Success" variant="success"></jaids-badge>
        <jaids-badge text="Warning" variant="warning"></jaids-badge>
        <jaids-badge text="Danger" variant="danger"></jaids-badge>
      </div>
    `,
  }),
};
