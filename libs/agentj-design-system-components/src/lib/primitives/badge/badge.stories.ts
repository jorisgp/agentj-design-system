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
    template: `<agentjds-badge [text]="text" [variant]="variant" [size]="size"></agentjds-badge>`,
  }),
};

export const StatusVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <agentjds-badge text="Neutral" variant="neutral"></agentjds-badge>
        <agentjds-badge text="Primary" variant="primary"></agentjds-badge>
        <agentjds-badge text="Success" variant="success"></agentjds-badge>
        <agentjds-badge text="Warning" variant="warning"></agentjds-badge>
        <agentjds-badge text="Danger" variant="danger"></agentjds-badge>
      </div>
    `,
  }),
};
