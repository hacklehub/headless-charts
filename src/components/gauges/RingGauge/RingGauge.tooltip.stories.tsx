/* eslint-disable @typescript-eslint/no-unused-vars */

import { Meta, StoryObj } from '@storybook/react';

import RingGauge from '.';
import metrics from './sample.json';

const meta: Meta<typeof RingGauge> = {
  title: 'Gauge/RingGauge/Tooltips',
  component: RingGauge,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RingGauge>;

/** Ring gauge with tooltip */
export const WithTooltip: Story = {
  args: {
    data: metrics.map(({ className, ...metric }: any) => metric),
    id: 'ring-chart-tooltip',
    labelKey: 'name',
    dataKey: 'score',
    targetKey: 'target',
    tooltip: {
      className: `bg-gray-800 text-white px-4 py-2 rounded-md shadow-md`,
    },
  },
};

/** Ring gauge with custom tooltip */
export const WithCustomTooltip: Story = {
  args: {
    ...WithTooltip.args,
    id: 'ring-chart-custom-tooltip',
    tooltip: {
      className: `bg-gray-800 text-white px-4 py-2 rounded-md shadow-md`,
      html: (data: any) => `<div class="flex flex-col">
              <div class="text-lg">${data.name}</div>
              <div class="text-xs">${data.score} out of ${data.target}</div>
            </div>`,
    },
  },
};
