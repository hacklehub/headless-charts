import { Meta, StoryObj } from '@storybook/react';

import SpeedometerChart from '.';

export default {
  title: 'Gauge/Speedometer',
  component: SpeedometerChart,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof SpeedometerChart>;

export const Default: Story = {
  args: {
    data: 0.7,
    label: {
      text: 'Coverage',
    },
    id: 'speedometer-default',
  },
};

export const WithRadius: Story = {
  args: {
    ...Default.args,
    id: 'speedometer-with-radius',
    needleRadius: 0.5,
  },
};

export const WithAxisTicks: Story = {
  args: {
    ...Default.args,
    id: 'speedometer-with-axis-ticks',
    axisTicks: 10,
  },
};

