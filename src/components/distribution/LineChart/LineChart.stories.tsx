/* eslint-disable @typescript-eslint/no-explicit-any */
import './index.css';

import { Meta, StoryObj } from '@storybook/react';

import { DateTime } from 'luxon';
import LineChart from '.';
import data from './sample.json';

export default {
  title: 'Linear/LineChart/Intro',
  component: LineChart,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof LineChart>;

const randBetween = (x: number, y: number) => x + Math.random() * (y - x);

const arrayLength = 200;
/* eslint-disable */
// @ts-ignore
const dataForTimeSeriesChart = new Array(arrayLength)
  .fill('')
  .map((_, index) => ({
    date: DateTime.now()
      .startOf('day')
      .minus({ days: arrayLength - index })
      .toFormat('yyyy-MM-dd hh:mm:ss'),
    // @ts-ignore
    value: randBetween(1000, 1004),
    // @ts-ignore
    reading: randBetween(1000, 996),
  }));

export const Default: Story = {
  args: {
    data,
    x: { key: 'id' },
    y: [{ key: 'value' }, { key: 'reading' }],
    id: 'default-line-chart',
  },
};

export const WithStyleChart: Story = {
  args: {
    ...Default.args,
    id: 'with-style-chart',
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', className: 'text-blue-500' },
    ],
    className:
      'bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900',
  },
};

export const WithPaddedChart: Story = {
  args: {
    ...Default.args,
    id: 'padding-for-line-chart',
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', className: 'text-blue-500' },
    ],
    className: '',
    paddingLeft: 15,
  },
};

export const TwoAxes: Story = {
  args: {
    data,
    id: 'two-axes-for-line-chart',
    x: { key: 'id' },
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', className: 'text-blue-500', axis: 'right' },
    ],
    marginRight: 40,
  },
};

export const Drawing: Story = {
  args: {
    data,
    id: 'drawing-line-chart',
    x: { key: 'id' },
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', className: 'text-blue-500', axis: 'right' },
    ],
    className: '',
    drawing: { duration: 2000 },
  },
};

export const Zooming: Story = {
  args: {
    data,
    id: 'line-chart-with-zooming',
    x: { key: 'id' },
    y: [
      { key: 'value', className: 'text-green-500' },
      {
        key: 'reading',
        className: 'text-blue-500',
        axis: 'right',
      },
    ],
    className: '',
    zooming: {
      min: 0,
      max: 100,
    },
  },
};

export const LineChartVertical: Story = {
  args: {
    data,
    id: 'horizontal-line-chart',
    x: { key: 'id' },
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', className: 'text-blue-500' },
    ],
    tooltip: { keys: ['id', 'value', 'reading'] },
    referenceLines: [
      { x: 4, className: 'stroke-current text-blue-200 stroke-2 dashed' },
    ],
  },
};

export const LineChartHorizontal: Story = {
  args: {
    data,
    id: 'vertical-line-chart',
    x: { key: 'id' },
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', className: 'text-blue-500' },
    ],
    tooltip: { keys: ['id', 'value', 'reading'] },
    referenceLines: [
      {
        yLeft: 1600,
        className: 'stroke-current text-blue-200, stroke-1 dashed',
      },
    ],
  },
};

export const WithTimeSeriesForLineChart: Story = {
  args: {
    data: dataForTimeSeriesChart,
    id: 'time-series',
    x: {
      key: 'date',
      scalingFunction: 'time',
      axisLabel: 'Date',
    },
    y: [
      {
        key: 'value',
        axis: 'left',
        className: 'text-red-200 dark:text-red-700 stroke-current',
        curve: 'rounded',
      },
      {
        key: 'reading',
        className: 'text-blue-200 dark:text-red-700',
        axis: 'left',
        symbol: 'none',
      },
    ],
    referenceLines: [
      { yLeft: 1000, className: 'text-gray-200 dashed', showText: true },
    ],
  },
};
