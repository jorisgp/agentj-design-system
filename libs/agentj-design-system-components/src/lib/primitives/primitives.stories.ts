import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { BadgeComponent } from "./badge/badge";
import { InputCheckboxComponent } from "./input-checkbox/input-checkbox";
import { InputDropdownComponent } from "./input-dropdown/input-dropdown";
import { InputRadioComponent } from "./input-radio/input-radio";

const meta: Meta = {
  title: "Primitives/Overview",
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      imports: [
        BadgeComponent,
        InputDropdownComponent,
        InputRadioComponent,
        InputCheckboxComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: 20px; max-width: 520px;">
        <section style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <agentjds-badge text="Neutral"></agentjds-badge>
          <agentjds-badge text="In Progress" variant="primary"></agentjds-badge>
          <agentjds-badge text="Blocked" variant="danger"></agentjds-badge>
        </section>

        <agentjds-input-dropdown
          label="Team"
          placeholder="Select team"
          [options]="[
            { label: 'Field Service', value: 'fs' },
            { label: 'Platform', value: 'platform' },
            { label: 'Design', value: 'design' }
          ]"
        ></agentjds-input-dropdown>

        <agentjds-input-radio
          label="Environment"
          [options]="[
            { label: 'Development', value: 'dev' },
            { label: 'Staging', value: 'staging' },
            { label: 'Production', value: 'prod' }
          ]"
        ></agentjds-input-radio>

        <agentjds-input-checkbox
          label="Enable notifications"
          hint="You can change this later in settings."
        ></agentjds-input-checkbox>
      </div>
    `,
  }),
};
