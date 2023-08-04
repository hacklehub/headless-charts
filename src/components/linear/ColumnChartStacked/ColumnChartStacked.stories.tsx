/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ColumnChartStacked from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

export default {
  title: 'Linear/ColumnChartStacked',
  component: ColumnChartStacked,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data,
    id: 'column-chart-stack-default',
    x: { key: 'name' },
    y: [{ key: 'value1' }, { key: 'value2' }, { key: 'value3' }],
  },
};

export const Styled = {
  args: {
    data,
    id: 'column-chart-stack-styled',
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
    x: { key: 'name', className: 'text-purple-300' },
    y: [
      { key: 'value1', className: 'text-purple-500' },
      { key: 'value2', className: 'text-purple-700' },
      { key: 'value3', className: 'text-purple-900' },
    ],
  },
};

export const WithTooltip = {
  args: {
    ...Default.args,
    tooltip: {
      className: 'bg-gray-100 rounded p-2',
    },
  },
};

export const WithCustomTooltip = {
  args: {
    ...Default.args,
    tooltip: {
      html: (data: any) => {
        return `
          <div class="bg-gray-100 rounded p-2">
            <div class="text-sm font-semibold">${data.name}</div>
            <div class="text-xs">${data['value1']}</div>
          </div>
        `;
      },
    },
  },
};
