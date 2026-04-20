import { Meta, StoryObj } from "@storybook/angular";
import { DisclaimerComponent } from "./disclaimer";

const meta: Meta<DisclaimerComponent> = {
  component: DisclaimerComponent,
  title: "Primitives/Disclaimer",
  tags: ["autodocs"],
  argTypes: {
    centered: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<DisclaimerComponent>;

export const Default: Story = {
  args: {
    text: "Wij zijn niet verbonden met eigenaars of bedrijven die de LLM-modellen op deze website hebben ontwikkeld.",
    centered: false,
  },
};

export const Centered: Story = {
  args: {
    text: "Wij zijn niet verbonden met eigenaars of bedrijven die de LLM-modellen op deze website hebben ontwikkeld.",
    centered: true,
  },
};
