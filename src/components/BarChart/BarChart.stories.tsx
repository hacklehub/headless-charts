import type { Meta, StoryObj } from '@storybook/react';

import BarChart from '.';

const meta = {
  title: 'Linear/BarChart',
  component: BarChart,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
} as Meta<typeof BarChart>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Basic: Story = {
  args: {
    data: [
      {
        name: 'A',
        value: 10,
        reading: 6,
      },
      {
        name: 'B',
        value: 20,
        reading: 12,
      },
    ],
  },
};
