import { Meta, StoryObj } from "@storybook/angular";
import { InputRadioComponent } from "./input-radio";

const meta: Meta<InputRadioComponent> = {
  component: InputRadioComponent,
  title: "Primitives/Input Radio",
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<InputRadioComponent>;

export const Default: Story = {
  args: {
    label: "Priority",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <jaids-input-radio
        [label]="label"
        [options]="options"
        [disabled]="disabled"
        [required]="required"
      ></jaids-input-radio>
    `,
  }),
};

export const WithError: Story = {
  args: {
    label: "Approval",
    error: "Please choose an option",
    options: [
      { label: "Approve", value: "approve" },
      { label: "Reject", value: "reject" },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <jaids-input-radio
        [label]="label"
        [options]="options"
        [error]="error"
      ></jaids-input-radio>
    `,
  }),
};
