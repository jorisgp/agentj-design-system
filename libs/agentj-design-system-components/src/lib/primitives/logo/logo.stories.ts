import { Meta, StoryObj } from "@storybook/angular";
import { LogoComponent } from "./logo";

const SAMPLE_LOGO_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='48' viewBox='0 0 180 48'%3E%3Crect x='0' y='8' width='32' height='32' rx='16' fill='%23135ddd'/%3E%3Ctext x='16' y='29' text-anchor='middle' font-size='12' font-family='Arial, sans-serif' font-weight='700' fill='white'%3EAJ%3C/text%3E%3Ctext x='42' y='31' font-size='30' font-family='Times New Roman, serif' font-weight='700' fill='%231c2434'%3EAgentJ%3C/text%3E%3C/svg%3E";

const meta: Meta<LogoComponent> = {
  component: LogoComponent,
  title: "Primitives/Logo",
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    text: { control: "text" },
    mark: { control: "text" },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<LogoComponent>;

export const Wordmark: Story = {
  args: {
    src: "",
    alt: "AgentJ logo",
    text: "AgentJ",
    mark: "AJ",
    size: "md",
  },
  render: (args) => ({
    props: args,
    template:
      "<agentjds-logo [src]=\"src\" [alt]=\"alt\" [text]=\"text\" [mark]=\"mark\" [size]=\"size\"></agentjds-logo>",
  }),
};

export const Image: Story = {
  args: {
    src: SAMPLE_LOGO_SRC,
    alt: "AgentJ logo",
    size: "md",
  },
  render: (args) => ({
    props: args,
    template:
      "<agentjds-logo [src]=\"src\" [alt]=\"alt\" [size]=\"size\"></agentjds-logo>",
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <agentjds-logo text="AgentJ" mark="AJ" size="sm"></agentjds-logo>
        <agentjds-logo text="AgentJ" mark="AJ" size="md"></agentjds-logo>
        <agentjds-logo text="AgentJ" mark="AJ" size="lg"></agentjds-logo>
      </div>
    `,
  }),
};
