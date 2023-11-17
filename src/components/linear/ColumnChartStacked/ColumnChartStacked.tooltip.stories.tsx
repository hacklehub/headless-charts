/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Meta, StoryObj } from '@storybook/react';

import ColumnChartStacked from '.';
import data from './sample.json';

const meta: Meta<typeof ColumnChartStacked> = {
  title: 'Linear/ColumnChartStacked/Tooltips',
  component: ColumnChartStacked,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ColumnChartStacked>;

export const Tooltip: Story = {
  args: {
    id: 'tooltip',
    data,
    x: { key: 'name' },
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
    y: [
      { key: 'value1', className: 'text-purple-500' },
      { key: 'value2', className: 'text-purple-700' },
      { key: 'value3', className: 'text-purple-900' },
    ],
    className: 'bg-gray-100 rounded',
    tooltip: {
      className: 'bg-gray-100 rounded p-2',
    },
  },
};

export const TooltipCustomHtml: Story = {
  args: {
    ...Tooltip.args,
    id: 'tooltip-custom-html',
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
