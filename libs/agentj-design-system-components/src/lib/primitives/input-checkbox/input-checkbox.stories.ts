import { Meta, StoryObj } from "@storybook/angular";
import { InputCheckboxComponent } from "./input-checkbox";

const meta: Meta<InputCheckboxComponent> = {
  component: InputCheckboxComponent,
  title: "Primitives/Input Checkbox",
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<InputCheckboxComponent>;

export const Default: Story = {
  args: {
    label: "I accept the terms and conditions",
  },
  render: (args) => ({
    props: args,
    template: `
      <agentjds-input-checkbox
        [label]="label"
        [disabled]="disabled"
        [required]="required"
      ></agentjds-input-checkbox>
    `,
  }),
};

export const WithHint: Story = {
  args: {
    label: "Subscribe to release updates",
    hint: "We send one update per sprint.",
  },
  render: (args) => ({
    props: args,
    template: `
      <agentjds-input-checkbox
        [label]="label"
        [hint]="hint"
      ></agentjds-input-checkbox>
    `,
  }),
};
