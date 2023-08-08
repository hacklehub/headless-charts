/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import PizzaChart from '.';
import data from './sample.json';

const metrics = [
  {
    key: 'metric1',
  },
  {
    key: 'metric2',
  },
  {
    key: 'metric3',
  },
  {
    key: 'metric4',
  },
  {
    key: 'metric5',
  },
  {
    key: 'metric6',
  },
  {
    key: 'metric7',
  },
];

export default {
  title: 'Gauge/PizzaChart/Tooltip',
  component: PizzaChart,
} as Meta;

type Story = StoryObj<typeof PizzaChart>;

export const WithTooltip: Story = {
  args: {
    id: 'pizza-chart-tooltip',
    data,
    tooltip: {},
    metrics,
  },
};

export const WithCustomColors: Story = {
  args: {
    ...WithTooltip.args,
    id: 'pizza-chart-tooltip-custom-colors',
    tooltip: {
      className: 'bg-white border-2 border-purple-700 p-2 rounded',
    },
  },
};

export const WithCustomHtml: Story = {
  args: {
    ...WithTooltip.args,
    id: 'pizza-chart-tooltip-custom-html',
    tooltip: {
      html: (d: { index: number; data: number }) =>
        `<div class="bg-white border-2 border-purple-700 p-2 rounded">
        ${metrics[d.index].key} was scored at ${data[metrics[d.index].key]}.
        </div>`,
    },
  },
};
