/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import LollipopHChart from '.';
import data from './sample.json';

const meta: Meta<typeof LollipopHChart> = {
  title: 'Linear/LollipopHChart/Tooltips',
  component: LollipopHChart,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LollipopHChart>;

export const Tooltip: Story = {
  args: {
    data,
    id: 'tooltip',
    x: {
      key: 'value',
      start: 0,
    },
    y: {
      key: 'name',
    },
    tooltip: {
      keys: ['name', 'value', 'reading'],
    },
  },
};

export const TooltipCustomHtml: Story = {
  args: {
    ...Tooltip.args,
    tooltip: {
      html: (d: any) =>
        `<div class='bg-gray-800 text-white p-2 rounded'>${d.name} - ${d.value}</div>`,
    },
  },
};
