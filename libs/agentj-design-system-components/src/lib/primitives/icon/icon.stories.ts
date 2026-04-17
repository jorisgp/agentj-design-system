import { Meta, StoryObj } from "@storybook/angular";
import { IconComponent } from "./icon";

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: "Primitives/Icon",
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "select" },
      options: [
        "close",
        "check",
        "info",
        "warning",
        "error",
        "search",
        "menu",
        "arrow-down",
        "arrow-up",
        "star",
        "plus",
        "minus",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "danger",
        "success",
        "warning",
        "inherit",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {
  args: { name: "info", size: "md", color: "inherit" },
  render: (args) => ({
    props: args,
    template: `<agentjds-icon [name]="name" [size]="size" [color]="color"></agentjds-icon>`,
  }),
};

export const Close: Story = {
  args: { name: "close", size: "md", color: "inherit" },
  render: (args) => ({
    props: args,
    template: `<agentjds-icon [name]="name" [size]="size" [color]="color"></agentjds-icon>`,
  }),
};

export const Check: Story = {
  args: { name: "check", size: "md", color: "success" },
  render: (args) => ({
    props: args,
    template: `<agentjds-icon [name]="name" [size]="size" [color]="color"></agentjds-icon>`,
  }),
};

export const Warning: Story = {
  args: { name: "warning", size: "md", color: "warning" },
  render: (args) => ({
    props: args,
    template: `<agentjds-icon [name]="name" [size]="size" [color]="color"></agentjds-icon>`,
  }),
};

export const Error: Story = {
  args: { name: "error", size: "md", color: "danger" },
  render: (args) => ({
    props: args,
    template: `<agentjds-icon [name]="name" [size]="size" [color]="color"></agentjds-icon>`,
  }),
};

export const Search: Story = {
  args: { name: "search", size: "md", color: "inherit" },
  render: (args) => ({
    props: args,
    template: `<agentjds-icon [name]="name" [size]="size" [color]="color"></agentjds-icon>`,
  }),
};

export const Star: Story = {
  args: { name: "star", size: "lg", color: "warning" },
  render: (args) => ({
    props: args,
    template: `<agentjds-icon [name]="name" [size]="size" [color]="color"></agentjds-icon>`,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <agentjds-icon name="star" size="xs" color="warning"></agentjds-icon>
        <agentjds-icon name="star" size="sm" color="warning"></agentjds-icon>
        <agentjds-icon name="star" size="md" color="warning"></agentjds-icon>
        <agentjds-icon name="star" size="lg" color="warning"></agentjds-icon>
        <agentjds-icon name="star" size="xl" color="warning"></agentjds-icon>
      </div>
    `,
  }),
};

export const AllColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <agentjds-icon name="check" size="md" color="primary"></agentjds-icon>
        <agentjds-icon name="check" size="md" color="secondary"></agentjds-icon>
        <agentjds-icon name="check" size="md" color="danger"></agentjds-icon>
        <agentjds-icon name="check" size="md" color="success"></agentjds-icon>
        <agentjds-icon name="check" size="md" color="warning"></agentjds-icon>
      </div>
    `,
  }),
};

export const AllIcons: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <agentjds-icon name="close" size="md"></agentjds-icon>
          <span style="font-size: 12px;">close</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <agentjds-icon name="check" size="md"></agentjds-icon>
          <span style="font-size: 12px;">check</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <agentjds-icon name="info" size="md"></agentjds-icon>
          <span style="font-size: 12px;">info</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <agentjds-icon name="warning" size="md"></agentjds-icon>
          <span style="font-size: 12px;">warning</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <agentjds-icon name="error" size="md"></agentjds-icon>
          <span style="font-size: 12px;">error</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <agentjds-icon name="search" size="md"></agentjds-icon>
          <span style="font-size: 12px;">search</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <agentjds-icon name="menu" size="md"></agentjds-icon>
          <span style="font-size: 12px;">menu</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <agentjds-icon name="arrow-down" size="md"></agentjds-icon>
          <span style="font-size: 12px;">arrow-down</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <agentjds-icon name="arrow-up" size="md"></agentjds-icon>
          <span style="font-size: 12px;">arrow-up</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <agentjds-icon name="star" size="md"></agentjds-icon>
          <span style="font-size: 12px;">star</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <agentjds-icon name="plus" size="md"></agentjds-icon>
          <span style="font-size: 12px;">plus</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <agentjds-icon name="minus" size="md"></agentjds-icon>
          <span style="font-size: 12px;">minus</span>
        </div>
      </div>
    `,
  }),
};
