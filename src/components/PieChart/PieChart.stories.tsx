import { Meta } from '@storybook/react';
import PieChart from '.';

export default {
  title: 'Linear/PieChart',
  component: PieChart,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data: [
      { name: 'Item A', value: 40 },
      { name: 'Item B', value: 30 },
      { name: 'Item C', value: 30 },
    ],
    id: 'default-pie-chart',
    value: 'percentage',
    labels: { key: 'name' },
  },
};
