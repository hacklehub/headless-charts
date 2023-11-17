/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import SpineChart from '.';
import data from './sample.json';

const meta: Meta<typeof SpineChart> = {
  title: 'Linear/SpineChart/Tooltips',
  component: SpineChart,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SpineChart>;

export const Tooltip: Story = {
  args: {
    data,
    id: 'tooltip',
    y: {
      key: 'name',
      axis: 'left',
    },
    x: [
      { key: 'value2', direction: 'left' },
      { key: 'value3', direction: 'right' },
      { key: 'value4', direction: 'left' },
    ],
    tooltip: {
      keys: ['value2', 'value3', 'value4'],
      className: 'bg-gray-800 text-white p-2 rounded-md shadow-md',
    },
  },
};

export const TooltipCustomHtml: Story = {
  args: {
    ...Tooltip.args,
    id: 'tooltip-custom-html',
    tooltip: {
      html: (d: any) => `
        <div class="bg-gray-800 text-white p-2 rounded-md shadow-md">
          <div class="font-bold">${d.name}</div>
          <div>${d.value2}</div>
          <div>${d.value3}</div>
          <div>${d.value4}</div>
        </div>
      `,
    },
  },
};
