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
    template: `<jaids-icon [name]="name" [size]="size" [color]="color"></jaids-icon>`,
  }),
};

export const Close: Story = {
  args: { name: "close", size: "md", color: "inherit" },
  render: (args) => ({
    props: args,
    template: `<jaids-icon [name]="name" [size]="size" [color]="color"></jaids-icon>`,
  }),
};

export const Check: Story = {
  args: { name: "check", size: "md", color: "success" },
  render: (args) => ({
    props: args,
    template: `<jaids-icon [name]="name" [size]="size" [color]="color"></jaids-icon>`,
  }),
};

export const Warning: Story = {
  args: { name: "warning", size: "md", color: "warning" },
  render: (args) => ({
    props: args,
    template: `<jaids-icon [name]="name" [size]="size" [color]="color"></jaids-icon>`,
  }),
};

export const Error: Story = {
  args: { name: "error", size: "md", color: "danger" },
  render: (args) => ({
    props: args,
    template: `<jaids-icon [name]="name" [size]="size" [color]="color"></jaids-icon>`,
  }),
};

export const Search: Story = {
  args: { name: "search", size: "md", color: "inherit" },
  render: (args) => ({
    props: args,
    template: `<jaids-icon [name]="name" [size]="size" [color]="color"></jaids-icon>`,
  }),
};

export const Star: Story = {
  args: { name: "star", size: "lg", color: "warning" },
  render: (args) => ({
    props: args,
    template: `<jaids-icon [name]="name" [size]="size" [color]="color"></jaids-icon>`,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <jaids-icon name="star" size="xs" color="warning"></jaids-icon>
        <jaids-icon name="star" size="sm" color="warning"></jaids-icon>
        <jaids-icon name="star" size="md" color="warning"></jaids-icon>
        <jaids-icon name="star" size="lg" color="warning"></jaids-icon>
        <jaids-icon name="star" size="xl" color="warning"></jaids-icon>
      </div>
    `,
  }),
};

export const AllColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <jaids-icon name="check" size="md" color="primary"></jaids-icon>
        <jaids-icon name="check" size="md" color="secondary"></jaids-icon>
        <jaids-icon name="check" size="md" color="danger"></jaids-icon>
        <jaids-icon name="check" size="md" color="success"></jaids-icon>
        <jaids-icon name="check" size="md" color="warning"></jaids-icon>
      </div>
    `,
  }),
};

export const AllIcons: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <jaids-icon name="close" size="md"></jaids-icon>
          <span style="font-size: 12px;">close</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <jaids-icon name="check" size="md"></jaids-icon>
          <span style="font-size: 12px;">check</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <jaids-icon name="info" size="md"></jaids-icon>
          <span style="font-size: 12px;">info</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <jaids-icon name="warning" size="md"></jaids-icon>
          <span style="font-size: 12px;">warning</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <jaids-icon name="error" size="md"></jaids-icon>
          <span style="font-size: 12px;">error</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <jaids-icon name="search" size="md"></jaids-icon>
          <span style="font-size: 12px;">search</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <jaids-icon name="menu" size="md"></jaids-icon>
          <span style="font-size: 12px;">menu</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <jaids-icon name="arrow-down" size="md"></jaids-icon>
          <span style="font-size: 12px;">arrow-down</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <jaids-icon name="arrow-up" size="md"></jaids-icon>
          <span style="font-size: 12px;">arrow-up</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <jaids-icon name="star" size="md"></jaids-icon>
          <span style="font-size: 12px;">star</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <jaids-icon name="plus" size="md"></jaids-icon>
          <span style="font-size: 12px;">plus</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <jaids-icon name="minus" size="md"></jaids-icon>
          <span style="font-size: 12px;">minus</span>
        </div>
      </div>
    `,
  }),
};
