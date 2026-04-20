import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { BadgeComponent } from "./badge/badge";
import { BackgroundComponent } from "./background/background";
import { DisclaimerComponent } from "./disclaimer/disclaimer";
import { LogoComponent } from "./logo/logo";
import { DropdownButtonComponent } from "../composites/dropdown-button/dropdown-button";
import { ChatInputComponent } from "../ui-components/chat-input/chat-input";

const meta: Meta = {
  title: "Primitives/Overview",
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      imports: [
        BackgroundComponent,
        BadgeComponent,
        ChatInputComponent,
        DisclaimerComponent,
        DropdownButtonComponent,
        LogoComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  render: () => ({
    props: {
      modelOptions: [
        { label: "Claude Sonnet 4.5", value: "claude-sonnet-4-5" },
        { label: "Claude Opus 4.1", value: "claude-opus-4-1" },
        { label: "GPT-4o", value: "gpt-4o" },
      ],
      disclaimerText:
        "Wij zijn niet verbonden met eigenaars of bedrijven die de LLM-modellen op deze website hebben ontwikkeld.",
    },
    template: `
      <agentjds-background color="#0f172a">
        <div style="position: relative; min-height: 100vh; width: 100%; color: #e2e8f0; overflow: hidden;">
          <div style="position: absolute; top: 24px; left: 24px; display: flex; align-items: center; gap: 12px;">
            <agentjds-logo size="sm" mark="AJ" text="AgentJ"></agentjds-logo>
            <agentjds-dropdown-button
              label="Claude Sonnet 4.5"
              variant="ghost"
              size="md"
              [options]="modelOptions"
            ></agentjds-dropdown-button>
          </div>

          <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px;">
            <div style="width: min(760px, 100%); display: flex; flex-direction: column; align-items: center; gap: 14px;">
              <div style="width: min(640px, 100%);">
                <agentjds-chat-input
                  placeholder="Vraag iets over jouw werk..."
                  [maxRows]="6"
                ></agentjds-chat-input>
              </div>

              <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;">
                <agentjds-badge text="Taken"></agentjds-badge>
                <agentjds-badge text="Plannen" variant="primary"></agentjds-badge>
                <agentjds-badge text="Status" variant="success"></agentjds-badge>
                <agentjds-badge text="Rapporten" variant="warning"></agentjds-badge>
              </div>
            </div>
          </div>

          <div style="position: absolute; left: 24px; right: 24px; bottom: 20px;">
            <agentjds-disclaimer [text]="disclaimerText" [centered]="true"></agentjds-disclaimer>
          </div>
        </div>
      </agentjds-background>
    `,
  }),
};
