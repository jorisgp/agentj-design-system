import { Meta, StoryObj } from "@storybook/angular";
import { InputDropdownComponent } from "./input-dropdown";

const meta: Meta<InputDropdownComponent> = {
  component: InputDropdownComponent,
  title: "Primitives/Input Dropdown",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<InputDropdownComponent>;

export const Default: Story = {
  args: {
    label: "Status",
    placeholder: "Select status",
    size: "md",
    options: [
      { label: "Open", value: "open" },
      { label: "In Progress", value: "progress" },
      { label: "Done", value: "done" },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <jaids-input-dropdown
        [label]="label"
        [placeholder]="placeholder"
        [size]="size"
        [options]="options"
        [disabled]="disabled"
        [required]="required"
      ></jaids-input-dropdown>
    `,
  }),
};

export const WithError: Story = {
  args: {
    label: "Assignee",
    placeholder: "Select assignee",
    error: "Please select an assignee",
    options: [
      { label: "Joris", value: "joris" },
      { label: "Alex", value: "alex" },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <jaids-input-dropdown
        [label]="label"
        [placeholder]="placeholder"
        [error]="error"
        [options]="options"
      ></jaids-input-dropdown>
    `,
  }),
};
