/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import ColumnChart from '.';
import data from './sample.json';

export default {
  title: 'Linear/ColumnChart/Intro',
  component: ColumnChart,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof ColumnChart>;

export const Default: Story = {
  args: {
    data,
    id: 'column-chart-default',
    x: { key: 'name' },
    y: [
      {
        key: 'USA',
        start: 0,
      },
      { key: 'Europe' },
      { key: 'APAC' },
      { key: 'Africa' },
    ],
  },
};

export const Styled: Story = {
  args: {
    data,
    id: 'column-chart-styled',
    className: 'bg-gray-100 rounded',
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 5,
    },
    paddingBar: 0.1,
    margin: {
      top: 10,
      right: 40,
      bottom: 40,
      left: 60,
    },
    x: { key: 'name' },
    y: [
      {
        key: 'USA',
        start: 0,
        className: 'text-purple-300',
      },
      { key: 'Europe', className: 'text-purple-500 ' },
      { key: 'APAC', className: 'text-purple-700' },
      { key: 'Africa', className: 'text-purple-900' },
    ],
  },
};

export const Animated: Story = {
  args: {
    ...Default.args,
    drawing: { duration: 1000 },
  },
};
