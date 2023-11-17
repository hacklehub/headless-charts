/* eslint-disable @typescript-eslint/no-explicit-any */

import { Meta, StoryObj } from '@storybook/react';

import LineChart from '.';
import data from './sample.json';

const meta: Meta<typeof LineChart> = {
  title: 'Linear/LineChart/Tooltips',
  component: LineChart,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LineChart>;

export const Tooltip: Story = {
  args: {
    id: 'tooltip',
    data,
    x: { key: 'id' },
    y: [
      { key: 'value', className: 'text-green-500' },
      { key: 'reading', className: 'text-blue-500' },
    ],
    tooltip: {
      keys: ['value', 'reading', 'id'],
      className: 'text-green-500',
      html: (row: any) => `${row.id} - ${row.value || ''}/${row.reading || ''}`,
    },
    showGuideLines: true,
  },
};
