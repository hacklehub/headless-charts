import LollipopVChart from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

export default {
  title: 'Linear/LollipopVChart',
  component: LollipopVChart,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data,
    id: 'lollipop-v-chart-default',
    x: {
      axis: 'bottom',
      axisTicks: 2,
      key: 'name',
    },
    y: {
      axis: 'left',
      axisTicks: 4,
      key: 'reading',
      start: 0,
    },
  },
};

export const WithCustomShape = {
  args: {
    ...Default.args,
    shape: 'star',
  },
};

export const WithCustomStyles = {
  args: {
    ...WithCustomShape.args,
    classNameLines: 'fill-red-500 stroke-red-500',
    classNameSymbols: 'fill-blue-500 stroke-blue-500',
  },
};
