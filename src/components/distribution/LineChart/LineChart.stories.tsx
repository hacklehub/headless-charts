import './index.css';

import LineChart from '.';
import { Meta } from '@storybook/react';

export default {
  title: 'distribution/LineChart',
  component: LineChart,
  tags: ['autodocs'],
} as Meta;

const data = [
  { id: 1, value: 1311, reading: 1500 },
  { id: 2, reading: 1912 },
  { id: 3, value: 1000 },
  { id: 4, value: 1513 },
  { id: 5, value: 1351, reading: 1000 },
  { id: 6, value: 1451, reading: 1200 },
];

export const Default = {
  args: {
    data,
    x: { key: 'id' },
    y: [{ key: 'value' }, { key: 'reading' }],
    id: 'default-line-chart',
  },
};

export const WithStyle = {
  args: {
    data,
    x: { key: 'id' },
    y: [
      {
        key: 'value',
        className: 'text-green-500 stroke-2 hover:text-green-900',
      },
      {
        key: 'reading',
        className: 'text-blue-500',
      },
    ],
    id: 'styled-line-chart',
  },
};

export const WithCustomStyles = {
  args: {
    data,
    id: 'custom-styled-line-chart',
    x: { key: 'id' },
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', className: 'text-blue-500 running stroke-2' },
    ],
  },
};

export const WithStyleChart = {
  args: {
    data,
    id: 'entire-chart-styled',
    x: { key: 'id' },
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', className: 'text-blue-500' },
    ],
    className:
      'bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900',
  },
};

export const WithPaddedChart = {
  args: {
    data,
    id: 'padding-for-line-chart',
    x: { key: 'id' },
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
    ...WithStyle.args,
    id: 'line-chart-with-tooltip',
    tooltip: {
      className: 'bg-gray-800 text-white p-2 rounded',
      keys: ['value', 'reading'],
    },
  },
};
