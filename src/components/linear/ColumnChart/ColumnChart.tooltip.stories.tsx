/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import ColumnChart from '.';
import data from './sample.json';

const meta: Meta<typeof ColumnChart> = {
  title: 'Linear/ColumnChart/Tooltips',
  component: ColumnChart,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ColumnChart>;

export const Tooltip: Story = {
  args: {
    data,
    id: 'tooltip',
    x: { key: 'name' },
    y: [
      {
        key: 'USA',
        start: 0,
      },
      { key: 'Europe' },
      { key: 'APAC' },
      { key: 'Africa' },
    ],
    tooltip: {
      className: 'bg-gray-100 rounded p-2',
    },
  },
};

export const WithCustomTooltip: Story = {
  args: {
    ...Tooltip.args,
    tooltip: {
      html: (data: any) => {
        return `
          <div class="bg-gray-100 rounded p-2">
            <div class="text-sm font-semibold">${data.name}</div>
            <div class="text-xs">${data['USA']}</div>
          </div>
        `;
      },
    },
  },
};
