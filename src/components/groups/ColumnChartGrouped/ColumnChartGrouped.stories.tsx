import ColumnChartGrouped from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

export default {
  title: 'Groups/ColumnChartGrouped',
  component: ColumnChartGrouped,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data,
    id: 'column-chart-group-default',
    x: { key: "name" },
    y: [
      {
        key: "USA",
        start: 0,
      },
      { key: "Europe" },
      { key: "APAC"},
      { key: "Africa"},
    ],
  },
};

export const Styled = {
  args: {
    data,
    id: 'column-chart-group-styled',
    className: 'bg-gray-100 rounded',
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 5,
      bar: 0.1,
    },
    margin: {
      top: 0,
      right: 40,
      bottom: 40,
      left: 60,
    },
    x: [
      {
        key: 'reading',
        className: 'fill-red-500 rounded',
      },
      { key: 'value', className: 'fill-blue-500' },
    ],
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
