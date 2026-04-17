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
          <jaids-badge text="Neutral"></jaids-badge>
          <jaids-badge text="In Progress" variant="primary"></jaids-badge>
          <jaids-badge text="Blocked" variant="danger"></jaids-badge>
        </section>

        <jaids-input-dropdown
          label="Team"
          placeholder="Select team"
          [options]="[
            { label: 'Field Service', value: 'fs' },
            { label: 'Platform', value: 'platform' },
            { label: 'Design', value: 'design' }
          ]"
        ></jaids-input-dropdown>

        <jaids-input-radio
          label="Environment"
          [options]="[
            { label: 'Development', value: 'dev' },
            { label: 'Staging', value: 'staging' },
            { label: 'Production', value: 'prod' }
          ]"
        ></jaids-input-radio>

        <jaids-input-checkbox
          label="Enable notifications"
          hint="You can change this later in settings."
        ></jaids-input-checkbox>
      </div>
    `,
  }),
};
