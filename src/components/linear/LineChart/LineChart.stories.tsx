import './index.css';

import { Meta, StoryObj } from '@storybook/react';

import LineChart from '.';

const meta: Meta<typeof LineChart> = {
  title: 'Linear/LineChart/Intro',
  component: LineChart,
  tags: ['autodocs'],
};

export default meta;

const data = [
  { id: 1, value: 1311, reading: 1500 },
  { id: 2, reading: 1912 },
  { id: 3, value: 1000 },
  { id: 4, value: 1513 },
  { id: 5, value: 1351, reading: 1000 },
  { id: 6, value: 1451, reading: 1200 },
];

type Story = StoryObj<typeof LineChart>;

export const Default: Story = {
  args: {
    data,
    x: { key: 'id' },
    y: [{ key: 'value' }, { key: 'reading' }],
    id: 'default-line-chart',
  },
};

export const WithStyleChart = {
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

export const WithInsidePadding = {
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

export const TwoAxes = {
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

export const Drawing = {
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

export const Zooming = {
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
    zooming: true,
  },
};

export const WithTooltip = {
  args: {
    data,
    id: 'line-chart-with-tooltip',
    x: { key: 'id' },
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', className: 'text-blue-500' },
    ],
    tooltip: {
      keys: ['value', 'reading', 'id'],
      className: 'text-green-500',
      html: (row: any) => `${row.id} - ${row.value || ''}/${row.reading || ''}`,
    },
    showGuideLines: true,
  },
};
/* eslint-enable */

export const XAxisLabel = {
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

export const WithXAxisCustomStart = {
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
export const WithXAxisAtTop = {
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

export const WithXAxisTicks = {
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

export const YAxisCustomStart = {
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

export const YAxisCustomSymbolChart = {
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

export const YAxisUnknown = {
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

export const YAxisLabel = {
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
        axisLabel: 'Volume',
      },
      {
        key: 'value',
        symbol: 'circle',
        axisLabel: 'Pressure',
        className: 'text-blue-500',
        axis: 'right',
        start: 0,
        ticks: 3,
      },
    ],
    className: '',
  },
};

export const YAxisCurve = {
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
        curve: 'step',
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

export const LineChartVertical = {
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

export const LineChartHorizontal = {
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

export const SeriesLabel = {
  args: {
    data,
    id: 'line-chart-with-series-label',
    padding: { top: 10, right: 50, bottom: 10, left: 10 },
    x: { key: 'id' },
    y: [
      {
        key: 'value',
        className: 'text-green-500',
        label: {
          show: true,
          className: 'fill-green-500 text-xs group-hover:font-bold',
        },
      },
      {
        key: 'reading',
        className: 'text-blue-500',
        label: {
          show: true,
          className: 'fill-blue-500 text-xs group-hover:font-bold',
        },
      },
    ],
    className: '',
  },
};
