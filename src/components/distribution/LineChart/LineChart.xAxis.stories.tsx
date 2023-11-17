/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import LineChart from '.';
import data from './sample.json';

const meta: Meta<typeof LineChart> = {
  title: 'Linear/LineChart/X-Axis',
  component: LineChart,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LineChart>;

export const XAxisLabel: Story = {
  args: {
    data,
    id: 'line-chart-with-x-axis-label',
    x: { key: 'id', axisLabel: 'Some Index' },
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', className: 'text-blue-500' },
    ],
    className: '',
  },
};

export const WithXAxisCustomStart: Story = {
  args: {
    data,
    id: 'line-chart-with-x-axis-custom-start',
    x: { key: 'id', axisLabel: 'Some Index', start: 0, end: 7 },
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', axis: 'right', className: 'text-blue-500' },
    ],
    className: '',
  },
};
export const WithXAxisAtTop: Story = {
  args: {
    data,
    id: 'x-axis-at-top',
    x: { key: 'id', axisLabel: 'Some Index', axis: 'top' },
    y: [
      { key: 'value', className: 'text-green-500' },
      {
        key: 'reading',
        axis: 'right',
        className: 'text-blue-500',
      },
    ],
    className: '',
  },
};

export const WithXAxisTicks: Story = {
  args: {
    data,
    id: 'x-axis-ticks',
    x: { key: 'id', axisLabel: 'Some Index', axisTicks: 15 },
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', className: 'text-blue-500' },
    ],
    className: '',
  },
};
