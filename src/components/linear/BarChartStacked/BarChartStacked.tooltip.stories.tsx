/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import BarChartStacked from '.';
import data from './sample.json';

const meta: Meta<typeof BarChartStacked> = {
  title: 'Linear/BarChartStacked/Tooltips',
  component: BarChartStacked,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BarChartStacked>;

export const Tooltip: Story = {
  args: {
    data,
    id: 'tooltip',
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
        className: 'fill-purple-700',
      },
      { key: 'value', className: 'fill-purple-400' },
    ],
    y: { key: 'name', className: 'text-red-500' },
    tooltip: {
      className: 'bg-gray-800 text-white p-2 rounded',
      keys: ['name', 'reading', 'value'],
    },
  },
};

export const TooltipCustomHtml: Story = {
  args: {
    ...Tooltip.args,
    id: 'bar-chart-custom-tooltip',
    tooltip: {
      className: 'bg-gray-800 text-white p-2 rounded',
      html: (d: any) => {
        return `
            <div class="flex flex-col">
              <div class="text-lg text-center">${d.name}</div>
              <div class="text-sm text-center">${d.reading}</div>
              <div class="text-sm text-center">${d.value}</div>
            </div>
          `;
      },
    },
  },
};
