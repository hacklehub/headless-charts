import BarChartStacked from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

export default {
  title: 'Linear/BarChartStacked',
  component: BarChartStacked,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data,
    id: 'bar-chart-stacked-default',
    x: [
      {
        key: 'reading',
      },
      { key: 'value' },
    ],
    y: { key: 'name' },
  },
};

export const Styled = {
  args: {
    ...Default.args,
    id: 'bar-chart-stacked-styled',
    className: 'bg-gray-100 rounded',
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 5,
      bar: 0.1,
    },
    margin: {
      top: 0,
      right: 40,
      bottom: 40,
      left: 60,
    },
    x: [
      {
        key: 'reading',
        className: 'fill-amber-500 rounded',
      },
      { key: 'value', className: 'fill-purple-400' },
    ],
    y: { key: 'name', className: 'text-red-500', padding: 10 },
  },
};
