/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import LollipopHChart from '.';
import data from './sample.json';

export default {
  title: 'Linear/LollipopHChart/Intro',
  component: LollipopHChart,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof LollipopHChart>;

export const Default: Story = {
  args: {
    data,
    id: 'lollipop-h-chart',
    x: {
      key: 'value',
      start: 0,
    },
    y: {
      key: 'name',
    },
  },
};

export const WithCustomShape: Story = {
  args: {
    ...Default.args,
    shape: 'diamond',
  },
};
