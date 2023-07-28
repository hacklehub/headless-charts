import BarChart from '.';
import { Meta } from '@storybook/react';

export default {
  title: 'Linear/BarChart',
  component: BarChart,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} as Meta;

const data = [
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
];

export const Default = {
  args: {
    data,
    id: 'bar-chart-reading-name',
    x: [
      {
        key: 'reading',
        className: 'bg-red-900 text-red-900 fill-current stroke-current',
      },
      { key: 'value' },
    ],
    y: { key: 'name' },
    dataLabel: {
      enabled: true,
      className: 'text-white',
    },
  },
};


export const Drawing = {
  args: {
    ...Default.args,
    drawing: {
      enabled: true,
      duration: 1000,
    },
  },
};