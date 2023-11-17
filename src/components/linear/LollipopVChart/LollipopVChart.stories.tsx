import { Meta, StoryObj } from '@storybook/react';

import LollipopVChart from '.';
import data from './sample.json';

export default {
  title: 'Linear/LollipopVChart/Intro',
  component: LollipopVChart,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof LollipopVChart>;

export const Default: Story = {
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

export const WithCustomShape: Story = {
  args: {
    ...Default.args,
    shape: 'star',
  },
};

export const WithCustomStyles: Story = {
  args: {
    ...WithCustomShape.args,
    classNameLines: 'fill-red-500 stroke-red-500',
    classNameSymbols: 'fill-blue-500 stroke-blue-500',
  },
};
