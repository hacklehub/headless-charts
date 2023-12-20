/* eslint-disable @typescript-eslint/ban-ts-comment */

import ColumnChartGrouped from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

const meta: Meta<typeof ColumnChartGrouped> = {
  title: 'Linear/ColumnChartGrouped',
  component: ColumnChartGrouped,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    data,
    id: 'column-chart-group-default',
    x: { key: 'year' },
    y: [
      {
        key: 'macbook',
      },
      {
        key: 'iphone',
      },
      {
        key: 'ipad',
      },
      {
        key: 'wearables',
      },
      {
        key: 'services',
      },
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
      top: 10,
      right: 40,
      bottom: 40,
      left: 60,
    },
    x: { key: 'year', className: 'fill-blue-500' },
    y: [
      {
        key: 'macbook',
        className: 'fill-purple-800',
      },
      {
        key: 'iphone',
        className: 'fill-purple-600',
      },
      {
        key: 'ipad',
        className: 'fill-purple-400',
      },
      {
        key: 'wearables',
        className: 'fill-purple-300',
      },
      {
        key: 'services',
        className: 'fill-purple-200',
      },
    ],
  },
};

export const Animated = {
  args: {
    ...Styled.args,
    drawing: { duration: 1000 },
  },
};

export const WithTooltip = {
  args: {
    ...Styled.args,
    tooltip: {
      className: 'bg-gray-100 rounded p-2',
    },
  },
};

export const WithCustomTooltip = {
  args: {
    ...Styled.args,
    tooltip: {
      html: (data: any) => {
        return `
          <div class="bg-gray-100 rounded p-2">
            <div class="text-sm font-semibold">${data.year}</div>
            <div class="text-xs">${data.macbook}</div>
          </div>
        `;
      },
    },
  },
};
