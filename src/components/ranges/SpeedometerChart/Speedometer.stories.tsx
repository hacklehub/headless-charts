import { Meta } from '@storybook/react';
import SpeedometerChart from '.';

export default {
  title: 'ranges/Speedometer',
  component: SpeedometerChart,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data: 0.7,
    label: {
      text: 'Coverage',
    },
    id: 'speedometer-default',
  },
};

export const WithRadius = {
  args: {
    ...Default.args,
    id: 'speedometer-with-radius',
    needleRadius: 0.5,
  },
};

export const WithAxisTicks = {
  args: {
    ...Default.args,
    id: 'speedometer-with-axis-ticks',
    axisTicks: 10,
  },
};

export const WithRegions = {
  args: {
    ...Default.args,
    id: 'speedometer-with-regions',
    regions: [
      {
        limit: 0,
      },
      {
        limit: 1,
      },
      {
        limit: 2,
      },
      {
        limit: 3,
      },
    ],
  },
};
