/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import LineChart from '.';
import data from './sample.json';

const meta: Meta<typeof LineChart> = {
  title: 'Linear/LineChart/Y-Axis',
  component: LineChart,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LineChart>;

export const YAxisCustomStart: Story = {
  args: {
    data,
    id: 'y-axis-custom-start',
    x: { key: 'id', axisLabel: 'Some Index' },
    y: [
      { key: 'value', className: 'text-green-500', start: 0 },
      {
        key: 'reading',
        className: 'text-blue-500',
        axis: 'right',
        start: 0,
        ticks: 3,
      },
    ],
    className: '',
  },
};

export const YAxisCustomSymbolChart: Story = {
  args: {
    data,
    id: 'y-axis-custom-label-chart',
    x: { key: 'id', axisLabel: 'Some Index' },
    y: [
      {
        key: 'value',
        className: 'text-green-500',
        start: 0,
        symbol: 'diamond',
      },
      {
        key: 'reading',
        symbol: 'circle',
        className: 'text-blue-500',
        axis: 'right',
        start: 0,
        ticks: 3,
      },
    ],
    className: '',
  },
};

export const YAxisUnknown: Story = {
  args: {
    data,
    id: 'y-axis-unknown-chart',
    x: { key: 'id', axisLabel: 'Some Index' },
    y: [
      {
        key: 'value',
        className: 'text-green-500',
        start: 0,
        symbol: 'diamond',
        unknown: 'zero',
      },
      {
        key: 'reading',
        symbol: 'circle',
        className: 'text-blue-500',
        axis: 'right',
        unknown: 'zero',
        start: 0,
        ticks: 3,
      },
    ],
    className: '',
  },
};

export const YAxisLabel: Story = {
  args: {
    data,
    id: 'y-axis-custom-label-chart',
    x: { key: 'id', axisLabel: 'Some Index' },
    y: [
      {
        key: 'value',
        className: 'text-green-500',
        start: 0,
        symbol: 'diamond',
      },
      {
        key: 'value',
        symbol: 'circle',
        className: 'text-blue-500',
        axis: 'right',
        start: 0,
        ticks: 3,
      },
    ],
    className: '',
  },
};

export const YAxisCurve: Story = {
  args: {
    data,
    id: 'y-axis-custom-curve-chart',
    x: { key: 'id', axisLabel: 'Some Index' },
    y: [
      {
        key: 'value',
        className: 'text-green-500',
        start: 0,
        symbol: 'diamond',
        curve: 'rounded',
      },
      {
        key: 'reading',
        symbol: 'circle',
        className: 'text-blue-500',
        axis: 'right',
        start: 0,
        ticks: 3,
      },
    ],
    className: '',
  },
};
