import { Meta } from '@storybook/react';
import PieChart from '.';

export default {
  title: 'Linear/PieChart',
  component: PieChart,
  tags: ['autodocs'],
} as Meta;

const classMap = {
  'Product A': 'text-purple-700',
  'Product B': 'text-purple-500',
  'Product C': 'text-purple-300',
};

export const Default = {
  args: {
    data: [
      { name: 'Product A', USA: 10000, Europe: 4000, APAC: 5000, Africa: 1000 },
      { name: 'Product B', USA: 9400, Europe: 9000, APAC: 4000 },
      { name: 'Product C', USA: 6000, Europe: 4000, APAC: 1000 },
    ],
    id: 'default-pie-chart',
    paddingAngle: 45,
    classNamePoints: { classMap },
    innerRadius: 0.7,
    drawing: { duration: 1000 },
    // // cornerRadius: 90,
    // value: '100',
    // labels: { key: 'name' },
    // paddingBar: 50,
  },
};
