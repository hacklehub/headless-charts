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
    ...Default.args,
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
    y: [
      { key: 'value1', className: 'text-purple-500' },
      { key: 'value2', className: 'text-purple-700' },
      { key: 'value3', className: 'text-purple-900' },
    ],
  },
};

export const WithTooltip = {
  args: {
    ...Styled.args,
    tooltip: {
      className: 'bg-gray-100 rounded p-2',
      keys: ['name', 'value1', 'value2', 'value3'],
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
            <div class="text-sm font-semibold">${data.name}</div>
            <div class="text-xs">${data['value1']}</div>
          </div>
        `;
      },
    },
  },
};

export const WithDrawing = {
  args: {
    ...WithTooltip.args,
    drawing: {
      duration: 1000,
    },
  },
};
export const Waterfall = {
  args: {
    ...Styled.args,
    id: 'column-chart-stack-waterfall',
    waterfall: true,
  },
};

export const WaterfallDrawing = {
  args: {
    ...Waterfall.args,
    drawing: {
      duration: 1000,
    },
  },
};
