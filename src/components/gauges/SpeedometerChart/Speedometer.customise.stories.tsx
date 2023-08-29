import { Meta, StoryObj } from '@storybook/react';

import SpeedometerChart from '.';

const meta: Meta<typeof SpeedometerChart> = {
  title: 'Gauge/Speedometer/customized',
  component: SpeedometerChart,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SpeedometerChart>;

export const WithRegions: Story = {
  args: {
    data: 0.7,
    label: {
      text: 'Coverage',
    },
    id: 'speedometer-with-regions',
    regions: [
      {
        limit: 0.5,
        className: 'fill-red-500',
      },
      {
        limit: 0.8,
        className: 'fill-yellow-500',
      },
      {
        limit: 0.9,
        className: 'fill-green-500',
      },
      {
        limit: 1,
        className: 'fill-blue-500',
      },
    ],
  },
};
