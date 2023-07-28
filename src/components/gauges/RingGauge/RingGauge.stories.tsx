import { Meta } from '@storybook/react';
import RingGauge from '.';

/* eslint-disable @typescript-eslint/no-explicit-any */

const metrics = [
  {
    name: 'Target 1',
    score: 75,
    target: 90,
    className: 'text-purple-700',
  },
  {
    name: 'Target 2',
    score: 75,
    target: 80,
    className: 'text-purple-400',
  },
  {
    name: 'Target 3',
    score: 70,
    target: 55,
    className: 'text-green-500',
  },
];

export default {
  title: 'Gauge/RingGauge',
  component: RingGauge,
  tags: ['autodocs'],
} as Meta;

/** Default RingGauge Chart (Grouped). */
export const Default = {
  args: {
    data: metrics,
    id: 'ring-chart-default',
    labelKey: 'name',
    dataKey: 'score',
    targetKey: 'target',
  },
};

/** Ring gauge with tooltip */
export const WithTooltip = {
  args: {
    data: metrics,
    id: 'ring-chart-tooltip',
    labelKey: 'name',
    dataKey: 'score',
    targetKey: 'target',
    tooltip: {
      className: `bg-gray-800 text-white px-4 py-2 rounded-md shadow-md`,
    },
  },
};
