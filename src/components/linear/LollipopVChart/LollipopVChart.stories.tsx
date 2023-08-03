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
      key: 'value',
    },
    y: {
      axis: 'left',
      axisTicks: 4,
      key: 'name',
    },
  },
};
